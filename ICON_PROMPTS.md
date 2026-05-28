# Divine Center — Puja Service Icon Prompts

> **Photos & illustrations:** see **`IMAGE_PROMPTS.md`** for hero, pandits, puja cards, blog, etc.

Use these to generate **SVG icons** (recommended artboard **192×192**). Style must match across the set. **Save as:** `assets/icons/{slug}.svg` (see `site-data.js` puja `slug`).

## Global style (append to every prompt)

```
Minimalist woodcut / block-print icon, single color deep mahogany #4a1c14 on a SOLID soft cream background #fdf8f2 (NOT transparent), clean organic line weight, no gradients, no shadows, centered composition, spiritual Hindu ritual aesthetic, suitable for 88px circle UI button, vector SVG export
```

**Negative prompt:** `transparent background, checkerboard, 3D, photorealistic, multicolor, drop shadow, text, watermark, busy background, cartoon emoji, white background`

**Output:** SVG (mahogany + cream as above), filename = puja slug (e.g. `griha-pravesh.svg`).

---

## 1. Griha Pravesh
**File:** `assets/icons/griha-pravesh.svg`

```
Simple traditional Indian house silhouette with small chimney, doorway visible, tiny oil lamp (diya) flame glowing inside the house, two decorative dots near the entrance, woodcut line art, mahogany #4a1c14 only
```

---

## 2. Satyanarayana Pooja

```
Traditional South Indian tiered brass oil lamp (samai / standing diya) with three stepped tiers and a small flame on top, symmetrical front view, woodcut block-print style, solid mahogany #4a1c14
```

---

## 3. Varalakshmi Vratam

```
Symmetrical blooming lotus flower with layered petals, top view, elegant spiritual symbol, woodcut engraving style, single color mahogany #4a1c14
```

---

## 4. Rudrabhishekam Pooja

```
Shiva Lingam on traditional yoni base (oval pedestal), three horizontal sacred lines (tripundra) on the lingam, front-facing icon, respectful religious symbol, woodcut style, mahogany #4a1c14 only
```

---

## 5. Hanuman Puja

```
Stylized front-facing Lord Hanuman face with crown, simplified noble features, devotional but not cartoonish, woodcut block-print, single color mahogany #4a1c14, icon for Hindu puja booking app
```

---

## 6. Annaprashan Ceremony

```
Small traditional feeding bowl (katori) with spoon resting inside at an angle, baby first rice ceremony symbol, simple woodcut lines, mahogany #4a1c14
```

---

## 7. Aksharabhyasam

```
Open book seen from slight angle with traditional stylus or quill pen resting diagonally across the pages, education initiation ceremony symbol, woodcut style, mahogany #4a1c14
```

---

## 8. Consultation Service

```
Two overlapping speech bubbles, rear bubble larger, front bubble smaller with three dots (ellipsis) inside, modern consultation icon, woodcut line weight, mahogany #4a1c14
```

---

## Current assets (wired in `index.html`)

| Service | PNG |
|---------|-----|
| Griha Pravesh | `griha.png` |
| Satyanarayana | `satya.png` |
| Varalakshmi | `Varalakshmi.png` |
| Rudrabhishekam | `Rudrabhishekam.png` |
| Hanuman | `hanuman.png` |
| Annaprashan | `Annaprashan.png` |
| Aksharabhyasam | `Aksharabhyasam.png` |
| Consultation | `Consultation.png` |

PNG files should use a **solid `#fdf8f2` background** (not transparent). For faster loads, compress to ~96–192px display size (current files are large).
