/**
 * Pandit booking detail — accept / decline demo
 */
(function () {
  "use strict";

  function initSearch() {
    var form = document.getElementById("dash-search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (form.querySelector("input") || {}).value || "";
      var root = "../../";
      if (q.trim()) {
        window.location.href = root + "pandits?q=" + encodeURIComponent(q.trim());
      } else {
        window.location.href = root + "pandits";
      }
    });
  }

  function wireCopy() {
    document.querySelectorAll(".dash-copy-btn").forEach(function (btn) {
      btn.addEventListener("click", function (e) {
        e.preventDefault();
        var text = btn.getAttribute("data-copy") || "";
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(function () {
            btn.classList.add("is-copied");
            setTimeout(function () {
              btn.classList.remove("is-copied");
            }, 1500);
          });
        }
      });
    });
  }

  function wireActions() {
    var accept = document.getElementById("pandit-booking-accept");
    var decline = document.getElementById("pandit-booking-decline");
    var note = document.getElementById("pandit-booking-note");
    var badge = document.getElementById("pandit-booking-status");
    var statusWrap = document.getElementById("pandit-booking-status-wrap");
    var statusHint = document.getElementById("pandit-booking-status-hint");

    function setStatus(state, label, hint) {
      if (badge) {
        badge.textContent = label;
        badge.className =
          "portal-pandit-booking-tags__status-badge portal-pandit-booking-tags__status-badge--" + state;
      }
      if (statusWrap) statusWrap.setAttribute("data-status", state);
      if (statusHint && hint) statusHint.textContent = hint;
    }

    if (accept) {
      accept.addEventListener("click", function () {
        setStatus("confirmed", "Confirmed", "Devotee notified · ritual on schedule");
        if (note) {
          note.hidden = false;
          note.textContent = "Booking accepted — devotee will be notified.";
        }
        if (accept) accept.disabled = true;
        if (decline) decline.disabled = true;
      });
    }

    if (decline) {
      decline.addEventListener("click", function () {
        setStatus("declined", "Declined", "Removed from your queue");
        if (note) {
          note.hidden = false;
          note.textContent = "Booking declined — removed from your queue.";
        }
        if (accept) accept.disabled = true;
        decline.disabled = true;
      });
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initSearch();
    wireCopy();
    wireActions();
  });
})();
