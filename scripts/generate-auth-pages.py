#!/usr/bin/env python3
"""Regenerate auth stub pages with full login/register layout."""
import os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def auth_page(
    rel_path,
    base,
    title,
    auth_page_id,
    role,
    headline,
    lead,
    form_html,
    foot_html,
    aside_sub="",
    success_html="",
    body_extra="",
    show_success=False,
):
    success_hidden = "" if show_success else " hidden"
    default_success = (
        f'<div id="auth-success" class="auth-success{success_hidden}">'
        '<div class="auth-success__ring" aria-hidden="true"></div>'
        '<p class="auth-success__title">Done</p>'
        '<p class="auth-success__text">You're all set. Continue to your dashboard.</p>'
        '<div class="auth-success__btns">'
        f'<a href="{base}customer/dashboard" class="btn btn--accent">My Dashboard</a>'
        f'<a href="{base}index" class="btn btn--outline">Home</a>'
        "</div></div>"
    )
    success_block = success_html if success_html else default_success
    if show_success:
        main_inner = success_block
    else:
        main_inner = form_html + "\n          " + (
            success_block
            if 'id="auth-success"' in success_block
            else default_success
        )

    return f"""<!DOCTYPE html>
<html data-demo-site="true" lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <meta name="robots" content="noindex"/>
  <title>{title} — Divine Center</title>
  <script src="{base}site-config.js"></script>
  <link rel="preconnect" href="https://fonts.googleapis.com"/>
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,500;0,600;0,700;1,500&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="{base}styles.css"/>
  <link rel="stylesheet" href="{base}demo-mode.css"/>
</head>
<body class="page-auth {body_extra}" data-page="auth" data-auth-page="{auth_page_id}" data-auth-role="{role}">
  <a class="skip-link" href="#auth-box">Skip to form</a>
  <main class="auth-layout" id="auth-main">
    <aside class="auth-hero" aria-label="Divine Center">
      <div class="auth-hero__media" aria-hidden="true">
        <img src="{base}assets/images/hero-priest.jpg" alt="" width="960" height="1200" loading="eager"/>
      </div>
      <div class="auth-hero__shade" aria-hidden="true"></div>
      <div class="auth-hero__inner">
        <div class="auth-hero__panel">
        <a href="{base}index" class="auth-hero__brand">
          <img class="brand__icon" src="{base}assets/logo/image.png" alt="Divine Center" width="120" height="64"/>
        </a>
        <p class="auth-hero__tagline">Connecting Faith, Delivering Grace</p>
        <p id="auth-aside-title" class="auth-hero__headline">{headline}</p>
        <p id="auth-aside-sub" class="auth-hero__text">{aside_sub}</p>
        <ul id="auth-aside-perks" class="auth-hero__perks"></ul>
        </div>
      </div>
    </aside>
    <section class="auth-main" aria-labelledby="auth-page-title">
      <div class="auth-main__center">
        <a href="{base}login" class="auth-back">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to sign in
        </a>
        <div class="auth-box" id="auth-box">
          <h1 id="auth-page-title" class="auth-box__title">{title}</h1>
          <p class="auth-box__lead">{lead}</p>
          {main_inner}
          <p class="auth-box__foot">{foot_html}</p>
        </div>
        <ul class="auth-trust" aria-label="Trust indicators">
          <li>Verified Acharyas</li>
          <li>Transparent pricing</li>
          <li>Support 10 AM – 7 PM IST</li>
        </ul>
      </div>
    </section>
  </main>
  <script src="{base}auth-content.js"></script>
  <script src="{base}auth.js"></script>
  <script src="{base}demo-mode.js"></script>
</body>
</html>
"""

FORM_RESET = """
<form class="auth-form" data-auth-form novalidate>
  <label class="auth-field"><span class="auth-field__label">Email</span>
    <input type="email" name="email" required autocomplete="email" placeholder="you@email.com"/></label>
  <button type="submit" class="btn btn--accent btn--block auth-form__submit">Send reset link</button>
  <p class="auth-form__hint form-hint" role="status"></p>
</form>"""

FORM_NEW_PASSWORD = """
<form class="auth-form" data-auth-form novalidate>
  <label class="auth-field"><span class="auth-field__label">New password</span>
    <input type="password" name="password" required minlength="8" autocomplete="new-password" placeholder="••••••••"/></label>
  <label class="auth-field"><span class="auth-field__label">Confirm password</span>
    <input type="password" name="confirmPassword" required minlength="8" autocomplete="new-password" placeholder="••••••••"/></label>
  <button type="submit" class="btn btn--accent btn--block auth-form__submit">Update password</button>
  <p class="auth-form__hint form-hint" role="status"></p>
</form>"""

FORM_LOGIN = """
<form class="auth-form" data-auth-form novalidate>
  <label class="auth-field"><span class="auth-field__label">Email or mobile</span>
    <input type="text" name="email" required autocomplete="username" placeholder="you@email.com"/></label>
  <label class="auth-field"><span class="auth-field__label">Password</span>
    <input type="password" name="password" required autocomplete="current-password" placeholder="••••••••" minlength="8"/></label>
  <div class="auth-form__meta">
    <label class="auth-check"><input type="checkbox" name="remember"/> Remember me</label>
    <a class="auth-link" href="reset">Forgot password?</a>
  </div>
  <button type="submit" class="btn btn--accent btn--block auth-form__submit">Sign in</button>
  <p class="auth-form__hint form-hint" role="status"></p>
</form>"""

FORM_REGISTER = """
<form class="auth-form" data-auth-form novalidate>
  <label class="auth-field"><span class="auth-field__label">Full name</span>
    <input type="text" name="fullName" required autocomplete="name" placeholder="Your name"/></label>
  <label class="auth-field"><span class="auth-field__label">Email</span>
    <input type="email" name="email" required autocomplete="email" placeholder="you@email.com"/></label>
  <label class="auth-field"><span class="auth-field__label">Mobile</span>
    <input type="tel" name="phone" required autocomplete="tel" placeholder="+91 98765 43210"/></label>
  <label class="auth-field"><span class="auth-field__label">Password</span>
    <input type="password" name="password" required minlength="8" autocomplete="new-password" placeholder="••••••••"/></label>
  <button type="submit" class="btn btn--accent btn--block auth-form__submit">Create account</button>
  <p class="auth-form__hint form-hint" role="status"></p>
</form>"""

SUCCESS_VERIFY = """
<div id="auth-success" class="auth-success">
  <div class="auth-success__ring" aria-hidden="true"></div>
  <p class="auth-success__title">Email verified</p>
  <p class="auth-success__text">Your email is confirmed. Sign in to open your dashboard.</p>
  <div class="auth-success__btns">
    <a href="{base}login" class="btn btn--accent">Sign in</a>
    <a href="{base}customer/dashboard" class="btn btn--outline">My dashboard</a>
  </div>
</div>"""

SUCCESS_GOOGLE = """
<div id="auth-success" class="auth-success">
  <div class="auth-success__ring" aria-hidden="true"></div>
  <p class="auth-success__title">Google sign-in complete</p>
  <p class="auth-success__text">Sign-in complete. Pick where to go next.</p>
  <div class="auth-success__btns">
    <a href="{base}customer/dashboard" class="btn btn--accent">My Dashboard</a>
    <a href="{base}pujas" class="btn btn--outline">Browse pujas</a>
  </div>
</div>"""

SUCCESS_RESET = """
<div id="auth-success" class="auth-success hidden">
  <div class="auth-success__ring" aria-hidden="true"></div>
  <p class="auth-success__title">Reset link sent</p>
  <p class="auth-success__text">Check your email for a reset link to continue.</p>
  <div class="auth-success__btns">
    <a href="{reset_update}" class="btn btn--accent">Set new password</a>
    <a href="{login}" class="btn btn--outline">Back to sign in</a>
  </div>
</div>"""

SUCCESS_PANDIT_LOGIN = """
<div id="auth-success" class="auth-success" hidden>
  <div class="auth-success__ring" aria-hidden="true"></div>
  <p class="auth-success__title">You're signed in</p>
  <p class="auth-success__text">You're signed in.</p>
  <div class="auth-success__btns">
    <a href="{base}user/dashboard" class="btn btn--accent">Pandit dashboard</a>
    <a href="{base}user/bookings" class="btn btn--outline">Bookings</a>
  </div>
</div>"""

def write(path, html):
    fp = os.path.join(ROOT, path)
    os.makedirs(os.path.dirname(fp), exist_ok=True)
    open(fp, "w").write(html)
    print("wrote", fp)

if __name__ == "__main__":
    b = "../../"

    write(
        "auth/customer/reset.html",
        auth_page(
            "auth/customer/reset.html",
            b,
            "Forgot password",
            "reset",
            "customer",
            "Recover your account",
            "Enter the email on your account. We'll send a reset link.",
            FORM_RESET,
            f'Remember it? <a href="{b}login">Sign in</a>',
            aside_sub="Secure password reset for devotees.",
            success_html=SUCCESS_RESET.format(
                reset_update=b + "auth/customer/reset-password-update",
                login=b + "login",
            ),
        ),
    )

    write(
        "auth/customer/reset-password-update.html",
        auth_page(
            "auth/customer/reset-password-update.html",
            b,
            "Set new password",
            "reset-update",
            "customer",
            "Choose a new password",
            "Use at least 8 characters with letters and numbers.",
            FORM_NEW_PASSWORD,
            f'<a href="{b}login">Back to sign in</a>',
            aside_sub="Keep your booking history secure.",
        ),
    )

    write(
        "auth/customer/verify-email.html",
        auth_page(
            "auth/customer/verify-email.html",
            b,
            "Verify email",
            "verify",
            "customer",
            "You're verified",
            "This link confirms your email for Divine Center.",
            "",
            f'<a href="{b}login">Sign in</a>',
            show_success=True,
            success_html=SUCCESS_VERIFY.format(base=b),
        ),
    )

    write(
        "auth/user/login.html",
        auth_page(
            "auth/user/login.html",
            b,
            "Pandit sign in",
            "login",
            "pandit",
            "Pandit login",
            "Access bookings, availability, and your wallet.",
            FORM_LOGIN.replace('href="reset"', f'href="{b}auth/user/reset"'),
            f'New pandit? <a href="{b}register-pandit">Register</a> · <a href="{b}login">Devotee login</a>',
            aside_sub="Manage your practice on Divine Center.",
            success_html=SUCCESS_PANDIT_LOGIN.format(base=b),
            body_extra="page-auth--pandit",
        ),
    )

    write(
        "auth/user/register.html",
        auth_page(
            "auth/user/register.html",
            b,
            "Pandit register",
            "register",
            "pandit",
            "Join as Acharya",
            "Create your pandit profile to receive bookings.",
            FORM_REGISTER,
            f'Already registered? <a href="{b}auth/user/login">Sign in</a>',
            aside_sub="Reach devotees seeking authentic rituals.",
            body_extra="page-auth--pandit",
        ),
    )

    write(
        "auth/user/reset.html",
        auth_page(
            "auth/user/reset.html",
            b,
            "Forgot password",
            "reset",
            "pandit",
            "Pandit account recovery",
            "Reset link will be sent to your registered email.",
            FORM_RESET,
            f'<a href="{b}auth/user/login">Back to pandit login</a>',
            aside_sub="Secure access to your pandit dashboard.",
            success_html=SUCCESS_RESET.format(
                reset_update=b + "auth/user/reset-password-update",
                login=b + "auth/user/login",
            ),
            body_extra="page-auth--pandit",
        ),
    )

    write(
        "auth/user/reset-password-update.html",
        auth_page(
            "auth/user/reset-password-update.html",
            b,
            "Set new password",
            "reset-update",
            "pandit",
            "New pandit password",
            "Choose a strong password for your account.",
            FORM_NEW_PASSWORD,
            f'<a href="{b}auth/user/login">Sign in</a>',
            body_extra="page-auth--pandit",
        ),
    )

    write(
        "auth/user/verify-email.html",
        auth_page(
            "auth/user/verify-email.html",
            b,
            "Verify email",
            "verify",
            "pandit",
            "Email confirmed",
            "Your pandit email is verified.",
            "",
            f'<a href="{b}auth/user/login">Pandit sign in</a>',
            show_success=True,
            success_html=SUCCESS_VERIFY.format(base=b).replace("customer/dashboard", "user/dashboard"),
            body_extra="page-auth--pandit",
        ),
    )

    write(
        "auth/google/callback.html",
        auth_page(
            "auth/google/callback.html",
            "../",
            "Signing you in",
            "oauth",
            "customer",
            "Almost there",
            "Completing Google sign-in…",
            "",
            f'<a href="../login">Use email instead</a>',
            show_success=True,
            success_html=SUCCESS_GOOGLE.format(base="../"),
        ),
    )

    write(
        "admin/login.html",
        auth_page(
            "admin/login.html",
            "../",
            "Admin sign in",
            "login",
            "customer",
            "Admin console",
            "Restricted area — authorized access only.",
            FORM_LOGIN.replace('href="reset"', 'href="#"').replace("Forgot password?", "Sign in"),
            f'<a href="../index">← Public site</a>',
            aside_sub="Operations & support tools (preview).",
            body_extra="page-auth--admin",
        ),
    )
