/**
 * Pandit weekly availability — card schedule with demo persistence
 */
(function () {
  "use strict";

  var STORAGE_KEY = "dc_pandit_availability";
  var viewFilter = "all";

  var DAYS = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

  var DAY_META = {
    mon: { name: "Monday", short: "Mon", weekend: false },
    tue: { name: "Tuesday", short: "Tue", weekend: false },
    wed: { name: "Wednesday", short: "Wed", weekend: false },
    thu: { name: "Thursday", short: "Thu", weekend: false },
    fri: { name: "Friday", short: "Fri", weekend: false },
    sat: { name: "Saturday", short: "Sat", weekend: true },
    sun: { name: "Sunday", short: "Sun", weekend: true },
  };

  var PRESETS = [
    { label: "9 AM – 6 PM", start: "09:00", end: "18:00" },
    { label: "8 AM – 8 PM", start: "08:00", end: "20:00" },
    { label: "Morning", start: "08:00", end: "12:00" },
  ];

  var DEFAULTS = {
    mon: { open: true, start: "09:00", end: "18:00" },
    tue: { open: true, start: "09:00", end: "18:00" },
    wed: { open: true, start: "09:00", end: "18:00" },
    thu: { open: true, start: "09:00", end: "18:00" },
    fri: { open: true, start: "09:00", end: "18:00" },
    sat: { open: true, start: "08:00", end: "20:00" },
    sun: { open: false, start: "09:00", end: "18:00" },
  };

  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }

  function loadAvailability() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULTS));
      var parsed = JSON.parse(raw);
      var out = JSON.parse(JSON.stringify(DEFAULTS));
      DAYS.forEach(function (day) {
        if (parsed[day]) out[day] = Object.assign({}, out[day], parsed[day]);
      });
      return out;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULTS));
    }
  }

  function saveAvailability(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function parseMinutes(value) {
    var parts = String(value || "0:0").split(":");
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  function formatTime12(value) {
    var parts = String(value || "00:00").split(":");
    var h = parseInt(parts[0], 10);
    var m = parts[1] || "00";
    var am = h < 12;
    var h12 = h % 12;
    if (h12 === 0) h12 = 12;
    return h12 + ":" + m + " " + (am ? "AM" : "PM");
  }

  function dayHoursLabel(d) {
    if (!d.open) return "Closed";
    var span = parseMinutes(d.end) - parseMinutes(d.start);
    if (span <= 0) return "Invalid window";
    var hours = Math.round((span / 60) * 10) / 10;
    return hours + " hr" + (hours === 1 ? "" : "s") + " open";
  }

  function readForm() {
    var data = {};
    DAYS.forEach(function (day) {
      var open = document.querySelector('[data-day-open="' + day + '"]');
      var start = document.querySelector('[data-day-start="' + day + '"]');
      var end = document.querySelector('[data-day-end="' + day + '"]');
      data[day] = {
        open: open ? open.checked : false,
        start: start ? start.value : "09:00",
        end: end ? end.value : "18:00",
      };
    });
    return data;
  }

  function presetButtons(day) {
    return PRESETS.map(function (p) {
      return (
        '<button type="button" class="portal-availability-card__preset" data-availability-preset data-day="' +
        esc(day) +
        '" data-preset-start="' +
        esc(p.start) +
        '" data-preset-end="' +
        esc(p.end) +
        '">' +
        esc(p.label) +
        "</button>"
      );
    }).join("");
  }

  function renderDayCard(day, d) {
    var meta = DAY_META[day];
    var hidden = viewFilter === "open" && !d.open;
    var badgeClass = meta.weekend
      ? "portal-availability-card__badge portal-availability-card__badge--weekend"
      : "portal-availability-card__badge";

    return (
      '<article class="portal-availability-card' +
      (d.open ? "" : " portal-availability-card--closed") +
      (hidden ? " portal-availability-card--filtered" : "") +
      '" data-day="' +
      esc(day) +
      '" role="listitem"' +
      (hidden ? ' hidden' : "") +
      ">" +
      '<header class="portal-availability-card__head">' +
      '<div class="portal-availability-card__head-row">' +
      '<div class="portal-availability-card__identity">' +
      '<strong class="portal-availability-card__name">' +
      esc(meta.name) +
      "</strong>" +
      '<span class="' +
      badgeClass +
      '">' +
      esc(meta.short) +
      "</span></div>" +
      '<label class="dash-online portal-availability-card__toggle">' +
      '<span class="visually-hidden">' +
      esc(meta.name) +
      " available</span>" +
      '<input type="checkbox" class="dash-online__input" data-day-open="' +
      esc(day) +
      '"' +
      (d.open ? " checked" : "") +
      "/>" +
      '<span class="dash-online__track"><span class="dash-online__thumb"></span></span></label>' +
      "</div>" +
      '<span class="portal-availability-card__span-label" data-day-span-label="' +
      esc(day) +
      '">' +
      esc(dayHoursLabel(d)) +
      "</span>" +
      "</header>" +
      '<div class="portal-availability-card__body">' +
      '<p class="portal-availability-card__range" data-day-range="' +
      esc(day) +
      '">' +
      (d.open
        ? esc(formatTime12(d.start)) + " – " + esc(formatTime12(d.end))
        : "Not accepting bookings") +
      "</p>" +
      '<div class="portal-availability-card__times">' +
      '<label class="portal-availability-card__time"><span>From</span><input type="time" data-day-start="' +
      esc(day) +
      '" value="' +
      esc(d.start) +
      '"' +
      (d.open ? "" : " disabled") +
      '/></label><label class="portal-availability-card__time"><span>To</span><input type="time" data-day-end="' +
      esc(day) +
      '" value="' +
      esc(d.end) +
      '"' +
      (d.open ? "" : " disabled") +
      "/></label></div>" +
      '<div class="portal-availability-card__presets" aria-label="Quick presets for ' +
      esc(meta.name) +
      '">' +
      presetButtons(day) +
      "</div></div>" +
      '<p class="portal-availability-card__closed-msg">Closed — devotees cannot book this day</p></article>'
    );
  }

  function renderDays(data) {
    var list = document.getElementById("availability-days-list");
    if (!list) return;
    list.innerHTML = DAYS.map(function (day) {
      return renderDayCard(day, data[day] || DEFAULTS[day]);
    }).join("");
  }

  function refreshDayLabels(data) {
    DAYS.forEach(function (day) {
      var d = data[day];
      var open = document.querySelector('[data-day-open="' + day + '"]');
      var start = document.querySelector('[data-day-start="' + day + '"]');
      var end = document.querySelector('[data-day-end="' + day + '"]');
      var label = document.querySelector('[data-day-span-label="' + day + '"]');
      var range = document.querySelector('[data-day-range="' + day + '"]');
      var card = document.querySelector('.portal-availability-card[data-day="' + day + '"]');

      if (open) open.checked = !!d.open;
      if (start) {
        start.value = d.start || "09:00";
        start.disabled = !d.open;
      }
      if (end) {
        end.value = d.end || "18:00";
        end.disabled = !d.open;
      }
      if (label) label.textContent = dayHoursLabel(d);
      if (range) {
        range.textContent = d.open
          ? formatTime12(d.start) + " – " + formatTime12(d.end)
          : "Not accepting bookings";
      }
      if (card) {
        card.classList.toggle("portal-availability-card--closed", !d.open);
        if (viewFilter === "open") {
          var hide = !d.open;
          card.hidden = hide;
          card.classList.toggle("portal-availability-card--filtered", hide);
        }
      }
    });
  }

  function applyToDom(data, reRender) {
    if (reRender || document.getElementById("availability-days-list")) {
      renderDays(data);
    } else {
      DAYS.forEach(function (day) {
        var open = document.querySelector('[data-day-open="' + day + '"]');
        var start = document.querySelector('[data-day-start="' + day + '"]');
        var end = document.querySelector('[data-day-end="' + day + '"]');
        var d = data[day] || DEFAULTS[day];
        if (open) open.checked = !!d.open;
        if (start) {
          start.value = d.start || "09:00";
          start.disabled = !d.open;
        }
        if (end) {
          end.value = d.end || "18:00";
          end.disabled = !d.open;
        }
      });
      refreshDayLabels(data);
    }
  }

  function syncViewFilters() {
    var bar = document.getElementById("availability-view-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-availability-view]").forEach(function (btn) {
      var on = btn.getAttribute("data-availability-view") === viewFilter;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function wireViewFilters() {
    var bar = document.getElementById("availability-view-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-availability-view]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        viewFilter = btn.getAttribute("data-availability-view") || "all";
        syncViewFilters();
        applyToDom(readForm(), true);
      });
    });
  }

  function wireFormDelegation() {
    var form = document.getElementById("availability-form");
    if (!form) return;

    form.addEventListener("change", function (e) {
      if (e.target.matches("[data-day-open]")) {
        applyToDom(readForm(), false);
        return;
      }
      if (e.target.matches("[data-day-start], [data-day-end]")) {
        refreshDayLabels(readForm());
      }
    });

    form.addEventListener("click", function (e) {
      var preset = e.target.closest("[data-availability-preset]");
      if (!preset) return;
      e.preventDefault();

      var day = preset.getAttribute("data-day");
      var start = preset.getAttribute("data-preset-start");
      var end = preset.getAttribute("data-preset-end");
      var data = readForm();

      if (!data[day]) return;
      data[day].open = true;
      data[day].start = start;
      data[day].end = end;
      applyToDom(data, false);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = readForm();
      saveAvailability(data);

      var note = document.getElementById("availability-save-note");
      if (note) {
        note.hidden = false;
        note.textContent =
          "Availability saved. Devotees will see these windows when booking.";
      }

      if (window.DivineCenterDemo && window.DivineCenterDemo.showToast) {
        window.DivineCenterDemo.showToast("Weekly schedule saved.");
      }
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
    var data = loadAvailability();
    applyToDom(data, true);
    wireViewFilters();
    wireFormDelegation();
    initSearch();
  });
})();
