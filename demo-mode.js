/**
 * Divine Center — preview site behavior (no real saves, payments, or API calls).
 */
(function () {
  "use strict";

  var CFG = window.DivineCenterConfig || {};
  if (CFG.demoMode === false) return;

  var TOAST_MSG = (CFG.demo && CFG.demo.toast) || "Done";

  function assetBase() {
    var p = window.location.pathname.replace(/\/$/, "");
    if (/\/customer\/favorites\//.test(p) || /\/user\/bookings\//.test(p)) return "../../";
    if (/\/auth\/(customer|user)\//.test(p)) return "../../";
    if (/\/customer\//.test(p) || /\/user\//.test(p) || /\/auth\//.test(p)) return "../";
    if (/\/admin\//.test(p) || /\/pandits\//.test(p)) return "../";
    return "";
  }

  function showToast(message) {
    var text = (message || TOAST_MSG || "").trim();
    if (!text) return;
    var el = document.getElementById("dc-demo-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "dc-demo-toast";
      el.className = "dc-demo-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 2800);
  }

  function isDemoForm(form) {
    if (form.getAttribute("data-demo-allow") === "true") return false;
    if (form.hasAttribute("data-auth-form")) return false;
    if (form.id === "booking-wizard-form" || form.id === "book-form") return false;
    if (form.getAttribute("role") === "search" || form.id === "dash-search-form") return false;
    return true;
  }

  function interceptForms() {
    document.addEventListener(
      "submit",
      function (e) {
        var form = e.target;
        if (!form || form.tagName !== "FORM") return;
        if (!isDemoForm(form)) return;
        e.preventDefault();
        showToast();
      },
      true
    );
  }

  function interceptActions() {
    document.addEventListener("click", function (e) {
      var btn = e.target.closest(
        "[data-demo-action], .dash-btn--accent:not([type='submit']), button.dash-btn--muted, " +
          "button.dash-btn--outline, .dash-action-btn--cancel, .dash-icon-edit"
      );
      if (!btn) return;
      if (btn.tagName === "A" && btn.getAttribute("href") && btn.getAttribute("href") !== "#") return;
      if (btn.type === "submit") return;
      e.preventDefault();
      showToast(btn.getAttribute("data-demo-message"));
    });
  }

  function init() {
    if (window.__dcDemoInited) return;
    window.__dcDemoInited = true;
    document.documentElement.setAttribute("data-demo-site", "true");
    interceptForms();
    interceptActions();
  }

  window.DivineCenterDemo = Object.assign(window.DivineCenterDemo || {}, {
    enabled: true,
    showToast: showToast,
    assetBase: assetBase,
  });

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
