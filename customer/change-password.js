/**
 * Change password — demo form with validation
 */
(function () {
  "use strict";

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

  function wireVisibility(btn) {
    var targetId = btn.getAttribute("data-toggle-password");
    var input = document.getElementById(targetId);
    if (!input) return;

    btn.addEventListener("click", function () {
      var show = input.type === "password";
      input.type = show ? "text" : "password";
      btn.setAttribute("aria-pressed", show ? "true" : "false");
      btn.setAttribute("aria-label", show ? "Hide password" : "Show password");
    });
  }

  function updateRequirements(password) {
    var list = document.getElementById("password-requirements");
    if (!list) return;

    var checks = {
      length: password.length >= 8,
      letter: /[A-Za-z]/.test(password),
      number: /\d/.test(password),
    };

    list.querySelectorAll("[data-rule]").forEach(function (item) {
      var rule = item.getAttribute("data-rule");
      var ok = checks[rule];
      item.classList.toggle("is-met", ok);
    });
  }

  function wireForm() {
    var form = document.getElementById("password-form");
    if (!form) return;

    var current = document.getElementById("password-current");
    var next = document.getElementById("password-new");
    var confirm = document.getElementById("password-confirm");

    if (next) {
      next.addEventListener("input", function () {
        updateRequirements(next.value);
      });
    }

    form.querySelectorAll("[data-toggle-password]").forEach(wireVisibility);

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      if (next && confirm && next.value !== confirm.value) {
        confirm.setCustomValidity("Passwords do not match");
        confirm.reportValidity();
        return;
      }

      if (confirm) confirm.setCustomValidity("");

      var note = document.getElementById("password-save-note");
      if (note) {
        note.hidden = false;
        note.textContent = "Password updated successfully.";
      }

      form.reset();
      updateRequirements("");
    });

    if (confirm) {
      confirm.addEventListener("input", function () {
        confirm.setCustomValidity("");
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSearch();
    wireForm();
    updateRequirements("");
  });
})();
