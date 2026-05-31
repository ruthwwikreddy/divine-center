#!/usr/bin/env python3
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TOOLBAR = """
<div class="portal-toolbar">
  <form class="portal-search" id="dash-search-form" role="search">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg>
    <input type="search" placeholder="Search pandit or puja services" autocomplete="off"/>
  </form>
  <div class="portal-profile">
    <img src="{base}assets/images/placeholders/pandit-avatar.svg" alt="" width="36" height="36"/>
    <span id="dash-profile-name">Ruthwik</span>
  </div>
</div>"""

def head(title, base):
    return f"""<!DOCTYPE html>
<html data-demo-site="true" lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="noindex"/>
  <meta name="theme-color" content="#fdf8f2"/>
  <title>{title} — Divine Center</title>
  <script src="{base}site-config.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="{base}styles.css"/>
  <link rel="stylesheet" href="{base}portal.css"/>
  <link rel="stylesheet" href="{base}demo-mode.css"/>
</head>"""

def portal_page(layout, active, base, kicker, title, lead, inner, scripts, body_class=""):
    tb = ""
    script_tags = "\n".join(f'  <script src="{base}{s}"></script>' for s in scripts)
    return f"""{head(title, base)}
<body class="page-portal page-portal--{layout} {body_class}" data-portal-layout="{layout}" data-portal-active="{active}" data-dash-layout="{layout}" data-dash-active="{active}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="site-nav"></div>
  <main id="main">
    <div class="portal__shell">
      <aside id="portal-sidebar"></aside>
      <div class="portal-main">
        {inner}
      </div>
    </div>
  </main>
{script_tags}
  <script src="{base}demo-session.js"></script>
  <script src="{base}portal-shell.js"></script>
  <script src="{base}portal-polish.js"></script>
  <script src="{base}layout.js"></script>
  <script src="{base}demo-mode.js"></script>
</body>
</html>
"""

MARKETING_TRUST = """
<ul class="marketing-trust" aria-label="Why Divine Center">
  <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg> Verified Acharyas vetted for ritual expertise</li>
  <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l3 2"/></svg> On-time service with transparent scheduling</li>
  <li><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg> Clear pricing — no hidden charges</li>
</ul>"""

MARKETING_CTA = """
<div class="marketing-cta-band">
  <h2>Ready to begin?</h2>
  <p>Explore rituals, compare pandits, and book in minutes.</p>
  <div class="pandits-hero__actions" style="justify-content:center">{cta_inner}</div>
</div>"""

def marketing_page(title, page_id, kicker, lead, body_html, cta_html, base=""):
    return f"""{head(title, base)}
<body class="page-marketing page-{page_id}" data-page="{page_id}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="site-nav"></div>
  <main id="main">
    <section class="pandits-hero">
      <div class="pandits-hero__mandala" aria-hidden="true"></div>
      <div class="pandits-hero__glow" aria-hidden="true"></div>
      <div class="wrap pandits-hero__grid">
        <div class="pandits-hero__copy">
          <p class="pandits-hero__kicker">{kicker}</p>
          <h1 class="pandits-hero__title">{title}</h1>
          <p class="pandits-hero__lead">{lead}</p>
          <div class="pandits-hero__actions">{cta_html}</div>
        </div>
        <figure class="pandits-hero__media">
          <div class="pandits-hero__frame">
            <img class="pandits-hero__img" src="{base}assets/images/hero-priest.jpg" alt="" width="720" height="860" loading="eager"/>
          </div>
        </figure>
      </div>
    </section>
    <section class="wrap" style="padding-bottom:3rem">{body_html}</section>
  </main>
  <script src="{base}layout.js"></script>
  <script src="{base}demo-mode.js"></script>
</body>
</html>
"""

def marketing_page_body(title, page_id, body_html, base=""):
    return f"""{head(title, base)}
<body class="page-marketing page-{page_id}" data-page="{page_id}">
  <a class="skip-link" href="#main">Skip to content</a>
  <div id="site-nav"></div>
  <main id="main" class="success-page">
    <section class="wrap success-page__body">{body_html}</section>
  </main>
  <div id="site-footer"></div>
  <script src="{base}layout.js"></script>
  <script src="{base}demo-mode.js"></script>
</body>
</html>
"""

def write_pages(folder, pages):
    for path, cfg in pages.items():
        depth = cfg.get("depth", 1)
        base = "../" * depth
        html = portal_page(
            cfg["layout"],
            cfg["active"],
            base,
            cfg.get("kicker", ""),
            cfg.get("title", "Account"),
            cfg.get("lead", ""),
            cfg["inner"],
            cfg.get("scripts", []),
            cfg.get("body_class", ""),
        )
        fp = os.path.join(ROOT, folder, path)
        os.makedirs(os.path.dirname(fp), exist_ok=True)
        open(fp, "w").write(html)
        print("wrote", fp)

STAT_CAL = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>'

def stat_card(value, label, tone):
    return (
        f'<article class="dash-stat-card"><span class="dash-stat-card__icon dash-stat-card__icon--{tone}">'
        f"{STAT_CAL}</span><div class=\"dash-stat-card__body\"><p class=\"dash-stat-card__value\">{value}</p>"
        f'<span class="dash-stat-card__label">{label}</span></div></article>'
    )

CUSTOMER_PROFILE = """
<section class="portal-profile-page portal-profile-page--customer" aria-labelledby="profile-page-title">
  <header class="portal-profile-page__banner">
    <div class="portal-profile-page__avatar-wrap">
      <img id="profile-avatar" class="portal-profile-page__avatar" src="../assets/images/placeholders/pandit-avatar.svg" alt="" width="88" height="88"/>
      <button type="button" class="portal-profile-page__photo-btn" data-demo-action aria-label="Change profile photo">Change</button>
    </div>
    <div class="portal-profile-page__identity">
      <h1 class="portal-profile-page__title" id="profile-page-title">Edit profile</h1>
      <p class="portal-profile-page__name" id="profile-display-name">Rahul Sharma</p>
      <p class="portal-profile-page__meta" id="profile-display-meta">Member since Jan 2025 · Hyderabad</p>
    </div>
  </header>
  <form id="profile-form" class="portal-profile-form dash-card" data-demo-allow="true" novalidate>
    <p class="portal-profile-form__lede">Contact details used for booking confirmations and pandit coordination.</p>
    <div class="portal-profile-form__fields">
      <div class="dash-field-row">
        <div class="dash-field"><label for="profile-name">Full name</label><input id="profile-name" name="fullName" value="Rahul Sharma" required autocomplete="name"/></div>
        <div class="dash-field"><label for="profile-city">City</label><input id="profile-city" name="city" value="Hyderabad" autocomplete="address-level2"/></div>
      </div>
      <div class="dash-field-row">
        <div class="dash-field"><label for="profile-email">Email</label><input id="profile-email" name="email" type="email" value="rahul@example.com" required autocomplete="email"/></div>
        <div class="dash-field"><label for="profile-phone">Mobile</label><input id="profile-phone" name="phone" type="tel" value="+91 98765 43210" required autocomplete="tel"/></div>
      </div>
      <div class="dash-field">
        <label for="profile-address">Default address</label>
        <textarea id="profile-address" name="address" rows="3" autocomplete="street-address">12, Temple Road, Banjara Hills, Hyderabad 500034</textarea>
        <p class="dash-field__hint">Shared with your assigned pandit before the ritual.</p>
      </div>
    </div>
    <p id="profile-save-note" class="portal-profile-form__success" role="status" hidden></p>
    <div class="portal-profile-form__foot">
      <button type="submit" class="dash-btn dash-btn--accent portal-profile-form__submit">Save changes</button>
    </div>
  </form>
  <nav class="portal-profile-page__links" aria-label="More account settings">
    <a class="portal-profile-page__link" href="change-password"><span class="portal-profile-page__link-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg></span>Change password</a>
    <a class="portal-profile-page__link" href="settings"><span class="portal-profile-page__link-icon" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 100-6 3 3 0 000 6z"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg></span>Notification settings</a>
  </nav>
</section>"""

def customer_support_inner():
    path = os.path.join(ROOT, "customer", "support.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="portal-support">')
    end = html.index("</section>\n        </div>\n      </div>", start) + len("</section>\n        </div>")
    return html[start:end]

CUSTOMER_SUPPORT = customer_support_inner()

def customer_booking_detail_inner():
    path = os.path.join(ROOT, "customer", "booking-detail.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<a href="bookings" class="dash-back-link portal-back-link">')
    end = html.index("</div>\n      </div>\n    </div>\n  </main>", start) + len("</div>")
    return html[start:end]

CUSTOMER_BOOKING_DETAIL = customer_booking_detail_inner()

def pandit_support_inner():
    path = os.path.join(ROOT, "user", "contact-support.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="portal-support portal-support--pandit">')
    end = html.index("</section>\n        </div>\n      </div>", start) + len("</section>\n        </div>")
    return html[start:end]

PANDIT_SUPPORT = pandit_support_inner()

def customer_settings_inner():
    path = os.path.join(ROOT, "customer", "settings.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="portal-settings">')
    end = html.index("</div>\n      </div>\n    </div>\n  </main>", start) + len("</div>")
    return html[start:end]

CUSTOMER_SETTINGS = customer_settings_inner()

def pandit_bookings_inner():
    path = os.path.join(ROOT, "user", "bookings.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="dash-stats portal-stats--compact">')
    end = html.index("</section>\n      </div>", start) + len("</section>")
    return html[start:end]

PANDIT_BOOKINGS = pandit_bookings_inner()

def pandit_booking_detail_inner():
    path = os.path.join(ROOT, "user", "bookings", "DC-042.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<a href="../bookings" class="dash-back-link portal-back-link">')
    end = html.index("</article>\n      </div>", start) + len("</article>")
    return html[start:end]

PANDIT_BOOKING_DETAIL = pandit_booking_detail_inner()

def pandit_my_services_inner():
    path = os.path.join(ROOT, "user", "my-services.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="dash-card portal-pandit-services-hub"')
    end = html.index('        </div>\n\n      </div>', start) + len('        </div>\n')
    return html[start:end]

PANDIT_SERVICES = pandit_my_services_inner()

def pandit_availability_inner():
    path = os.path.join(ROOT, "user", "availability-time.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="dash-card portal-availability"')
    end = html.index("</section>\n      </div>", start) + len("</section>")
    return html[start:end]

PANDIT_AVAILABILITY = pandit_availability_inner()

def pandit_wallet_inner():
    path = os.path.join(ROOT, "user", "wallet.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="portal-pandit-wallet"')
    end = html.index("</div>\n      </div>\n    </div>\n  </main>", start) + len("</div>")
    return html[start:end]

PANDIT_WALLET = pandit_wallet_inner()

def pandit_withdrawals_inner():
    path = os.path.join(ROOT, "user", "withdrawals.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="portal-pandit-withdrawals"')
    end = html.index("</div>\n      </div>\n    </div>\n  </main>", start) + len("</div>")
    return html[start:end]

PANDIT_WITHDRAWALS = pandit_withdrawals_inner()

def pandit_payout_details_inner():
    path = os.path.join(ROOT, "user", "payout-details.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="dash-card portal-payout-hub"')
    end = html.index("</section>\n      </div>", start) + len("</section>")
    return html[start:end]

PANDIT_PAYOUT_DETAILS = pandit_payout_details_inner()

def pandit_edit_profile_inner():
    path = os.path.join(ROOT, "user", "edit-profile.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="portal-profile-page portal-pandit-profile"')
    end = html.index("</div>\n      </div>\n    </div>\n  </main>", start) + len("</div>")
    return html[start:end]

PANDIT_PROFILE = pandit_edit_profile_inner()

def pandit_settings_inner():
    path = os.path.join(ROOT, "user", "settings.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="portal-settings portal-settings--pandit"')
    end = html.index("</div>\n      </div>\n    </div>\n  </main>", start) + len("</div>")
    return html[start:end]

PANDIT_SETTINGS = pandit_settings_inner()

def customer_change_password_inner():
    path = os.path.join(ROOT, "customer", "change-password.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<a href="settings" class="dash-back-link portal-back-link">')
    end = html.index("</section>\n      </div>", start) + len("</section>")
    return html[start:end]

CUSTOMER_CHANGE_PASSWORD = customer_change_password_inner()

CUSTOMER_FAVORITES_HUB = """<section class="portal-fav-hub portal-fav-hub--simple" aria-labelledby="fav-hub-title">
          <header class="portal-fav-hub__intro">
            <h1 class="portal-fav-hub__title" id="fav-hub-title">Favorites</h1>
            <p class="portal-fav-hub__lede">Rebook saved pandits and pujas</p>
          </header>

          <div class="portal-fav-hub__sections">
            <section class="portal-fav-section" aria-labelledby="fav-pandits-heading">
              <h2 class="portal-fav-section__title" id="fav-pandits-heading">Saved pandits</h2>
              <ul class="portal-fav-items" id="fav-pandits-list" role="list"></ul>
              <p class="portal-fav-section__empty is-hidden" id="fav-pandits-empty" role="status">No saved pandits yet.</p>
            </section>

            <section class="portal-fav-section" aria-labelledby="fav-pujas-heading">
              <h2 class="portal-fav-section__title" id="fav-pujas-heading">Saved pujas</h2>
              <ul class="portal-fav-items" id="fav-pujas-list" role="list"></ul>
              <p class="portal-fav-section__empty is-hidden" id="fav-pujas-empty" role="status">No saved pujas yet.</p>
            </section>
          </div>
        </section>"""

def customer_favorites_pandits_inner():
    path = os.path.join(ROOT, "customer", "favorites", "pandits.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<a href="../favorites" class="dash-back-link portal-back-link">')
    end = html.index("</section>", start) + len("</section>")
    return html[start:end]

FAVORITES_PANDITS_INNER = customer_favorites_pandits_inner()

FAVORITES_SERVICES_INNER = '<a href="../favorites" class="dash-back-link">← All favorites</a><p class="portal-fav-lead">Pujas you have saved for faster rebooking.</p><div class="dash-scroll" id="dash-fav-track"></div>'

def pandit_identity_inner():
    path = os.path.join(ROOT, "user", "identity.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<a href="settings" class="dash-back-link portal-back-link">')
    end = html.index("</section>", start) + len("</section>")
    return html[start:end]

PANDIT_IDENTITY = pandit_identity_inner()

def customer_dashboard_bookings_section():
    path = os.path.join(ROOT, "customer", "dashboard.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="portal-hub-page portal-hub-page--bookings portal-hub-page--embedded"')
    end = html.index("</section>", start) + len("</section>")
    return html[start:end]

CUSTOMER_DASH_BOOKINGS = customer_dashboard_bookings_section()

def customer_dashboard_activity_section():
    path = os.path.join(ROOT, "customer", "dashboard.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="dash-card portal-activity-hub"')
    end = html.index("</section>", start) + len("</section>")
    return html[start:end]

def customer_dashboard_browse_sections():
    path = os.path.join(ROOT, "customer", "dashboard.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="portal-dash-section portal-dash-section--services"')
    end = html.index("</section>", html.index("</section>", start) + 1) + len("</section>")
    return html[start:end]

CUSTOMER_DASH_ACTIVITY = customer_dashboard_activity_section()
CUSTOMER_DASH_BROWSE = customer_dashboard_browse_sections()

def customer_bookings_inner():
    path = os.path.join(ROOT, "customer", "bookings.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="portal-hub-page portal-hub-page--bookings"')
    end = html.index("</section>", start) + len("</section>")
    return html[start:end]

CUSTOMER_BOOKINGS_INNER = customer_bookings_inner()

def customer_payments_inner():
    path = os.path.join(ROOT, "customer", "payments.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="portal-hub-page portal-hub-page--payments"')
    end = html.index("</section>", start) + len("</section>")
    return html[start:end]

CUSTOMER_PAYMENTS = customer_payments_inner()

def customer_reviews_inner():
    path = os.path.join(ROOT, "customer", "reviews.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="dash-card portal-reviews-hub"')
    end = html.index("</html>")
    chunk = html[start:end]
    end = chunk.rindex("</section>") + len("</section>")
    return html[start : start + end]

CUSTOMER_REVIEWS_INNER = customer_reviews_inner()

def pandit_reviews_inner():
    path = os.path.join(ROOT, "user", "reviews.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<section class="dash-card portal-reviews-hub portal-reviews-hub--pandit"')
    end = html.index("</section>", start) + len("</section>")
    return html[start:end]

PANDIT_REVIEWS = pandit_reviews_inner()

CUSTOMER = {
    "dashboard.html": {
        "layout": "customer", "active": "dashboard",
        "kicker": "Your account", "title": "Dashboard", "lead": "Bookings, favourites, and rituals in one place.",
        "body_class": "portal-page--dashboard",
        "scripts": ["site-data.js", "booking-actions.js", "customer/portal-customer-bookings.js", "customer/dashboard.js"],
        "inner": CUSTOMER_DASH_ACTIVITY + CUSTOMER_DASH_BOOKINGS + CUSTOMER_DASH_BROWSE,
    },
    "bookings.html": {
        "layout": "customer", "active": "bookings",
        "kicker": "Bookings", "title": "My Bookings", "lead": "Track status and payments.",
        "body_class": "portal-page--bookings",
        "scripts": ["booking-actions.js", "customer/portal-customer-bookings.js", "customer/bookings.js"],
        "inner": CUSTOMER_BOOKINGS_INNER,
    },
    "booking-detail.html": {
        "layout": "customer", "active": "bookings", "body_class": "dash-app--detail",
        "kicker": "Booking", "title": "Booking Status", "lead": "",
        "scripts": ["booking-actions.js", "customer/booking-detail.js"],
        "inner": CUSTOMER_BOOKING_DETAIL},
    "profile.html": {"layout": "customer", "active": "profile", "kicker": "Profile", "title": "Edit Profile", "lead": "Your details and preferences.",
        "body_class": "portal-page--profile",
        "scripts": ["customer/profile.js"],
        "inner": CUSTOMER_PROFILE},
    "change-password.html": {"layout": "customer", "active": "settings", "kicker": "Security", "title": "Change Password", "lead": "Keep your account secure.",
        "scripts": ["customer/change-password.js"],
        "inner": CUSTOMER_CHANGE_PASSWORD},
    "favorites.html": {"layout": "customer", "active": "favorites", "kicker": "Saved", "title": "Favorites", "lead": "Pandits and pujas you love.",
        "scripts": ["site-data.js", "customer/favorites.js"],
        "inner": CUSTOMER_FAVORITES_HUB},
    "payments.html": {"layout": "customer", "active": "payments", "kicker": "Billing", "title": "Payments", "lead": "Invoices and transaction history.",
        "body_class": "portal-page--payments",
        "scripts": ["customer/payments.js"],
        "inner": CUSTOMER_PAYMENTS},
    "reviews.html": {"layout": "customer", "active": "reviews", "kicker": "Feedback", "title": "My Reviews", "lead": "Share feedback after your rituals.",
        "scripts": ["customer/reviews.js"],
        "inner": CUSTOMER_REVIEWS_INNER},
    "settings.html": {"layout": "customer", "active": "settings", "kicker": "Preferences", "title": "Settings", "lead": "Notifications and account preferences.",
        "scripts": ["customer/settings.js"],
        "inner": CUSTOMER_SETTINGS},
    "support.html": {"layout": "customer", "active": "support", "kicker": "Help", "title": "Support", "lead": "We're here for your bookings.",
        "scripts": ["customer/support.js"],
        "inner": CUSTOMER_SUPPORT},
    "favorites/pandits.html": {"layout": "customer", "active": "favorites", "depth": 2, "kicker": "Favorites", "title": "Favorite Pandits", "lead": "Your saved Acharyas.",
        "scripts": ["site-data.js", "customer/favorites-list.js"], "inner": FAVORITES_PANDITS_INNER},
    "favorites/services.html": {"layout": "customer", "active": "favorites", "depth": 2, "kicker": "Favorites", "title": "Favorite Services", "lead": "Pujas saved for quick booking.",
        "scripts": ["site-data.js", "customer/favorites-list.js"], "inner": FAVORITES_SERVICES_INNER},
}

def pandit_dashboard_inner():
    path = os.path.join(ROOT, "user", "dashboard.html")
    with open(path, encoding="utf-8") as f:
        html = f.read()
    start = html.index('<div class="portal-pandit-dash"')
    end = html.index("</div>\n      </div>\n    </div>\n  </main>", start) + len("</div>")
    return html[start:end]

PANDIT_DASH_INNER = pandit_dashboard_inner()

USER = {
    "dashboard.html": {"layout": "pandit", "active": "dashboard", "kicker": "Pandit", "title": "Dashboard", "lead": "Bookings and earnings overview.",
        "body_class": "portal-page--pandit-dashboard",
        "scripts": ["user/dashboard.js"],
        "inner": PANDIT_DASH_INNER},
    "bookings.html": {"layout": "pandit", "active": "bookings", "kicker": "Bookings", "title": "Bookings", "lead": "Accept and manage devotee requests.",
        "scripts": ["user/bookings.js"],
        "inner": PANDIT_BOOKINGS},
    "bookings/DC-042.html": {"layout": "pandit", "active": "bookings", "depth": 2, "kicker": "Booking", "title": "#DC-042", "lead": "",
        "scripts": ["user/booking-detail.js"],
        "inner": PANDIT_BOOKING_DETAIL},
    "my-services.html": {"layout": "pandit", "active": "my-services", "kicker": "Services", "title": "My Services", "lead": "Pricing and ritual offerings.",
        "scripts": ["user/my-services.js"],
        "inner": PANDIT_SERVICES},
    "availability-time.html": {"layout": "pandit", "active": "availability-time", "kicker": "Schedule", "title": "Availability", "lead": "Weekly hours devotees can book.",
        "scripts": ["user/availability.js"],
        "inner": PANDIT_AVAILABILITY},
    "reviews.html": {"layout": "pandit", "active": "reviews", "kicker": "Reviews", "title": "Reviews", "lead": "Feedback from devotees.",
        "body_class": "portal-page--reviews",
        "scripts": ["user/reviews.js"],
        "inner": PANDIT_REVIEWS},
    "wallet.html": {"layout": "pandit", "active": "wallet", "kicker": "Wallet", "title": "Wallet", "lead": "Earnings and payouts.",
        "scripts": ["user/wallet.js"],
        "inner": PANDIT_WALLET},
    "withdrawals.html": {"layout": "pandit", "active": "withdrawals", "kicker": "Payouts", "title": "Withdrawals", "lead": "Transfer to your bank.",
        "scripts": ["user/withdrawals.js"],
        "inner": PANDIT_WITHDRAWALS},
    "payout-details.html": {"layout": "pandit", "active": "payout-details", "kicker": "Bank", "title": "Payout Details", "lead": "Where we send your earnings.",
        "scripts": ["user/payout-details.js"],
        "inner": PANDIT_PAYOUT_DETAILS},
    "edit-profile.html": {"layout": "pandit", "active": "edit-profile", "kicker": "Profile", "title": "Edit Profile", "lead": "Public pandit profile.",
        "scripts": ["user/edit-profile.js"],
        "inner": PANDIT_PROFILE},
    "contact-support.html": {"layout": "pandit", "active": "contact-support", "kicker": "Support", "title": "Contact Support", "lead": "Pandit help desk.",
        "scripts": ["customer/support.js"],
        "inner": PANDIT_SUPPORT},
    "settings.html": {"layout": "pandit", "active": "settings", "kicker": "Settings", "title": "Settings", "lead": "Availability and notifications.",
        "scripts": ["user/settings.js"],
        "inner": PANDIT_SETTINGS},
    "change-password.html": {"layout": "pandit", "active": "settings", "kicker": "Security", "title": "Change Password", "lead": "Protect your pandit account.",
        "scripts": ["customer/change-password.js"],
        "inner": CUSTOMER_CHANGE_PASSWORD},
    "identity.html": {"layout": "pandit", "active": "settings", "kicker": "Verify", "title": "Identity", "lead": "Trust badge and verification.",
        "scripts": ["user/identity.js"],
        "inner": PANDIT_IDENTITY},
}

def marketing_steps(items):
    return '<div class="marketing-steps">' + "".join(
        f'<article class="marketing-step"><span class="marketing-step__num">{i}</span><h3>{t}</h3><p>{d}</p></article>'
        for i, t, d in items
    ) + "</div>"

BOOKING_WIZARD = """
<div class="portal-booking-wizard" id="booking-wizard-root">
  <div class="portal-booking-wizard__banner">
    <div class="portal-booking-wizard__banner-copy">
      <h2 class="portal-booking-wizard__banner-title">Reserve your ritual</h2>
      <p class="portal-booking-wizard__banner-lead">Fill in the details below — your summary updates live as you go.</p>
    </div>
    <span class="portal-booking-wizard__badge">Secure checkout</span>
  </div>
  <ol class="portal-booking-wizard__timeline" id="booking-wizard-timeline" aria-label="Booking progress">
    <li class="portal-booking-wizard__timeline-step is-active" data-wizard-step="1"><span class="portal-booking-wizard__timeline-num">1</span><span class="portal-booking-wizard__timeline-label">Ritual</span></li>
    <li class="portal-booking-wizard__timeline-step is-active" data-wizard-step="2"><span class="portal-booking-wizard__timeline-num">2</span><span class="portal-booking-wizard__timeline-label">Schedule</span></li>
    <li class="portal-booking-wizard__timeline-step is-active" data-wizard-step="3"><span class="portal-booking-wizard__timeline-num">3</span><span class="portal-booking-wizard__timeline-label">Details</span></li>
    <li class="portal-booking-wizard__timeline-step" data-wizard-step="4"><span class="portal-booking-wizard__timeline-num">4</span><span class="portal-booking-wizard__timeline-label">Confirm</span></li>
  </ol>
  <form id="booking-wizard-form" data-demo-allow="true" novalidate>
    <div class="portal-booking-wizard__grid">
      <div class="portal-booking-wizard__main">
        <section class="dash-card portal-booking-panel" data-booking-panel="1" aria-labelledby="booking-ritual-title">
          <header class="portal-booking-panel__head">
            <span class="portal-booking-panel__step" aria-hidden="true">1</span>
            <div class="portal-booking-panel__titles">
              <h2 class="dash-card__title" id="booking-ritual-title">Choose ritual</h2>
              <p class="dash-card__sub">Puja, pandit preference, and devotee details</p>
            </div>
            <span class="portal-booking-panel__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg></span>
          </header>
          <div class="portal-booking-panel__body">
            <div class="dash-field-row">
              <div class="dash-field"><label for="bw-puja">Puja / ritual</label><div class="portal-booking-field"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg><select id="bw-puja" name="puja" required></select></div></div>
              <div class="dash-field"><label for="bw-pandit">Pandit (optional)</label><div class="portal-booking-field"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg><select id="bw-pandit" name="pandit"></select></div><p class="dash-field__hint">Leave blank to auto-assign the best available Acharya</p></div>
            </div>
            <div class="dash-field-row">
              <div class="dash-field"><label for="bw-language">Preferred language</label><div class="portal-booking-field"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z"/></svg><select id="bw-language" name="language" required><option value="Telugu">Telugu</option><option value="Hindi">Hindi</option><option value="English" selected>English</option><option value="Sanskrit">Sanskrit</option></select></div></div>
              <div class="dash-field"><label for="bw-devotee">Devotee name</label><div class="portal-booking-field"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg><input id="bw-devotee" type="text" name="devoteeName" required placeholder="Full name for booking"/></div></div>
            </div>
          </div>
        </section>
        <section class="dash-card portal-booking-panel" data-booking-panel="2" aria-labelledby="booking-schedule-title">
          <header class="portal-booking-panel__head">
            <span class="portal-booking-panel__step" aria-hidden="true">2</span>
            <div class="portal-booking-panel__titles">
              <h2 class="dash-card__title" id="booking-schedule-title">Schedule</h2>
              <p class="dash-card__sub">Date, time window, and how the ritual is conducted</p>
            </div>
            <span class="portal-booking-panel__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>
          </header>
          <div class="portal-booking-panel__body">
            <div class="dash-field portal-booking-panel__date">
              <label for="bw-date">Preferred date</label>
              <div class="portal-booking-field portal-booking-field--date"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg><input id="bw-date" type="date" name="date" required/></div>
            </div>
            <div class="dash-field">
              <span class="dash-field__label" id="bw-slot-label">Time window</span>
              <div class="portal-booking-slot-grid" role="group" aria-labelledby="bw-slot-label">
                <button type="button" class="portal-booking-slot-card is-active" data-booking-slot="Morning" aria-pressed="true"><span class="portal-booking-slot-card__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg></span><span class="portal-booking-slot-card__label">Morning</span><span class="portal-booking-slot-card__hint">6 AM – 12 PM</span></button>
                <button type="button" class="portal-booking-slot-card" data-booking-slot="Afternoon" aria-pressed="false"><span class="portal-booking-slot-card__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v1M12 20v1M4.22 4.22l.7.7M18.36 18.36l.7.7M1 12h1M22 12h1M4.22 19.78l.7-.7M18.36 5.64l.7-.7"/><circle cx="12" cy="12" r="4"/></svg></span><span class="portal-booking-slot-card__label">Afternoon</span><span class="portal-booking-slot-card__hint">12 PM – 5 PM</span></button>
                <button type="button" class="portal-booking-slot-card" data-booking-slot="Evening" aria-pressed="false"><span class="portal-booking-slot-card__icon" aria-hidden="true"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg></span><span class="portal-booking-slot-card__label">Evening</span><span class="portal-booking-slot-card__hint">5 PM – 9 PM</span></button>
              </div>
              <input type="hidden" name="slot" value="Morning"/>
            </div>
            <div class="dash-field">
              <span class="dash-field__label" id="bw-mode-label">Ritual mode</span>
              <div class="portal-booking-mode-grid" role="group" aria-labelledby="bw-mode-label">
                <button type="button" class="portal-booking-mode-card is-active" data-booking-mode="Offline" aria-pressed="true"><span class="portal-booking-mode-card__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg></span><span class="portal-booking-mode-card__label">At home</span><span class="portal-booking-mode-card__hint">Pandit visits your doorstep</span></button>
                <button type="button" class="portal-booking-mode-card" data-booking-mode="Online" aria-pressed="false"><span class="portal-booking-mode-card__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg></span><span class="portal-booking-mode-card__label">Online</span><span class="portal-booking-mode-card__hint">Live video guidance</span></button>
                <button type="button" class="portal-booking-mode-card" data-booking-mode="Temple" aria-pressed="false"><span class="portal-booking-mode-card__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 4v2H5V7l7-4z"/><path d="M5 9h14v11H5z"/><path d="M9 20v-6h6v6"/></svg></span><span class="portal-booking-mode-card__label">At temple</span><span class="portal-booking-mode-card__hint">Meet at a sacred venue</span></button>
              </div>
              <input type="hidden" name="mode" value="Offline"/>
            </div>
          </div>
        </section>
        <section class="dash-card portal-booking-panel" data-booking-panel="3" aria-labelledby="booking-details-title">
          <header class="portal-booking-panel__head">
            <span class="portal-booking-panel__step" aria-hidden="true">3</span>
            <div class="portal-booking-panel__titles">
              <h2 class="dash-card__title" id="booking-details-title">Contact &amp; location</h2>
              <p class="dash-card__sub">Where the pandit should arrive and how to reach you</p>
            </div>
            <span class="portal-booking-panel__icon" aria-hidden="true"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span>
          </header>
          <div class="portal-booking-panel__body">
            <div class="dash-field"><label for="bw-address">Address / city</label><textarea id="bw-address" class="portal-booking-textarea" name="address" rows="3" required placeholder="House no, street, area, city, pincode"></textarea><p class="dash-field__hint">Required for doorstep rituals — used to assign a nearby pandit</p></div>
            <div class="dash-field"><label for="bw-phone">Mobile</label><div class="portal-booking-field"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg><input id="bw-phone" type="tel" name="phone" required value="+91 98765 43210"/></div></div>
            <div class="portal-booking-confirm-hub dash-card" id="booking-confirm-panel" aria-labelledby="booking-confirm-title">
              <header class="portal-booking-confirm-hub__head">
                <span class="portal-booking-confirm-hub__icon" aria-hidden="true">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg>
                </span>
                <div>
                  <h3 class="portal-booking-confirm-hub__title" id="booking-confirm-title">Ready to confirm?</h3>
                  <p class="portal-booking-confirm-hub__sub">Check the items below, then confirm your booking.</p>
                </div>
              </header>
              <ul class="portal-booking-confirm-hub__checks" id="booking-confirm-checks" aria-live="polite"></ul>
              <div class="portal-booking-confirm-hub__total">
                <span class="portal-booking-confirm-hub__total-label">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                  Estimated total
                </span>
                <strong class="portal-booking-confirm-hub__total-amount" id="booking-confirm-price">₹4,033</strong>
              </div>
              <button type="submit" class="dash-btn dash-btn--accent portal-booking-confirm-hub__btn" id="booking-confirm-submit">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>
                Confirm booking
              </button>
              <p class="portal-booking-confirm-hub__note">
                You will receive a confirmation email with booking <strong id="booking-confirm-id">#DC-001</strong>
              </p>
            </div>
          </div>
        </section>
      </div>
      <aside class="portal-booking-summary dash-card" id="booking-wizard-summary" aria-live="polite"><p class="portal-booking-summary__loading">Loading summary…</p></aside>
    </div>
  </form>
</div>"""

STEPS = marketing_steps(
    [
        (1, "Choose a puja", "Transparent pricing and inclusions."),
        (2, "Pick a pandit", "Verified Acharyas near you."),
        (3, "Book", "Schedule date and mode."),
    ]
)
PANDIT_STEPS = marketing_steps(
    [
        (1, "Create profile", "Showcase expertise and languages."),
        (2, "Set availability", "Control when you accept bookings."),
        (3, "Serve devotees", "Earn with transparent payouts."),
    ]
)

PRIVACY_POLICY_BODY = """
<div class="legal-doc">
  <p class="legal-doc__meta">Effective date: 1 May 2026 · Last updated: 28 May 2026</p>
  <article class="legal-prose legal-prose__shell">
    <p>Divine Center (“we”, “us”, “our”) operates a platform that helps devotees book Hindu rituals with verified Acharyas. This Privacy Policy explains what personal information we collect, how we use it, and the choices you have. By creating an account or booking through Divine Center, you agree to the practices described here.</p>

    <h2>1. Information we collect</h2>
    <p>We collect only what is needed to run bookings, payments, and support:</p>
    <ul>
      <li><strong>Account details</strong> — name, email address, mobile number, and password (stored in hashed form).</li>
      <li><strong>Booking information</strong> — puja selected, preferred date and time, ritual mode (home, temple, or online), devotee name, and service address when a doorstep visit is requested.</li>
      <li><strong>Payment data</strong> — transaction amount, status, and a reference from our payment partner. We do not store full card or UPI credentials on our servers.</li>
      <li><strong>Pandit profiles</strong> — for Acharyas who join the platform: qualifications, languages, service areas, availability, and payout details for settlements.</li>
      <li><strong>Communications</strong> — messages you send through support, reviews you submit, and records of notifications we send about bookings.</li>
      <li><strong>Technical data</strong> — device type, browser, approximate location derived from IP address, and cookies used to keep you signed in and remember preferences.</li>
    </ul>

    <h2>2. How we use your information</h2>
    <p>We use personal data to:</p>
    <ul>
      <li>Confirm bookings and match you with a suitable pandit in your area or language.</li>
      <li>Process payments, issue receipts, and handle refunds where applicable.</li>
      <li>Send booking updates, reminders, and important service announcements.</li>
      <li>Verify pandit credentials and maintain quality and safety on the platform.</li>
      <li>Improve our website, prevent fraud, and comply with applicable law.</li>
    </ul>
    <p>We do not sell your personal information to third parties for their marketing.</p>

    <h2>3. Sharing with others</h2>
    <p>We may share limited information with:</p>
    <ul>
      <li><strong>Assigned Acharyas</strong> — name, contact number, address, and ritual details needed to perform the service.</li>
      <li><strong>Payment processors</strong> — to complete transactions securely.</li>
      <li><strong>Service providers</strong> — hosting, analytics, email/SMS delivery, and customer support tools bound by confidentiality obligations.</li>
      <li><strong>Authorities</strong> — when required by law or to protect the rights and safety of users.</li>
    </ul>

    <h2>4. Data retention</h2>
    <p>We keep account and booking records for as long as your account is active and for a reasonable period afterward to meet legal, tax, and dispute-resolution requirements. You may request deletion of your account subject to obligations we have for completed transactions.</p>

    <h2>5. Security</h2>
    <p>We use encryption in transit, access controls, and regular review of our systems. No method of transmission over the internet is completely secure; please use a strong password and notify us promptly if you suspect unauthorized access.</p>

    <h2>6. Your choices</h2>
    <ul>
      <li>Update profile and contact details from your account settings.</li>
      <li>Opt out of non-essential promotional messages while still receiving booking-related notices.</li>
      <li>Request a copy of your data or ask us to correct inaccurate information by contacting support.</li>
      <li>Disable non-essential cookies in your browser; core site features may require essential cookies.</li>
    </ul>

    <h2>7. Children</h2>
    <p>Divine Center is intended for users aged 18 and above. Rituals may be booked on behalf of family members, but the account holder must be an adult responsible for the booking.</p>

    <h2>8. Changes to this policy</h2>
    <p>We may update this Privacy Policy from time to time. Material changes will be posted on this page with a revised “Last updated” date. Continued use of the platform after changes take effect constitutes acceptance of the updated policy.</p>

    <h2>9. Contact us</h2>
    <p>Questions about privacy or data requests:</p>
    <p><strong>Divine Center — Privacy</strong><br/>Email: <a href="mailto:privacy@divinecenter.in">privacy@divinecenter.in</a><br/>Hyderabad, Telangana, India</p>
  </article>
</div>"""

TERMS_CONDITIONS_BODY = """
<div class="legal-doc">
  <p class="legal-doc__meta">Effective date: 1 May 2026 · Last updated: 28 May 2026</p>
  <article class="legal-prose legal-prose__shell">
    <p>These Terms &amp; Conditions (“Terms”) govern your access to and use of the Divine Center website and services. Please read them carefully before booking a ritual or registering as an Acharya.</p>

    <h2>1. About Divine Center</h2>
    <p>Divine Center provides an online marketplace connecting devotees with independent pandits and priests (“Acharyas”). We facilitate discovery, booking, and payment but do not perform rituals ourselves. Each Acharya is responsible for conducting the service according to agreed traditions and your booking details.</p>

    <h2>2. Eligibility</h2>
    <p>You must be at least 18 years old and capable of entering a binding contract under Indian law. By using the platform, you confirm that information you provide is accurate and that you will keep your account credentials confidential.</p>

    <h2>3. Bookings</h2>
    <ul>
      <li>Prices shown include the ritual fee and applicable platform charges unless stated otherwise at checkout.</li>
      <li>A booking is confirmed once payment is successful and you receive a confirmation reference.</li>
      <li>You are responsible for providing a correct address, access instructions, and any samagri or venue requirements noted for the puja.</li>
      <li>We may assign or suggest an Acharya based on availability, location, and language preference.</li>
    </ul>

    <h2>4. Cancellations &amp; rescheduling</h2>
    <ul>
      <li><strong>More than 48 hours before the ritual</strong> — full refund to original payment method or wallet credit.</li>
      <li><strong>24–48 hours before</strong> — partial refund; a cancellation fee may apply to cover the Acharya’s reserved time.</li>
      <li><strong>Less than 24 hours before</strong> — generally non-refundable unless Divine Center or the Acharya agrees otherwise.</li>
      <li>Reschedule requests are subject to pandit availability and may be treated as a cancellation plus new booking.</li>
    </ul>

    <h2>5. Conduct</h2>
    <p>Users and Acharyas agree to treat each other with respect, arrive on time, and follow applicable laws. Harassment, discrimination, unsafe behavior, or misuse of contact details may result in account suspension. Acharyas must maintain valid verification and deliver services as described in their profiles.</p>

    <h2>6. Payments &amp; payouts</h2>
    <p>Payments are processed through authorized partners. Refunds, where eligible, are returned through the same channel when possible. Acharya payouts are settled according to the schedule shown in the pandit dashboard, minus agreed platform fees and applicable taxes.</p>

    <h2>7. Reviews &amp; content</h2>
    <p>Reviews must be honest and related to your experience. You grant Divine Center a non-exclusive license to display feedback you submit. We may remove content that is abusive, misleading, or violates these Terms.</p>

    <h2>8. Disclaimers</h2>
    <p>Rituals are spiritual services performed by independent Acharyas. Divine Center does not guarantee specific religious outcomes. The platform is provided “as is” to the extent permitted by law. We are not liable for indirect or consequential losses arising from third-party services, though we work to resolve disputes in good faith.</p>

    <h2>9. Limitation of liability</h2>
    <p>To the maximum extent allowed by applicable law, Divine Center’s total liability for any claim related to a booking is limited to the amount you paid for that booking. Nothing in these Terms limits liability that cannot be excluded under law.</p>

    <h2>10. Changes</h2>
    <p>We may modify these Terms by posting an updated version on this page. Your continued use after the effective date of changes constitutes acceptance.</p>

    <h2>11. Governing law</h2>
    <p>These Terms are governed by the laws of India. Disputes shall be subject to the exclusive jurisdiction of courts in Hyderabad, Telangana, unless mandatory consumer protection rules provide otherwise.</p>

    <h2>12. Contact</h2>
    <p>For questions about these Terms:</p>
    <p><strong>Divine Center — Legal</strong><br/>Email: <a href="mailto:legal@divinecenter.in">legal@divinecenter.in</a><br/>Hyderabad, Telangana, India</p>
  </article>
</div>"""

if __name__ == "__main__":
    write_pages("customer", CUSTOMER)
    write_pages("user", USER)
    SUCCESS_BODY = """
<div class="success-card">
  <div class="success-card__icon"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 6L9 17l-5-5"/></svg></div>
  <h2 style="font-family:var(--font-serif);font-size:1.35rem;color:var(--mahogany);margin-bottom:0.5rem">You're all set</h2>
  <p style="color:var(--text-muted);margin-bottom:0">Booking <strong>#DC-001</strong> — Annaprashanna · Feb 15, 2026</p>
  <dl class="success-details">
    <dt>Pandit assigning</dt><dd>We will match a verified Acharya within 24 hours.</dd>
    <dt>Payment</dt><dd>₹4,033 — — payment confirmed.</dd>
  </dl>
  <div class="success-actions">
    <a class="btn btn--accent" href="customer/booking-detail?id=DC-001">Track status</a>
    <a class="btn btn--outline" href="customer/bookings">All bookings</a>
    <a class="btn btn--outline" href="index">Home</a>
  </div>
</div>"""

    for fn, title, pid, kick, lead, body, cta in [
        ("for-customers.html", "For Customers", "customers", "Devotees", "Book rituals at home with confidence.", STEPS + MARKETING_TRUST + MARKETING_CTA.format(cta_inner='<a class="btn btn--accent" href="pandits/booking">Book a puja</a> <a class="btn btn--outline" href="pujas">Browse pujas</a> <a class="btn btn--outline" href="register">Sign up</a>'), '<a class="btn btn--accent" href="pandits/booking">Book a puja</a> <a class="btn btn--outline" href="customer/dashboard">My dashboard</a>'),
        ("for-pandits.html", "For Pandits", "pandits-page", "Acharyas", "Grow your practice with Divine Center.", PANDIT_STEPS + MARKETING_TRUST + MARKETING_CTA.format(cta_inner='<a class="btn btn--accent" href="register-pandit">Join as pandit</a> <a class="btn btn--outline" href="user/dashboard">Pandit dashboard</a>'), '<a class="btn btn--accent" href="register-pandit">Register</a>'),
        ("privacy-policy.html", "Privacy Policy", "legal", "Legal", "How we protect your information.", PRIVACY_POLICY_BODY, ""),
        ("terms-conditions.html", "Terms & Conditions", "legal", "Legal", "Terms for using our platform.", TERMS_CONDITIONS_BODY, ""),
    ]:
        html = marketing_page(title, pid, kick, lead, body, cta)
        open(os.path.join(ROOT, fn), "w").write(html)
        print("marketing", fn)

    success_html = marketing_page_body("Booking confirmed", "success", SUCCESS_BODY).replace(
        '<script src="demo-mode.js"></script>',
        '<script src="site-data.js"></script>\n  <script src="demo-session.js"></script>\n  <script src="booking-success.js"></script>\n  <script src="demo-mode.js"></script>',
    )
    open(os.path.join(ROOT, "booking-success.html"), "w").write(success_html)
    print("marketing", "booking-success.html")
    booking_body = BOOKING_WIZARD + MARKETING_TRUST.replace('class="marketing-trust"', 'class="portal-booking-trust marketing-trust"')
    booking_html = marketing_page(
        "Book a Puja",
        "booking",
        "Reserve",
        "Choose date, location, and pandit — then confirm.",
        booking_body,
        '<a class="btn btn--accent" href="../pandits">Find a pandit</a>',
        "../",
    ).replace(
        '<script src="../demo-mode.js"></script>',
        '<script src="../site-data.js"></script>\n  <script src="../demo-session.js"></script>\n  <script src="../booking-wizard.js"></script>\n  <script src="../demo-mode.js"></script>',
    )
    open(os.path.join(ROOT, "pandits/booking.html"), "w").write(booking_html)

    success_html = open(os.path.join(ROOT, "booking-success.html")).read()
    if "booking-success.js" not in success_html:
        open(os.path.join(ROOT, "booking-success.html"), "w").write(
            success_html.replace(
                '<script src="demo-mode.js"></script>',
                '<script src="site-data.js"></script>\n  <script src="demo-session.js"></script>\n  <script src="booking-success.js"></script>\n  <script src="demo-mode.js"></script>',
            )
        )
