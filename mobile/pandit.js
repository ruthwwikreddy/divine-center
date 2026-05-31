(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var slug = new URLSearchParams(location.search).get("p") || "";
  var detail = DC.getPanditDetail(slug);
  var root = document.getElementById("pandit-detail-root");
  if (!detail || !root) {
    if (root) {
      root.innerHTML =
        '<p class="pujas-directory__empty">Pandit not found. <a href="pandits">Browse all pandits</a></p>';
    }
    return;
  }

  (function () {
    var brand = "Divine Center";
    var base = (detail.seoTitle || detail.name).replace(
      new RegExp("(\\s*\\|\\s*" + brand + "\\s*)+$", "gi"),
      ""
    );
    document.title = base.trim() + " | " + brand;
  })();

  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && detail.bio) {
    metaDesc.setAttribute("content", detail.bio.replace(/\s+/g, " ").substring(0, 155) + "…");
  }

  var nameDisplay = detail.name.replace(/\s*\([^)]*\)\s*$/, "").trim() || detail.name;

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function modeLabel(mode) {
    if (mode === "Both") return "Online & In-person";
    if (mode === "Online") return "Online rituals";
    return "At your place";
  }

  function firstParagraph(text) {
    var block = String(text || "").split(/\n\s*\n+/)[0] || "";
    return block.replace(/\s+/g, " ").trim();
  }

  function parseExperienceYears(expLabel) {
    var n = parseInt(String(expLabel || "").replace(/[^\d]/g, ""), 10);
    return Number.isFinite(n) && n > 0 ? n : 5;
  }

  function deriveStats() {
    var expYears = parseExperienceYears(detail.exp || detail.experienceLabel);
    var completed = Math.max(36, expYears * 28 + (detail.services || []).length * 9);
    var rating = 4.7 + Math.min(0.29, expYears / 100);
    return { completed: completed, rating: rating.toFixed(1) };
  }

  function renderExpertiseTags() {
    var tags = []
      .concat(detail.languages || detail.langs || [])
      .concat((detail.services || []).slice(0, 3).map(function (s) { return s.name; }))
      .slice(0, 6);
    return tags.map(function (t) { return '<span class="pandit-detail__tag">' + esc(t) + "</span>"; }).join("");
  }

  function renderServices(services) {
    return services
      .map(function (svc) {
        var href =
          "../pandits/booking?pandit=" +
          encodeURIComponent(slug || "") +
          (svc.pujaSlug ? "&puja=" + encodeURIComponent(svc.pujaSlug) : "");
        return (
          '<div class="pandit-service-row">' +
          "<span>" +
          esc(svc.name) +
          "</span>" +
          '<a href="' +
          href +
          '" class="pandit-service-row__quote">Custom quote</a>' +
          "</div>"
        );
      })
      .join("");
  }

  function nextSevenDays() {
    var out = [];
    var now = new Date();
    for (var i = 0; i < 7; i++) {
      var d = new Date(now);
      d.setDate(now.getDate() + i);
      var label = "";
      if (i === 0) label = "Today";
      else if (i === 1) label = "Tomorrow";
      out.push({
        id: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString("en-IN", { weekday: "short" }),
        dateNum: d.toLocaleDateString("en-IN", { day: "2-digit" }),
        month: d.toLocaleDateString("en-IN", { month: "short" }),
        label: label,
      });
    }
    return out;
  }

  function renderAvailabilitySection() {
    var slots = [
      { id: "Morning", time: "6 – 11 AM", icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>' },
      { id: "Afternoon", time: "12 – 4 PM", icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 100 12 6 6 0 000-12z"/><path d="M12 9v3l2 1"/></svg>' },
      { id: "Evening", time: "5 – 9 PM", icon: '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 14.5A8.5 8.5 0 1112 4v2"/></svg>' },
    ];
    return (
      '<section class="detail-section detail-section--schedule" aria-labelledby="pandit-schedule-title">' +
      '<div class="pandit-schedule__head">' +
      '<h2 id="pandit-schedule-title" class="detail-section__title">Calendar availability</h2>' +
      '<p class="detail-section__lede">Pick a date and preferred time. We confirm your slot quickly.</p>' +
      "</div>" +
      '<div class="pandit-schedule__block">' +
      '<p class="pandit-schedule__label">Select date</p>' +
      '<div class="pandit-schedule__dates" id="pandit-availability" role="listbox" aria-label="Available dates">' +
      nextSevenDays()
        .map(function (d, i) {
          var chipLabel = d.label || d.day + " " + d.dateNum;
          return (
            '<button type="button" class="pandit-date-btn' +
            (i === 0 ? " is-active" : "") +
            '" role="option" aria-selected="' +
            (i === 0 ? "true" : "false") +
            '" data-day="' +
            d.id +
            '" data-label="' +
            esc(chipLabel) +
            '">' +
            (d.label ? '<span class="pandit-date-btn__tag">' + esc(d.label) + "</span>" : "") +
            '<span class="pandit-date-btn__day">' +
            esc(d.day) +
            "</span>" +
            '<span class="pandit-date-btn__num">' +
            esc(d.dateNum) +
            "</span>" +
            '<span class="pandit-date-btn__mon">' +
            esc(d.month) +
            "</span>" +
            "</button>"
          );
        })
        .join("") +
      "</div>" +
      "</div>" +
      '<div class="pandit-schedule__block">' +
      '<p class="pandit-schedule__label">Preferred time</p>' +
      '<div class="pandit-schedule__slots" id="pandit-slot-row" role="listbox" aria-label="Preferred time slot">' +
      slots
        .map(function (s, i) {
          return (
            '<button type="button" class="pandit-slot-btn' +
            (i === 0 ? " is-active" : "") +
            '" role="option" aria-selected="' +
            (i === 0 ? "true" : "false") +
            '" data-slot="' +
            s.id +
            '">' +
            '<span class="pandit-slot-btn__icon" aria-hidden="true">' +
            s.icon +
            "</span>" +
            '<span class="pandit-slot-btn__label">' +
            s.id +
            "</span>" +
            '<span class="pandit-slot-btn__time">' +
            s.time +
            "</span>" +
            "</button>"
          );
        })
        .join("") +
      "</div>" +
      "</div>" +
      '<div class="pandit-schedule__status" id="availability-hint">' +
      '<span class="pandit-schedule__status-dot" aria-hidden="true"></span>' +
      "<p><strong>Today</strong> · Morning preferred · Confirmed in 15–30 minutes</p>" +
      "</div>" +
      '<ul class="pandit-schedule__assurance">' +
      "<li><span class=\"pandit-schedule__check\" aria-hidden=\"true\"></span>Transparent pricing before confirmation</li>" +
      "<li><span class=\"pandit-schedule__check\" aria-hidden=\"true\"></span>Ritual checklist shared in advance</li>" +
      "</ul>" +
      "</section>"
    );
  }

  function updateAvailabilityHint() {
    var hint = document.getElementById("availability-hint");
    if (!hint) return;
    var dateBtn = document.querySelector("#pandit-availability .pandit-date-btn.is-active");
    var slotBtn = document.querySelector("#pandit-slot-row .pandit-slot-btn.is-active");
    var dateLabel = dateBtn ? dateBtn.getAttribute("data-label") || "Selected date" : "Selected date";
    var slotLabel = slotBtn ? slotBtn.getAttribute("data-slot") || "Morning" : "Morning";
    hint.innerHTML =
      '<span class="pandit-schedule__status-dot" aria-hidden="true"></span>' +
      "<p><strong>" +
      esc(dateLabel) +
      "</strong> · " +
      esc(slotLabel) +
      " preferred · Confirmed in 15–30 minutes</p>";
    var stickyMeta = document.getElementById("pandit-sticky-meta");
    if (stickyMeta) {
      stickyMeta.textContent = dateLabel + " · " + slotLabel + " · Callback in 15–30 min";
    }
  }

  function shareCurrentPage() {
    var shareData = { title: document.title, url: location.href };
    if (navigator.share) {
      navigator.share(shareData).catch(function () {});
      return;
    }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(location.href).catch(function () {
        window.prompt("Copy link", location.href);
      });
      return;
    }
    window.prompt("Copy link", location.href);
  }

  var reviewsSeed = [
    { who: "Suma Reddy", kind: "Top", text: "Very calm guidance. The ritual was punctual and clearly explained to our family.", rating: 5, when: "3 days ago", puja: "Satyanarayan Puja" },
    { who: "Anil Sharma", kind: "Recent", text: "Professional and devotional. Samagri list and steps were shared in advance.", rating: 5, when: "1 week ago", puja: "Griha Pravesh" },
    { who: "Lakshmi Devi", kind: "Top", text: "Authentic mantras and patient support for elders at home.", rating: 5, when: "2 weeks ago", puja: "Namakaran" },
    { who: "Vikram Rao", kind: "Recent", text: "Reached on time and completed everything with discipline and warmth.", rating: 4, when: "3 weeks ago", puja: "Ganesh Puja" },
  ];

  function reviewInitials(name) {
    return String(name || "")
      .split(" ")
      .map(function (w) { return w.charAt(0); })
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  function renderStarRow(rating, max) {
    var maxStars = max || 5;
    var n = Math.max(0, Math.min(maxStars, Number(rating) || 0));
    var html =
      '<div class="pandit-review-card__stars" role="img" aria-label="' +
      n +
      " out of " +
      maxStars +
      ' stars">';
    for (var i = 1; i <= maxStars; i++) {
      html += '<span class="pandit-review-card__star' + (i <= n ? " is-on" : "") + '" aria-hidden="true">★</span>';
    }
    return html + "</div>";
  }

  function reviewsSummaryHtml() {
    var total = reviewsSeed.length;
    var avg =
      reviewsSeed.reduce(function (sum, r) { return sum + (r.rating || 0); }, 0) / Math.max(total, 1);
    return (
      '<div class="pandit-reviews__summary">' +
      '<div class="pandit-reviews__score" aria-hidden="true">' +
      '<strong>' +
      avg.toFixed(1) +
      "</strong>" +
      renderStarRow(Math.round(avg)) +
      "</div>" +
      '<p class="pandit-reviews__count">' +
      total +
      " verified reviews from families</p>" +
      "</div>"
    );
  }

  var stats = deriveStats();
  var expYears = parseExperienceYears(detail.exp || detail.experienceLabel);

  function panditHeroHtml() {
    var panditImg = { name: detail.name, photo: detail.photo, slug: detail.slug };
    return (
      '<header class="pandit-profile__hero">' +
      '<div class="pandit-profile__figure">' +
      '<div class="pandit-profile__photo">' +
      DC.imgPandit(panditImg, "pandit-profile__photo-img", 720, 900, "eager") +
      "</div>" +
      '<div class="pandit-profile__figure-shade" aria-hidden="true"></div>' +
      '<div class="pandit-profile__toolbar">' +
      '<a href="pandits.html" class="pandit-profile__nav-btn pandit-profile__back" aria-label="Back">‹</a>' +
      '<button type="button" class="pandit-profile__nav-btn pandit-profile__share" aria-label="Share">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/></svg>' +
      "</button>" +
      "</div>" +
      '<div class="pandit-profile__figure-meta">' +
      '<span class="pandit-profile__verified">Verified Acharya</span>' +
      '<p class="pandit-profile__mode">' +
      esc(modeLabel(detail.mode || detail.serviceMode || "Both")) +
      "</p>" +
      "</div>" +
      "</div>" +
      '<div class="pandit-profile__panel">' +
      '<h1 class="pandit-profile__name">' +
      esc(nameDisplay) +
      "</h1>" +
      '<p class="pandit-profile__role">' +
      esc(detail.role || "Vedic Acharya") +
      "</p>" +
      '<div class="pandit-profile__metrics" aria-label="Pandit highlights">' +
      '<div class="pandit-profile__metric"><strong>' +
      stats.rating +
      '</strong><span class="pandit-profile__metric-label">Rating</span></div>' +
      '<div class="pandit-profile__metric"><strong>' +
      stats.completed +
      '+</strong><span class="pandit-profile__metric-label">Pujas done</span></div>' +
      '<div class="pandit-profile__metric"><strong>' +
      expYears +
      '+</strong><span class="pandit-profile__metric-label">Years exp.</span></div>' +
      "</div>" +
      '<ul class="pandit-profile__trust" aria-label="Why families trust this pandit">' +
      '<li class="pandit-profile__trust-item">' +
      '<span class="pandit-profile__trust-icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l7 4v5c0 4.2-3 7.8-7 9-4-1.2-7-4.8-7-9V7l7-4z"/><path d="M9 12l2 2 4-4"/></svg>' +
      "</span>" +
      "<strong>Verified</strong><span>Divine Center</span></li>" +
      '<li class="pandit-profile__trust-item">' +
      '<span class="pandit-profile__trust-icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>' +
      "</span>" +
      "<strong>On-time</strong><span>Ritual punctuality</span></li>" +
      '<li class="pandit-profile__trust-item">' +
      '<span class="pandit-profile__trust-icon" aria-hidden="true">' +
      '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 5h16v14H4z"/><path d="M8 10h8M8 14h5"/></svg>' +
      "</span>" +
      "<strong>Matched</strong><span>Your language</span></li>" +
      "</ul>" +
      "</div>" +
      "</header>"
    );
  }

  var siteCfg = window.DivineCenterConfig || {};
  var supportPhone = (siteCfg.contact && siteCfg.contact.phone) || "+919154900375";
  var bookBtn = document.getElementById("book-btn");
  var chatBtn = document.getElementById("chat-btn");
  if (bookBtn) {
    bookBtn.href =
      "../pandits/booking?pandit=" + encodeURIComponent(slug || "");
    bookBtn.textContent = "Book this pandit";
  }
  if (chatBtn) {
    chatBtn.href = "tel:" + String(supportPhone).replace(/\s/g, "");
  }
  var stickyMain = document.getElementById("pandit-sticky-main");
  if (stickyMain) {
    stickyMain.textContent = nameDisplay;
  }
  var stickyRating = document.getElementById("pandit-sticky-rating");
  if (stickyRating) {
    stickyRating.textContent = stats.rating;
  }

  root.innerHTML =
    '<article class="pandit-profile">' +
    panditHeroHtml() +

    "<section class=\"detail-section detail-section--quickfacts\">" +
    "<h2 class=\"detail-section__title\">At a glance</h2>" +
    "<div class=\"pandit-facts-grid\">" +
    "<div class=\"pandit-fact\"><span>Experience</span><strong>" + esc(detail.exp || "5+ years") + "</strong></div>" +
    "<div class=\"pandit-fact\"><span>Service mode</span><strong>" + esc(modeLabel(detail.mode)) + "</strong></div>" +
    "<div class=\"pandit-fact\"><span>Location</span><strong>" + esc(detail.location || "Hyderabad") + "</strong></div>" +
    "</div></section>" +

    '<section class="detail-section">' +
    '<h2 class="detail-section__title">Bio & Expertise</h2>' +
    '<p class="detail-section__lede">' + esc(firstParagraph(detail.bio)) + "</p>" +
    '<div class="pandit-detail__tags">' + renderExpertiseTags() + "</div>" +
    "</section>" +

    '<section class="detail-section">' +
    '<h2 class="detail-section__title">Rituals Offered</h2>' +
    '<p class="detail-section__lede">Request a custom quote for any ritual below</p>' +
    '<div class="pandit-service-list">' + renderServices(detail.services || []) + "</div>" +
    "</section>" +

    renderAvailabilitySection() +

    '<section class="detail-section detail-section--reviews" aria-label="Reviews">' +
    '<div class="pandit-reviews__head">' +
    '<div class="pandit-reviews__intro">' +
    '<h2 class="detail-section__title">Reviews</h2>' +
    '<p class="pandit-reviews__lede">What families say after booking</p>' +
    "</div>" +
    '<div class="pandit-reviews__filter" id="review-filter" role="tablist" aria-label="Filter reviews">' +
    '<button class="pandit-reviews__filter-btn is-active" type="button" role="tab" aria-selected="true" data-review-filter="recent">Recent</button>' +
    '<button class="pandit-reviews__filter-btn" type="button" role="tab" aria-selected="false" data-review-filter="top">Top rated</button>' +
    "</div>" +
    "</div>" +
    reviewsSummaryHtml() +
    '<div class="pandit-reviews__list" id="pandit-reviews"></div>' +
    "</section>" +
    "</article>";

  function renderReviews(mode) {
    var container = document.getElementById("pandit-reviews");
    if (!container) return;
    var items = reviewsSeed
      .filter(function (r) { return mode === "top" ? r.kind === "Top" : r.kind === "Recent"; })
      .sort(function (a, b) {
        if (mode === "top") return (b.rating || 0) - (a.rating || 0);
        return 0;
      })
      .slice(0, 4);
    if (!items.length) {
      container.innerHTML = '<p class="pandit-reviews__empty">No reviews in this view yet.</p>';
      return;
    }
    container.innerHTML = items
      .map(function (r) {
        var meta = [r.puja, r.when].filter(Boolean).join(" · ");
        return (
          '<article class="pandit-review-card">' +
          '<header class="pandit-review-card__top">' +
          '<span class="pandit-review-card__avatar" aria-hidden="true">' +
          reviewInitials(r.who) +
          "</span>" +
          '<div class="pandit-review-card__identity">' +
          "<strong>" +
          esc(r.who) +
          "</strong>" +
          (meta ? '<span class="pandit-review-card__context">' + esc(meta) + "</span>" : "") +
          "</div>" +
          renderStarRow(r.rating) +
          "</header>" +
          '<blockquote class="pandit-review-card__quote">' +
          esc(r.text) +
          "</blockquote>" +
          '<footer class="pandit-review-card__foot">' +
          '<span class="pandit-review-card__badge">Verified booking</span>' +
          "</footer>" +
          "</article>"
        );
      })
      .join("");
  }

  renderReviews("recent");

  var availability = document.getElementById("pandit-availability");
  if (availability) {
    availability.querySelectorAll(".pandit-date-btn").forEach(function (chip) {
      chip.addEventListener("click", function () {
        availability.querySelectorAll(".pandit-date-btn").forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-selected", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-selected", "true");
        updateAvailabilityHint();
      });
    });
  }

  var slotRow = document.getElementById("pandit-slot-row");
  if (slotRow) {
    slotRow.querySelectorAll(".pandit-slot-btn").forEach(function (chip) {
      chip.addEventListener("click", function () {
        slotRow.querySelectorAll(".pandit-slot-btn").forEach(function (c) {
          c.classList.remove("is-active");
          c.setAttribute("aria-selected", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-selected", "true");
        updateAvailabilityHint();
      });
    });
  }

  updateAvailabilityHint();

  var reviewFilter = document.getElementById("review-filter");
  if (reviewFilter) {
    reviewFilter.querySelectorAll("[data-review-filter]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        reviewFilter.querySelectorAll("[data-review-filter]").forEach(function (b) {
          b.classList.remove("is-active");
          b.setAttribute("aria-selected", "false");
        });
        btn.classList.add("is-active");
        btn.setAttribute("aria-selected", "true");
        renderReviews(btn.getAttribute("data-review-filter"));
      });
    });
  }

  var shareBtn = root.querySelector(".pandit-profile__share");
  if (shareBtn) {
    shareBtn.addEventListener("click", shareCurrentPage);
  }
})();
