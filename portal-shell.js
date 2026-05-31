/**
 * Customer & pandit portal sidebar — cream theme + main site nav/footer via layout.js
 */
(function () {
  "use strict";

  var ICONS = {
    dashboard:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>',
    profile:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
    bookings:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
    reviews:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>',
    favorites:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>',
    payments:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
    support:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>',
    settings:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2"/></svg>',
    services:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>',
    availability:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l3 2"/></svg>',
    wallet:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 7H5a2 2 0 00-2 2v8a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2z"/></svg>',
    payout:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 10h18M7 15h1m4 0h1m-7 4h12a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>',
    logout:
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>',
  };

  var CUSTOMER_NAV = [
    { id: "dashboard", label: "Dashboard", href: "dashboard", icon: "dashboard" },
    { id: "profile", label: "Edit Profile", href: "profile", icon: "profile" },
    { id: "bookings", label: "My Bookings", href: "bookings", icon: "bookings" },
    { id: "reviews", label: "My Reviews", href: "reviews", icon: "reviews" },
    { id: "favorites", label: "Favorites", href: "favorites", icon: "favorites" },
    { id: "payments", label: "Payments", href: "payments", icon: "payments" },
    { id: "support", label: "Support", href: "support", icon: "support" },
    { id: "settings", label: "Settings", href: "settings", icon: "settings" },
  ];

  var PANDIT_NAV = [
    { id: "dashboard", label: "Dashboard", href: "dashboard", icon: "dashboard" },
    { id: "bookings", label: "Bookings", href: "bookings", icon: "bookings" },
    { id: "my-services", label: "My Services", href: "my-services", icon: "services" },
    { id: "availability-time", label: "Availability", href: "availability-time", icon: "availability" },
    { id: "reviews", label: "Reviews", href: "reviews", icon: "reviews" },
    { id: "wallet", label: "Wallet", href: "wallet", icon: "wallet" },
    { id: "withdrawals", label: "Withdrawals", href: "withdrawals", icon: "payout" },
    { id: "payout-details", label: "Payout Details", href: "payout-details", icon: "payout" },
    { id: "edit-profile", label: "Edit Profile", href: "edit-profile", icon: "profile" },
    { id: "contact-support", label: "Contact Support", href: "contact-support", icon: "support" },
    { id: "settings", label: "Settings", href: "settings", icon: "settings" },
  ];

  function assetBase() {
    var p = window.location.pathname.replace(/\/$/, "");
    if (/\/customer\/favorites\//.test(p) || /\/user\/bookings\//.test(p)) return "../../";
    if (/\/customer\//.test(p) || /\/user\//.test(p)) return "../";
    return "";
  }

  function portalBase() {
    var p = window.location.pathname;
    if (/\/customer\//.test(p)) return assetBase() + "customer/";
    if (/\/user\//.test(p)) return assetBase() + "user/";
    return "customer/";
  }

  function layout() {
    return document.body.getAttribute("data-portal-layout") ||
      document.body.getAttribute("data-dash-layout") ||
      "customer";
  }

  function activeId() {
    return document.body.getAttribute("data-portal-active") ||
      document.body.getAttribute("data-dash-active") ||
      "";
  }

  function renderNav(items, active) {
    var base = portalBase();
    return items
      .map(function (item) {
        var cls = "portal-nav__link" + (item.id === active ? " is-active" : "");
        var cur = item.id === active ? ' aria-current="page"' : "";
        return (
          '<a href="' + base + item.href + '" class="' + cls + '"' + cur + ">" +
          (ICONS[item.icon] || "") + item.label + "</a>"
        );
      })
      .join("");
  }

  function renderSidebar() {
    var root = assetBase();
    var lay = layout();
    var active = activeId();
    var items = lay === "pandit" ? PANDIT_NAV : CUSTOMER_NAV;
    var badge = "";
    return (
      '<div class="portal-rail__card">' +
      '<a href="' + root + 'index" class="portal-rail__brand">' +
      '<img src="' + root + 'assets/logo/image.png" alt="Divine Center" width="120" height="64" />' +
      '<span class="portal-rail__tagline">Connecting Faith. Delivering Grace.</span>' +
      "</a>" +
      '<nav class="portal-nav" aria-label="Account">' +
      renderNav(items, active) +
      '<a href="' + root + 'login" class="portal-nav__link portal-nav__link--logout">' +
      ICONS.logout + "Logout</a></nav>" +
      (badge ? '<p class="portal-rail__badge">' + badge + "</p>" : "") +
      "</div>"
    );
  }

  function initSearch() {
    var form = document.getElementById("dash-search-form") || document.getElementById("portal-search-form");
    if (!form || form.dataset.bound) return;
    form.dataset.bound = "1";
    var root = assetBase();
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (form.querySelector("input") || {}).value || "";
      window.location.href = q.trim()
        ? root + "pandits?q=" + encodeURIComponent(q.trim())
        : root + "pandits";
    });
  }

  function mount() {
    document.body.classList.add("page-portal", "portal-app-shell");
    var side = document.getElementById("portal-sidebar") || document.getElementById("dash-sidebar");
    if (side) {
      side.className = "portal-rail";
      side.innerHTML = renderSidebar();
    }
    initSearch();
  }

  window.PortalShell = { mount: mount, assetBase: assetBase, portalBase: portalBase };

  document.addEventListener("DOMContentLoaded", mount);
})();
