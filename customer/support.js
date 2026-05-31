/**
 * Support — contact channels, FAQ, message form (demo)
 */
(function () {
  "use strict";

  var TOPICS = {
    customer: {
      booking: "Question about booking #DC-001",
      payment: "Payment or refund question",
      other: "General support request",
    },
    pandit: {
      booking: "Question about booking #DC-042",
      payout: "Payout or withdrawal question",
      verification: "Identity verification help",
      other: "Pandit support request",
    },
  };

  function audience() {
    var form = document.getElementById("support-form");
    if (form && form.getAttribute("data-support-audience")) {
      return form.getAttribute("data-support-audience");
    }
    return document.body.classList.contains("page-portal--pandit") ? "pandit" : "customer";
  }

  function defaultSubject(topic) {
    var aud = audience();
    var map = TOPICS[aud] || TOPICS.customer;
    if (map[topic]) return map[topic];

    var Demo = window.DivineCenterDemo;
    if (aud === "pandit") {
      return map.booking;
    }
    if (!Demo || !Demo.getLastBooking) return map.booking;
    var last = Demo.getLastBooking();
    if (!last || !last.id) return map.booking;
    return "Question about booking #" + String(last.id).replace(/^#/, "");
  }

  function applySubject(topic, force) {
    var subject = document.getElementById("support-subject");
    if (!subject) return;
    if (!force && subject.dataset.touched) return;
    subject.value = defaultSubject(topic);
  }

  function wireTopics() {
    var group = document.getElementById("support-topics");
    var hidden = document.getElementById("support-topic");
    if (!group || !hidden) return;

    group.querySelectorAll(".portal-support-topics__btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var topic = btn.getAttribute("data-topic");
        hidden.value = topic;

        group.querySelectorAll(".portal-support-topics__btn").forEach(function (b) {
          var active = b === btn;
          b.classList.toggle("is-active", active);
          b.setAttribute("aria-pressed", active ? "true" : "false");
        });

        applySubject(topic, true);
        var subject = document.getElementById("support-subject");
        if (subject) delete subject.dataset.touched;
      });
    });

    applySubject(hidden.value || "booking", false);
  }

  function wireCharCount() {
    var message = document.getElementById("support-message");
    var counter = document.getElementById("support-char-count");
    if (!message || !counter) return;

    function sync() {
      counter.textContent = String(message.value.length);
    }

    message.addEventListener("input", sync);
    sync();
  }

  function wireForm() {
    var form = document.getElementById("support-form");
    if (!form) return;

    var subject = document.getElementById("support-subject");
    if (subject) {
      subject.addEventListener("input", function () {
        subject.dataset.touched = "1";
      });
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var note = document.getElementById("support-save-note");
      if (note) {
        note.hidden = false;
        note.textContent =
          "Message sent. Our team typically replies within 24 hours.";
      }

      var message = form.querySelector("textarea");
      var counter = document.getElementById("support-char-count");
      if (message) message.value = "";
      if (counter) counter.textContent = "0";
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
    wireTopics();
    wireCharCount();
    wireForm();
    initSearch();
  });
})();
