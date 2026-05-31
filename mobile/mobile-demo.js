/**
 * Mobile preview — form intercept only (no banners or callouts).
 */
(function () {
  "use strict";

  var CFG = window.DivineCenterConfig || {};
  if (CFG.demoMode === false) return;

  var TOAST = (CFG.demo && CFG.demo.toast) || "Done";

  function desktopRoot() {
    var p = window.location.pathname;
    if (/\/mobile\//.test(p)) return "../";
    return "";
  }

  function showToast(msg) {
    var text = (msg || TOAST || "").trim();
    if (!text) return;
    var el = document.getElementById("m-demo-toast");
    if (!el) {
      el = document.createElement("div");
      el.id = "m-demo-toast";
      el.className = "m-demo-toast";
      el.setAttribute("role", "status");
      document.body.appendChild(el);
    }
    el.textContent = text;
    el.classList.add("is-visible");
    clearTimeout(showToast._t);
    showToast._t = setTimeout(function () {
      el.classList.remove("is-visible");
    }, 2600);
  }

  function interceptForms() {
    document.addEventListener(
      "submit",
      function (e) {
        var form = e.target;
        if (!form || form.tagName !== "FORM") return;
        if (form.getAttribute("data-demo-allow") === "true") return;
        if (form.id === "book-form") return;
        if (form.getAttribute("role") === "search") return;
        e.preventDefault();
        showToast();
      },
      true
    );
  }

  function init() {
    document.documentElement.setAttribute("data-demo-site", "true");
    interceptForms();
  }

  window.MobileDemo = { showToast: showToast, desktopRoot: desktopRoot };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
