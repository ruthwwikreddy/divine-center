/**
 * Customer profile page — demo session sync
 */
(function () {
  "use strict";

  var PLACEHOLDER = "../assets/images/placeholders/pandit-avatar.svg";

  function fullNameFromSession() {
    var Demo = window.DivineCenterDemo;
    if (!Demo || !Demo.getAuthSession) return "Rahul Sharma";
    var session = Demo.getAuthSession();
    if (!session) return "Rahul Sharma";
    var n = session.name || session.email || "Rahul Sharma";
    if (String(n).indexOf("@") > -1) n = n.split("@")[0];
    var parts = String(n).trim().split(/\s+/);
    return parts
      .map(function (w) {
        return w.charAt(0).toUpperCase() + w.slice(1);
      })
      .join(" ");
  }

  function displayLabel(name) {
    return name;
  }

  function applySession() {
    var name = fullNameFromSession();
    var label = displayLabel(name);

    var display = document.getElementById("profile-display-name");
    var meta = document.getElementById("profile-display-meta");
    var profileName = document.getElementById("dash-profile-name");
    var nameInput = document.querySelector("#profile-form [name='fullName']");
    var emailInput = document.querySelector("#profile-form [name='email']");
    var phoneInput = document.querySelector("#profile-form [name='phone']");

    if (display) display.textContent = label;
    if (profileName) profileName.textContent = label.split(" ")[0];
    if (nameInput && !nameInput.dataset.touched) nameInput.value = name;
    if (meta) {
      var cityInput = document.getElementById("profile-city");
      var city = (cityInput && cityInput.value) || "Hyderabad";
      meta.textContent = "Member since Jan 2025 · " + city;
    }

    var session = window.DivineCenterDemo && window.DivineCenterDemo.getAuthSession();
    if (session) {
      if (emailInput && session.email) emailInput.value = session.email;
      if (phoneInput && session.phone) phoneInput.value = session.phone;
    }
  }

  function wireForm() {
    var form = document.getElementById("profile-form");
    if (!form) return;

    form.querySelectorAll("input, textarea").forEach(function (el) {
      el.addEventListener("input", function () {
        el.dataset.touched = "1";
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var Demo = window.DivineCenterDemo;
      if (Demo && Demo.getAuthSession) {
        var session = Demo.getAuthSession() || {};
        var fd = new FormData(form);
        session.name = fd.get("fullName") || session.name;
        session.email = fd.get("email") || session.email;
        session.phone = fd.get("phone") || session.phone;
        try {
          sessionStorage.setItem("dc_session", JSON.stringify(session));
        } catch (err) {}
      }
      applySession();
      var note = document.getElementById("profile-save-note");
      if (note) {
        note.hidden = false;
        note.textContent = "Profile updated successfully.";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    applySession();
    wireForm();
  });
})();
