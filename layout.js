/**
 * Injects shared desktop header + footer; initializes nav toggle & contact forms.
 */
(function () {
  "use strict";

  var CFG = window.DivineCenterConfig;
  if (!CFG) return;

  var BRAND_SVG =
    '<img class="brand__icon" src="assets/logo/image.png" alt="Divine Center" width="56" height="56" />';

  var BRAND_SVG_LIGHT =
    '<img class="brand__icon" src="assets/logo/image.png" alt="Divine Center" width="52" height="52" />';

  var SOCIAL_SVGS = {
    facebook:
      '<svg class="site-footer__social-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v1h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>',
    instagram:
      '<svg class="site-footer__social-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M7 2h10a5 5 0 015 5v10a5 5 0 01-5 5H7a5 5 0 01-5-5V7a5 5 0 015-5zm5 5.5A4.5 4.5 0 1016.5 12 4.5 4.5 0 0012 7.5zm6.25-2.38a1.12 1.12 0 11-1.12 1.12 1.12 1.12 0 011.12-1.12z"/></svg>',
    youtube:
      '<svg class="site-footer__social-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M23.5 6.2a3 3 0 00-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 00.5 6.2 31.7 31.7 0 000 12a31.7 31.7 0 00.5 5.8 3 3 0 002.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 002.1-2.1A31.7 31.7 0 0024 12a31.7 31.7 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>',
    whatsapp:
      '<svg class="site-footer__social-icon" width="20" height="20" viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.435 9.884-9.881 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>',
  };

  var LANG_OPTIONS = [
    ["en", "English"],
    ["te", "Telugu"],
    ["hi", "Hindi"],
    ["ml", "Malayalam"],
    ["ta", "Tamil"],
    ["mr", "Marathi"],
  ];

  var FOOTER_ICO_LOCATION =
    '<svg class="site-footer__contact-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>';
  var FOOTER_ICO_MAIL =
    '<svg class="site-footer__contact-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 4h16v16H4z"/><path d="M22 6l-10 7L2 6"/></svg>';
  var FOOTER_ICO_PHONE =
    '<svg class="site-footer__contact-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3.1 19.5 19.5 0 01-6-6A19.8 19.8 0 012.1 4.2 2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.3 1.8.6 2.6a2 2 0 01-.4 2.1L8 9.8a16 16 0 006.2 6.2l1.4-1.3a2 2 0 012.1-.4c.8.3 1.7.5 2.6.6A2 2 0 0122 16.9z"/></svg>';
  var FOOTER_ICO_CLOCK =
    '<svg class="site-footer__contact-ico" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l4 2"/></svg>';

  function activePage() {
    return document.body.getAttribute("data-page") || "";
  }

  function authHref(key, fallback) {
    var a = CFG.auth || {};
    return a[key] || fallback;
  }

  function storedLang() {
    try {
      return localStorage.getItem("dc_lang") || "en";
    } catch (e) {
      return "en";
    }
  }

  function navLangHtml() {
    var current = storedLang();
    return (
      '<div class="nav__lang" id="desktop-lang-switcher">' +
      '<label class="visually-hidden" for="desktop-lang-select">Language</label>' +
      '<span class="nav__lang-icon" aria-hidden="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' +
      '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 010 18M12 3a15 15 0 000 18"/>' +
      "</svg></span>" +
      '<select id="desktop-lang-select" class="nav__lang-select" aria-label="Language">' +
      LANG_OPTIONS.map(function (o) {
        var sel = o[0] === current ? " selected" : "";
        return '<option value="' + o[0] + '"' + sel + ">" + o[1] + "</option>";
      }).join("") +
      "</select></div>"
    );
  }

  function bindNavLangSelect() {
    var select = document.getElementById("desktop-lang-select");
    if (!select || select.dataset.bound) return;
    select.dataset.bound = "1";
    select.addEventListener("change", function () {
      try {
        localStorage.setItem("dc_lang", select.value);
      } catch (e) {}
      if (window.applyGoogleTranslateLang) {
        window.applyGoogleTranslateLang(select.value);
      } else if (window.DesktopI18n && typeof window.DesktopI18n.setLang === "function") {
        window.DesktopI18n.setLang(select.value);
      } else {
        location.reload();
      }
    });
  }

  function navHtml() {
    var page = activePage();
    var links = CFG.nav
      .map(function (item) {
        var cls = "nav__link" + (item.id === page ? " nav__link--active" : "");
        return '<a href="' + item.href + '" class="' + cls + '">' + item.label + "</a>";
      })
      .join("");
    return (
      links +
      '<a href="' +
      authHref("login", "login") +
      '" class="nav__link nav__link--auth">Login</a>' +
      '<a href="' +
      authHref("registerCustomer", "register") +
      '" class="nav__link nav__link--auth">Register</a>'
    );
  }

  function renderNav(target) {
    if (!target) return;
    if (target.getAttribute("data-nav") === "skip" || document.body.classList.contains("page-auth")) {
      target.innerHTML = "";
      return;
    }
    var overlay = target.getAttribute("data-nav") === "overlay";
    var homeHref = activePage() === "home" ? "#top" : "index";
    var navClass = overlay ? "nav nav--overlay" : "nav";
    var brandClass = overlay ? "brand brand--overlay brand--mark" : "brand brand--mark";
    var lightToggle = overlay ? " nav__toggle--light" : "";
    var brandSvg = BRAND_SVG;
    target.innerHTML =
      '<header class="' +
      navClass +
      '" id="top">' +
      '<div class="wrap nav__inner">' +
      '<a href="' +
      homeHref +
      '" class="' +
      brandClass +
      '" aria-label="Divine Center home">' +
      brandSvg +
      "</a>" +
      '<nav class="nav__links" id="nav-menu" aria-label="Main">' +
      navHtml() +
      "</nav>" +
      '<div class="nav__actions">' +
      navLangHtml() +
      '<button type="button" class="nav__toggle' +
      lightToggle +
      '" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Open navigation">' +
      "<span></span><span></span><span></span></button></div></div></header>";
  }

  function footerSocialHtml() {
    var s = CFG.social || {};
    var items = [
      { key: "facebook", label: "Facebook", url: s.facebook },
      { key: "instagram", label: "Instagram", url: s.instagram },
      { key: "youtube", label: "YouTube", url: s.youtube },
      { key: "whatsapp", label: "WhatsApp", url: s.whatsapp },
    ];
    var links = items
      .filter(function (item) {
        return item.url && SOCIAL_SVGS[item.key];
      })
      .map(function (item) {
        return (
          '<li><a href="' +
          item.url +
          '" class="site-footer__social-btn site-footer__social-btn--' +
          item.key +
          '" target="_blank" rel="noopener noreferrer" aria-label="' +
          item.label +
          '">' +
          SOCIAL_SVGS[item.key] +
          "</a></li>"
        );
      })
      .join("");
    if (!links) return "";
    return '<ul class="site-footer__social" aria-label="Social media">' + links + "</ul>";
  }

  function footerExplore(highlight) {
    var labels = { pandits: "Find Pandits", pujas: "Puja Services" };
    return CFG.nav
      .map(function (item) {
        var cls = item.id === highlight ? ' class="site-footer__link--accent"' : "";
        var href = item.href;
        if (item.id === "home") href = "index";
        var label = labels[item.id] || item.label;
        return "<li><a href=\"" + href + "\"" + cls + ">" + label + "</a></li>";
      })
      .join("");
  }

  function applyContactPlaceholders() {
    var c = CFG.contact;
    document.querySelectorAll("[data-contact-email]").forEach(function (el) {
      el.href = "mailto:" + c.email;
      el.textContent = c.email;
    });
    document.querySelectorAll("[data-contact-phone]").forEach(function (el) {
      el.href = "tel:" + c.phone;
      el.textContent = c.phoneDisplay;
    });
    document.querySelectorAll("[data-contact-address]").forEach(function (el) {
      el.textContent = c.addressShort;
    });
  }

  function mobileViewHref() {
    var d = (CFG && CFG.domains) || {};
    if (d.mobileHost) return "https://" + d.mobileHost + "/";
    return "https://divine-center2.ruthwikreddy.live/";
  }

  function renderFooter(target) {
    if (!target) return;
    var rich = target.getAttribute("data-footer") === "rich";
    var highlight = target.getAttribute("data-footer-highlight") || "";
    var c = CFG.contact;
    var panditAside = "";

    var social = rich ? footerSocialHtml() : "";

    var layoutClass = rich ? "site-footer site-footer--rich" : "site-footer";
    var innerClass = rich ? "wrap site-footer__layout site-footer__layout--rich" : "wrap site-footer__layout";
    var gridClass = rich ? "site-footer__grid site-footer__grid--rich" : "site-footer__grid";

    var brandBlock =
      '<div class="site-footer__col site-footer__col--brand">' +
      '<a href="index" class="brand brand--light brand--mark site-footer__brand" aria-label="Divine Center home">' +
      BRAND_SVG_LIGHT +
      "</a>" +
      '<p class="site-footer__mission">' +
      (rich
        ? "Building the digital infrastructure for Dharma — preserving tradition and making Vedic rituals accessible with trust and care."
        : "Building the digital infrastructure for Dharma. Preserving tradition. Engineering the future of Vedic rituals.") +
      "</p>" +
      social +
      "</div>";

    var contactBlock =
      '<div class="site-footer__col site-footer__col--contact">' +
      '<h3 class="site-footer__heading">Contact</h3>' +
      '<ul class="site-footer__list site-footer__list--contact">' +
      '<li class="site-footer__contact-row">' +
      FOOTER_ICO_LOCATION +
      "<span>" +
      c.addressShort +
      "</span></li>" +
      '<li class="site-footer__contact-row">' +
      FOOTER_ICO_MAIL +
      '<a href="mailto:' +
      c.email +
      '">' +
      c.email +
      "</a></li>" +
      '<li class="site-footer__contact-row">' +
      FOOTER_ICO_PHONE +
      '<a href="tel:' +
      c.phone +
      '">' +
      c.phoneDisplay +
      "</a></li>" +
      (rich
        ? '<li class="site-footer__contact-row">' + FOOTER_ICO_CLOCK + "<span>" + c.hours + "</span></li>"
        : '<li class="site-footer__contact-row">' + FOOTER_ICO_LOCATION + "<span>" + c.address.split(",")[0] + "</span></li>") +
      "</ul></div>";

    target.innerHTML =
      '<footer class="' +
      layoutClass +
      '">' +
      '<div class="' +
      innerClass +
      '">' +
      (rich ? '<div class="site-footer__topline" aria-hidden="true"></div>' : "") +
      '<div class="site-footer__main">' +
      '<div class="' +
      gridClass +
      '">' +
      brandBlock +
      '<div class="site-footer__col"><h3 class="site-footer__heading">Explore</h3><ul class="site-footer__list">' +
      footerExplore(highlight === "explore" ? "" : highlight) +
      (rich ? "" : '<li><a href="' + mobileViewHref() + '">Mobile view</a></li>') +
      "</ul></div>" +
      '<div class="site-footer__col"><h3 class="site-footer__heading">Company</h3><ul class="site-footer__list">' +
      '<li><a href="about">About Us</a></li><li><a href="contact">Contact &amp; Support</a></li>' +
      '<li><a href="index#top">How to Book</a></li><li><a href="index#top">Privacy Policy</a></li>' +
      (rich ? '<li><a href="index#top">Terms &amp; Conditions</a></li>' : '<li><a href="index#top">Terms of Service</a></li>') +
      "</ul></div>" +
      contactBlock +
      "</div>" +
      '<div class="site-footer__legal">' +
      '<p class="site-footer__copy">© 2026 Divine Center. All rights reserved.</p>' +
      "</div></div>" +
      panditAside +
      "</div>" +
      (rich ? '<div class="site-footer__pattern" aria-hidden="true"></div>' : "") +
      "</footer>";
  }

  function initNavToggle() {
    var navToggle = document.getElementById("nav-toggle");
    var navMenu = document.getElementById("nav-menu");
    function bind(btn) {
      if (!btn || !navMenu) return;
      btn.addEventListener("click", function () {
        var open = navMenu.classList.toggle("is-open");
        btn.setAttribute("aria-expanded", open ? "true" : "false");
        btn.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
      });
    }
    bind(navToggle);
    if (navMenu) {
      navMenu.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          navMenu.classList.remove("is-open");
          if (navToggle) {
            navToggle.setAttribute("aria-expanded", "false");
            navToggle.setAttribute("aria-label", "Open navigation");
          }
        });
      });
    }
  }

  function initContactForms() {
    document.querySelectorAll("form[data-contact-form]").forEach(function (form) {
      var hintId = form.getAttribute("data-hint");
      var hint = hintId ? document.getElementById(hintId) : form.querySelector(".form-hint");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var msg = form.querySelector("[name=message]");
        if (msg && msg.hasAttribute("minlength") && msg.value.trim().length < 10) {
          if (hint) {
            hint.textContent = "Please enter at least 10 characters in your message.";
            hint.style.color = "#c0392b";
          }
          return;
        }
        if (hint) {
          hint.textContent = "Thank you! We'll respond within one business day.";
          hint.style.color = "var(--mahogany)";
        }
        form.reset();
      });
    });
  }

  function removeLegacyLanguageFab() {
    var legacy = document.getElementById("desktop-lang-switcher-global");
    if (legacy) legacy.remove();
  }

  function initGoogleTranslate() {
    var SCRIPT_ID = "google-translate-script";
    if (!document.getElementById("google_translate_element")) {
      var holder = document.createElement("div");
      holder.id = "google_translate_element";
      holder.style.display = "none";
      document.body.appendChild(holder);
    }
    var GT_PENDING_KEY = "dc_gt_pending_lang";
    var GT_RELOAD_GUARD_KEY = "dc_gt_reload_guard";
    var map = { en: "en", te: "te", hi: "hi", ml: "ml", ta: "ta", mr: "mr" };

    function normalizedTarget(langCode) {
      return map[langCode] || "en";
    }

    function getCurrentGoogTransTarget() {
      var m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
      if (!m) return "en";
      var raw = decodeURIComponent(m[1] || "");
      var parts = raw.split("/");
      return parts[2] || "en";
    }

    function setGoogTransCookie(target) {
      var val = "/en/" + target;
      try {
        document.cookie = "googtrans=" + encodeURIComponent(val) + ";path=/;max-age=31536000;samesite=lax";
        if (location.hostname && location.hostname.indexOf(".") > -1) {
          document.cookie =
            "googtrans=" +
            encodeURIComponent(val) +
            ";path=/;max-age=31536000;domain=." +
            location.hostname.replace(/^www\./, "") +
            ";samesite=lax";
        }
      } catch (e) {
        return false;
      }
      return getCurrentGoogTransTarget() === target;
    }

    window.__dcApplyGoogleTranslate = function (langCode) {
      var target = normalizedTarget(langCode);
      var current = getCurrentGoogTransTarget();
      if (current === target) {
        try {
          sessionStorage.removeItem(GT_PENDING_KEY);
        } catch (e) {}
        return true;
      }
      try {
        if (sessionStorage.getItem(GT_PENDING_KEY) === target) return true;
        sessionStorage.setItem(GT_PENDING_KEY, target);
        var guardRaw = sessionStorage.getItem(GT_RELOAD_GUARD_KEY);
        if (guardRaw) {
          var guard = JSON.parse(guardRaw);
          if (guard && guard.target === target && Date.now() - (guard.ts || 0) < 5000) return true;
        }
        sessionStorage.setItem(GT_RELOAD_GUARD_KEY, JSON.stringify({ target: target, ts: Date.now() }));
      } catch (e) {}
      if (!setGoogTransCookie(target)) return false;
      location.reload();
      return true;
    };

    window.applyGoogleTranslateLang = function (langCode) {
      if (window.__dcApplyGoogleTranslate(langCode)) return;
      window.__dcPendingLang = langCode;
    };

    window.googleTranslateElementInit = function () {
      if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false, includedLanguages: "en,te,hi,ml,ta,mr" },
        "google_translate_element"
      );
      var initial = window.__dcPendingLang || (function () {
        try {
          return localStorage.getItem("dc_lang") || "en";
        } catch (e) {
          return "en";
        }
      })();
      setTimeout(function () {
        window.__dcApplyGoogleTranslate(initial);
      }, 300);
    };

    if (!document.getElementById("google-translate-hide-css")) {
      var css = document.createElement("style");
      css.id = "google-translate-hide-css";
      css.textContent =
        ".goog-te-banner-frame.skiptranslate{display:none!important;}body{top:0!important;}" +
        ".goog-te-gadget,.goog-te-gadget .goog-te-combo{font-size:0!important;}" +
        ".goog-logo-link,.goog-te-gadget span{display:none!important;}";
      document.head.appendChild(css);
    }

    if (!document.getElementById(SCRIPT_ID)) {
      var s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.head.appendChild(s);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderNav(document.getElementById("site-nav"));
    renderFooter(document.getElementById("site-footer"));
    initNavToggle();
    bindNavLangSelect();
    initContactForms();
    applyContactPlaceholders();
    initGoogleTranslate();
    removeLegacyLanguageFab();
  });

  window.DivineLayout = { renderNav: renderNav, renderFooter: renderFooter, initNavToggle: initNavToggle };
})();
