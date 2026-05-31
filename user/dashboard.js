/**
 * Pandit dashboard — stats, welcome sync, quick actions (demo)
 */
(function () {
  "use strict";

  var ICON_UPCOMING =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  var ICON_DONE =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/><circle cx="12" cy="12" r="9"/></svg>';
  var ICON_WALLET =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>';
  var ICON_PENDING =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2.5"/></svg>';

  var DEMO_STATS = [
    { label: "Upcoming", value: "12", trend: "3 this week", up: true, tone: "blue", hint: "Scheduled rituals", icon: ICON_UPCOMING, href: "bookings" },
    { label: "Completed", value: "48", trend: "7% growth", up: true, tone: "green", hint: "All time", icon: ICON_DONE, href: "bookings" },
    { label: "Wallet", value: "₹24.5k", trend: "₹8.2k this month", up: true, tone: "purple", hint: "Available balance", icon: ICON_WALLET, href: "wallet" },
    { label: "Pending", value: "4", trend: "Needs action", up: false, tone: "red", hint: "Accept or decline", icon: ICON_PENDING, href: "bookings/DC-042" },
  ];

  var QUICK_ACTIONS = [
    {
      href: "bookings",
      tone: "orange",
      title: "Bookings",
      desc: "Accept or decline devotee requests",
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>',
      meta: "4 pending",
    },
    {
      href: "availability-time",
      tone: "green",
      title: "Availability",
      desc: "Set weekly hours devotees can book",
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2.5"/></svg>',
      meta: "6 days open",
    },
    {
      href: "my-services",
      tone: "purple",
      title: "My services",
      desc: "Pricing and ritual offerings",
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>',
      meta: "Manage offerings",
    },
    {
      href: "wallet",
      tone: "blue",
      title: "Wallet",
      desc: "Earnings, credits, and withdrawals",
      icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
      meta: "₹24.5k balance",
    },
  ];

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function displayName() {
    var Demo = window.DivineCenterDemo;
    if (Demo && Demo.displayName) {
      var n = Demo.displayName();
      if (n) return n.replace(/\s*\(demo\)\s*$/i, "");
    }
    return "Panduranga";
  }

  function syncWelcome() {
    var name = displayName();
    var welcomeName = document.getElementById("pandit-welcome-name");
    var profile = document.getElementById("dash-profile-name");
    if (welcomeName) welcomeName.textContent = name;
    if (profile) profile.textContent = name;
  }

  function renderStatCard(s) {
    var trendClass = s.up ? "dash-stat-card__trend--up" : "dash-stat-card__trend--down";
    var arrow = s.up ? "↑" : "↓";
    return (
      '<a href="' +
      esc(s.href) +
      '" class="dash-stat-card portal-stat-card portal-stat-card--' +
      esc(s.tone) +
      '">' +
      '<span class="dash-stat-card__icon dash-stat-card__icon--' +
      esc(s.tone) +
      '">' +
      s.icon +
      "</span>" +
      '<div class="dash-stat-card__body">' +
      '<p class="dash-stat-card__value">' +
      s.value +
      "</p>" +
      '<p class="dash-stat-card__meta">' +
      '<span class="dash-stat-card__trend ' +
      trendClass +
      '">' +
      arrow +
      " " +
      esc(s.trend) +
      "</span>" +
      '<span class="dash-stat-card__label">' +
      esc(s.label) +
      "</span></p>" +
      '<span class="portal-stat-card__hint">' +
      esc(s.hint) +
      "</span></div></a>"
    );
  }

  function renderStats() {
    var el = document.getElementById("pandit-dash-stats");
    if (!el) return;
    el.innerHTML = DEMO_STATS.map(renderStatCard).join("");
  }

  var CHEVRON =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';

  function actionStat(meta) {
    var parts = String(meta).split(/\s+/);
    if (parts.length >= 2 && /^[\d₹]/.test(parts[0])) {
      return '<span class="portal-pandit-action__stat"><strong>' + esc(parts[0]) + "</strong><span>" + esc(parts.slice(1).join(" ")) + "</span></span>";
    }
    return '<span class="portal-pandit-action__stat"><span>' + esc(meta) + "</span></span>";
  }

  function renderActions() {
    var grid = document.getElementById("pandit-actions-grid");
    if (!grid) return;

    grid.innerHTML = QUICK_ACTIONS.map(function (a) {
      return (
        '<a href="' +
        esc(a.href) +
        '" class="portal-pandit-action portal-pandit-action--' +
        esc(a.tone) +
        '" role="listitem">' +
        '<div class="portal-pandit-action__top">' +
        '<span class="portal-pandit-action__icon" aria-hidden="true">' +
        a.icon +
        "</span>" +
        actionStat(a.meta) +
        "</div>" +
        '<div class="portal-pandit-action__copy">' +
        "<h3>" +
        esc(a.title) +
        "</h3>" +
        '<p class="portal-pandit-action__desc">' +
        esc(a.desc) +
        "</p></div>" +
        '<span class="portal-pandit-action__cta">Open ' +
        CHEVRON +
        "</span></a>"
      );
    }).join("");
  }

  function initSearch() {
    var form = document.getElementById("dash-search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (form.querySelector("input") || {}).value || "";
      if (q.trim()) {
        window.location.href = "../pandits?q=" + encodeURIComponent(q.trim());
      } else {
        window.location.href = "../pandits";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    syncWelcome();
    renderStats();
    renderActions();
    initSearch();
  });
})();
