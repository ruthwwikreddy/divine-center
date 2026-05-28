(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var slug = new URLSearchParams(location.search).get("p") || "";
  var detail = DC.getPanditDetail(slug);
  var root = document.getElementById("pandit-detail-root");
  var crumb = document.getElementById("pandit-crumb");

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
  if (crumb) crumb.textContent = nameDisplay;

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

  function renderBio(bio) {
    return bio
      .split(/\n\s*\n+/)
      .map(function (para) {
        return para.trim();
      })
      .filter(Boolean)
      .map(function (para) {
        return "<p>" + esc(para) + "</p>";
      })
      .join("");
  }

  function renderServices(services) {
    if (!services || !services.length) return "";
    return (
      '<section class="detail-section pandit-services" aria-labelledby="pandit-services-title">' +
      '<div class="detail-section__head">' +
      '<span class="detail-section__icon" aria-hidden="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z"/></svg>' +
      "</span>" +
      '<div><h2 id="pandit-services-title" class="detail-section__title">Services Offered</h2>' +
      '<p class="detail-section__lede">' +
      services.length +
      " ceremonies available to book with this pandit</p></div></div>" +
      '<div class="pandit-services__grid">' +
      services
        .map(function (svc) {
          var href = svc.pujaSlug ? "puja?p=" + encodeURIComponent(svc.pujaSlug) : "pujas";
          return (
            '<a href="' +
            href +
            '" class="pandit-services__item">' +
            '<span class="pandit-services__name">' +
            esc(svc.name) +
            "</span>" +
            '<span class="pandit-services__cta">View details <span aria-hidden="true">→</span></span>' +
            "</a>"
          );
        })
        .join("") +
      "</div></section>"
    );
  }

  function renderLocation() {
    return (
      '<section class="detail-section pandit-location" aria-labelledby="pandit-location-title">' +
      '<div class="detail-section__head">' +
      '<span class="detail-section__icon" aria-hidden="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
      "</span>" +
      '<div><h2 id="pandit-location-title" class="detail-section__title">Service Area & Location</h2>' +
      '<p class="detail-section__lede">Home visits and in-person rituals around ' +
      esc(detail.location) +
      "</p></div></div>" +
      '<div class="pandit-location__map">' +
      '<iframe title="Map showing ' +
      esc(detail.location) +
      '" src="' +
      esc(detail.mapEmbedUrl) +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
      "</div>" +
      '<div class="pandit-location__footer">' +
      '<p class="pandit-location__address"><strong>' +
      esc(detail.location) +
      "</strong></p>" +
      '<a href="' +
      esc(detail.mapLinkUrl) +
      '" class="pandit-location__link" target="_blank" rel="noopener noreferrer">Open in Google Maps <span aria-hidden="true">↗</span></a>' +
      "</div></section>"
    );
  }

  var badges = "";
  if (detail.onlineAvailable) {
    badges += '<span class="puja-detail__badge">Online Available</span>';
  }
  if (detail.offlineAvailable) {
    badges += '<span class="puja-detail__badge">Doorstep Service</span>';
  }

  var langTags = detail.langs
    .map(function (l) {
      return '<span class="pandit-detail__tag">' + esc(l) + "</span>";
    })
    .join("");

  root.innerHTML =
    '<article class="puja-detail-page pandit-detail-page">' +
    '<header class="puja-detail-top pandit-detail-top detail-hero">' +
    '<div class="puja-detail-top__media pandit-detail-top__media detail-hero__media">' +
    DC.imgPandit(
      { name: detail.name, photo: detail.photo, slug: detail.slug },
      "puja-detail-top__img pandit-detail-top__photo",
      480,
      600,
      "eager"
    ) +
    "</div>" +
    '<div class="puja-detail-top__content detail-hero__panel">' +
    '<span class="detail-hero__kicker"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg> Verified Acharya</span>' +
    "<h1 class=\"puja-detail-top__title detail-hero__title\">" +
    esc(nameDisplay) +
    "</h1>" +
    "<p class=\"puja-detail-top__subtitle detail-hero__role\">" +
    esc(detail.role) +
    "</p>" +
    '<ul class="detail-highlights" aria-label="Pandit highlights">' +
    '<li class="detail-highlights__item">' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
    "<span><strong>" +
    esc(detail.location.split(",")[0]) +
    "</strong></span></li>" +
    '<li class="detail-highlights__item">' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>' +
    "<span><strong>" +
    esc(detail.exp) +
    "</strong> experience</span></li>" +
    '<li class="detail-highlights__item">' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' +
    "<span><strong>" +
    esc(modeLabel(detail.mode)) +
    "</strong></span></li>" +
    '<li class="detail-highlights__item">' +
    '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v4M8 10h8"/></svg>' +
    "<span><strong>" +
    detail.langs.length +
    "</strong> languages</span></li>" +
    "</ul>" +
    '<div class="pandit-detail__tags">' +
    langTags +
    "</div>" +
    (badges ? '<div class="puja-detail__badges">' + badges + "</div>" : "") +
    '<div class="puja-detail-top__actions detail-hero__actions">' +
    '<a href="contact?subject=' +
    encodeURIComponent("Book pandit: " + nameDisplay) +
    '" class="btn btn--accent">Book Panditji</a>' +
    '<a href="pandits" class="btn btn--outline">Browse Pandits</a>' +
    "</div>" +
    "</div></header>" +
    '<div class="detail-body">' +
    (detail.bio
      ? '<section class="detail-section puja-prose__block"><div class="detail-section__head">' +
        '<span class="detail-section__icon" aria-hidden="true">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
        "</span>" +
        '<div><h2 class="detail-section__title">About</h2>' +
        '<p class="detail-section__lede">Experience, tradition, and devotion</p></div></div>' +
        '<div class="detail-section__content">' +
        renderBio(detail.bio) +
        "</div></section>"
      : "") +
    renderServices(detail.services) +
    renderLocation() +
    "</div></article>";

  var stickyName = document.getElementById("pandit-name");
  if (stickyName) stickyName.textContent = nameDisplay;
})();
