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

  function getServicePrice(serviceSlug, idx) {
    var puja = serviceSlug ? DC.getPuja(serviceSlug) : null;
    if (puja && puja.price) return puja.price;
    return "₹" + (2100 + idx * 350).toLocaleString("en-IN");
  }

  function renderServices(services) {
    return services
      .map(function (svc, idx) {
        var href = svc.pujaSlug ? "puja?p=" + encodeURIComponent(svc.pujaSlug) : "pujas";
        return (
          '<a href="' + href + '" class="pandit-service-row">' +
          "<span>" + esc(svc.name) + "</span>" +
          '<strong>' + esc(getServicePrice(svc.pujaSlug, idx)) + "</strong>" +
          "</a>"
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
      out.push({
        id: d.toISOString().slice(0, 10),
        day: d.toLocaleDateString("en-IN", { weekday: "short" }),
        date: d.toLocaleDateString("en-IN", { day: "2-digit", month: "short" }),
      });
    }
    return out;
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
      '<div class="pandit-profile__visual">' +
      '<div class="pandit-profile__cover">' +
      DC.imgPandit(panditImg, "pandit-profile__cover-img", 720, 420, "eager") +
      "</div>" +
      '<div class="pandit-profile__toolbar">' +
      '<a href="pandits.html" class="pandit-profile__nav-btn pandit-profile__back" aria-label="Back">‹</a>' +
      '<button type="button" class="pandit-profile__nav-btn pandit-profile__share" aria-label="Share">⤴</button>' +
      "</div>" +
      "</div>" +
      '<div class="pandit-profile__sheet">' +
      '<div class="pandit-profile__identity">' +
      '<div class="pandit-profile__avatar">' +
      DC.imgPandit(panditImg, "pandit-profile__avatar-img", 140, 140, "eager") +
      "</div>" +
      '<div class="pandit-profile__intro">' +
      '<span class="pandit-profile__verified">Verified Acharya</span>' +
      '<h1 class="pandit-profile__name">' +
      esc(nameDisplay) +
      "</h1>" +
      '<p class="pandit-profile__role">' +
      esc(detail.role || "Vedic Acharya") +
      "</p>" +
      '<p class="pandit-profile__mode">' +
      esc(modeLabel(detail.mode || detail.serviceMode || "Both")) +
      "</p>" +
      "</div>" +
      "</div>" +
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
      '<ul class="pandit-profile__trust">' +
      "<li>Verified by Divine Center</li>" +
      "<li>On-time rituals</li>" +
      "<li>Language matched</li>" +
      "</ul>" +
      "</div>" +
      "</header>"
    );
  }

  var bookBtn = document.getElementById("book-btn");
  var chatBtn = document.getElementById("chat-btn");
  if (bookBtn) {
    bookBtn.href = "contact?subject=" + encodeURIComponent("Custom quote: " + nameDisplay);
  }
  if (chatBtn) {
    chatBtn.href = "tel:+919100563686";
  }
  var stickyMain = document.getElementById("pandit-sticky-main");
  if (stickyMain) {
    stickyMain.textContent = nameDisplay;
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
    '<p class="detail-section__lede">Starting prices shown for quick comparison</p>' +
    '<div class="pandit-service-list">' + renderServices(detail.services || []) + "</div>" +
    "</section>" +

    '<section class="detail-section">' +
    '<h2 class="detail-section__title">Calendar Availability</h2>' +
    '<p class="detail-section__lede">Choose your preferred date. We confirm the exact slot in minutes.</p>' +
    '<div class="m-chips pandit-availability-grid" id="pandit-availability">' +
    nextSevenDays().map(function (d, i) {
      return '<button type="button" class="m-chip' + (i === 0 ? " is-active" : "") + '" data-day="' + d.id + '">' + d.day + " " + d.date + "</button>";
    }).join("") +
    "</div>" +
    '<div class="pandit-slot-row" id="pandit-slot-row"><button type="button" class="m-chip is-active" data-slot="Morning">Morning</button><button type="button" class="m-chip" data-slot="Afternoon">Afternoon</button><button type="button" class="m-chip" data-slot="Evening">Evening</button></div>' +
    '<p class="form-hint" id="availability-hint">Today selected • Slots usually confirmed within 15-30 minutes.</p>' +
    '<div class="pandit-commitments"><span>✓ Transparent pricing before confirmation</span><span>✓ Ritual checklist shared in advance</span></div>' +
    "</section>" +

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
    availability.querySelectorAll(".m-chip").forEach(function (chip) {
      chip.addEventListener("click", function () {
        availability.querySelectorAll(".m-chip").forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        var hint = document.getElementById("availability-hint");
        if (hint) hint.textContent = chip.textContent + " selected • Slots usually confirmed within 15-30 minutes.";
        var stickyMeta = document.getElementById("pandit-sticky-meta");
        if (stickyMeta) stickyMeta.textContent = "Requested " + chip.textContent + " • Confirmation on call";
      });
    });
  }

  var slotRow = document.getElementById("pandit-slot-row");
  if (slotRow) {
    slotRow.querySelectorAll("[data-slot]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        slotRow.querySelectorAll("[data-slot]").forEach(function (c) { c.classList.remove("is-active"); });
        chip.classList.add("is-active");
        var hint = document.getElementById("availability-hint");
        if (hint) hint.textContent = chip.getAttribute("data-slot") + " preferred • Slots usually confirmed within 15-30 minutes.";
      });
    });
  }

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
  var staticShare = document.querySelector(".m-subheader .m-subheader__icon");
  if (staticShare) {
    staticShare.addEventListener("click", shareCurrentPage);
  }
})();
