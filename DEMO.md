# Divine Center — static demo site

Interactive HTML preview of the Divine Center product (customer portal, pandit portal, marketing, auth). **No backend** — forms show a demo toast; data is sample only.

## Quick links

| Area | Start here |
|------|------------|
| Public home | [index.html](index.html) |
| Book a puja (wizard) | [pandits/booking.html](pandits/booking.html) |
| Booking confirmed | [booking-success.html](booking-success.html) |
| Missing page | [404.html](404.html) |
| Customer portal | [customer/dashboard.html](customer/dashboard.html) |
| Pandit portal | [user/dashboard.html](user/dashboard.html) |
| Mobile app | [mobile/index.html](mobile/index.html) |
| Sign in (demo) | [login.html](login.html) |

## Regenerate HTML

```bash
python3 scripts/generate-portal-pages.py
python3 scripts/generate-auth-pages.py
```

## Config

- `site-config.js` — `demoMode: true`, nav, contact, auth URLs
- Orange **Demo preview** banner via `demo-mode.js`
- Booking wizard, auth sign-in, and mobile book flow bypass the demo form toast (they navigate or save session locally)
- `demo-session.js` — ties demo sign-in name + last booking across wizard → success → customer dashboard/detail

## Page inventory

See [PAGES.md](PAGES.md) for the full route list.
