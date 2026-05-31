/**
 * Payments — customer billing demo
 */
(function () {
  "use strict";

  var activeFilter = "all";

  var DEMO_PAYMENTS = [
    {
      id: "DC-001",
      ritual: "Annaprashanna",
      pandit: "Keeya Pathak",
      date: "30 Jan 2026",
      time: "6:23 PM",
      amount: "₹4,033",
      status: "paid",
      method: "UPI · PhonePe",
      invoice: "INV-2026-001",
    },
    {
      id: "DC-002",
      ritual: "Namakaran",
      pandit: "Aman Pathak",
      date: "12 Jun 2026",
      time: "2:10 PM",
      amount: "₹3,850",
      status: "pending",
      method: "Card · Visa",
      invoice: "INV-2026-002",
    },
    {
      id: "DC-018",
      ritual: "Griha Pravesh",
      pandit: "Raman Pathak",
      date: "18 Nov 2025",
      time: "9:00 AM",
      amount: "₹4,500",
      status: "paid",
      method: "Net banking",
      invoice: "INV-2025-018",
    },
  ];

  var STATUS_LABELS = {
    paid: "Paid",
    pending: "Pending",
    refunded: "Refunded",
  };

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

  function mergeLastPayment(payments) {
    var Demo = window.DivineCenterDemo;
    if (!Demo || !Demo.getLastBooking) return payments;
    var last = Demo.getLastBooking();
    if (!last || !last.pujaTitle) return payments;

    var copy = payments.slice();
    var exists = copy.some(function (p) {
      return String(p.id).replace(/^#/, "") === String(last.id || "").replace(/^#/, "");
    });
    if (exists) return copy;

    copy.unshift({
      id: String(last.id || "DC-001").replace(/^#/, ""),
      ritual: last.pujaTitle,
      pandit: last.panditName || "Assigning pandit…",
      date: last.date && Demo.formatDate ? Demo.formatDate(last.date) : "Feb 2026",
      time: "10:00 AM",
      amount: last.amount || "₹4,033",
      status: "pending",
      method: "UPI · Demo",
      invoice: "INV-2026-NEW",
    });
    return copy;
  }

  function paymentMatchesFilter(p) {
    if (activeFilter === "all") return true;
    return p.status === activeFilter;
  }

  function renderPaymentCard(p) {
    var idLabel = "#" + String(p.id).replace(/^#/, "");
    var cal = parseDateParts(p.date);
    var detailHref =
      "booking-detail?id=" + encodeURIComponent(String(p.id).replace(/^#/, ""));

    return (
      '<article class="portal-record-card portal-record-card--payment portal-record-card--' +
      esc(p.status) +
      '" role="listitem">' +
      '<a href="' +
      esc(detailHref) +
      '" class="portal-record-card__link">' +
      '<span class="portal-record-card__date" aria-hidden="true">' +
      '<span class="portal-record-card__month">' +
      esc(cal.month) +
      '</span><span class="portal-record-card__day">' +
      esc(cal.day) +
      "</span></span>" +
      '<span class="portal-record-card__body">' +
      '<strong class="portal-record-card__title">' +
      esc(p.ritual) +
      "</strong>" +
      '<span class="portal-record-card__meta">' +
      esc(p.pandit) +
      " · " +
      esc(p.invoice) +
      "</span>" +
      '<span class="portal-record-card__detail">' +
      esc(p.date) +
      " · " +
      esc(p.method) +
      "</span></span>" +
      '<span class="portal-record-card__end">' +
      '<span class="portal-record-card__badge portal-record-card__badge--' +
      esc(p.status) +
      '">' +
      esc(STATUS_LABELS[p.status] || p.status) +
      "</span>" +
      '<span class="portal-record-card__amount">' +
      esc(p.amount) +
      "</span></span></a>" +
      '<footer class="portal-record-card__foot">' +
      '<span class="portal-record-card__ref">' +
      esc(idLabel) +
      '<button type="button" class="dash-copy-btn portal-record-card__copy" data-copy="' +
      esc(idLabel) +
      '" aria-label="Copy booking ID">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/></svg>' +
      "</button></span>" +
      '<button type="button" class="portal-record-card__foot-btn" data-demo-action aria-label="Download invoice">Download invoice</button>' +
      "</footer></article>"
    );
  }

  function wireCopyButtons(root) {
    root.querySelectorAll(".dash-copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        e.stopPropagation();
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

  function renderPayments() {
    var list = document.getElementById("dash-payments-body");
    if (!list) return;

    var items = mergeLastPayment(DEMO_PAYMENTS).filter(paymentMatchesFilter);
    var countEl = document.getElementById("dash-payments-count");

    if (countEl) {
      countEl.textContent =
        items.length +
        (items.length === 1 ? " transaction" : " transactions") +
        (activeFilter !== "all" ? " shown" : "");
    }

    if (!items.length) {
      list.innerHTML =
        '<div class="portal-hub-empty">' +
        '<span class="portal-hub-empty__icon" aria-hidden="true">' +
        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>' +
        "</span>" +
        "<p>No payments match this filter.</p>" +
        '<button type="button" class="dash-btn dash-btn--outline" data-payment-filter-reset>Show all</button></div>';
      var reset = list.querySelector("[data-payment-filter-reset]");
      if (reset) {
        reset.addEventListener("click", function () {
          activeFilter = "all";
          syncFilters();
          renderPayments();
        });
      }
      return;
    }

    list.innerHTML = items.map(renderPaymentCard).join("");
    wireCopyButtons(list);
  }

  function syncFilters() {
    var bar = document.getElementById("dash-payments-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-payment-filter]").forEach(function (btn) {
      var on = btn.getAttribute("data-payment-filter") === activeFilter;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function initFilters() {
    var bar = document.getElementById("dash-payments-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-payment-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-payment-filter") || "all";
        syncFilters();
        renderPayments();
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
    initFilters();
    renderPayments();
    initSearch();
  });
})();
