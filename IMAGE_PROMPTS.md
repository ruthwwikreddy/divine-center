# Divine Center — Image Prompts

Generate missing assets and save them to the **exact paths** below. After adding files, hard-refresh `/pujas` (`Cmd+Shift+R`) — cards pick up photos automatically.

**Brand palette:** cream `#fdf8f2`, mahogany `#4a1c14`, burnt orange `#d36b2b`  
**Do not** add text, watermarks, or logos to generated images.

---

## Why `/pujas` images look missing

| What the page expects | On disk today | Live result |
|----------------------|---------------|-------------|
| `assets/images/pujas/{slug}.jpg` (18 photos) | **18 JPGs** in desktop + mobile | Full photo cards on `/pujas` |
| Icon fallback `assets/icons/*` | Used only if JPG missing | — |

**Priority:** generate all **18 puja JPGs** below. That fixes the listing grid, detail hero, and mobile cards in one step.

---

## How to use these prompts

1. Copy the full prompt block for each image (GLOBAL PROMPT is already included).
2. Paste **GLOBAL NEGATIVE** in the negative / “avoid” field.
3. Export at the listed size → save with the **exact filename** in `assets/images/pujas/`.
4. Redeploy (e.g. `vercel --prod` from project root).

### GLOBAL PROMPT (included in every prompt below)

```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website
```

### GLOBAL NEGATIVE

```
cartoon, illustration, 3D render, CGI, anime, plastic skin, oversaturated, neon colors, text overlay, watermark, logo, stock photo cliché, western church symbols, cluttered mess, low resolution, blurry, distorted hands, extra fingers, inappropriate deity depiction, violent imagery, dark horror mood
```

---

## Puja listing photos — 18 JPGs (PRIORITY)

**Folder:** `assets/images/pujas/`  
**Size:** **800 × 600 px** (4:3 landscape)  
**Format:** JPG, quality 85+, sRGB  
**Naming:** must match `slug` in `site-data.js` → `PUJAS[].slug`

| # | Service | Save as | Status |
|---|---------|---------|--------|
| 1 | Griha Pravesh Pooja | `griha-pravesh.jpg` | ✅ present |
| 2 | Satyanarayana Pooja | `satyanarayana.jpg` | ✅ present |
| 3 | Varalakshmi Vratam | `varalakshmi.jpg` | ✅ present |
| 4 | Rudrabhishekam Pooja | `rudrabhishekam.jpg` | ✅ present |
| 5 | Hanuman Puja | `hanuman.jpg` | ✅ present |
| 6 | Annaprashan Ceremony | `annaprashan.jpg` | ✅ present |
| 7 | Aksharabhyasam | `aksharabhyasam.jpg` | ✅ present |
| 8 | Consultation Service | `consultation.jpg` | ✅ present |
| 9 | Kedareshwara Vratam | `kedareshwara-vratam.jpg` | ✅ present |
| 10 | Kala Sarpa Dosha Puja | `kala-sarpa-dosha.jpg` | ✅ present |
| 11 | Vastu Shanti Pooja | `vastu-shanti.jpg` | ✅ present |
| 12 | Mangala Dosha Puja | `mangala-dosha.jpg` | ✅ present |
| 13 | Kalyanam (Vivah) | `kalyanam.jpg` | ✅ present |
| 14 | Shani Shanti Puja | `shani-shanti.jpg` | ✅ present |
| 15 | Mahalakshmi Homam | `mahalakshmi-homam.jpg` | ✅ present |
| 16 | Rahu Ketu Shanti Puja | `rahu-ketu-shanti.jpg` | ✅ present |
| 17 | Navagraha Shanti Pooja | `navagraha-shanti.jpg` | ✅ present |
| 18 | Ati Rudra Homam | `ati-rudra-homam.jpg` | ✅ present |

### Scene prompts (ready to copy — GLOBAL PROMPT included)

**1. `griha-pravesh.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Indian home entrance decorated for Griha Pravesh: marigold torans, brass kalash with coconut and mango leaves at doorway, brass oil lamps, auspicious housewarming atmosphere, no people visible, architectural warmth
```

**2. `satyanarayana.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Satyanarayan puja altar setup: banana leaf with prasad, brass lamps, tulsi, framed Satyanarayan motif softly blurred, warm indoor family temple corner, orderly and reverent
```

**3. `varalakshmi.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Varalakshmi Vratam festival styling: lotus flowers, gold lamps, kalash with turmeric and coins, silk cloth accents, feminine auspicious elegance, soft bokeh
```

**4. `rudrabhishekam.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Shiva Rudrabhishekam elements: Shiva lingam with milk abhishekam stream, bilva leaves, brass vessels, sacred smoke wisps, temple stone ambiance, powerful but peaceful
```

**5. `hanuman.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Hanuman devotion setup: Hanuman murti with marigold garland and sindoor, brass diyas, Hanuman Chalisa book softly blurred, warm saffron-marigold palette
```

**6. `annaprashan.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Annaprashan ceremony still life: small silver bowl with rice, ceremonial spoon, banana and turmeric, soft fabric backdrop, gentle family ritual mood, no baby face required
```

**7. `aksharabhyasam.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Aksharabhyasam education ritual: child’s slate with rice letters, chalk, open palm-leaf book, turmeric and grains in brass plate, Saraswati yellow-white accents, auspicious beginning
```

**8. `consultation.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Spiritual consultation scene: senior Acharya in white angavastram speaking calmly across a simple wooden table with scriptures and mala, laptop subtly present for online consult, trust and warmth, respectful portrait composition
```

**9. `kedareshwara-vratam.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Kedareshwara Vratam Shiva observance: bilva leaves on lingam, fasting kalash, vratam katha book, Monday vrata atmosphere, temple lamp glow
```

**10. `kala-sarpa-dosha.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Kala Sarpa dosha remedial puja: Rahu-Ketu symbolic serpent motif in brass (abstract, tasteful), nine-grain offering plates, havan kund with gentle flame, remedial solemn mood
```

**11. `vastu-shanti.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Vastu Shanti house harmony ritual: home floor plan scroll with compass, brass kalash at center of room, marigold at corners, architectural balance, peaceful interior
```

**12. `mangala-dosha.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Mangala dosha shanti elements: red and gold cloth, mangal kalash, Hanuman or Subramanya motif softly blurred, marriage blessing mood, elegant not garish
```

**13. `kalyanam.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Vedic wedding ritual still life: sacred agni havan kund with flames, wedding garlands, brass pots, ceremonial silk, Vivah Sanskar grandeur without identifiable couple faces
```

**14. `shani-shanti.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Shani Shanti puja: dark blue-black cloth with sesame oil lamp, iron Shani symbol tasteful, Saturday observance mood, oil abhishekam vessel, disciplined serenity
```

**15. `mahalakshmi-homam.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Mahalakshmi homam: copper homa kund with fire, lotus and coin offerings, Lakshmi yantra softly blurred, prosperity and abundance, golden light
```

**16. `rahu-ketu-shanti.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Rahu Ketu graha shanti: dual-tone shadow and light brass lamps, navagraha plate, charcoal and white flower offerings, cosmic balance symbolism, temple setting
```

**17. `navagraha-shanti.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Navagraha Shanti: nine small brass kalash in semicircle, nine colored cloths, graha mantra book, harmonious planetary worship table, symmetrical composition
```

**18. `ati-rudra-homam.jpg`**
```
Professional editorial photography for a premium Indian spiritual wellness brand, warm natural golden-hour lighting, soft cream and amber color grade (#fdf8f2 #d36b2b mood), authentic Hindu ritual context, immaculate composition, shallow depth of field where appropriate, high resolution, photorealistic, serene and dignified, no text, no watermark, no logo, no UI overlays, suitable for luxury puja booking website. Grand Ati Rudra homam: large homa fire with priests’ implements blurred in background, Rudram flowers and bilva mound, scale and spiritual majesty, premium editorial wide shot
```

---

## Optional: upgrade icon fallbacks (10 services)

Until JPGs exist, missing photos fall back to icons. **8 services** have PNG woodcuts; **10 services** only have text-placeholder SVGs (look empty on cards).

To improve fallbacks, generate **800 × 800 px PNG woodcut-style icons** (no text) and save as:

| Slug | Fallback file (already wired in `site-data.js`) |
|------|---------------------------------------------------|
| `kedareshwara-vratam` | `assets/icons/kedareshwara-vratam.png` *(new)* |
| `kala-sarpa-dosha` | `assets/icons/kala-sarpa-dosha.png` |
| `vastu-shanti` | `assets/icons/vastu-shanti.png` |
| `mangala-dosha` | `assets/icons/mangala-dosha.png` |
| `kalyanam` | `assets/icons/kalyanam.png` |
| `shani-shanti` | `assets/icons/shani-shanti.png` |
| `mahalakshmi-homam` | `assets/icons/mahalakshmi-homam.png` |
| `rahu-ketu-shanti` | `assets/icons/rahu-ketu-shanti.png` |
| `navagraha-shanti` | `assets/icons/navagraha-shanti.png` |
| `ati-rudra-homam` | `assets/icons/ati-rudra-homam.png` |

**Icon style prompt (use per service, swap subject):**
```
Single centered Hindu ritual symbol for [SERVICE NAME], vintage Indian woodcut engraving style, burnt orange #d36b2b lines on cream #fdf8f2 background, circular composition, elegant minimal, no text, no border, square 1:1
```

Then update each puja’s `img` field in `site-data.js` to the new `.png` path (or keep slug-based SVG until PNG is added).

---

## Other assets (reference)

| Asset | Path | Status |
|-------|------|--------|
| Homepage hero | `assets/images/hero-priest.jpg` | ✅ |
| Pandit CTA | `assets/images/matching-pandit-cta.png` | ✅ |
| Contact illustration | `assets/images/contact-illustration.png` | ✅ |
| Pandit portraits (7) | `assets/images/pandits/pandit-*.png` | ✅ |
| Blog: Hanuman Jayanti | `assets/images/blog/hanuman-jayanti.png` | ✅ |
| Blog: Griha Pravesh 2026 | `assets/images/blog/griha-pravesh-2026.png` | ✅ |
| Blog: Verified Acharyas | `assets/images/blog/verified-acharyas.png` | ✅ |
| Blog: Varalakshmi guide | `assets/images/blog/varalakshmi-guide.png` | ✅ |
| Blog: Sawan Somvar | `assets/images/blog/sawan-somvar.png` | ✅ |
| Blog: Navagraha guide | `assets/images/blog/navagraha-shanti-guide.png` | ✅ |
| Blog: Daily prayers | `assets/images/blog/daily-prayers-power.png` | ✅ |

---

## Folder checklist

```
assets/images/pujas/          ← ADD 18 JPGs (this fixes /pujas)
├── griha-pravesh.jpg
├── satyanarayana.jpg
├── varalakshmi.jpg
├── rudrabhishekam.jpg
├── hanuman.jpg
├── annaprashan.jpg
├── aksharabhyasam.jpg
├── consultation.jpg
├── kedareshwara-vratam.jpg
├── kala-sarpa-dosha.jpg
├── vastu-shanti.jpg
├── mangala-dosha.jpg
├── kalyanam.jpg
├── shani-shanti.jpg
├── mahalakshmi-homam.jpg
├── rahu-ketu-shanti.jpg
├── navagraha-shanti.jpg
└── ati-rudra-homam.jpg
```

---

## After you add images

1. Place JPGs in `assets/images/pujas/` (and copy to `mobile/assets/images/pujas/` if deploying mobile separately).
2. Redeploy desktop: `vercel --prod` from project root.
3. Open [divine-center.ruthwikreddy.live/pujas](https://divine-center.ruthwikreddy.live/pujas) — full photo cards should appear.
4. Click any service — detail hero uses the same JPG.

No further code changes needed when filenames match the table above.
