# Divine Center — static page inventory

**Demo-only site** — `site-config.js` sets `demoMode: true`. All forms and action buttons show a demo toast; nothing is saved to a backend. Orange **Demo preview** banner on every page.

Demo static HTML mirrors the Next.js route map. **All pages** use the index/contact cream theme: `styles.css` + `layout.js` (nav/footer). **Customer** and **Pandit** portals add `portal.css` + `portal-shell.js` (sidebar + account UI).

## Public (main layout)

| ID | Route | File | Status |
|----|-------|------|--------|
| P-001 | `/` | `index.html` | Existing |
| P-002 | `/about-us` | `about-us.html` → `about.html` | Redirect |
| P-003 | `/blogs` | `blogs.html` | Existing |
| P-004 | `/blogs/[slug]` | `blog.html` | Existing (query `?slug=`) |
| P-005 | `/booking-success` | `booking-success.html` | **New** |
| P-006 | `/contact-us` | `contact.html` | Existing |
| P-007 | `/for-customers` | `for-customers.html` | **New** |
| P-008 | `/for-pandits` | `for-pandits.html` | **New** |
| P-009 | `/pandits` | `pandits.html` | Existing |
| P-010 | `/pandits/[slug]` | `pandit.html` | Existing |
| P-011 | `/pandits/booking` | `pandits/booking.html` | **Booking wizard** → `booking-success` |
| P-012 | `/privacy-policy` | `privacy-policy.html` | **New** |
| P-013 | `/pujas` | `pujas.html` | Existing |
| P-014 | `/pujas/[slug]` | `puja.html` | Existing |
| P-015 | `/terms-conditions` | `terms-conditions.html` | **New** |
| — | `/404` (static host) | `404.html` | **New** — helpful demo links |

## Auth (full auth layout — hero + forms)

Regenerate stubs: `python3 scripts/generate-auth-pages.py`

| ID | Route | File |
|----|-------|------|
| P-016 | `/admin/login` | `admin/login.html` |
| P-017–P-019 | `/customer/reset` etc. | `auth/customer/*.html` |
| P-020 | `/google/callback` | `auth/google/callback.html` |
| P-021–P-022 | `/login`, `/register` | `login.html`, `register.html` |
| P-023–P-027 | `/user/login` etc. | `auth/user/*.html` |

## Customer portal (`/customer/*`)

| ID | Route | File |
|----|-------|------|
| P-045 | `/customer/dashboard` | `customer/dashboard.html` |
| P-050 | `/customer/profile` | `customer/profile.html` |
| P-042 | `/customer/bookings` | `customer/bookings.html` |
| P-043 | `/customer/bookings/[id]` | `customer/booking-detail.html` |
| P-051 | `/customer/reviews` | `customer/reviews.html` |
| P-046 | `/customer/favorites` | `customer/favorites.html` |
| P-047 | `/customer/favorites/pandits` | `customer/favorites/pandits.html` |
| P-048 | `/customer/favorites/services` | `customer/favorites/services.html` |
| P-049 | `/customer/payments` | `customer/payments.html` |
| P-052 | `/customer/settings` | `customer/settings.html` |
| P-044 | `/customer/change-password` | `customer/change-password.html` |
| P-053 | `/customer/support` | `customer/support.html` |

Legacy URLs `dashboard.html`, `dashboard-bookings.html` redirect into `customer/`.

Regenerate portal HTML: `python3 scripts/generate-portal-pages.py` · Overview: [DEMO.md](DEMO.md)

## Mobile (`/mobile/*`)

Same demo rules: `mobile/site-config.js` → `demoMode: true`, `mobile-demo.js` + banner on all pages via `mobile-shell.js`. Drawer links to desktop `customer/dashboard` and `user/dashboard` when served under `/mobile/`.

| Route | File |
|-------|------|
| `/mobile/booking-detail` | `mobile/booking-detail.html` (query `?id=`) |

## Pandit portal (`/user/*`)

| ID | Route | File |
|----|-------|------|
| P-033 | `/user/dashboard` | `user/dashboard.html` |
| P-029–P-030 | `/user/bookings` | `user/bookings.html`, `user/bookings/DC-042.html` |
| P-036 | `/user/my-services` | `user/my-services.html` |
| P-028 | `/user/availability-time` | `user/availability-time.html` |
| P-038 | `/user/reviews` | `user/reviews.html` |
| P-040 | `/user/wallet` | `user/wallet.html` |
| P-041 | `/user/withdrawals` | `user/withdrawals.html` |
| P-037 | `/user/payout-details` | `user/payout-details.html` |
| P-034 | `/user/edit-profile` | `user/edit-profile.html` |
| P-032 | `/user/contact-support` | `user/contact-support.html` |
| P-039 | `/user/settings` | `user/settings.html` |
| P-031 | `/user/change-password` | `user/change-password.html` |
| P-035 | `/user/identity` | `user/identity.html` |
