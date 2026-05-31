/**
 * Pandit withdrawals — stats, request form, history (demo)
 */
(function () {
  "use strict";

  var ICON_AVAILABLE =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>';
  var ICON_LAST =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';
  var CAL_ICON =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  var BANK_ICON =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>';

  var DEMO_STATS = [
    { label: "Available", value: "₹24.5k", trend: "Ready to withdraw", up: true, tone: "green", hint: "Wallet balance", icon: ICON_AVAILABLE },
    { label: "Last withdrawal", value: "₹10k", trend: "20 Jan 2026", up: true, tone: "blue", hint: "HDFC ·•4521", icon: ICON_LAST },
  ];

  var DEMO_WITHDRAWALS = [
    { id: "WD-104", date: "20 Jan 2026", amount: "₹10,000", status: "completed", bank: "HDFC Bank ·•4521", eta: "Credited same day" },
    { id: "WD-099", date: "5 Jan 2026", amount: "₹8,500", status: "completed", bank: "HDFC Bank ·•4521", eta: "Credited within 24h" },
    { id: "WD-091", date: "18 Dec 2025", amount: "₹12,000", status: "completed", bank: "HDFC Bank ·•4521", eta: "Credited same day" },
  ];

  var STATUS_LABELS = { completed: "Completed", processing: "Processing", failed: "Failed" };

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
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
    var el = document.getElementById("pandit-withdrawals-stats");
    if (!el) return;
    el.innerHTML = DEMO_STATS.map(renderStatCard).join("");
  }

  function renderWithdrawals() {
    var list = document.getElementById("pandit-withdrawals-list");
    if (!list) return;

    list.innerHTML = DEMO_WITHDRAWALS.map(function (w) {
      var badgeTone = w.status === "completed" ? "confirmed" : w.status === "failed" ? "cancelled" : "pending";
      return (
        '<article class="portal-withdrawal-card portal-withdrawal-card--' +
        esc(w.status) +
        '" role="listitem">' +
        '<div class="portal-withdrawal-card__date">' +
        CAL_ICON +
        "<div><time>" +
        esc(w.date) +
        '</time><span class="portal-withdrawal-card__ref">' +
        esc(w.id) +
        "</span></div></div>" +
        '<div class="portal-withdrawal-card__body">' +
        '<div class="portal-withdrawal-card__top">' +
        '<span class="dash-badge dash-badge--' +
        badgeTone +
        '">' +
        esc(STATUS_LABELS[w.status] || w.status) +
        "</span>" +
        '<p class="portal-withdrawal-card__eta">' +
        esc(w.eta) +
        "</p></div>" +
        '<p class="portal-withdrawal-card__bank">' +
        BANK_ICON +
        " " +
        esc(w.bank) +
        "</p></div>" +
        '<p class="portal-withdrawal-card__amount">' +
        esc(w.amount) +
        "</p></article>"
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

  var AVAIL_MAX = 24500;
  var MIN_WITHDRAW = 500;

  function formatInr(n) {
    var num = Number(n);
    if (!isFinite(num)) return "₹0";
    return "₹" + Math.round(num).toLocaleString("en-IN");
  }

  function clampAmount(value) {
    var n = Math.round(Number(value) || 0);
    if (n < MIN_WITHDRAW) return MIN_WITHDRAW;
    if (n > AVAIL_MAX) return AVAIL_MAX;
    return n;
  }

  function syncAmountInputs(amount) {
    var input = document.getElementById("withdrawal-amount");
    var range = document.getElementById("withdrawal-amount-range");
    var val = clampAmount(amount);
    if (input) input.value = String(val);
    if (range) range.value = String(val);
    updatePreview(val);
  }

  function updatePreview(amount) {
    var val = clampAmount(amount);
    var previewAmount = document.getElementById("withdraw-preview-amount");
    var previewNet = document.getElementById("withdraw-preview-net");
    var formatted = formatInr(val);
    if (previewAmount) previewAmount.textContent = formatted;
    if (previewNet) previewNet.textContent = formatted;
  }

  function wireAmountControls() {
    var input = document.getElementById("withdrawal-amount");
    var range = document.getElementById("withdrawal-amount-range");
    if (!input) return;

    input.addEventListener("input", function () {
      syncAmountInputs(input.value);
    });
    input.addEventListener("change", function () {
      syncAmountInputs(input.value);
    });

    if (range) {
      range.addEventListener("input", function () {
        syncAmountInputs(range.value);
      });
    }

    document.querySelectorAll("[data-withdraw-preset]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var preset = btn.getAttribute("data-withdraw-preset");
        var amount =
          preset === "max" ? AVAIL_MAX : clampAmount(parseInt(preset, 10));
        syncAmountInputs(amount);
      });
    });

    syncAmountInputs(input.value);
  }

  function initRequestForm() {
    var form = document.getElementById("pandit-withdrawals-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var input = document.getElementById("withdrawal-amount");
      var amount = clampAmount(input ? input.value : 0);

      if (input) input.value = String(amount);

      var note = document.getElementById("withdrawals-request-note");
      if (note) {
        note.hidden = false;
        note.textContent =
          "Withdrawal of " +
          formatInr(amount) +
          " queued. Check history for status.";
      }

      if (window.DivineCenterDemo && window.DivineCenterDemo.showToast) {
        window.DivineCenterDemo.showToast(
          "Payout request submitted."
        );
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderStats();
    renderWithdrawals();
    initSearch();
    wireAmountControls();
    initRequestForm();
  });
})();
