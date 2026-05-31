(function () {
  "use strict";

  var CFG = window.DivineCenterConfig || {};
  var AUTH = CFG.auth || {};
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
      return kind === "register" ? AUTH.livePanditRegister || AUTH.liveRegister : AUTH.liveLogin;
    }
    return kind === "register" ? AUTH.liveRegister : AUTH.liveLogin;
  }

  function hintEl(form) {
    return form.querySelector(".m-form-hint") || form.querySelector(".form-hint");
  }

  function setHint(el, text, ok) {
    if (!el) return;
    el.textContent = text;
    el.style.color = ok ? "var(--mahogany)" : "#b42318";
  }

  function saveSession(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function wireTabs() {
    document.querySelectorAll("[data-auth-tab]").forEach(function (tab) {
      tab.addEventListener("click", function () {
        var targetRole = tab.getAttribute("data-auth-tab");
        if (!targetRole || tab.classList.contains("is-active")) return;
        var page = document.body.getAttribute("data-auth-page") || "login";
        var base = page === "register" ? (targetRole === "pandit" ? "register-pandit" : "register") : "login";
        location.href = base + "?role=" + targetRole;
      });
    });
    var r = role();
    document.querySelectorAll("[data-auth-tab]").forEach(function (tab) {
      var on = tab.getAttribute("data-auth-tab") === r;
      tab.classList.toggle("is-active", on);
    });
  }

  function wireForms() {
    document.querySelectorAll("[data-auth-form]").forEach(function (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!form.checkValidity()) {
          form.reportValidity();
          return;
        }
        var p = form.querySelector('[name="password"]');
        var c = form.querySelector('[name="confirmPassword"]');
        var hint = form.querySelector(".m-auth-hint, .auth-form__hint, .form-hint") || hintEl(form);
        if (p && c && p.value !== c.value) {
          setHint(hint, "Passwords do not match.", false);
          return;
        }
        var fd = new FormData(form);
        saveSession({
          role: role(),
          name: fd.get("fullName") || fd.get("email"),
          email: fd.get("email"),
          phone: fd.get("phone"),
          at: Date.now(),
        });
        setHint(hint, "Saved successfully.", true);
        var success = document.getElementById("auth-success");
        if (success) success.hidden = false;
        form.hidden = true;
      });
    });
  }

  document.querySelectorAll("[data-auth-live]").forEach(function (el) {
    el.href = liveUrl(el.getAttribute("data-auth-live") || "login");
  });

  document.addEventListener("DOMContentLoaded", function () {
    wireTabs();
    wireForms();
  });

  window.DivineCenterAuth = {
    role: role,
    getSession: function () {
      try {
        var raw = sessionStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : null;
      } catch (e) {
        return null;
      }
    },
    clearSession: function () {
      try {
        sessionStorage.removeItem(STORAGE_KEY);
      } catch (e) {}
    },
  };
})();
