/**
 * My Bookings — customer dashboard demo
 */
(function () {
  "use strict";

  var PLACEHOLDER = "assets/images/placeholders/pandit-avatar.svg";

  var DEMO_STATS = [
    { key: "total", label: "Total", value: 26, trend: 12, up: true, tone: "blue" },
    { key: "upcoming", label: "Upcoming", value: 3, trend: 5, up: true, tone: "green" },
    { key: "completed", label: "Completed", value: 18, trend: 7, up: true, tone: "purple" },
    { key: "cancelled", label: "Cancelled", value: 5, trend: 3, up: false, tone: "red" },
  ];

  var DEMO_BOOKINGS = [
    {
      pandit: "Me - Keeya Pathak",
      avatar: PLACEHOLDER,
      id: "#DC-001",
      mode: "Offline",
      status: "confirmed",
      datetime: "1 Jan 2025 at 8:05pm",
      address: "Address goes here",
    },
    {
      pandit: "Aman Pathak",
      avatar: PLACEHOLDER,
      id: "#DC-002",
      mode: "Online",
      status: "pending",
      datetime: "1 Jan 2025 at 8:15pm",
      address: "Address goes here",
    },
    {
      pandit: "Raman Pathak",
      avatar: PLACEHOLDER,
      id: "#DC-003",
      mode: "Offline",
      status: "cancelled",
      datetime: "1 Jan 2025 at 8:25pm",
      address: "Address goes here",
    },
  ];

  var STATUS_LABELS = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
  };

  var CALENDAR_SVG =
    '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function statIcon(tone) {
    return (
      '<span class="dash-stat-card__icon dash-stat-card__icon--' +
      esc(tone) +
      '">' +
      CALENDAR_SVG +
      "</span>"
    );
  }

  function renderStats() {
    var el = document.getElementById("dash-stats");
    if (!el) return;

    el.innerHTML = DEMO_STATS.map(function (s) {
      var trendClass = s.up ? "dash-stat-card__trend--up" : "dash-stat-card__trend--down";
      var arrow = s.up ? "↑" : "↓";
      return (
        '<article class="dash-stat-card">' +
        statIcon(s.tone) +
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
        s.trend +
        "%</span>" +
        '<span class="dash-stat-card__label">' +
        esc(s.label) +
        "</span></p></div></article>"
      );
    }).join("");
  }

  function renderBookings() {
    var tbody = document.getElementById("dash-bookings-full-body");
    if (!tbody) return;

    tbody.innerHTML = DEMO_BOOKINGS.map(function (b) {
      return (
        "<tr>" +
        '<td><div class="dash-pandit-cell">' +
        '<img src="' +
        esc(b.avatar) +
        '" alt="" width="36" height="36" loading="lazy" />' +
        "<span>" +
        esc(b.pandit) +
        "</span></div></td>" +
        '<td><div class="dash-id-cell">' +
        "<code>" +
        esc(b.id) +
        '</code><button type="button" class="dash-copy-btn" data-copy="' +
        esc(b.id) +
        '" aria-label="Copy booking ID">' +
        '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>' +
        "</button></div></td>" +
        "<td>" +
        esc(b.mode) +
        "</td>" +
        '<td><span class="dash-badge dash-badge--' +
        esc(b.status) +
        '">' +
        esc(STATUS_LABELS[b.status] || b.status) +
        "</span></td>" +
        "<td>" +
        esc(b.datetime) +
        "</td>" +
        '<td class="dash-table__address">' +
        esc(b.address) +
        "</td>" +
        '<td><div class="dash-actions-group">' +
        '<a href="dashboard-booking-detail?id=' +
        encodeURIComponent(b.id.replace("#", "")) +
        '" class="dash-action-btn dash-action-btn--view" aria-label="View booking">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>' +
        "</a>" +
        '<button type="button" class="dash-action-btn dash-action-btn--calendar" aria-label="Reschedule booking">' +
        CALENDAR_SVG +
        "</button>" +
        '<button type="button" class="dash-action-btn dash-action-btn--cancel" aria-label="Cancel booking">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>' +
        "</button></div></td>" +
        "</tr>"
      );
    }).join("");

    tbody.querySelectorAll(".dash-copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var text = btn.getAttribute("data-copy") || "";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.classList.add("is-copied");
            setTimeout(function () {
              btn.classList.remove("is-copied");
            }, 1500);
          });
        }
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
        window.location.href = "pandits?q=" + encodeURIComponent(q.trim());
      } else {
        window.location.href = "pandits";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderStats();
    renderBookings();
    initSearch();
  });
})();
