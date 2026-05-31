/**
 * Pandit edit profile — public profile form with live preview (demo persistence)
 */
(function () {
  "use strict";

  var STORAGE_KEY = "dc_pandit_profile";
  var BIO_MAX = 280;

  var DEFAULTS = {
    displayName: "Panduranga Charyulu",
    experience: 18,
    bio: "Vedic scholar specializing in Griha Pravesh and Namakaran. Serving Hyderabad & Secunderabad.",
    city: "Hyderabad",
    languages: "Telugu, Hindi, English",
    specialties: "Griha Pravesh, Namakaran, Satyanarayan Puja",
    rating: 4.9,
    bookings: 26,
    reviews: 48,
  };

  function loadProfile() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULTS);
      return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function saveProfile(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function displayLabel(name) {
    return String(name || DEFAULTS.displayName).trim();
  }

  function firstName(label) {
    return String(label).replace(/\s*\(demo\)\s*$/i, "").split(/\s+/)[0];
  }

  function splitList(value) {
    return String(value || "")
      .split(",")
      .map(function (s) {
        return s.trim();
      })
      .filter(Boolean);
  }

  function renderTags(container, items, className) {
    if (!container) return;
    if (!items.length) {
      container.innerHTML = "";
      return;
    }
    container.innerHTML = items
      .map(function (item) {
        return (
          '<span class="pandit-profile-form__tag' +
          (className ? " " + className : "") +
          '">' +
          escapeHtml(item) +
          "</span>"
        );
      })
      .join("");
  }

  function escapeHtml(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = String(s);
    return d.innerHTML;
  }

  function updateBioCount(bio) {
    var el = document.getElementById("pandit-bio-count");
    if (!el) return;
    var len = String(bio || "").length;
    el.textContent = len + " / " + BIO_MAX;
    el.classList.toggle("pandit-profile-form__bio-count--warn", len > BIO_MAX * 0.9);
  }

  function updateListingPreview(data) {
    var name = document.getElementById("pandit-preview-name");
    var meta = document.getElementById("pandit-preview-meta");
    var bio = document.getElementById("pandit-preview-bio");
    var langs = document.getElementById("pandit-preview-languages");
    var specs = document.getElementById("pandit-preview-specialties");

    if (name) name.textContent = data.displayName || DEFAULTS.displayName;
    if (meta) {
      meta.textContent =
        (data.city || DEFAULTS.city) +
        " · " +
        (data.experience || DEFAULTS.experience) +
        " yrs · " +
        Number(data.rating || DEFAULTS.rating).toFixed(1) +
        " ★";
    }
    if (bio) bio.textContent = data.bio || DEFAULTS.bio;

    renderTags(langs, splitList(data.languages));
    renderTags(
      specs,
      splitList(data.specialties),
      "pandit-profile-form__tag--ritual"
    );
    updateBioCount(data.bio);
  }

  function updateHero(data) {
    var nameEl = document.getElementById("pandit-profile-display-name");
    var metaEl = document.getElementById("pandit-profile-display-meta");
    var langEl = document.getElementById("pandit-profile-languages");
    var ratingEl = document.getElementById("pandit-profile-rating");
    var bookingsEl = document.getElementById("pandit-profile-bookings");
    var experienceEl = document.getElementById("pandit-profile-experience");
    var profileName = document.getElementById("dash-profile-name");

    var label = displayLabel(data.displayName);

    if (nameEl) nameEl.textContent = label;
    if (profileName) profileName.textContent = firstName(label);
    if (metaEl) metaEl.textContent = data.city + " · " + data.experience + " years experience";
    if (langEl) langEl.textContent = data.languages;
    if (ratingEl) ratingEl.textContent = Number(data.rating).toFixed(1);
    if (bookingsEl) bookingsEl.textContent = String(data.bookings);
    if (experienceEl) experienceEl.textContent = String(data.experience);
  }

  function populateForm(form, data) {
    var map = {
      displayName: data.displayName,
      experience: data.experience,
      bio: data.bio,
      city: data.city,
      languages: data.languages,
      specialties: data.specialties,
    };

    Object.keys(map).forEach(function (key) {
      var el = form.querySelector('[name="' + key + '"]');
      if (el) el.value = map[key];
    });
  }

  function readForm(form) {
    var saved = loadProfile();
    return {
      displayName:
        (form.querySelector('[name="displayName"]') || {}).value || DEFAULTS.displayName,
      experience:
        parseInt((form.querySelector('[name="experience"]') || {}).value, 10) ||
        DEFAULTS.experience,
      bio: (form.querySelector('[name="bio"]') || {}).value || DEFAULTS.bio,
      city: (form.querySelector('[name="city"]') || {}).value || DEFAULTS.city,
      languages:
        (form.querySelector('[name="languages"]') || {}).value || DEFAULTS.languages,
      specialties:
        (form.querySelector('[name="specialties"]') || {}).value || DEFAULTS.specialties,
      rating: saved.rating,
      bookings: saved.bookings,
      reviews: saved.reviews,
    };
  }

  function syncFromForm(form) {
    var data = readForm(form);
    updateListingPreview(data);
    updateHero(data);
    return data;
  }

  function showNote(message) {
    var note = document.getElementById("pandit-profile-save-note");
    if (!note) return;
    note.hidden = false;
    note.textContent = message;
    clearTimeout(showNote._t);
    showNote._t = setTimeout(function () {
      note.hidden = true;
    }, 3200);
  }

  function wireForm() {
    var form = document.getElementById("pandit-profile-form");
    if (!form) return;

    var data = loadProfile();
    populateForm(form, data);
    updateListingPreview(data);
    updateHero(data);

    form.addEventListener("input", function () {
      syncFromForm(form);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var next = readForm(form);
      saveProfile(next);
      populateForm(form, next);
      updateListingPreview(next);
      updateHero(next);
      showNote("Profile updated successfully.");

      if (window.DivineCenterDemo && window.DivineCenterDemo.showToast) {
        window.DivineCenterDemo.showToast("Profile saved.");
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
    wireForm();
    initSearch();
  });
})();
