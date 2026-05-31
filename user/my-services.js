/**
 * Pandit services — edit modal with demo sessionStorage
 */
(function () {
  "use strict";

  var STORAGE_KEY = "dc_pandit_services";

  var DEFAULT_SERVICES = [
    {
      id: "griha-pravesh",
      name: "Griha Pravesh",
      price: 5500,
      duration: "3",
      mode: "offline",
    },
    {
      id: "namakaran",
      name: "Namakaran",
      price: 3800,
      duration: "2",
      mode: "both",
    },
    {
      id: "satyanarayan",
      name: "Satyanarayan Puja",
      price: 4200,
      duration: "2.5",
      mode: "offline",
    },
  ];

  var MODE_LABELS = {
    offline: "Offline",
    online: "Online",
    both: "Offline / Online",
  };

  var editingId = null;
  var modalEl = null;
  var formEl = null;
  var lastFocus = null;

  function esc(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }

  function formatInr(amount) {
    var n = Number(amount);
    if (!isFinite(n) || n < 0) return "₹0";
    return "₹" + n.toLocaleString("en-IN");
  }

  function formatMeta(s) {
    var dur = s.duration ? "~" + s.duration + " hour" + (String(s.duration) === "1" ? "" : "s") : "";
    var mode = MODE_LABELS[s.mode] || MODE_LABELS.offline;
    return formatInr(s.price) + (dur ? " · " + dur : "") + " · " + mode;
  }

  function loadServices() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return JSON.parse(JSON.stringify(DEFAULT_SERVICES));
      var parsed = JSON.parse(raw);
      if (!Array.isArray(parsed) || !parsed.length) {
        return JSON.parse(JSON.stringify(DEFAULT_SERVICES));
      }
      return parsed;
    } catch (e) {
      return JSON.parse(JSON.stringify(DEFAULT_SERVICES));
    }
  }

  function saveServices(list) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    } catch (e) {}
  }

  function slugId(name) {
    return String(name || "service")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "") || "service-" + Date.now();
  }

  function renderStats(services) {
    var el = document.getElementById("pandit-services-stats");
    if (!el) return;
    var online = services.filter(function (s) {
      return s.mode === "online" || s.mode === "both";
    }).length;
    el.innerHTML =
      '<li class="portal-pandit-services-hub__stat"><strong>' +
      online +
      '</strong><span>Online-capable</span></li>' +
      '<li class="portal-pandit-services-hub__stat portal-pandit-services-hub__stat--accent"><strong>' +
      formatInr(
        services.reduce(function (sum, s) {
          return sum + (Number(s.price) || 0);
        }, 0) / Math.max(services.length, 1)
      ) +
      "</strong><span>Avg. price</span></li>";
  }

  function renderList() {
    var list = document.getElementById("pandit-services-list");
    if (!list) return;

    var services = loadServices();
    renderStats(services);
    list.innerHTML = services
      .map(function (s) {
        var modeClass = "portal-pandit-service-card--" + esc(s.mode || "offline");
        return (
          '<article class="portal-pandit-service-card ' +
          modeClass +
          '" role="listitem" data-service-id="' +
          esc(s.id) +
          '">' +
          '<header class="portal-pandit-service-card__head">' +
          "<h3>" +
          esc(s.name) +
          "</h3>" +
          '<span class="portal-pandit-service-card__mode">' +
          esc(MODE_LABELS[s.mode] || MODE_LABELS.offline) +
          "</span></header>" +
          '<p class="portal-pandit-service-card__price">' +
          formatInr(s.price) +
          "</p>" +
          '<p class="portal-pandit-service-card__meta">' +
          esc(formatMeta(s)) +
          "</p>" +
          '<footer class="portal-pandit-service-card__foot">' +
          '<button type="button" class="dash-btn dash-btn--outline portal-pandit-service-card__edit" data-edit-service aria-label="Edit ' +
          esc(s.name) +
          '">Edit</button></footer></article>'
        );
      })
      .join("");
  }

  function getServiceById(id) {
    return loadServices().filter(function (s) {
      return s.id === id;
    })[0];
  }

  function openModal(id) {
    if (!modalEl || !formEl) return;

    editingId = id || null;
    lastFocus = document.activeElement;

    var title = document.getElementById("pandit-service-modal-title");
    var submitBtn = formEl.querySelector('[type="submit"]');
    var s = id ? getServiceById(id) : null;

    if (title) {
      title.textContent = s ? "Edit service" : "Add service";
    }
    if (submitBtn) {
      submitBtn.textContent = s ? "Save changes" : "Add service";
    }

    formEl.elements.name.value = s ? s.name : "";
    formEl.elements.price.value = s ? String(s.price) : "";
    formEl.elements.duration.value = s ? String(s.duration) : "";
    formEl.elements.mode.value = s ? s.mode || "offline" : "offline";

    modalEl.hidden = false;
    document.body.classList.add("portal-service-modal-open");
    var first = formEl.querySelector("input, select, button");
    if (first) first.focus();
  }

  function closeModal() {
    if (!modalEl) return;
    modalEl.hidden = true;
    document.body.classList.remove("portal-service-modal-open");
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus();
    editingId = null;
  }

  function handleSave(e) {
    e.preventDefault();
    var fd = new FormData(formEl);
    var name = String(fd.get("name") || "").trim();
    var price = parseInt(fd.get("price"), 10);
    var duration = String(fd.get("duration") || "").trim();
    var mode = String(fd.get("mode") || "offline");

    if (!name) {
      formEl.elements.name.focus();
      return;
    }
    if (!isFinite(price) || price < 0) {
      formEl.elements.price.focus();
      return;
    }

    var list = loadServices();
    var entry = {
      id: editingId || slugId(name),
      name: name,
      price: price,
      duration: duration || "2",
      mode: mode,
    };

    if (editingId) {
      list = list.map(function (s) {
        return s.id === editingId ? entry : s;
      });
    } else {
      var exists = list.some(function (s) {
        return s.id === entry.id;
      });
      if (exists) entry.id = entry.id + "-" + Date.now();
      list.push(entry);
    }

    saveServices(list);
    renderList();
    closeModal();

    var note = document.getElementById("pandit-services-save-note");
    if (note) {
      note.hidden = false;
      note.textContent =
        "Service saved. Pricing updates will appear for devotees shortly.";
    }

    if (window.DivineCenterDemo && window.DivineCenterDemo.showToast) {
      window.DivineCenterDemo.showToast("Service updated.");
    }
  }

  function wireModal() {
    modalEl = document.getElementById("pandit-service-modal");
    formEl = document.getElementById("pandit-service-form");
    if (!modalEl || !formEl) return;

    formEl.addEventListener("submit", handleSave);

    modalEl.querySelectorAll("[data-close-service-modal]").forEach(function (el) {
      el.addEventListener(
        "click",
        function (e) {
          e.preventDefault();
          e.stopPropagation();
          closeModal();
        },
        true
      );
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modalEl && !modalEl.hidden) closeModal();
    });
  }

  function wireListActions() {
    document.addEventListener(
      "click",
      function (e) {
        var editBtn = e.target.closest("[data-edit-service]");
        if (editBtn) {
          e.preventDefault();
          e.stopPropagation();
          var row = editBtn.closest("[data-service-id]");
          openModal(row ? row.getAttribute("data-service-id") : null);
          return;
        }

        var addBtn = e.target.closest("[data-add-service]");
        if (addBtn) {
          e.preventDefault();
          e.stopPropagation();
          openModal(null);
        }
      },
      true
    );
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
    renderList();
    wireModal();
    wireListActions();
    initSearch();
  });
})();
