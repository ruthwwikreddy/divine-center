/**
 * Portal UI polish — welcome strip, mini stats on dashboard, profile sync.
 */
(function () {
  "use strict";

  var base = function () {
    if (window.PortalShell && window.PortalShell.assetBase) return window.PortalShell.assetBase();
    var p = window.location.pathname;
    if (/\/customer\/favorites\//.test(p) || /\/user\/bookings\//.test(p)) return "../../";
    if (/\/customer\//.test(p) || /\/user\//.test(p)) return "../";
    return "";
  };

  function injectWelcome() {
    if (document.getElementById("portal-welcome") || document.getElementById("pandit-dash-welcome")) return;
    var main = document.querySelector(".portal-main");
    if (!main) return;

    var isCustomer = document.body.classList.contains("page-portal--customer");
    var isPandit = document.body.classList.contains("page-portal--pandit");
    if (!isCustomer && !isPandit) return;

    if (isCustomer && !document.getElementById("dash-bookings-body")) return;
    if (isPandit) return;

    function esc(s) {
      if (!s) return "";
      var d = document.createElement("div");
      d.textContent = s;
      return d.innerHTML;
    }

    var old = document.getElementById("dash-greeting");
    if (old) old.remove();

    var Demo = window.DivineCenterDemo;
    var display = (Demo && Demo.displayName && Demo.displayName()) || (isCustomer ? "Ruthwik" : "Panduranga");
    var firstName = display.replace(/\s*\(demo\)\s*$/i, "");

    var profile = document.getElementById("dash-profile-name");
    if (profile) profile.textContent = display;

    var html;
    if (isCustomer) {
      html =
        '<div class="portal-welcome__copy">' +
        '<p class="portal-welcome__text">Welcome back, ' + esc(firstName) + '! 🙏</p>' +
        '<p class="portal-welcome__sub">Book your next spiritual ceremony with verified Pandits</p></div>' +
        '<div class="portal-welcome__actions">' +
        '<a class="portal-welcome__cta portal-welcome__cta--solid" href="' + base() + 'pandits">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg> Find a Pandit</a>' +
        '<a class="portal-welcome__cta portal-welcome__cta--ghost" href="' + base() + 'pujas">' +
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3z"/></svg> Browse Services</a></div>';
    } else {
      html =
        '<div><p class="portal-welcome__text">Namaste, ' + firstName + "</p>" +
        '<p class="portal-welcome__sub">4 pending requests</p></div>' +
        '<div class="portal-quick">' +
        '<a class="portal-quick__btn" href="' + base() + 'user/bookings">Bookings</a>' +
        '<a class="portal-quick__btn" href="' + base() + 'user/availability-time">Availability</a>' +
        '<a class="portal-quick__btn" href="' + base() + 'user/wallet">Wallet</a></div>';
      if (profile) profile.textContent = "Panduranga";
    }

    var el = document.createElement("div");
    el.id = "portal-welcome";
    el.className = "portal-welcome";
    el.innerHTML = html;

    var toolbar = main.querySelector(".portal-toolbar");
    if (document.body.classList.contains("portal-page--dashboard")) {
      main.insertBefore(el, main.firstChild);
    } else if (toolbar) {
      toolbar.insertAdjacentElement("afterend", el);
    } else {
      main.insertBefore(el, main.firstChild);
    }
  }

  var ICON_CAL =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  var ICON_BOOK =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 19.5A2.5 2.5 0 016.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 014 19.5v-15A2.5 2.5 0 016.5 2z"/></svg>';
  var ICON_HEART =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>';

  function statCard(opts) {
    var tag = opts.href ? "a" : "article";
    var href = opts.href ? ' href="' + opts.href + '"' : "";
    var trendClass = opts.trendUp ? "dash-stat-card__trend--up" : "dash-stat-card__trend--down";
    var arrow = opts.trendUp ? "↑" : "↓";
    return (
      "<" + tag + ' class="dash-stat-card portal-stat-card"' + href + ">" +
      '<span class="dash-stat-card__icon dash-stat-card__icon--' + opts.tone + '">' + opts.icon + "</span>" +
      '<div class="dash-stat-card__body">' +
      '<p class="dash-stat-card__value">' + opts.value + "</p>" +
      '<p class="dash-stat-card__meta">' +
      '<span class="dash-stat-card__trend ' + trendClass + '">' + arrow + " " + opts.trend + "</span>" +
      '<span class="dash-stat-card__label">' + opts.label + "</span></p>" +
      (opts.hint ? '<span class="portal-stat-card__hint">' + opts.hint + "</span>" : "") +
      "</div></" + tag + ">"
    );
  }

  function injectDashboardStats() {
    /* Customer dashboard — no injected stat row (bookings hub shows live data) */
    if (document.body.classList.contains("page-portal--customer")) return;
    if (document.getElementById("dash-mini-stats")) return;
    if (!document.getElementById("dash-bookings-body")) return;

    var welcome = document.getElementById("portal-welcome");
    if (!welcome) return;

    var b = base();
    var row = document.createElement("div");
    row.className = "dash-stats portal-mini-stats";
    row.id = "dash-mini-stats";
    row.setAttribute("aria-label", "Account overview");
    row.innerHTML =
      statCard({
        href: b + "customer/bookings",
        tone: "blue",
        icon: ICON_CAL,
        value: "3",
        trend: "1 this month",
        trendUp: true,
        label: "Upcoming",
        hint: "View schedule",
      }) +
      statCard({
        href: b + "customer/bookings",
        tone: "green",
        icon: ICON_BOOK,
        value: "26",
        trend: "12% vs last year",
        trendUp: true,
        label: "Total bookings",
        hint: "All rituals",
      }) +
      statCard({
        href: b + "customer/favorites",
        tone: "purple",
        icon: ICON_HEART,
        value: "2",
        trend: "6 pandits saved",
        trendUp: true,
        label: "Favourites",
        hint: "Book again",
      });

    welcome.insertAdjacentElement("afterend", row);
  }

  function syncProfile() {
    var profile = document.getElementById("dash-profile-name");
    if (!profile) return;
    var Demo = window.DivineCenterDemo;
    if (Demo && Demo.displayName) {
      var name = Demo.displayName();
      if (name) {
        profile.textContent = name;
        return;
      }
    }
    if (document.body.classList.contains("page-portal--customer")) {
      profile.textContent = "Ruthwik";
    } else if (document.body.classList.contains("page-portal--pandit")) {
      profile.textContent = "Panduranga";
    }
  }

  function applyLastBookingToPage() {
    var Demo = window.DivineCenterDemo;
    if (!Demo) return;
    var b = Demo.getLastBooking();
    if (!b) return;

    var pujaEl = document.getElementById("booking-puja");
    if (pujaEl && b.pujaTitle) pujaEl.textContent = b.pujaTitle;

    var sched = document.getElementById("booking-scheduled");
    if (sched && b.date) sched.textContent = Demo.formatDate(b.date);

    var trackItem = document.querySelector(
      ".portal-activity__item:nth-child(2) p"
    );
    if (trackItem && b.pujaTitle) {
      trackItem.textContent =
        b.pujaTitle + (b.date ? " · " + Demo.formatDate(b.date) : "");
    }

    var session = Demo.getAuthSession();
    var cust = document.getElementById("booking-customer-name");
    if (cust && session) {
      var dn = Demo.displayName(session);
      if (dn) cust.textContent = dn.replace(/\s*\(demo\)\s*$/i, "") + " Sharma";
    }
  }

  var NAV_LABELS = {
    dashboard: "Dashboard",
    profile: "Edit profile",
    bookings: "My bookings",
    reviews: "Reviews",
    favorites: "Favorites",
    payments: "Payments",
    support: "Support",
    settings: "Settings",
    "my-services": "My services",
    "availability-time": "Availability",
    wallet: "Wallet",
    withdrawals: "Withdrawals",
    "payout-details": "Payout details",
    "edit-profile": "Edit profile",
    "contact-support": "Support",
  };

  function injectBreadcrumb() {
    if (document.getElementById("portal-breadcrumb")) return;
    if (
      document.body.classList.contains("page-portal--customer") ||
      document.body.classList.contains("page-portal--pandit")
    ) {
      return;
    }
    var main = document.querySelector(".portal-main");
    if (!main) return;
    var active = document.body.getAttribute("data-portal-active") || "";
    if (!active || active === "dashboard") return;

    var isCustomer = document.body.classList.contains("page-portal--customer");
    var portalName = isCustomer ? "Customer" : "Pandit";
    var portalHref = base() + (isCustomer ? "customer/dashboard" : "user/dashboard");
    var pageLabel = NAV_LABELS[active];
    if (!pageLabel) {
      var heroTitle = document.querySelector(".portal-hero__title");
      pageLabel = heroTitle ? heroTitle.textContent.trim() : active;
    }

    var path = window.location.pathname;
    var favSub = /\/favorites\/(pandits|services)/.test(path);
    var bookingDetail = /\/booking-detail/.test(path);

    if (bookingDetail) {
      var el = document.createElement("nav");
      el.id = "portal-breadcrumb";
      el.className = "portal-breadcrumb";
      el.setAttribute("aria-label", "Breadcrumb");
      el.innerHTML =
        '<a href="' + base() + 'index">Home</a><span aria-hidden="true">/</span>' +
        '<a href="' + portalHref + '">' + portalName + '</a><span aria-hidden="true">/</span>' +
        '<a href="' + base() + 'customer/bookings">Bookings</a><span aria-hidden="true">/</span>' +
        "<span>Booking details</span>";
      main.insertBefore(el, main.firstChild);
      return;
    }

    if (favSub) {
      var sub = /pandits/.test(window.location.pathname) ? "Pandits" : "Services";
      var el = document.createElement("nav");
      el.id = "portal-breadcrumb";
      el.className = "portal-breadcrumb";
      el.setAttribute("aria-label", "Breadcrumb");
      el.innerHTML =
        '<a href="' + base() + 'index">Home</a><span aria-hidden="true">/</span>' +
        '<a href="' + portalHref + '">' + portalName + '</a><span aria-hidden="true">/</span>' +
        '<a href="' + base() + 'customer/favorites">Favorites</a><span aria-hidden="true">/</span>' +
        "<span>" + sub + "</span>";
      main.insertBefore(el, main.firstChild);
      return;
    }

    var el = document.createElement("nav");
    el.id = "portal-breadcrumb";
    el.className = "portal-breadcrumb";
    el.setAttribute("aria-label", "Breadcrumb");
    el.innerHTML =
      '<a href="' + base() + 'index">Home</a><span aria-hidden="true">/</span>' +
      '<a href="' + portalHref + '">' + portalName + '</a><span aria-hidden="true">/</span>' +
      "<span>" + pageLabel + "</span>";
    main.insertBefore(el, main.firstChild);
  }

  function markDashboardLayout() {
    var active =
      document.body.getAttribute("data-portal-active") ||
      document.body.getAttribute("data-dash-active") ||
      "";
    if (active === "dashboard") {
      document.body.classList.add("portal-page--dashboard");
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncProfile();
    markDashboardLayout();
    injectBreadcrumb();
    injectWelcome();
    injectDashboardStats();
    applyLastBookingToPage();
  });
})();
