/**
 * Pandit settings — availability & notification toggles (demo persistence)
 */
(function () {
  "use strict";

  var STORAGE_KEY = "dc_pandit_settings";

  var DEFAULTS = {
    acceptBookings: true,
    searchVisible: true,
    autoDecline: false,
    sms: true,
    email: true,
    whatsapp: false,
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

  function showNote(message) {
    var note = document.getElementById("settings-save-note");
    if (!note) return;
    note.hidden = false;
    note.textContent = message;
    clearTimeout(showNote._t);
    showNote._t = setTimeout(function () {
      note.hidden = true;
    }, 2200);
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
      showNote("Preference saved.");
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

  var shortcutFilter = "all";
  var shortcutSearch = "";

  var ICON_LOCK =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>';
  var ICON_SHIELD =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>';
  var ICON_CAL =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  var ICON_CHAT =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>';

  var PANDIT_SHORTCUTS = [
    {
      href: "change-password",
      title: "Change password",
      desc: "Update your sign-in credentials",
      status: "Recommended every 90 days",
      tag: "Security",
      category: "security",
      variant: "security",
      iconTone: "orange",
      icon: ICON_LOCK,
    },
    {
      href: "identity",
      title: "Identity verification",
      desc: "Trust badge and document status",
      status: "Verified · documents on file",
      tag: "Verified",
      category: "account",
      variant: "verify",
      iconTone: "green",
      icon: ICON_SHIELD,
    },
    {
      href: "availability-time",
      title: "Weekly availability",
      desc: "Set days and time slots for bookings",
      status: "6 days open · ~57 hrs bookable",
      tag: "Schedule",
      category: "account",
      variant: "schedule",
      iconTone: "blue",
      icon: ICON_CAL,
    },
    {
      href: "contact-support",
      title: "Contact support",
      desc: "Payouts, verification, and platform help",
      status: "Typical reply within 24 hours",
      tag: "Help",
      category: "help",
      variant: "support",
      iconTone: "purple",
      icon: ICON_CHAT,
    },
  ];

  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }

  function shortcutMatches(item) {
    if (shortcutFilter !== "all" && item.category !== shortcutFilter) return false;
    if (!shortcutSearch) return true;
    var q = shortcutSearch.toLowerCase();
    var hay = (item.title + " " + item.desc + " " + item.status + " " + item.tag).toLowerCase();
    return hay.indexOf(q) !== -1;
  }

  function renderShortcutCard(item) {
    var featured = item.variant === "verify" ? " portal-pandit-shortcut--featured" : "";
    return (
      '<a href="' +
      esc(item.href) +
      '" class="portal-pandit-shortcut portal-pandit-shortcut--' +
      esc(item.variant) +
      featured +
      '" role="listitem" data-shortcut-category="' +
      esc(item.category) +
      '">' +
      '<div class="portal-pandit-shortcut__top">' +
      '<span class="portal-pandit-shortcut__icon portal-pandit-shortcut__icon--' +
      esc(item.iconTone) +
      '">' +
      item.icon +
      "</span>" +
      '<span class="portal-pandit-shortcut__tag">' +
      esc(item.tag) +
      "</span></div>" +
      '<div class="portal-pandit-shortcut__body">' +
      "<h3>" +
      esc(item.title) +
      "</h3>" +
      "<p>" +
      esc(item.desc) +
      "</p></div>" +
      '<footer class="portal-pandit-shortcut__foot">' +
      '<span class="portal-pandit-shortcut__status">' +
      esc(item.status) +
      '</span><span class="portal-pandit-shortcut__cta">Open<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></span></footer></a>'
    );
  }

  function syncShortcutFilters() {
    var bar = document.getElementById("pandit-shortcuts-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-shortcut-filter]").forEach(function (btn) {
      var on = btn.getAttribute("data-shortcut-filter") === shortcutFilter;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function renderPanditShortcuts() {
    var list = document.getElementById("pandit-settings-shortcuts-list");
    if (!list) return;

    var items = PANDIT_SHORTCUTS.filter(shortcutMatches);
    var countEl = document.getElementById("pandit-shortcuts-count");
    if (countEl) {
      countEl.textContent =
        items.length + (items.length === 1 ? " shortcut" : " shortcuts");
    }

    if (!items.length) {
      list.innerHTML =
        '<div class="portal-pandit-shortcuts-hub__empty"><span class="portal-pandit-shortcuts-hub__empty-icon" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3-3"/></svg></span><p>No shortcuts match your filter.</p>' +
        '<button type="button" class="dash-btn dash-btn--outline" data-shortcut-filter-reset>Clear filters</button></div>';
      var reset = list.querySelector("[data-shortcut-filter-reset]");
      if (reset) {
        reset.addEventListener("click", function () {
          shortcutFilter = "all";
          shortcutSearch = "";
          var searchInput = document.getElementById("pandit-shortcuts-search");
          if (searchInput) searchInput.value = "";
          syncShortcutFilters();
          renderPanditShortcuts();
        });
      }
      return;
    }

    list.innerHTML = items.map(renderShortcutCard).join("");
  }

  function wirePanditShortcuts() {
    var bar = document.getElementById("pandit-shortcuts-filters");
    if (!bar) return;

    bar.querySelectorAll("[data-shortcut-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        shortcutFilter = btn.getAttribute("data-shortcut-filter") || "all";
        syncShortcutFilters();
        renderPanditShortcuts();
      });
    });

    var searchInput = document.getElementById("pandit-shortcuts-search");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        function () {
          shortcutSearch = (searchInput.value || "").trim();
          renderPanditShortcuts();
        },
        { passive: true }
      );
    }

    syncShortcutFilters();
    renderPanditShortcuts();
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireToggles();
    wirePanditShortcuts();
    initSearch();
  });
})();
