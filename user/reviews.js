/**
 * Pandit reviews — hub list with filters (demo)
 */
(function () {
  "use strict";

  var REVIEWS = [
    {
      devotee: "Rahul S.",
      ritual: "Griha Pravesh",
      rating: 5,
      text: "Very knowledgeable and patient. Griha Pravesh was conducted beautifully.",
      date: "Jan 2026",
      recent: true,
    },
    {
      devotee: "Meera K.",
      ritual: "Annaprashanna",
      rating: 5,
      text: "Punctual and explained samagri clearly. Would book again.",
      date: "Dec 2025",
      recent: true,
    },
    {
      devotee: "Priya N.",
      ritual: "Satyanarayan Puja",
      rating: 4,
      text: "Warm ceremony. A short follow-up on samagri would have helped.",
      date: "Oct 2025",
      recent: false,
    },
  ];

  var activeFilter = "all";
  var searchQuery = "";

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

  function matchesFilter(r) {
    if (activeFilter === "5" && r.rating < 5) return false;
    if (activeFilter === "recent" && !r.recent) return false;
    if (!searchQuery) return true;
    var q = searchQuery.toLowerCase();
    var hay = (r.devotee || "") + " " + (r.ritual || "") + " " + (r.text || "");
    return hay.toLowerCase().indexOf(q) !== -1;
  }

  function renderStats() {
    var el = document.getElementById("pandit-reviews-stats");
    if (!el) return;
    var avg = REVIEWS.reduce(function (s, r) {
      return s + r.rating;
    }, 0) / REVIEWS.length;
    var five = REVIEWS.filter(function (r) {
      return r.rating === 5;
    }).length;
    el.innerHTML =
      '<li class="portal-reviews-hub__stat"><strong>' +
      avg.toFixed(1) +
      '</strong><span>Average</span></li>' +
      '<li class="portal-reviews-hub__stat portal-reviews-hub__stat--highlight"><strong>' +
      five +
      '</strong><span>5-star</span></li>' +
      '<li class="portal-reviews-hub__stat"><strong>' +
      REVIEWS.length +
      "</strong><span>Total</span></li>";
  }

  function renderRatingBadge() {
    var el = document.getElementById("pandit-reviews-rating");
    if (!el) return;
    var avg = REVIEWS.reduce(function (s, r) {
      return s + r.rating;
    }, 0) / REVIEWS.length;
    el.innerHTML =
      '<span class="portal-reviews-hub__rating-value">' +
      avg.toFixed(1) +
      '</span><span class="portal-reviews-hub__rating-stars" aria-hidden="true">' +
      esc(starsLabel(Math.round(avg))) +
      "</span>";
  }

  function syncFilters() {
    var bar = document.getElementById("pandit-reviews-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-review-filter]").forEach(function (b) {
      var on = b.getAttribute("data-review-filter") === activeFilter;
      b.classList.toggle("is-active", on);
      b.setAttribute("aria-selected", on ? "true" : "false");
    });
  }

  function renderList() {
    var list = document.getElementById("pandit-reviews-list");
    var countEl = document.getElementById("pandit-reviews-count");
    if (!list) return;

    var filtered = REVIEWS.filter(matchesFilter);

    if (countEl) {
      countEl.textContent =
        filtered.length + (filtered.length === 1 ? " review" : " reviews") + " shown";
    }

    if (!filtered.length) {
      list.innerHTML =
        '<p class="portal-reviews-hub__empty">No reviews match this filter.</p>';
      return;
    }

    list.innerHTML = filtered
      .map(function (r) {
        return (
          '<article class="portal-review-tile portal-review-tile--pandit" role="listitem">' +
          '<header class="portal-review-tile__head">' +
          "<div><h3>" +
          esc(r.devotee) +
          '</h3><p class="portal-review-tile__meta">' +
          esc(r.ritual) +
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
      })
      .join("");
  }

  function initFilters() {
    var bar = document.getElementById("pandit-reviews-filters");
    if (!bar) return;
    bar.querySelectorAll("[data-review-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeFilter = btn.getAttribute("data-review-filter") || "all";
        syncFilters();
        renderList();
      });
    });

    var searchInput = document.getElementById("pandit-reviews-search");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        function () {
          searchQuery = (searchInput.value || "").trim();
          renderList();
        },
        { passive: true }
      );
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderStats();
    renderRatingBadge();
    initFilters();
    syncFilters();
    renderList();
  });
})();
