(function () {
  "use strict";

  var CFG = window.DivineCenterConfig || {};
  var AUTH = CFG.auth || {};
  var COPY = window.DivineCenterAuthContent || {};
  var STORAGE_KEY = "dc_session";

  function qs(name) {
    return new URLSearchParams(location.search).get(name);
  }

  function role() {
    var r = (qs("role") || document.body.getAttribute("data-auth-role") || "customer").toLowerCase();
    return r === "pandit" ? "pandit" : "customer";
  }

  function liveUrl(kind) {
    if (role() === "pandit") {
      if (kind === "register") return AUTH.livePanditRegister || AUTH.liveRegister;
      return AUTH.liveLogin;
    }
    if (kind === "register") return AUTH.liveRegister;
    return AUTH.liveLogin;
  }

  function saveSession(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function getSession() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function validatePasswords(form) {
    var p = form.querySelector('[name="password"]');
    var c = form.querySelector('[name="confirmPassword"]');
    if (!p || !c) return true;
    if (p.value !== c.value) return false;
    return true;
  }

  function setHint(el, text, ok) {
    if (!el) return;
    el.textContent = text;
    el.style.color = ok ? "var(--mahogany)" : "#b42318";
  }

  function wireRoleTabs() {
    var tabs = document.querySelectorAll("[data-auth-tab]");
    if (!tabs.length) return;
    tabs.forEach(function (tab) {
      tab.addEventListener("click", function (e) {
        var targetRole = tab.getAttribute("data-auth-tab");
        if (!targetRole || tab.classList.contains("is-active")) return;
        e.preventDefault();
        var page = document.body.getAttribute("data-auth-page") || "login";
        var base = page === "register" ? (targetRole === "pandit" ? "register-pandit" : "register") : "login";
        location.href = base + "?role=" + targetRole;
      });
    });
  }

  function customizeSuccessButtons(r) {
    var btns = document.querySelector("#auth-success .auth-success__btns");
    if (!btns) return;
    if (r === "pandit") {
      btns.innerHTML =
        '<a href="user/dashboard" class="btn btn--accent">Pandit dashboard</a>' +
        '<a href="user/bookings" class="btn btn--outline">My bookings</a>';
      return;
    }
    btns.innerHTML =
      '<a href="customer/dashboard" class="btn btn--accent">My Dashboard</a>' +
      '<a href="pujas" class="btn btn--outline">Explore Pujas</a>' +
      '<a href="pandits" class="btn btn--outline">Find Pandits</a>';
  }

  function ensurePanditRegisterSuccess() {
    var success = document.getElementById("auth-success");
    if (!success || role() !== "pandit") return;
    if (success.querySelector(".auth-success__btns")) return;
    var div = document.createElement("div");
    div.className = "auth-success__btns";
    var anchor = success.querySelector(".auth-external");
    if (anchor) success.insertBefore(div, anchor);
    else success.appendChild(div);
    customizeSuccessButtons("pandit");
  }

  function wireForms() {
    document.querySelectorAll("[data-auth-form]").forEach(function (form) {
      var hint = form.querySelector(".auth-form__hint, .form-hint");
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        if (!validatePasswords(form)) {
          setHint(hint, "Passwords do not match.", false);
          return;
        }
        var fd = new FormData(form);
        var payload = {
          role: role(),
          name: fd.get("fullName") || fd.get("email"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          at: Date.now(),
        };
        saveSession(payload);
        setHint(
          hint,
          "Profile saved successfully.",
          true
        );
        var success = document.getElementById("auth-success");
        if (success) {
          ensurePanditRegisterSuccess();
          customizeSuccessButtons(payload.role);
          success.hidden = false;
        }
        form.hidden = true;
      });
    });
  }

  function fillAside() {
    var r = role();
    var page = document.body.getAttribute("data-auth-page") || "login";
    var key = page;
    if (page === "register") key = "register";
    else if (page === "login") key = "login";
    var block = COPY[r] && COPY[r][key];
    if (!block) return;
    var sub = document.getElementById("auth-aside-sub");
    var perks = document.getElementById("auth-aside-perks");
    if (sub) sub.textContent = block.subtitle;
    if (perks && block.perks) {
      perks.innerHTML = block.perks
        .map(function (p) {
          return "<li>" + p + "</li>";
        })
        .join("");
    }
    var headline = document.getElementById("auth-aside-title");
    if (headline && block.title) headline.textContent = block.title;
  }

  function setActiveTabs() {
    var r = role();
    document.querySelectorAll("[data-auth-tab]").forEach(function (tab) {
      var active = tab.getAttribute("data-auth-tab") === r;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function wireLiveLinks() {
    document.querySelectorAll("[data-auth-live]").forEach(function (el) {
      var kind = el.getAttribute("data-auth-live") || "login";
      el.href = liveUrl(kind);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    fillAside();
    setActiveTabs();
    wireRoleTabs();
    customizeSuccessButtons(role());
    ensurePanditRegisterSuccess();
    wireForms();
    wireLiveLinks();
  });

  window.DivineCenterAuth = {
    role: role,
    getSession: getSession,
    clearSession: function () {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    },
  };
})();
