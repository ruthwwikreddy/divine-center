#!/usr/bin/env python3
"""Fetch blog posts from divinecenter.in RSC payloads and emit blog-details-data.js."""
import json
import re
import subprocess
from datetime import datetime
from html import unescape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "blog-details-data.js"
IMG_DIR = ROOT / "assets" / "images" / "blog"

LIVE_SLUGS = [
    "why-satyanarayana-puja-is-one-of-the-most-powerful-hindu-rituals",
    "varalakshmi-vratam-significance-rituals-muhurat",
    "griha-pravesh-puja",
    "hanuman-jayanti-rituals-timings-and-41-day-deeksha",
]

CAT_MAP = {
    "Vratas & Festivals": ("vratas", "Vratas & Festivals"),
    "Festivals & Rituals": ("festivals", "Festivals & Rituals"),
    "Spiritual Wisdom": ("wisdom", "Spiritual Wisdom"),
    "Puja Guides": ("guides", "Puja Guides"),
}

FEATURED = {
    "varalakshmi-vratam-significance-rituals-muhurat",
    "griha-pravesh-puja",
    "why-satyanarayana-puja-is-one-of-the-most-powerful-hindu-rituals",
}


def fetch_rsc(slug: str) -> str:
    return subprocess.check_output(
        [
            "curl",
            "-sL",
            "-H",
            "RSC: 1",
            "-H",
            "Next-Router-State-Tree: %5B%22%22%5D",
            "-A",
            "Mozilla/5.0",
            f"https://divinecenter.in/blogs/{slug}",
        ],
        text=True,
    )


def build_ref_map(text: str) -> dict:
    strings = []
    for m in re.finditer(r'"((?:\\.|[^"\\]){2,12000})"', text):
        s = m.group(1).replace("\\n", "\n").replace('\\"', '"').replace("\\u0026", "&")
        strings.append(s)
    refs = {f"${i}": s for i, s in enumerate(strings)}
    for m in re.finditer(
        r"(\d+):T[a-f0-9]+,(.+?)(?=\d+:T[a-f0-9]+,|\d+:\[|\d+:I\[|\"contentSections\")",
        text,
        re.S,
    ):
        refs[f"${m.group(1)}"] = m.group(2).replace("\\u0026", "&")
    return refs


def extract_json_array(text: str, key: str) -> list:
    idx = text.find(f'"{key}":')
    if idx < 0:
        return []
    start = text.find("[", idx)
    if start < 0:
        return []
    depth = 0
    for i in range(start, len(text)):
        if text[i] == "[":
            depth += 1
        elif text[i] == "]":
            depth -= 1
            if depth == 0:
                try:
                    return json.loads(text[start : i + 1])
                except json.JSONDecodeError:
                    return []
    return []


def strip_html(html: str) -> str:
    if not html or html.startswith("/_next/"):
        return ""
    t = unescape(re.sub(r"<[^>]+>", " ", html))
    return re.sub(r"\s+", " ", t).strip()


def parse_list_html(html: str) -> list:
    items = re.findall(r"<li[^>]*>(.*?)</li>", html or "", re.I | re.S)
    out = [strip_html(x) for x in items if strip_html(x)]
    if out:
        return out
    for p in re.findall(r"<p[^>]*>(.*?)</p>", html or "", re.I | re.S):
        t = strip_html(p)
        if t.startswith("●") or t.startswith("•"):
            out.append(t.lstrip("●• ").strip())
    return out


def parse_paras(html: str) -> list:
    return [p for p in (strip_html(x) for x in re.findall(r"<p[^>]*>(.*?)</p>", html or "", re.I | re.S)) if len(p) > 25]


def resolve_content(raw, refs: dict) -> str:
    if isinstance(raw, str) and raw.startswith("$"):
        return refs.get(raw, "")
    return raw if isinstance(raw, str) else ""


def pick_title(text: str, slug: str) -> str:
    if slug.startswith("why-"):
        why = re.search(r"(Why [^\"\\]{20,200})", text)
        if why:
            return why.group(1).strip()
    seo = re.search(r"([^\"\\|]{25,200})\| Divine Center", text)
    if seo:
        return seo.group(1).strip()
    for pattern in [
        r"Varalakshmi Vratam 2026: Complete Guide, Samagri & Muhurat",
        r"Hanuman Jayanti 2026: Rituals, Timings & 41-Day Deeksha Guide",
        r"Griha Pravesh Puja Guide — Muhurat, Vidhi & Complete Checklist",
    ]:
        if pattern.split()[0].lower() in slug and pattern in text:
            return pattern
    candidates = []
    for m in re.finditer(r'"title":"((?:\\.|[^"\\])*)"', text):
        t = m.group(1).replace('\\"', '"')
        if "Divine Center" in t or len(t) < 20:
            continue
        if t.startswith("Puja ") and "Blog" in t:
            continue
        candidates.append(t)
    if candidates:
        rich = [c for c in candidates if ":" in c or "Guide" in c or "—" in c]
        pool = rich if rich else candidates
        return max(pool, key=len)
    return slug.replace("-", " ").title()


def pick_excerpt(text: str, title: str) -> str:
    meta = re.search(r'"metaDescription":"((?:\\.|[^"\\])*)"', text)
    if meta:
        ex = meta.group(1).replace('\\"', '"')
        if ex and ex != title:
            return ex[:240]
    excerpt_m = re.search(r'"excerpt":"((?:\\.|[^"\\])*)"', text)
    if excerpt_m:
        ex = excerpt_m.group(1).replace('\\"', '"')
        if ex and ex != title:
            return ex[:240]
    return title[:160]


def pick_image_url(text: str) -> str:
    featured = re.search(r'"featuredImage":"([^"]+)"', text)
    if featured and featured.group(1).startswith("http"):
        return featured.group(1)
    imgs = re.findall(r"(https://image\.divinecenter\.in/[^\"\\]+)", text)
    return imgs[0] if imgs else ""


def format_date(iso: str) -> str:
    try:
        dt = datetime.fromisoformat(iso.replace("Z", "+00:00"))
        return dt.strftime("%-d %b %Y")
    except ValueError:
        return iso[:10]


def estimate_read_time(sections: list) -> str:
    words = 0
    for s in sections:
        words += len(s.get("content_text", "").split())
    mins = max(4, round(words / 200))
    return f"{mins} min read"


def html_to_sections(heading: str, html: str) -> list:
    """Convert one content block into site-data section objects."""
    out = []
    if heading:
        out.append({"type": "heading", "title": heading})

    paras = parse_paras(html)
    lst = parse_list_html(html)
    faq_q = re.findall(r"<h[34][^>]*>(.*?)</h[34]>", html or "", re.I | re.S)
    is_faq = "faq" in heading.lower() or bool(re.search(r"Q\d+:", strip_html(html)))

    if is_faq and not faq_q:
        text = strip_html(html)
        chunks = re.split(r"(Q\d+:\s*)", text)
        if len(chunks) > 2:
            for i in range(1, len(chunks), 2):
                q = chunks[i].strip()
                a = chunks[i + 1].strip() if i + 1 < len(chunks) else ""
                if q and a:
                    out.append({"type": "text", "content": q + " " + a})
        elif text:
            out.append({"type": "text", "content": text})
        return out

    for p in paras[:8]:
        out.append({"type": "text", "content": p})

    if lst and len(lst) >= 3 and any("step" in heading.lower() or "ritual" in heading.lower() or "procedure" in heading.lower() for _ in [1]):
        out = [x for x in out if x.get("type") != "text" or x not in [{"type": "text", "content": p} for p in paras]]
        if heading:
            out = [{"type": "heading", "title": heading}]
        out.append({"type": "steps", "items": lst[:12]})
    elif lst and len(lst) >= 2:
        if heading and "benefit" in heading.lower():
            out.append({"type": "benefits", "items": lst})
        else:
            out.append({"type": "benefits", "items": lst})

    # Pull a short highlight from first strong statement
    if paras and len(paras[0]) > 80 and len(paras[0]) < 280 and "?" not in paras[0][:40]:
        pass  # keep as text only

    quotes = re.findall(r"<blockquote[^>]*>(.*?)</blockquote>", html or "", re.I | re.S)
    for q in quotes[:1]:
        qt = strip_html(q)
        if len(qt) > 30:
            out.append({"type": "quote", "text": qt.strip("“”\"' ")})

    return out


def download_image(url: str, slug: str) -> str:
    if not url:
        return f"assets/images/placeholders/blog-{slug[:20]}.svg"
    ext = ".jpg"
    if ".png" in url.lower():
        ext = ".png"
    elif ".webp" in url.lower():
        ext = ".webp"
    local_name = slug + ext
    dest = IMG_DIR / local_name
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    try:
        subprocess.run(
            ["curl", "-sL", "-o", str(dest), url],
            check=True,
            capture_output=True,
        )
        return f"assets/images/blog/{local_name}"
    except subprocess.CalledProcessError:
        return f"assets/images/placeholders/blog-{slug[:24]}.svg"


def parse_blog(slug: str) -> dict:
    text = fetch_rsc(slug)
    refs = build_ref_map(text)

    title = pick_title(text, slug)
    excerpt = pick_excerpt(text, title)

    cat_label_m = re.search(r'"category":"([^"]+)"', text)
    cat_label = cat_label_m.group(1) if cat_label_m else "Puja Guides"
    cat_id, cat_label = CAT_MAP.get(cat_label, ("guides", cat_label))

    img_url = pick_image_url(text)
    img_path = download_image(img_url, slug)

    pub_m = re.search(r'"publishedAt":"([^"]+)"', text)
    date = format_date(pub_m.group(1)) if pub_m else ""

    views_m = re.search(r'"views":(\d+)', text)
    views = views_m.group(1) if views_m else "1K"
    if views.isdigit() and int(views) >= 1000:
        views = f"{int(views) / 1000:.1f}K".replace(".0K", "K")

    raw_sections = extract_json_array(text, "contentSections")
    body = []
    sections = []
    for sec in sorted(raw_sections, key=lambda x: x.get("order", 0)):
        heading = sec.get("heading", "").strip()
        sub = sec.get("subHeading", "").strip()
        html = resolve_content(sec.get("content", ""), refs)
        plain = strip_html(html)
        if not plain:
            continue
        if not body and heading:
            body.append(plain[:500] if len(plain) > 500 else plain)
        elif not body:
            body.append(plain[:400])

        block_sections = html_to_sections(heading, html)
        if sub and block_sections and block_sections[0].get("type") == "heading":
            block_sections.insert(1, {"type": "text", "content": sub})
        elif sub:
            block_sections.insert(0, {"type": "text", "content": sub})
        sections.extend(block_sections)

    read_time = estimate_read_time([{"content_text": strip_html(resolve_content(s.get("content", ""), refs))} for s in raw_sections])

    return {
        "slug": slug,
        "title": title,
        "excerpt": excerpt,
        "img": img_path,
        "heroImg": img_path,
        "date": date,
        "readTime": read_time,
        "views": views if isinstance(views, str) and "K" in views else f"{views}",
        "category": cat_id,
        "categoryLabel": cat_label,
        "featured": slug in FEATURED,
        "body": body[:2] if body else [excerpt[:300]],
        "sections": sections,
    }


def js_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def emit_blog(b: dict, indent: str = "    ") -> str:
    lines = [
        f"{indent}{{",
        f'{indent}  slug: {js_str(b["slug"])},',
        f'{indent}  title: {js_str(b["title"])},',
        f'{indent}  excerpt: {js_str(b["excerpt"])},',
        f'{indent}  img: {js_str(b["img"])},',
        f'{indent}  heroImg: {js_str(b["heroImg"])},',
        f'{indent}  date: {js_str(b["date"])},',
        f'{indent}  readTime: {js_str(b["readTime"])},',
        f'{indent}  views: {js_str(str(b["views"]))},',
        f'{indent}  category: {js_str(b["category"])},',
        f'{indent}  categoryLabel: {js_str(b["categoryLabel"])},',
    ]
    if b.get("featured"):
        lines.append(f"{indent}  featured: true,")
    lines.append(f"{indent}  body: [")
    for p in b["body"]:
        lines.append(f"{indent}    {js_str(p)},")
    lines.append(f"{indent}  ],")
    lines.append(f"{indent}  sections: [")
    for sec in b["sections"]:
        lines.append(f"{indent}    {{")
        for k, v in sec.items():
            if k == "items":
                lines.append(f"{indent}      {k}: [")
                for item in v:
                    lines.append(f"{indent}        {js_str(item)},")
                lines.append(f"{indent}      ],")
            else:
                lines.append(f"{indent}      {k}: {js_str(v)},")
        lines.append(f"{indent}    }},")
    lines.append(f"{indent}  ],")
    lines.append(f"{indent}}},")
    return "\n".join(lines)


def main():
    blogs = []
    for slug in LIVE_SLUGS:
        print(f"Fetching {slug} ...")
        blogs.append(parse_blog(slug))

    header = """/* Auto-generated from divinecenter.in — run: python3 scripts/generate-blog-imports.py */
(function (global) {
  "use strict";

  var BLOG_DETAILS = [
"""
    footer = """  ];

  global.DivineCenterBlogDetails = BLOG_DETAILS;
})(typeof window !== "undefined" ? window : globalThis);
"""
    body = header + "\n".join(emit_blog(b) for b in blogs) + footer
    OUT.write_text(body, encoding="utf-8")
    print(f"Wrote {OUT} ({len(blogs)} blogs)")


if __name__ == "__main__":
    main()
