/**
 * Booking status / order details — customer dashboard demo
 */
(function () {
  "use strict";

  var STEPS = [
    { label: "Booking Received", state: "done" },
    { label: "Details Verified", state: "done" },
    { label: "Pandit Assigning In Process", state: "active" },
    { label: "Puja Scheduled", state: "pending" },
    { label: "Puja Completed", state: "pending" },
  ];

  var SAMAGRI = [
    {
      title: "Puja Items",
      items: ["Kalash", "Ganga jal", "Betel leaves / nuts", "Raw rice", "Turmeric", "Kumkum", "Sandalwood paste", "Incense", "Camphor", "Oil lamp"],
    },
    {
      title: "Offerings",
      items: ["Fruits", "Sweets", "Milk", "Honey", "Curd", "Sugar", "Coconut"],
    },
    {
      title: "Clothing & Ritual Items",
      items: ["New clothes for the baby", "White cloth / asan mat", "Flowers / garlands", "Sacred thread"],
    },
    {
      title: "Havan Items (if performed)",
      items: ["Havan kund", "Samidha (wood)", "Ghee", "Havan samagri"],
    },
    {
      title: "Miscellaneous",
      items: ["Plate / bowls", "Spoon", "Bell", "Matchbox"],
    },
  ];

  var PAYMENT = [
    ["Charges", "₹3,500.00"],
    ["Discount", "₹0.00"],
    ["Platform Fee", "₹200.00"],
    ["GST (18%)", "₹333.00"],
    ["Total", "₹4,033.00", true],
  ];

  var CHECK_SVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';

  var SPIN_SVG =
    '<svg class="dash-stepper__spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12a9 9 0 11-6.22-8.56"/><path d="M21 3v6h-6"/></svg>';

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderStepper() {
    var el = document.getElementById("booking-stepper");
    if (!el) return;

    el.innerHTML = STEPS.map(function (step, i) {
      var isLast = i === STEPS.length - 1;
      var lineClass = "dash-stepper__line " + (i === 0 ? "dash-stepper__line--solid" : "dash-stepper__line--dashed");

      var marker = "";
      if (step.state === "done") {
        marker =
          '<span class="dash-stepper__dot dash-stepper__dot--done">' + CHECK_SVG + "</span>";
      } else if (step.state === "active") {
        marker = '<span class="dash-stepper__dot dash-stepper__dot--active" aria-current="step"></span>';
      } else {
        marker = '<span class="dash-stepper__dot dash-stepper__dot--pending"></span>';
      }

      var spin = step.state === "active" ? SPIN_SVG : "";

      return (
        '<li class="dash-stepper__item dash-stepper__item--' +
        esc(step.state) +
        '">' +
        '<div class="dash-stepper__track">' +
        marker +
        (!isLast ? '<span class="' + lineClass + '" aria-hidden="true"></span>' : "") +
        "</div>" +
        '<p class="dash-stepper__label">' +
        esc(step.label) +
        spin +
        "</p></li>"
      );
    }).join("");
  }

  function renderSamagri() {
    var el = document.getElementById("booking-samagri");
    if (!el) return;

    el.innerHTML = SAMAGRI.map(function (group) {
      return (
        '<div class="dash-samagri__group">' +
        '<h3 class="dash-samagri__heading">' +
        esc(group.title) +
        "</h3><ul>" +
        group.items
          .map(function (item) {
            return (
              '<li><span class="dash-samagri__check" aria-hidden="true">' +
              CHECK_SVG +
              "</span>" +
              esc(item) +
              "</li>"
            );
          })
          .join("") +
        "</ul></div>"
      );
    }).join("");
  }

  function renderPayment() {
    var el = document.getElementById("booking-payment");
    if (!el) return;

    el.innerHTML = PAYMENT.map(function (row) {
      var isTotal = row[2];
      return (
        '<div class="dash-payment__row' +
        (isTotal ? " dash-payment__row--total" : "") +
        '">' +
        "<dt>" +
        esc(row[0]) +
        "</dt><dd>" +
        esc(row[1]) +
        "</dd></div>"
      );
    }).join("");
  }

  function initCopy() {
    document.querySelectorAll(".dash-copy-btn").forEach(function (btn) {
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
      window.location.href = q.trim() ? "pandits?q=" + encodeURIComponent(q.trim()) : "pandits";
    });
  }

  function applyQueryParams() {
    var params = new URLSearchParams(window.location.search);
    var id = params.get("id") || "#DC-001";
    if (id.indexOf("#") !== 0) id = "#" + id;

    var idEl = document.getElementById("booking-id");
    var crumbEl = document.getElementById("booking-crumb-id");
    var copyBtn = document.querySelector(".dash-status-card .dash-copy-btn");

    if (idEl) idEl.textContent = id;
    if (crumbEl) crumbEl.textContent = id;
    if (copyBtn) copyBtn.setAttribute("data-copy", id);
  }

  document.addEventListener("DOMContentLoaded", function () {
    applyQueryParams();
    renderStepper();
    renderSamagri();
    renderPayment();
    initCopy();
    initSearch();
  });
})();
