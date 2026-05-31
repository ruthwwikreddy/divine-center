/**
 * My Reviews — write review form (demo)
 */
(function () {
  "use strict";

  var DEMO_BOOKINGS = [
    {
      id: "DC-001",
      ritual: "Annaprashanna",
      pandit: "Keeya Pathak",
      date: "30 Jan 2026",
      status: "completed",
    },
    {
      id: "DC-018",
      ritual: "Griha Pravesh",
      pandit: "Aman Pathak",
      date: "18 Nov 2025",
      status: "completed",
    },
    {
      id: "DC-024",
      ritual: "Satyanarayan Puja",
      pandit: "Raman Pathak",
      date: "8 Dec 2025",
      status: "completed",
    },
  ];

  var STAR_SVG =
    '<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';

  var PAST_REVIEWS = [
    {
      ritual: "Griha Pravesh",
      rating: 5,
      text: "Pandit ji was punctual and explained every step with warmth. Highly recommend for housewarming.",
      pandit: "Keeya Pathak",
      date: "8 Jan 2026",
    },
    {
      ritual: "Satyanarayan Puja",
      rating: 4,
      text: "Beautiful ceremony. Samagri list was very helpful.",
      pandit: "Aman Pathak",
      date: "Nov 2025",
    },
  ];

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function starsLabel(n) {
    var full = Math.max(0, Math.min(5, Math.round(n)));
    return "★★★★★".slice(0, full) + "☆☆☆☆☆".slice(0, 5 - full);
  }

  function renderPastReviews() {
    var list = document.getElementById("reviews-past-list");
    var stat = document.getElementById("reviews-past-stat");
    if (!list) return;

    if (stat) {
      stat.innerHTML = "<strong>" + PAST_REVIEWS.length + "</strong> published";
    }

    list.innerHTML = PAST_REVIEWS.map(function (r) {
      return (
        '<article class="portal-review-tile" role="listitem">' +
        '<header class="portal-review-tile__head">' +
        "<div><h3>" +
        esc(r.ritual) +
        '</h3><p class="portal-review-tile__meta">' +
        esc(r.pandit) +
        " · " +
        esc(r.date) +
        "</p></div>" +
        '<span class="portal-review-tile__stars" aria-label="' +
        r.rating +
        ' stars">' +
        esc(starsLabel(r.rating)) +
        "</span></header>" +
        '<p class="portal-review-tile__text">' +
        esc(r.text) +
        "</p></article>"
      );
    }).join("");
  }

  function bookingOptions() {
    var items = DEMO_BOOKINGS.slice();
    var Demo = window.DivineCenterDemo;
    if (Demo && Demo.getLastBooking) {
      var last = Demo.getLastBooking();
      if (last && last.pujaTitle) {
        items.unshift({
          id: String(last.id || "DC-001").replace(/^#/, ""),
          ritual: last.pujaTitle,
          pandit: last.panditName || "Your pandit",
          date: last.date && Demo.formatDate ? Demo.formatDate(last.date) : "Feb 2026",
          status: "completed",
        });
      }
    }
    return items;
  }

  function optionLabel(b) {
    return b.ritual + " — #" + b.id + " · " + b.pandit + " (" + b.status + ")";
  }

  function populateBookings() {
    var select = document.getElementById("review-booking");
    if (!select) return;
    var items = bookingOptions();
    select.innerHTML = items
      .map(function (b, i) {
        return (
          '<option value="' +
          esc(b.id) +
          '"' +
          (i === 0 ? " selected" : "") +
          ">" +
          esc(optionLabel(b)) +
          "</option>"
        );
      })
      .join("");
  }

  function wireStarRating() {
    var group = document.getElementById("review-star-rating");
    var input = document.getElementById("review-rating");
    if (!group || !input) return;

    var buttons = group.querySelectorAll(".portal-star-rating__btn");
    buttons.forEach(function (btn) {
      btn.innerHTML = STAR_SVG;
    });

    var current = 5;

    function paint(value) {
      buttons.forEach(function (btn) {
        var v = parseInt(btn.getAttribute("data-value"), 10);
        btn.classList.toggle("is-active", v <= value);
        btn.setAttribute("aria-checked", v === value ? "true" : "false");
      });
      var hint = document.getElementById("review-rating-hint");
      if (hint) {
        var labels = ["", "Needs improvement", "Fair", "Good", "Very good", "Excellent"];
        hint.textContent = labels[value] || "Tap to rate your experience";
      }
    }

    paint(current);

    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        current = parseInt(btn.getAttribute("data-value"), 10);
        input.value = String(current);
        paint(current);
      });
      btn.addEventListener("mouseenter", function () {
        paint(parseInt(btn.getAttribute("data-value"), 10));
      });
    });

    group.addEventListener("mouseleave", function () {
      paint(current);
    });
  }

  function wireCharCount() {
    var textarea = document.getElementById("review-text");
    var counter = document.getElementById("review-char-count");
    if (!textarea || !counter) return;

    function update() {
      counter.textContent = String(textarea.value.length);
    }

    textarea.addEventListener("input", update);
    update();
  }

  function wireForm() {
    var form = document.getElementById("review-form");
    if (!form) return;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var note = document.getElementById("review-save-note");
      var select = document.getElementById("review-booking");
      var ritual = select && select.options[select.selectedIndex] ? select.options[select.selectedIndex].text.split(" — ")[0] : "Your ritual";

      if (note) {
        note.hidden = false;
        note.textContent = "Thank you! Your review for " + ritual + " was submitted successfully.";
      }

      var textarea = form.querySelector("textarea");
      if (textarea) {
        textarea.value = "";
        var counter = document.getElementById("review-char-count");
        if (counter) counter.textContent = "0";
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
    renderPastReviews();
    populateBookings();
    wireStarRating();
    wireCharCount();
    wireForm();
    initSearch();
  });
})();
