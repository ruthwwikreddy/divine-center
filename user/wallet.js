/**
 * Pandit wallet — balance, stats, recent credits (demo)
 */
(function () {
  "use strict";

  var activeFilter = "all";

  var ICON_MONTH =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>';
  var ICON_PENDING =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2.5"/></svg>';
  var ICON_CHECK =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';
  var ICON_HOME =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>';
  var ICON_ONLINE =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M2 12h20"/></svg>';
  var ICON_USER =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>';

  var DEMO_STATS = [
    {
      label: "This month",
      value: "₹8.2k",
      trend: "3 rituals",
      up: true,
      tone: "green",
      hint: "Earned in Feb",
      icon: ICON_MONTH,
    },
    {
      label: "Pending",
      value: "₹1.2k",
      trend: "2 clearing",
      up: false,
      tone: "purple",
      hint: "After completion",
      icon: ICON_PENDING,
    },
  ];

  var DEMO_CREDITS = [
    {
      ritual: "Griha Pravesh",
      id: "DC-038",
      date: "28 Jan 2026",
      amount: 4200,
      devotee: "Rahul S.",
      mode: "Offline",
      year: "2026",
    },
    {
      ritual: "Namakaran",
      id: "DC-031",
      date: "15 Jan 2026",
      amount: 3400,
      devotee: "Meera K.",
      mode: "Offline",
      year: "2026",
    },
    {
      ritual: "Satyanarayan Puja",
      id: "DC-024",
      date: "8 Dec 2025",
      amount: 3850,
      devotee: "Aman P.",
      mode: "Online",
      year: "2025",
    },
  ];

  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }

  function formatInr(amount) {
    var n = Number(amount);
    if (!isFinite(n)) return "₹0";
    return "₹" + n.toLocaleString("en-IN");
  }

  function parseDateParts(dateStr) {
    var parts = (dateStr || "").trim().split(/\s+/);
    if (parts.length >= 2) {
      return { day: parts[0], month: parts[1].replace(/,$/, "") };
    }
    return { day: "—", month: "—" };
  }

  function creditMatchesFilter(c) {
    if (activeFilter === "all") return true;
    return c.year === activeFilter;
  }

  function sumCredits(credits) {
    return credits.reduce(function (sum, c) {
      return sum + (Number(c.amount) || 0);
    }, 0);
  }

  function renderStatCard(s) {
    var trendClass = s.up ? "dash-stat-card__trend--up" : "dash-stat-card__trend--down";
    var arrow = s.up ? "↑" : "↓";
    return (
      '<article class="dash-stat-card portal-stat-card portal-stat-card--' +
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
      "</span></div></article>"
    );
  }

  function renderStats() {
    var el = document.getElementById("pandit-wallet-stats");
    if (!el) return;
    el.innerHTML = DEMO_STATS.map(renderStatCard).join("");
  }

  function renderCreditCard(c) {
    var cal = parseDateParts(c.date);
    var idSlug = String(c.id).replace(/^#/, "");
    var bookingHref = "bookings/" + encodeURIComponent(idSlug);
    var modeIcon = c.mode === "Online" ? ICON_ONLINE : ICON_HOME;

    return (
      '<article class="portal-wallet-credit-card" role="listitem">' +
      '<div class="portal-wallet-credit-card__date-tile" aria-hidden="true">' +
      '<span class="portal-wallet-credit-card__month">' +
      esc(cal.month) +
      '</span><span class="portal-wallet-credit-card__day">' +
      esc(cal.day) +
      "</span></div>" +
      '<div class="portal-wallet-credit-card__main">' +
      '<div class="portal-wallet-credit-card__head">' +
      '<div class="portal-wallet-credit-card__title-block">' +
      '<h3 class="portal-wallet-credit-card__ritual">' +
      esc(c.ritual) +
      "</h3>" +
      '<p class="portal-wallet-credit-card__devotee">' +
      ICON_USER +
      "<span>" +
      esc(c.devotee) +
      "</span></p></div>" +
      '<p class="portal-wallet-credit-card__amount">+' +
      esc(formatInr(c.amount)) +
      "</p></div>" +
      '<div class="portal-wallet-credit-card__badges">' +
      '<span class="dash-badge dash-badge--confirmed">' +
      ICON_CHECK +
      " Credit posted</span>" +
      '<time class="portal-wallet-credit-card__when" datetime="' +
      esc(c.date) +
      '">' +
      esc(c.date) +
      "</time></div>" +
      '<div class="portal-wallet-credit-card__meta">' +
      '<span class="portal-wallet-credit-card__id">#' +
      esc(idSlug) +
      "</span>" +
      '<span class="portal-wallet-credit-card__mode">' +
      modeIcon +
      "<span>" +
      esc(c.mode) +
      "</span></span></div></div>" +
      '<footer class="portal-wallet-credit-card__foot">' +
      '<a href="' +
      esc(bookingHref) +
      '" class="portal-wallet-credit-card__link">View booking</a>' +
      '<span class="portal-wallet-credit-card__foot-note">Credited after ritual completion</span>' +
      "</footer></article>"
    );
  }

  function syncFilters() {
    var bar = document.getElementById("wallet-credits-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-wallet-credit-filter]").forEach(function (btn) {
      var on = btn.getAttribute("data-wallet-credit-filter") === activeFilter;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function renderCredits() {
    var list = document.getElementById("pandit-wallet-credits");
    if (!list) return;

    var items = DEMO_CREDITS.filter(creditMatchesFilter);
    var countEl = document.getElementById("wallet-credits-count");
    var totalEl = document.getElementById("wallet-credits-total");

    if (countEl) {
      countEl.textContent =
        items.length + (items.length === 1 ? " credit" : " credits");
    }
    if (totalEl) {
      totalEl.textContent = items.length
        ? "Showing " + formatInr(sumCredits(items))
        : "";
    }

    if (!items.length) {
      list.innerHTML =
        '<div class="portal-wallet-credits-empty">' +
        "<p>No credits match this filter.</p>" +
        '<button type="button" class="dash-btn dash-btn--outline" data-wallet-credit-filter-reset>Show all</button></div>';
      var reset = list.querySelector("[data-wallet-credit-filter-reset]");
      if (reset) {
        reset.addEventListener("click", function () {
          activeFilter = "all";
          syncFilters();
          renderCredits();
        });
      }
      return;
    }

    list.innerHTML = items.map(renderCreditCard).join("");
  }

  function wireFilters() {
    var bar = document.getElementById("wallet-credits-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-wallet-credit-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-wallet-credit-filter") || "all";
        syncFilters();
        renderCredits();
      });
    });
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
    renderStats();
    wireFilters();
    renderCredits();
    initSearch();
  });
})();
