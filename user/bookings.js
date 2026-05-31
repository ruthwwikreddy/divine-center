/**
 * Pandit bookings list — demo request cards
 */
(function () {
  "use strict";

  var activeFilter = "all";
  var searchQuery = "";

  var DEMO_BOOKINGS = [
    {
      id: "DC-042",
      devotee: "Rahul S.",
      ritual: "Griha Pravesh",
      date: "15 Feb 2026",
      time: "10:00 AM",
      slot: "Morning",
      mode: "Offline",
      status: "pending",
      amount: "₹4,200",
      location: "Banjara Hills, Hyderabad",
    },
    {
      id: "DC-038",
      devotee: "Meera K.",
      ritual: "Annaprashanna",
      date: "18 Feb 2026",
      time: "6:30 PM",
      slot: "Evening",
      mode: "Offline",
      status: "confirmed",
      amount: "₹3,850",
      location: "Jubilee Hills, Hyderabad",
    },
    {
      id: "DC-035",
      devotee: "Aman P.",
      ritual: "Namakaran",
      date: "22 Feb 2026",
      time: "9:00 AM",
      slot: "Morning",
      mode: "Online",
      status: "confirmed",
      amount: "₹4,033",
      location: "Video call",
    },
  ];

  var STATUS_LABELS = {
    pending: "Pending",
    confirmed: "Confirmed",
    cancelled: "Cancelled",
  };

  var MODE_ICON_HOME =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>';
  var MODE_ICON_ONLINE =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>';

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function parseDateParts(dateStr) {
    var parts = (dateStr || "").trim().split(/\s+/);
    if (parts.length >= 2) {
      return { day: parts[0], month: parts[1].replace(/,$/, "") };
    }
    return { day: "—", month: "—" };
  }

  function bookingMatchesFilter(b) {
    if (activeFilter !== "all" && b.status !== activeFilter) return false;
    if (!searchQuery) return true;
    var q = searchQuery.toLowerCase();
    var hay =
      (b.devotee || "") +
      " " +
      (b.ritual || "") +
      " " +
      (b.id || "") +
      " " +
      (b.location || "");
    return hay.toLowerCase().indexOf(q) !== -1;
  }

  function renderStats() {
    var el = document.getElementById("pandit-bookings-stats");
    if (!el) return;

    var pending = DEMO_BOOKINGS.filter(function (b) {
      return b.status === "pending";
    }).length;
    var confirmed = DEMO_BOOKINGS.filter(function (b) {
      return b.status === "confirmed";
    }).length;

    el.innerHTML =
      '<li class="portal-pandit-bookings-hub__stat portal-pandit-bookings-hub__stat--pending"><strong>' +
      pending +
      '</strong><span>Pending</span></li>' +
      '<li class="portal-pandit-bookings-hub__stat portal-pandit-bookings-hub__stat--confirmed"><strong>' +
      confirmed +
      '</strong><span>Confirmed</span></li>' +
      '<li class="portal-pandit-bookings-hub__stat"><strong>' +
      DEMO_BOOKINGS.length +
      '</strong><span>Total shown</span></li>' +
      '<li class="portal-pandit-bookings-hub__stat portal-pandit-bookings-hub__stat--earn"><strong>₹12k+</strong><span>Earnings</span></li>';
  }

  function renderRequestCard(b) {
    var cal = parseDateParts(b.date);
    var badgeTone =
      b.status === "confirmed" ? "confirmed" : b.status === "cancelled" ? "cancelled" : "pending";
    var detailHref = "bookings/" + encodeURIComponent(b.id);
    var modeIcon = b.mode === "Online" ? MODE_ICON_ONLINE : MODE_ICON_HOME;
    var isPending = b.status === "pending";

    var actions =
      '<a href="' +
      esc(detailHref) +
      '" class="portal-pandit-request__btn portal-pandit-request__btn--primary">View details</a>';
    if (isPending) {
      actions +=
        '<button type="button" class="portal-pandit-request__btn portal-pandit-request__btn--accept" data-demo-action data-demo-message="Booking accepted — devotee will be notified.">Accept</button>' +
        '<button type="button" class="portal-pandit-request__btn portal-pandit-request__btn--decline" data-demo-action data-demo-message="Booking declined — removed from your queue.">Decline</button>';
    }

    return (
      '<article class="portal-pandit-request portal-pandit-request--' +
      esc(b.status) +
      (isPending ? " portal-pandit-request--highlight" : "") +
      '" role="listitem" data-booking-id="' +
      esc(b.id) +
      '">' +
      (isPending
        ? '<p class="portal-pandit-request__alert"><span class="portal-pandit-request__alert-dot" aria-hidden="true"></span>Needs your response</p>'
        : "") +
      '<div class="portal-pandit-request__body">' +
      '<div class="portal-pandit-request__date" aria-hidden="true">' +
      '<span class="portal-pandit-request__month">' +
      esc(cal.month) +
      '</span><span class="portal-pandit-request__day">' +
      esc(cal.day) +
      "</span></div>" +
      '<div class="portal-pandit-request__main">' +
      '<header class="portal-pandit-request__head">' +
      '<div class="portal-pandit-request__devotee">' +
      '<span class="portal-pandit-request__avatar" aria-hidden="true">' +
      esc((b.devotee || "?").charAt(0)) +
      "</span>" +
      "<div><strong>" +
      esc(b.devotee) +
      '</strong><span class="portal-pandit-request__id">#' +
      esc(b.id) +
      "</span></div></div>" +
      '<span class="portal-pandit-request__badge portal-pandit-request__badge--' +
      badgeTone +
      '">' +
      esc(STATUS_LABELS[b.status] || b.status) +
      "</span></header>" +
      "<h3>" +
      esc(b.ritual) +
      "</h3>" +
      '<ul class="portal-pandit-request__meta">' +
      "<li>" +
      modeIcon +
      "<span>" +
      esc(b.mode) +
      " · " +
      esc(b.slot) +
      "</span></li>" +
      "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/></svg><span>" +
      esc(b.location) +
      "</span></li>" +
      "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><rect x=\"3\" y=\"4\" width=\"18\" height=\"18\" rx=\"2\"/><path d=\"M16 2v4M8 2v4M3 10h18\"/></svg><span>" +
      esc(b.date) +
      " · " +
      esc(b.time) +
      "</span></li></ul>" +
      '<div class="portal-pandit-request__chips">' +
      '<span class="portal-pandit-request__chip portal-pandit-request__chip--earn">' +
      esc(b.amount || "Custom") +
      "</span>" +
      '<span class="portal-pandit-request__chip">' +
      esc(b.mode) +
      "</span></div></div></div>" +
      '<footer class="portal-pandit-request__foot">' +
      actions +
      "</footer></article>"
    );
  }

  function syncFilters() {
    var bar = document.getElementById("pandit-bookings-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-pandit-booking-filter]").forEach(function (btn) {
      var on = btn.getAttribute("data-pandit-booking-filter") === activeFilter;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function renderList() {
    var list = document.getElementById("pandit-bookings-list");
    if (!list) return;

    var items = DEMO_BOOKINGS.filter(bookingMatchesFilter);
    var countEl = document.getElementById("pandit-bookings-count");

    if (countEl) {
      countEl.textContent =
        items.length +
        (items.length === 1 ? " request" : " requests") +
        (activeFilter !== "all" || searchQuery ? " shown" : "");
    }

    if (!items.length) {
      list.innerHTML =
        '<div class="portal-pandit-bookings-empty">' +
        '<span class="portal-pandit-bookings-empty__icon" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>' +
        "<p>No requests match this filter.</p>" +
        '<button type="button" class="dash-btn dash-btn--outline" data-pandit-booking-filter-reset>Clear filters</button></div>';
      var reset = list.querySelector("[data-pandit-booking-filter-reset]");
      if (reset) {
        reset.addEventListener("click", function () {
          activeFilter = "all";
          searchQuery = "";
          var searchInput = document.getElementById("pandit-bookings-search");
          if (searchInput) searchInput.value = "";
          syncFilters();
          renderList();
        });
      }
      return;
    }

    list.innerHTML = items.map(renderRequestCard).join("");
  }

  function initFilters() {
    var bar = document.getElementById("pandit-bookings-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-pandit-booking-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-pandit-booking-filter") || "all";
        syncFilters();
        renderList();
      });
    });

    var searchInput = document.getElementById("pandit-bookings-search");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        function () {
          searchQuery = (searchInput.value || "").trim();
          renderList();
        },
        { passive: true }
      );
    }
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
    initFilters();
    syncFilters();
    renderList();
    initSearch();
  });
})();
