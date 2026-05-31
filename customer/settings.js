/**
 * Customer settings — notification toggles (demo persistence)
 */
(function () {
  "use strict";

  var STORAGE_KEY = "dc_customer_settings";

  var DEFAULTS = {
    email: true,
    sms: true,
    whatsapp: false,
    marketing: false,
    digest: false,
    community: false,
  };

  function loadSettings() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULTS);
      return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function saveSettings(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function wireToggles() {
    var form = document.getElementById("portal-settings-form");
    if (!form) return;

    var saved = loadSettings();
    form.querySelectorAll("[data-setting]").forEach(function (input) {
      var key = input.getAttribute("data-setting");
      if (key && Object.prototype.hasOwnProperty.call(saved, key)) {
        input.checked = !!saved[key];
      }
    });

    form.addEventListener("change", function (e) {
      var input = e.target;
      if (!input || !input.matches("[data-setting]")) return;

      var next = loadSettings();
      next[input.getAttribute("data-setting")] = input.checked;
      saveSettings(next);

      var note = document.getElementById("settings-save-note");
      if (note) {
        note.hidden = false;
        note.textContent = "Preference saved.";
        clearTimeout(wireToggles._t);
        wireToggles._t = setTimeout(function () {
          note.hidden = true;
        }, 2200);
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
    wireToggles();
    initSearch();
  });
})();
