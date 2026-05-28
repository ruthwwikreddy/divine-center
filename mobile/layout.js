/**
 * Injects shared desktop header + footer; initializes nav toggle & contact forms.
 */
(function () {
  "use strict";

  var CFG = window.DivineCenterConfig;
  if (!CFG) return;

  var BRAND_SVG =
    '<img class="brand__icon" src="assets/logo/image.png" alt="Divine Center logo" width="44" height="44" />';

  var BRAND_SVG_LIGHT =
    '<img class="brand__icon" src="assets/logo/image.png" alt="Divine Center logo" width="40" height="40" />';

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
    var brandClass = overlay ? "brand brand--overlay" : "brand";
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
      '<span class="brand__copy"><span class="brand__name">' +
      CFG.brand +
      '</span><span class="brand__tagline">' +
      CFG.tagline +
      "</span></span></a>" +
      '<nav class="nav__links" id="nav-menu" aria-label="Main">' +
      navHtml() +
      "</nav>" +
      '<div class="nav__actions">' +
      '<button type="button" class="nav__toggle' +
      lightToggle +
      '" id="nav-toggle" aria-expanded="false" aria-controls="nav-menu" aria-label="Open navigation">' +
      "<span></span><span></span><span></span></button></div></div></header>";
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
    var panditAside = rich
      ? '<aside class="site-footer__pandit-card" aria-labelledby="site-footer-pandit-title">' +
        '<div class="site-footer__pandit-card__shine" aria-hidden="true"></div>' +
        '<p class="site-footer__pandit-kicker">For Acharyas</p>' +
        '<h3 id="site-footer-pandit-title" class="site-footer__pandit-title">Are you a Pandit?</h3>' +
        "<p class=\"site-footer__pandit-text\">Join Divine Center and reach devotees seeking authentic Vedic rituals — with verification and dignified bookings.</p>" +
        '<div class="site-footer__pandit-actions">' +
        '<a href="' +
        authHref("registerPandit", "register-pandit") +
        '" class="btn btn--accent btn--block">Register as Pandit</a>' +
        '<a href="' +
        authHref("login", "login") +
        '?role=pandit" class="btn btn--ghost btn--block site-footer__login-btn">Pandit Login</a>' +
        "</div></aside>"
      : '<aside class="site-footer__pandit-card" aria-labelledby="site-footer-pandit-title">' +
        '<h3 id="site-footer-pandit-title" class="site-footer__pandit-title">Are you a Pandit?</h3>' +
        "<p class=\"site-footer__pandit-text\">Join India's trusted platform. Reach lakhs of devotees seeking authentic Vedic rituals.</p>" +
        '<div class="site-footer__pandit-actions">' +
        '<a href="contact" class="btn btn--accent btn--block">Join Divine Center →</a>' +
        "</div></aside>";

    var social = rich
      ? '<ul class="site-footer__social" aria-label="Social (links coming soon)">' +
        '<li><a href="#" class="site-footer__social-btn" aria-label="Facebook"><span aria-hidden="true">Fb</span></a></li>' +
        '<li><a href="#" class="site-footer__social-btn" aria-label="Instagram"><span aria-hidden="true">Ig</span></a></li>' +
        '<li><a href="#" class="site-footer__social-btn" aria-label="YouTube"><span aria-hidden="true">Yt</span></a></li>' +
        '<li><a href="#" class="site-footer__social-btn" aria-label="WhatsApp"><span aria-hidden="true">Wa</span></a></li></ul>'
      : "";

    var layoutClass = rich ? "site-footer site-footer--rich" : "site-footer";
    var innerClass = rich ? "wrap site-footer__layout site-footer__layout--rich" : "wrap site-footer__layout";
    var gridClass = rich ? "site-footer__grid site-footer__grid--rich" : "site-footer__grid";

    var brandBlock =
      '<div class="site-footer__col site-footer__col--brand">' +
      '<a href="index" class="brand brand--light site-footer__brand">' +
      BRAND_SVG_LIGHT +
      '<span class="brand__copy"><span class="brand__name">' +
      CFG.brand +
      "</span>" +
      (rich ? '<span class="brand__tagline brand__tagline--footer">' + CFG.tagline + "</span>" : "") +
      "</span></a>" +
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
      '<div class="site-footer__col"><h3 class="site-footer__heading">Popular Pujas</h3><ul class="site-footer__list">' +
      '<li><a href="pujas">Griha Pravesh</a></li><li><a href="pujas">Satyanarayan</a></li>' +
      '<li><a href="pujas">Vivah Sanskar</a></li><li><a href="pujas">Antyesti</a></li></ul></div>' +
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

  document.addEventListener("DOMContentLoaded", function () {
    renderNav(document.getElementById("site-nav"));
    renderFooter(document.getElementById("site-footer"));
    initNavToggle();
    initContactForms();
    applyContactPlaceholders();
  });

  window.DivineLayout = { renderNav: renderNav, renderFooter: renderFooter, initNavToggle: initNavToggle };
})();
