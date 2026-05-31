/**
 * Demo booking wizard — pandits/booking.html
 */
(function () {
  "use strict";

  var form = document.getElementById("booking-wizard-form");
  if (!form) return;

  var DC = window.DivineCenter;
  var params = new URLSearchParams(location.search);
  var pujaParam = params.get("puja") || "";
  var panditParam = params.get("pandit") || "";

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function findPuja(slug) {
    if (!DC || !DC.PUJAS || !slug) return null;
    for (var i = 0; i < DC.PUJAS.length; i++) {
      if (DC.PUJAS[i].slug === slug) return DC.PUJAS[i];
    }
    return null;
  }

  function findPandit(slug) {
    if (!DC || !DC.PANDITS || !slug) return null;
    for (var i = 0; i < DC.PANDITS.length; i++) {
      if (DC.PANDITS[i].slug === slug) return DC.PANDITS[i];
    }
    return null;
  }

  function formatDate(iso) {
    if (!iso) return "—";
    try {
      return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return iso;
    }
  }

  function parseDateParts(iso) {
    if (!iso) return { month: "—", day: "—" };
    try {
      var d = new Date(iso + "T12:00:00");
      return {
        month: d.toLocaleDateString("en-IN", { month: "short" }),
        day: String(d.getDate()),
      };
    } catch (e) {
      return { month: "—", day: "—" };
    }
  }

  function estimatePrice(pujaSlug) {
    var puja = findPuja(pujaSlug);
    return (puja && puja.price) || "₹4,033";
  }

  function fillPujas() {
    var sel = form.querySelector('[name="puja"]');
    if (!sel || !DC || !DC.PUJAS) return;
    sel.innerHTML = DC.PUJAS.map(function (p) {
      var s = p.slug || "";
      var selected = s === pujaParam || (!pujaParam && s === "annaprashan") ? " selected" : "";
      return '<option value="' + esc(s) + '"' + selected + ">" + esc(p.title) + "</option>";
    }).join("");
  }

  function fillPandits() {
    var sel = form.querySelector('[name="pandit"]');
    if (!sel || !DC || !DC.PANDITS) return;
    sel.innerHTML =
      '<option value="">Assign best available</option>' +
      DC.PANDITS.slice(0, 12)
        .map(function (p) {
          var s = p.slug || "";
          var selected = s === panditParam ? " selected" : "";
          return '<option value="' + esc(s) + '"' + selected + ">" + esc(p.name.split("(")[0].trim()) + "</option>";
        })
        .join("");
  }

  function applySessionDefaults() {
    var Demo = window.DivineCenterDemo;
    var phone = form.querySelector('[name="phone"]');
    if (phone && Demo && Demo.getAuthSession) {
      var session = Demo.getAuthSession();
      if (session && session.phone && !phone.dataset.touched) {
        phone.value = session.phone;
      }
    }
    var nameInput = form.querySelector('[name="devoteeName"]');
    if (nameInput && Demo && Demo.getAuthSession && !nameInput.value) {
      var session = Demo.getAuthSession();
      if (session && session.name) {
        nameInput.value = String(session.name).replace(/@.*/, "").trim();
      }
    }
  }

  function wireToggleGroup(selector, hiddenName, onChange) {
    var hidden = form.querySelector('[name="' + hiddenName + '"]');
    var buttons = form.querySelectorAll(selector);
    if (!hidden || !buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var val = btn.getAttribute(selector === "[data-booking-mode]" ? "data-booking-mode" : "data-booking-slot");
        hidden.value = val;
        buttons.forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });
        if (onChange) onChange();
      });
    });
  }

  function formProgress(fd) {
    var score = 0;
    if (fd.get("puja")) score++;
    if (fd.get("devoteeName")) score++;
    if (fd.get("date")) score++;
    if (fd.get("address")) score++;
    if (fd.get("phone")) score++;
    return Math.min(4, Math.max(1, Math.ceil(score / 1.25)));
  }

  function updateTimeline(step) {
    var timeline = document.getElementById("booking-wizard-timeline");
    if (!timeline) return;
    timeline.querySelectorAll("[data-wizard-step]").forEach(function (el) {
      var n = parseInt(el.getAttribute("data-wizard-step"), 10);
      el.classList.toggle("is-done", n < step);
      el.classList.toggle("is-active", n <= step);
    });
  }

  function summaryRow(label, value, meta) {
    return (
      '<div class="booking-checkout__row">' +
      '<span class="booking-checkout__row-label">' +
      esc(label) +
      "</span>" +
      '<span class="booking-checkout__row-value">' +
      esc(value) +
      "</span>" +
      (meta ? '<span class="booking-checkout__row-meta">' + esc(meta) + "</span>" : "") +
      "</div>"
    );
  }

  var CHECK_DONE =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg>';
  var CHECK_PENDING =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/></svg>';

  function confirmChecks(fd) {
    var pujaSlug = fd.get("puja") || "";
    var puja = findPuja(pujaSlug);
    var dateVal = fd.get("date") || "";
    var devotee = String(fd.get("devoteeName") || "").trim();
    var address = String(fd.get("address") || "").trim();
    var phone = String(fd.get("phone") || "").trim();
    var slotVal = fd.get("slot") || "Morning";
    var modeVal = fd.get("mode") || "Offline";

    return [
      {
        ok: !!pujaSlug,
        label: "Ritual",
        detail: puja ? puja.title : "Choose a puja",
      },
      {
        ok: !!devotee,
        label: "Devotee",
        detail: devotee || "Add full name",
      },
      {
        ok: !!dateVal,
        label: "Schedule",
        detail: dateVal ? formatDate(dateVal) + " · " + slotVal : "Pick a date",
      },
      {
        ok: !!address && !!phone,
        label: "Contact",
        detail: address && phone ? modeVal + " · " + phone : "Address & mobile required",
      },
    ];
  }

  function updateConfirmPanel(fd, pujaSlug, price) {
    var panel = document.getElementById("booking-confirm-panel");
    var list = document.getElementById("booking-confirm-checks");
    var priceEl = document.getElementById("booking-confirm-price");
    var submitBtn = document.getElementById("booking-confirm-submit");
    if (!list) return;

    var checks = confirmChecks(fd);
    var ready = checks.every(function (c) {
      return c.ok;
    });

    list.innerHTML = checks
      .map(function (c) {
        return (
          '<li class="booking-checkout__check' +
          (c.ok ? " booking-checkout__check--done" : "") +
          '">' +
          '<span class="booking-checkout__check-icon" aria-hidden="true">' +
          (c.ok ? CHECK_DONE : CHECK_PENDING) +
          "</span>" +
          '<span class="booking-checkout__check-copy">' +
          "<strong>" +
          esc(c.label) +
          "</strong>" +
          "<span>" +
          esc(c.detail) +
          "</span></span></li>"
        );
      })
      .join("");

    if (priceEl) priceEl.textContent = price || estimatePrice(pujaSlug);
    if (panel) panel.classList.toggle("booking-checkout__confirm--ready", ready);
    if (submitBtn) {
      submitBtn.disabled = !ready;
      submitBtn.setAttribute("aria-disabled", ready ? "false" : "true");
      submitBtn.classList.toggle("booking-checkout__submit--waiting", !ready);
    }
  }

  function updateSummary() {
    var el = document.getElementById("booking-wizard-summary");
    if (!el) return;

    var fd = new FormData(form);
    var pujaSlug = fd.get("puja") || "";
    var panditSlug = fd.get("pandit") || "";
    var dateVal = fd.get("date") || "";
    var modeVal = fd.get("mode") || "Offline";
    var slotVal = fd.get("slot") || "Morning";
    var langVal = fd.get("language") || "English";
    var devotee = fd.get("devoteeName") || "";
    var puja = findPuja(pujaSlug);
    var pandit = findPandit(panditSlug);
    var pujaTitle = puja ? puja.title : pujaSlug || "—";
    var panditLabel = pandit ? pandit.name.split("(")[0].trim() : "Best available";
    var price = estimatePrice(pujaSlug);
    var formattedDate = formatDate(dateVal);
    var cal = parseDateParts(dateVal);
    var progress = formProgress(fd);
    var address = fd.get("address") ? String(fd.get("address")) : "";
    var locationMeta =
      modeVal === "Online"
        ? "Online session"
        : address
          ? address.slice(0, 40) + (address.length > 40 ? "…" : "")
          : "Add address";

    updateTimeline(progress);

    el.innerHTML =
      '<div class="booking-checkout__hero">' +
      '<div class="booking-checkout__date" aria-hidden="true">' +
      '<span class="booking-checkout__date-month">' +
      esc(cal.month) +
      '</span><span class="booking-checkout__date-day">' +
      esc(cal.day) +
      "</span></div>" +
      '<div class="booking-checkout__hero-copy">' +
      '<p class="booking-checkout__progress">Step ' +
      progress +
      " of 4</p>" +
      '<h2 class="booking-checkout__puja">' +
      esc(pujaTitle) +
      "</h2>" +
      '<p class="booking-checkout__when">' +
      esc(formattedDate) +
      " · " +
      esc(slotVal) +
      " · " +
      esc(modeVal) +
      "</p></div></div>" +
      '<div class="booking-checkout__rows">' +
      summaryRow("Ritual", pujaTitle, puja ? puja.duration || "" : "") +
      summaryRow("Pandit", panditLabel, pandit ? pandit.city || "" : "Auto-assigned") +
      summaryRow("Devotee", devotee || "Add name", langVal) +
      summaryRow("Location", locationMeta, modeVal) +
      "</div>" +
      '<ul class="booking-checkout__assurance">' +
      "<li>Verified Acharya within 24h</li>" +
      "<li>Samagri list after confirmation</li>" +
      "<li>Free reschedule 48h+ before</li></ul>";

    updateConfirmPanel(fd, pujaSlug, price);
  }

  fillPujas();
  fillPandits();
  applySessionDefaults();

  var dateInput = form.querySelector('[name="date"]');
  if (dateInput && !dateInput.value) {
    var d = new Date();
    d.setDate(d.getDate() + 14);
    dateInput.value = d.toISOString().slice(0, 10);
  }

  wireToggleGroup("[data-booking-mode]", "mode", updateSummary);
  wireToggleGroup("[data-booking-slot]", "slot", updateSummary);

  form.addEventListener("input", updateSummary);
  form.addEventListener("change", updateSummary);
  updateSummary();

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    var fd = new FormData(form);
    var pujaSlug = fd.get("puja") || "";
    var panditSlug = fd.get("pandit") || "";
    var dateVal = fd.get("date") || "";
    var modeVal = fd.get("mode") || "";
    var slotVal = fd.get("slot") || "Morning";

    if (window.DivineCenterDemo) {
      window.DivineCenterDemo.saveLastBooking({
        id: "DC-001",
        puja: pujaSlug,
        pujaTitle: window.DivineCenterDemo.resolvePujaTitle(pujaSlug, DC),
        pandit: panditSlug,
        panditName: window.DivineCenterDemo.resolvePanditName(panditSlug, DC),
        date: dateVal,
        mode: modeVal,
        slot: slotVal,
        amount: estimatePrice(pujaSlug),
        placedAt: Date.now(),
      });
    }

    var q = new URLSearchParams();
    q.set("puja", pujaSlug);
    if (panditSlug) q.set("pandit", panditSlug);
    q.set("date", dateVal);
    q.set("mode", modeVal);
    window.location.href = "../booking-success.html?" + q.toString();
  });
})();
