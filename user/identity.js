/**
 * Pandit identity verification — demo upload
 */
(function () {
  "use strict";

  function showNote(message) {
    var note = document.getElementById("identity-upload-note");
    if (!note) return;
    note.hidden = false;
    note.textContent = message;
    clearTimeout(showNote._t);
    showNote._t = setTimeout(function () {
      note.hidden = true;
    }, 3500);
  }

  function wireUpload() {
    var form = document.getElementById("identity-upload-form");
    var input = document.getElementById("identity-file");
    var nameEl = document.getElementById("identity-file-name");
    var dropzone = document.getElementById("identity-dropzone");
    if (!form || !input) return;

    function syncFileName() {
      var file = input.files && input.files[0];
      if (!file) {
        if (nameEl) {
          nameEl.hidden = true;
          nameEl.textContent = "";
        }
        if (dropzone) dropzone.classList.remove("has-file");
        return;
      }
      if (nameEl) {
        nameEl.hidden = false;
        nameEl.textContent = file.name;
      }
      if (dropzone) dropzone.classList.add("has-file");
    }

    input.addEventListener("change", syncFileName);

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!input.files || !input.files.length) {
        showNote("Choose a PDF or JPG to continue.");
        return;
      }
      showNote("Document submitted for review.");
      if (window.DivineCenterDemo && window.DivineCenterDemo.showToast) {
        window.DivineCenterDemo.showToast("ID submitted for review.");
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
    wireUpload();
    initSearch();
  });
})();
