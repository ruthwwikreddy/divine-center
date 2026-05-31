#!/usr/bin/env python3
"""Generate pandit-details-data.js from live-site-content.json + RSC fetch."""
import json
import re
import ssl
import urllib.request

ROOT = "/Users/ruthwikreddy/devine center"
LIVE_JSON = f"{ROOT}/live-site-content.json"
OUT = f"{ROOT}/pandit-details-data.js"

SERVICE_TO_PUJA = {
    "griha-pravesh-pooja": "griha-pravesh",
    "satyanarayana-pooja": "satyanarayana",
    "varalakshmi-vratam": "varalakshmi",
    "rudrabhishekam-pooja": "rudrabhishekam",
    "hanuman-puja": "hanuman",
    "annaprashan-ceremony": "annaprashan",
    "aksharabhyasam": "aksharabhyasam",
    "consultation-service": "consultation",
    "vastu-shanti-pooja": "vastu-shanti",
    "navagraha-shanti-pooja": "navagraha-shanti",
    "kedareshwara-vratam": "kedareshwara-vratam",
    "kala-sarpa-dosha-puja": "kala-sarpa-dosha",
    "shani-shanti-puja": "shani-shanti",
    "mahalakshmi-homam": "mahalakshmi-homam",
    "rahu-ketu-shanti-pooja": "rahu-ketu-shanti",
    "ati-rudra-homam": "ati-rudra-homam",
    "kalyanam": "kalyanam",
}

LOCAL_TO_LIVE = {
    "panduranga-charyulu": "krishna-kanth",
    "narasimhacharyulu": "a-narasimhan",
    "chandra-mohan": "chandra-mohan-1",
    "ramashankar-kurmeti": "ramashankar-kkurmeti",
}

LOCATIONS = {
    "ramashankar-kkurmeti": "BN Reddy, Telangana",
    "krishna-kanth": "Vanasthalipuram, Telangana",
    "a-narasimhan": "Vanasthalipuram, Telangana",
    "anantha-krishna-vangipuram": "Hyderabad, Telangana",
    "sri-krishna-charyulu": "BN Reddy, Telangana",
    "chandra-mohan-1": "BN Reddy, Telangana",
    "ayyuluri-venkateshwarlu": "Pentlavelli, Telangana",
    "eruvinti-balakrishna": "Pentlavelli, Telangana",
}

LANGS = {
    "ramashankar-kkurmeti": ["English", "Hindi"],
    "krishna-kanth": ["English", "Sanskrit", "Hindi"],
    "a-narasimhan": ["Telugu", "Sanskrit", "English", "Hindi"],
    "anantha-krishna-vangipuram": ["Telugu", "English"],
    "sri-krishna-charyulu": ["English", "Telugu", "Sanskrit"],
    "chandra-mohan-1": ["Telugu", "Hindi"],
    "ayyuluri-venkateshwarlu": ["English", "Hindi", "Telugu"],
    "eruvinti-balakrishna": ["Telugu", "Sanskrit", "English"],
}

def clean_bio(text):
    if not text:
        return ""
    text = text.replace("\\r\\n", "\n").replace("\\r", "\n").replace("\\n", "\n").strip()
    bad = [
        "Life is full of moments that call for a deeper connection",
        "Aksharabhyasam is a traditional Hindu ritual",
        "Our experienced pandits are here to guide you",
    ]
    if any(b in text for b in bad):
        return ""
    return text

BIO_OVERRIDE = {
    "ramashankar-kkurmeti": "Ramashankar kurmeti is a verified Vedic priest with 24 years of experience, serving families in BN Reddy and Telangana with authentic pujas, homams, and spiritual guidance.",
    "anantha-krishna-vangipuram": "Anantha Krishna Vangipuram is a dedicated temple priest offering Griha Pravesh, consultation, and traditional home rituals with devotion and punctual service.",
}

def exp_years(text):
    m = re.search(r"(\d+)\+?\s*years?", text or "", re.I)
    return f"{m.group(1)} years" if m else ""

def js_str(s):
    return json.dumps(s or "", ensure_ascii=False)

def main():
    with open(LIVE_JSON, encoding="utf-8") as f:
        live = json.load(f)["pandits"]

    lines = ["/**", " * Extended profiles for pandit detail pages.", " */", "window.DivineCenterPanditDetails = {"]

    for live_slug, p in live.items():
        bio = BIO_OVERRIDE.get(live_slug) or clean_bio(p.get("experience", "")) or clean_bio(p.get("bio", ""))
        if not bio or len(bio) < 40:
            bio = f"{p['name']} is a verified Vedic priest on Divine Center, offering authentic rituals with devotion and scriptural accuracy."
        role = p.get("role", "Expert Vedic Priest for All Poojas")
        loc = LOCATIONS.get(live_slug, p.get("location", "Telangana"))
        if loc == "Telangana":
            loc = "Hyderabad, Telangana"
        exp = exp_years(bio) or exp_years(p.get("experience", ""))
        langs = LANGS.get(live_slug, ["Telugu", "English"])
        services = []
        for svc in p.get("services", []):
            live_puja = svc.get("slug", "")
            local = SERVICE_TO_PUJA.get(live_puja, live_puja)
            services.append({"name": svc.get("name", ""), "pujaSlug": local})

        seo = f"{p['name']} | Verified Pandit"
        lines.append(f'  "{live_slug}": {{')
        lines.append(f"    seoTitle: {js_str(seo)},")
        lines.append(f"    role: {js_str(role)},")
        lines.append(f"    location: {js_str(loc)},")
        lines.append(f"    experienceLabel: {js_str(exp or 'Experienced')},")
        lines.append(f"    languages: {json.dumps(langs, ensure_ascii=False)},")
        lines.append(f"    photo: {js_str(p.get('photo', ''))},")
        lines.append(f"    bio: {js_str(bio)},")
        lines.append(f"    onlineAvailable: {str(p.get('onlineAvailable', True)).lower()},")
        lines.append(f"    offlineAvailable: {str(p.get('offlineAvailable', True)).lower()},")
        lines.append(f"    services: {json.dumps(services, indent=6, ensure_ascii=False).replace(chr(10), chr(10)+'    ')},")
        lines.append("  },")

    lines.append("};")
    lines.append("")

    with open(OUT, "w", encoding="utf-8") as f:
        f.write("\n".join(lines))
    print("Wrote", OUT)

if __name__ == "__main__":
    main()
