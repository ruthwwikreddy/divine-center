#!/usr/bin/env python3
"""Generate puja-details blocks from divinecenter.in RSC payloads."""
import json
import re
import ssl
import urllib.request
from html import unescape

CTX = ssl.create_default_context()
UA = "Mozilla/5.0"

LOCAL_SLUGS = [
    "kedareshwara-vratam",
    "kala-sarpa-dosha",
    "kalyanam",
    "shani-shanti",
    "mahalakshmi-homam",
    "rahu-ketu-shanti",
    "ati-rudra-homam",
]

LIVE_SLUG_MAP = {
    "kedareshwara-vratam": "kedareshwara-vratam",
    "kala-sarpa-dosha": "kala-sarpa-dosha-puja",
    "kalyanam": "kalyanam",
    "shani-shanti": "shani-shanti-puja",
    "mahalakshmi-homam": "mahalakshmi-homam",
    "rahu-ketu-shanti": "rahu-ketu-shanti-puja",
    "ati-rudra-homam": "ati-rudra-homam",
}

DURATION_FALLBACK = {
    "kedareshwara-vratam": "2 hours",
    "kala-sarpa-dosha": "3–4 hours",
    "kalyanam": "Full day",
    "shani-shanti": "2 hr 30 min",
    "mahalakshmi-homam": "3 hours",
    "rahu-ketu-shanti": "3 hours",
    "ati-rudra-homam": "4+ hours",
}

BOOKING = (
    "Book directly with fixed pricing, or get a personalized quote for custom needs "
    "(e.g. samagri, venue)."
)

def fetch_rsc(slug):
    req = urllib.request.Request(
        f"https://divinecenter.in/pujas/{slug}",
        headers={"User-Agent": UA, "RSC": "1", "Next-Router-State-Tree": "%5B%22%22%5D"},
    )
    return urllib.request.urlopen(req, context=CTX, timeout=60).read().decode("utf-8", "replace")

def extract_json_array(text, key):
    idx = text.find(f'"{key}":')
    if idx < 0:
        return None
    start = text.find("[", idx)
    if start < 0:
        return None
    depth = 0
    for i in range(start, len(text)):
        c = text[i]
        if c == "[":
            depth += 1
        elif c == "]":
            depth -= 1
            if depth == 0:
                try:
                    return json.loads(text[start : i + 1])
                except json.JSONDecodeError:
                    return None
    return None

def strip_html(html):
    if not html or not isinstance(html, str):
        return ""
    if html.startswith("/_next/") or html.startswith("]"):
        return ""
    t = unescape(re.sub(r"<[^>]+>", " ", html))
    return re.sub(r"\s+", " ", t).strip()

def parse_list_html(html):
    if not html or html.startswith("/_next/"):
        return []
    items = re.findall(r"<li[^>]*>(.*?)</li>", html, re.I | re.S)
    out = []
    for it in items:
        t = strip_html(it)
        if t:
            out.append(t.lstrip("● ").strip())
    if out:
        return out
    for p in re.findall(r"<p[^>]*>(.*?)</p>", html, re.I | re.S):
        t = strip_html(p)
        if t.startswith("●"):
            out.append(t.lstrip("● ").strip())
    return out

def parse_section(sec, ref_strings):
    content = sec.get("content", "")
    if isinstance(content, str) and content.startswith("$"):
        content = ref_strings.get(content, "")
    html = content if isinstance(content, str) else ""
    title = sec.get("section_heading", "")
    paras = []
    if html and not html.startswith("/_next/"):
        for p in re.findall(r"<p[^>]*>(.*?)</p>", html, re.I | re.S):
            t = strip_html(p)
            if len(t) > 30:
                paras.append(t)
        if not paras and strip_html(html):
            paras = [strip_html(html)]
    lst = parse_list_html(html)
    intro = ""
    outro = ""
    if lst and paras:
        intro = paras[0] if len(paras) == 1 and not lst else ""
        if not intro and paras:
            intro = next((p for p in paras if "follows" in p.lower() or "sequence" in p.lower()), "")
    elif paras and not lst:
        if len(paras) > 1:
            intro = paras[0] if "follows" in paras[0].lower() else ""
    outro = next((p for p in paras if p.startswith("Every ") or p.startswith("We ensure") or "Every ritual" in p), "")
    if outro in paras and len(paras) > 1:
        paras = [p for p in paras if p != outro]
    if intro in paras:
        paras = [p for p in paras if p != intro]
    return {"title": title, "intro": intro, "paragraphs": paras[:5], "list": lst, "outro": outro}

def build_ref_map(text):
    strings = []
    for m in re.finditer(r'"((?:\\.|[^"\\]){2,12000})"', text):
        s = m.group(1).replace("\\n", "\n").replace('\\"', '"').replace("\\u0026", "&")
        strings.append(s)
    refs = {f"${i}": s for i, s in enumerate(strings)}
    # Next.js flight string table: 20:T72d,<html>21:T605,<html>
    for m in re.finditer(
        r"(\d+):T[a-f0-9]+,(.+?)(?=\d+:T[a-f0-9]+,|\d+:\[|\d+:I\[|\"poojaSamagri\")",
        text,
        re.S,
    ):
        num, html = m.group(1), m.group(2)
        refs[f"${num}"] = html.replace("\\u0026", "&")
    return refs

def parse_puja(local_slug):
    live_slug = LIVE_SLUG_MAP[local_slug]
    text = fetch_rsc(live_slug)
    refs = build_ref_map(text)
    samagri_raw = extract_json_array(text, "poojaSamagri") or []
    sections_raw = extract_json_array(text, "sections") or []
    why_raw = extract_json_array(text, "whyChooseUs") or extract_json_array(text, "whyChoose") or []

    samagri = [{"title": g["section_name"], "items": g["items"]} for g in samagri_raw if g.get("section_name")]

    sections = []
    for sec in sections_raw:
        parsed = parse_section(sec, refs)
        if parsed["title"]:
            sections.append(parsed)

    seo = next(
        (s for s in refs.values() if "| Divine Center" in s and "Not Found" not in s and len(s) < 220),
        "",
    )
    seo_clean = seo.split("| Divine Center")[0].strip() if seo else local_slug.replace("-", " ").title()
    seo_clean = re.sub(r"\s*—\s*Book\s+.*$", "", seo_clean).strip()

    subtitle = next(
        (
            s
            for s in refs.values()
            if any(x in s for x in ("Book Experienced", "Book Verified", "Purify Your", "Guidance You"))
            and not s.startswith("{")
            and len(s) < 200
        ),
        "",
    )

    intro_html = next(
        (s for s in refs.values() if s.startswith("<p") and len(s) > 100 and "ql-align" in s),
        next((s for s in refs.values() if s.startswith("<p") and len(s) > 80), ""),
    )
    intro = strip_html(intro_html)

    dm = re.search(r'"defaultDurationInMinutes":(\d+)', text)
    duration = DURATION_FALLBACK.get(local_slug, "2 hours")
    if dm:
        mins = int(dm.group(1))
        if mins >= 120 and mins % 60 == 0:
            duration = f"{mins // 60} hours"
        elif mins >= 60:
            duration = f"{mins // 60} hr {mins % 60} min"
        else:
            duration = f"{mins} min"

    why_intro = why_close = ""
    why_items = []
    for w in why_raw:
        if isinstance(w, dict):
            if w.get("heading"):
                why_intro = w.get("heading", why_intro)
            if w.get("points"):
                why_items = w["points"]
            if w.get("closing"):
                why_close = w["closing"]
    if not why_items:
        for s in refs.values():
            if "We are committed" in s or "Your home is where" in s:
                why_intro = strip_html(s)[:500]
            if s.startswith("● "):
                why_items.append(s[2:].strip())

    # why section from sections
    for sec in sections:
        if "Why Choose" in sec["title"]:
            if sec["paragraphs"] and not why_intro:
                why_intro = sec["paragraphs"][0]
            if sec["list"]:
                why_items = sec["list"]
            if sec["outro"]:
                why_close = sec["outro"]
            sections = [s for s in sections if "Why Choose" not in s["title"]]

    title = seo_clean.split("|")[0].strip()
    if "—" in title:
        title = title.split("—")[0].strip()
    # Map live titles to catalog titles
    title_map = {
        "kedareshwara-vratam": "Kedareshwara Vratam",
        "kala-sarpa-dosha": "Kala Sarpa Dosha Puja",
        "kalyanam": "Kalyanam",
        "shani-shanti": "Shani Shanti Puja",
        "mahalakshmi-homam": "Mahalakshmi Homam",
        "rahu-ketu-shanti": "Rahu Ketu Shanti Puja",
        "ati-rudra-homam": "Ati Rudra Homam",
    }
    if local_slug in title_map:
        title = title_map[local_slug]

    return {
        "slug": local_slug,
        "seoTitle": seo_clean,
        "subtitle": subtitle,
        "durationLabel": duration,
        "intro": intro,
        "bookingNote": BOOKING,
        "samagri": samagri,
        "sections": sections,
        "whyChooseIntro": why_intro,
        "whyChoose": why_items[:8],
        "whyChooseClosing": why_close,
    }

def js_str(s):
    return json.dumps(s, ensure_ascii=False)

def emit_block(p):
    key = p["slug"]
    if "-" in key and not key[0].isdigit():
        key_repr = f'"{key}"'
    else:
        key_repr = key
    lines = [f"  {key_repr}: {{"]
    lines.append(f"    subtitle: {js_str(p['subtitle'])},")
    lines.append(f"    durationLabel: {js_str(p['durationLabel'])},")
    lines.append("    onlineAvailable: true,")
    lines.append("    doorstepAvailable: true,")
    lines.append(f"    seoTitle: {js_str(p['seoTitle'])},")
    lines.append(f"    intro: {js_str(p['intro'])},")
    lines.append(f"    bookingNote: {js_str(p['bookingNote'])},")
    lines.append("    samagri: " + json.dumps(p["samagri"], indent=6, ensure_ascii=False).replace("\n", "\n    ") + ",")
    lines.append("    sections: " + json.dumps(p["sections"], indent=6, ensure_ascii=False).replace("\n", "\n    ") + ",")
    lines.append(f"    whyChooseIntro: {js_str(p['whyChooseIntro'])},")
    lines.append("    whyChoose: " + json.dumps(p["whyChoose"], indent=6, ensure_ascii=False).replace("\n", "\n    ") + ",")
    lines.append(f"    whyChooseClosing: {js_str(p['whyChooseClosing'])},")
    lines.append("  },")
    return "\n".join(lines)

def main():
    blocks = []
    for slug in LOCAL_SLUGS:
        print("Fetching", slug, "...")
        p = parse_puja(slug)
        blocks.append(emit_block(p))
        print("  ->", p["seoTitle"][:60], "| samagri", len(p["samagri"]), "| sections", len(p["sections"]))

    out_path = "/Users/ruthwikreddy/devine center/scripts/_puja-import-blocks.js.snippet"
    with open(out_path, "w", encoding="utf-8") as f:
        f.write("\n".join(blocks))
    print("Wrote", out_path)

if __name__ == "__main__":
    main()
