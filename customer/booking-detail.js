/**
 * Customer booking detail — status, progress, samagri, payment (demo)
 */
(function () {
  "use strict";

  var STEPS = [
    { label: "Booking received", state: "done" },
    { label: "Details verified", state: "done" },
    { label: "Pandit assigning", state: "active" },
    { label: "Puja scheduled", state: "pending" },
    { label: "Puja completed", state: "pending" },
  ];

  var SAMAGRI = [
    {
      title: "Puja items",
      items: ["Kalash", "Ganga jal", "Betel leaves / nuts", "Raw rice", "Turmeric", "Kumkum", "Sandalwood paste", "Incense", "Camphor", "Oil lamp"],
    },
    {
      title: "Offerings",
      items: ["Fruits", "Sweets", "Milk", "Honey", "Curd", "Sugar", "Coconut"],
    },
    {
      title: "Clothing & ritual items",
      items: ["New clothes for the baby", "White cloth / asan mat", "Flowers / garlands", "Sacred thread"],
    },
    {
      title: "Havan items (if performed)",
      items: ["Havan kund", "Samidha (wood)", "Ghee", "Havan samagri"],
    },
    {
      title: "Miscellaneous",
      items: ["Plate / bowls", "Spoon", "Bell", "Matchbox"],
    },
  ];

  var PAYMENT = [
    ["Ritual charges", "₹3,500.00"],
    ["Discount", "₹0.00"],
    ["Platform fee", "₹200.00"],
    ["GST (18%)", "₹333.00"],
    ["Total paid", "₹4,033.00", true],
  ];

  var CHECK_SVG =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';

  var SPIN_SVG =
    '<svg class="portal-booking-detail__spin" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 12a9 9 0 11-6.22-8.56"/><path d="M21 3v6h-6"/></svg>';

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
      var lineClass =
        "portal-booking-detail__step-line " +
        (i < 2 ? "portal-booking-detail__step-line--solid" : "portal-booking-detail__step-line--dashed");

      var marker = "";
      if (step.state === "done") {
        marker =
          '<span class="portal-booking-detail__step-dot portal-booking-detail__step-dot--done">' +
          CHECK_SVG +
          "</span>";
      } else if (step.state === "active") {
        marker =
          '<span class="portal-booking-detail__step-dot portal-booking-detail__step-dot--active" aria-current="step"></span>';
      } else {
        marker = '<span class="portal-booking-detail__step-dot portal-booking-detail__step-dot--pending"></span>';
      }

      var spin = step.state === "active" ? SPIN_SVG : "";

      return (
        '<li class="portal-booking-detail__step portal-booking-detail__step--' +
        esc(step.state) +
        '">' +
        '<div class="portal-booking-detail__step-track">' +
        marker +
        (!isLast ? '<span class="' + lineClass + '" aria-hidden="true"></span>' : "") +
        "</div>" +
        '<p class="portal-booking-detail__step-label">' +
        esc(step.label) +
        spin +
        "</p></li>"
      );
    }).join("");
    syncHeroStatus();
  }

  function syncHeroStatus() {
    var statusEl = document.getElementById("booking-hero-status");
    if (!statusEl) return;

    var activeIdx = -1;
    for (var i = 0; i < STEPS.length; i++) {
      if (STEPS[i].state === "active") {
        activeIdx = i;
        break;
      }
    }
    if (activeIdx < 0) activeIdx = 2;

    var step = activeIdx + 1;
    var total = STEPS.length;
    var pct = Math.round((step / total) * 100);

    statusEl.setAttribute("data-booking-step", String(step));
    statusEl.setAttribute("data-booking-steps", String(total));

    var numEl = document.getElementById("booking-status-step-num");
    if (numEl) numEl.textContent = step + "/" + total;

    var track = document.getElementById("booking-status-track");
    if (track) track.style.width = pct + "%";

    var stepEl = document.getElementById("booking-hero-step");
    if (stepEl) {
      var label = (STEPS[activeIdx] && STEPS[activeIdx].label) || "In progress";
      stepEl.textContent = "Step " + step + " of " + total + " · " + label;
    }

    var milestones = statusEl.querySelectorAll(".portal-booking-hero-status__milestones li");
    milestones.forEach(function (li, i) {
      li.classList.remove("is-done", "is-active");
      if (i < activeIdx) li.classList.add("is-done");
      else if (i === activeIdx) li.classList.add("is-active");
    });
  }

  function renderSamagri() {
    var el = document.getElementById("booking-samagri");
    if (!el) return;

    el.innerHTML = SAMAGRI.map(function (group, i) {
      return (
        '<details class="portal-booking-detail__samagri-group"' +
        (i === 0 ? " open" : "") +
        ">" +
        '<summary class="portal-booking-detail__samagri-summary">' +
        '<span class="portal-booking-detail__samagri-title">' +
        esc(group.title) +
        "</span>" +
        '<span class="portal-booking-detail__samagri-count">' +
        group.items.length +
        " items</span>" +
        '<svg class="portal-booking-detail__samagri-chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>' +
        "</summary>" +
        '<ul class="portal-booking-detail__samagri-list">' +
        group.items
          .map(function (item) {
            return (
              '<li><span class="portal-booking-detail__samagri-check" aria-hidden="true">' +
              CHECK_SVG +
              "</span>" +
              esc(item) +
              "</li>"
            );
          })
          .join("") +
        "</ul></details>"
      );
    }).join("");
  }

  function renderPayment() {
    var el = document.getElementById("booking-payment");
    if (!el) return;

    el.innerHTML = PAYMENT.map(function (row) {
      var isTotal = row[2];
      return (
        '<div class="portal-booking-detail__pay-row' +
        (isTotal ? " portal-booking-detail__pay-row--total" : "") +
        '">' +
        "<span>" +
        esc(row[0]) +
        "</span><strong>" +
        esc(row[1]) +
        "</strong></div>"
      );
    }).join("");
  }

  function renderMap(address) {
    var el = document.getElementById("booking-map");
    if (!el) return;
    var q = encodeURIComponent(address || "Banjara Hills, Hyderabad, Telangana");
    el.innerHTML =
      '<iframe title="Puja location map" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen src="https://www.google.com/maps?q=' +
      q +
      '&output=embed"></iframe>';
  }

  function parseHeroDate(dateStr) {
    if (!dateStr) return { month: "Feb", day: "15" };
    var parts = String(dateStr).trim().split(/\s+/);
    if (parts.length >= 2) {
      return { month: parts[1].replace(/,$/, ""), day: parts[0] };
    }
    return { month: "—", day: "—" };
  }

  function setHeroDate(formatted) {
    var cal = parseHeroDate(formatted);
    var monthEl = document.getElementById("booking-hero-month");
    var dayEl = document.getElementById("booking-hero-day");
    if (monthEl) monthEl.textContent = cal.month;
    if (dayEl) dayEl.textContent = cal.day;
  }

  function buildSamagriExportText() {
    var lines = ["Puja Samagri Checklist", "Divine Center", ""];
    var idEl = document.getElementById("booking-id");
    var pujaEl = document.getElementById("booking-puja");
    var schedEl = document.getElementById("booking-scheduled-hero");

    if (idEl) lines.push("Booking: " + idEl.textContent.trim());
    if (pujaEl) lines.push("Ritual: " + pujaEl.textContent.trim());
    if (schedEl) lines.push("Date: " + schedEl.textContent.trim());
    lines.push("");

    SAMAGRI.forEach(function (group) {
      lines.push(group.title);
      group.items.forEach(function (item) {
        lines.push("[ ] " + item);
      });
      lines.push("");
    });

    lines.push("Note: Your pandit may adjust the list based on tradition and location.");
    return lines.join("\n");
  }

  function exportSamagri() {
    var text = buildSamagriExportText();
    var idRaw = (document.getElementById("booking-id") || {}).textContent || "booking";
    var safeId = idRaw.replace(/[^a-zA-Z0-9-]/g, "") || "booking";
    var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var link = document.createElement("a");
    link.href = url;
    link.download = "samagri-" + safeId + ".txt";
    link.click();
    URL.revokeObjectURL(url);
  }

  function initSamagriExport() {
    var btn = document.getElementById("booking-samagri-export");
    if (!btn) return;

    var defaultLabel = btn.innerHTML;

    btn.addEventListener("click", function () {
      exportSamagri();
      btn.classList.add("is-exported");
      btn.innerHTML =
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg> Downloaded';
      window.setTimeout(function () {
        btn.classList.remove("is-exported");
        btn.innerHTML = defaultLabel;
      }, 2000);
    });
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
      window.location.href = q.trim()
        ? "../pandits?q=" + encodeURIComponent(q.trim())
        : "../pandits";
    });
  }

  function applyQueryParams() {
    var params = new URLSearchParams(window.location.search);
    var rawId = params.get("id") || "DC-001";
    var id = rawId.indexOf("#") === 0 ? rawId : "#" + rawId;

    var idEl = document.getElementById("booking-id");
    var copyBtn = document.querySelector(".portal-booking-hero-main__id-row .dash-copy-btn");

    if (idEl) idEl.textContent = id;
    if (copyBtn) copyBtn.setAttribute("data-copy", id);

    var Demo = window.DivineCenterDemo;
    var b = Demo && Demo.getLastBooking ? Demo.getLastBooking() : null;
    var match =
      b && rawId.replace(/^#/, "") === String(b.id || "DC-001").replace(/^#/, "");

    var pujaEl = document.getElementById("booking-puja");
    var tagEl = document.getElementById("booking-puja-tag");
    if (match && b.pujaTitle) {
      if (pujaEl) pujaEl.textContent = b.pujaTitle;
      if (tagEl) tagEl.textContent = b.pujaTitle;
    }

    var sched = document.getElementById("booking-scheduled");
    var schedHero = document.getElementById("booking-scheduled-hero");
    var formatted = schedHero ? schedHero.textContent : "";
    if (match && b.date && Demo.formatDate) {
      formatted = Demo.formatDate(b.date);
      if (sched) sched.textContent = formatted;
      if (schedHero) schedHero.textContent = formatted;
    }
    if (formatted) setHeroDate(formatted);

    var modeEl = document.getElementById("booking-mode");
    if (modeEl && match && b.mode) {
      var slot = b.slot ? " · " + b.slot : " · Morning";
      modeEl.textContent = b.mode + slot;
    }

    var amount = "₹4,033";
    if (match && b.amount) amount = b.amount;
    var amountEl = document.getElementById("booking-amount-hero");
    var amountBanner = document.getElementById("booking-amount-hero-banner");
    if (amountEl) amountEl.textContent = amount;
    if (amountBanner) amountBanner.textContent = amount;

    var session = Demo && Demo.getAuthSession && Demo.getAuthSession();
    var cust = document.getElementById("booking-customer-name");
    if (cust && session && Demo.displayName) {
      var dn = Demo.displayName(session);
      if (dn) cust.textContent = dn.replace(/\s*\(demo\)\s*$/i, "") + " Sharma";
    }

    if (session && session.phone) {
      var phone = document.getElementById("booking-customer-phone");
      if (phone) phone.textContent = session.phone;
    }

    var addr = document.getElementById("booking-customer-address");
    var mapAddr = "Banjara Hills, Hyderabad, Telangana";
    if (addr) renderMap(addr.textContent || mapAddr);
    else renderMap(mapAddr);

    var helpLink = document.getElementById("booking-hero-help-link");
    if (helpLink) {
      var bid = rawId.replace(/^#/, "");
      helpLink.href = bid ? "support?booking=" + encodeURIComponent(bid) : "support";
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    var schedHero = document.getElementById("booking-scheduled-hero");
    if (schedHero && schedHero.textContent) setHeroDate(schedHero.textContent);
    applyQueryParams();
    renderStepper();
    renderSamagri();
    renderPayment();
    initSamagriExport();
    initCopy();
    initSearch();
  });
})();
