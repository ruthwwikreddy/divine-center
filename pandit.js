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

  function pipeJoin(parts) {
    return parts
      .filter(function (p) {
        return p && String(p).trim();
      })
      .join(" | ");
  }

  function formatServiceList(services) {
    var names = (services || [])
      .slice(0, 3)
      .map(function (s) {
        return s.name || s;
      })
      .filter(Boolean);
    if (!names.length) return "";
    if (names.length === 1) return names[0];
    if (names.length === 2) return names[0] + " & " + names[1];
    return names.slice(0, -1).join(", ") + " & " + names[names.length - 1];
  }

  function specialtyLine() {
    var langPart = detail.langs.slice(0, 3).join(" & ");
    return pipeJoin([detail.role, langPart, formatServiceList(detail.services)]);
  }

  function metaLine() {
    return pipeJoin([detail.exp, detail.role, detail.langs.join(", ")]);
  }

  function locationLine() {
    var line = detail.location || "";
    if (detail.offlineAvailable) {
      line += (line ? " " : "") + "(Home visits available)";
    }
    return line;
  }

  function renderBookingSidebar() {
    var Sidebar = window.DivineCenterBookingSidebar;
    if (!Sidebar) return "";
    return Sidebar.render({
      eyebrow: "Consultation",
      serviceTitle: "Consultation Service",
      bookingHref: "pandits/booking?pandit=" + encodeURIComponent(slug),
    });
  }

  function renderCompactHeader() {
    return (
      '<header class="pandit-detail-head">' +
      '<a href="pandits" class="pandit-detail-head__back" aria-label="Back to pandits">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M19 12H5"/><path d="M12 19l-7-7 7-7"/></svg>' +
      "</a>" +
      '<div class="pandit-detail-head__row">' +
      '<div class="pandit-detail-head__avatar">' +
      DC.imgPandit(
        { name: detail.name, photo: detail.photo, slug: detail.slug },
        "pandit-detail-head__avatar-img",
        160,
        160,
        "eager"
      ) +
      "</div>" +
      '<div class="pandit-detail-head__copy">' +
      '<h1 class="pandit-detail-head__name">' +
      esc(nameDisplay) +
      "</h1>" +
      '<p class="pandit-detail-head__specialty">' +
      esc(specialtyLine()) +
      "</p>" +
      '<p class="pandit-detail-head__location">' +
      '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
      "<span>" +
      esc(locationLine()) +
      "</span></p>" +
      '<p class="pandit-detail-head__meta">' +
      esc(metaLine()) +
      "</p></div></div></header>"
    );
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
    function renderServiceCard(svc) {
      var puja = svc.pujaSlug ? DC.getPuja(svc.pujaSlug) : null;
      var href =
        "pandits/booking?pandit=" +
        encodeURIComponent(slug) +
        (svc.pujaSlug ? "&puja=" + encodeURIComponent(svc.pujaSlug) : "");
      var title = puja && puja.title ? puja.title : svc.name;
      var desc =
        puja && puja.desc
          ? puja.desc
          : "Personalized Vedic ritual guidance and ceremony support from this pandit.";
      var mode = puja && puja.type ? puja.type : modeLabel(detail.mode);
      var duration = puja && puja.duration ? puja.duration : "Flexible duration";
      var media = puja
        ? DC.imgPujaPhoto(puja, "puja-card__img", 320, 220, "lazy")
        : '<div class="puja-card__img pandit-services__fallback-media" aria-hidden="true"></div>';
      return (
        '<article class="puja-card pandit-service-card">' +
        '<div class="puja-card__media-wrap">' +
        media +
        '<span class="puja-card__badge">' +
        esc(mode) +
        "</span></div>" +
        '<div class="puja-card__body">' +
        '<h3 class="puja-card__title">' +
        esc(title) +
        "</h3>" +
        '<p class="puja-card__desc">' +
        esc(desc) +
        "</p>" +
        '<div class="puja-card__meta">' +
        "<span>" +
        esc(duration) +
        "</span>" +
        "<span>" +
        esc(mode) +
        "</span></div>" +
        '<a href="' +
        href +
        '" class="puja-card__more pandit-service-card__quote">Custom quote</a>' +
        "</div></article>"
      );
    }
    return (
      '<section class="detail-section pandit-services" aria-labelledby="pandit-services-title">' +
      '<div class="detail-section__head">' +
      '<span class="detail-section__icon" aria-hidden="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l3 7h7l-5.5 4.5L18 21l-6-3.5L6 21l1.5-7.5L2 9h7z"/></svg>' +
      "</span>" +
      '<div class="detail-section__head-copy"><h2 id="pandit-services-title" class="detail-section__title">Offered Services</h2>' +
      '<p class="detail-section__lede">' +
      services.length +
      " ceremonies available to book with this pandit</p></div></div>" +
      '<div class="pandit-services__grid">' +
      services.map(renderServiceCard).join("") +
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
      '<div class="detail-section__head-copy"><h2 id="pandit-location-title" class="detail-section__title">Service Area & Location</h2>' +
      '<p class="detail-section__lede">Home visits and in-person rituals around ' +
      esc(detail.location) +
      "</p></div></div>" +
      '<div class="pandit-location__map">' +
      '<iframe title="Map showing ' +
      esc(detail.location) +
      '" src="' +
      esc(detail.mapEmbedUrl) +
      '" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>' +
      "</div></section>"
    );
  }

  function renderTrustItem(text) {
    return (
      '<li class="pandit-trust__item">' +
      '<span class="pandit-trust__check" aria-hidden="true">' +
      '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg>' +
      "</span>" +
      '<span class="pandit-trust__text">' +
      esc(text) +
      "</span></li>"
    );
  }

  function renderTrustSection() {
    return (
      '<section class="detail-section pandit-trust" aria-labelledby="pandit-trust-title">' +
      '<div class="detail-section__head">' +
      '<span class="detail-section__icon" aria-hidden="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l8 4v6c0 5-3.5 9-8 10-4.5-1-8-5-8-10V6l8-4z"/></svg>' +
      "</span>" +
      '<div class="detail-section__head-copy">' +
      '<h2 id="pandit-trust-title" class="detail-section__title">Booking assurance</h2>' +
      '<p class="detail-section__lede">Professional support from booking to ritual completion</p>' +
      "</div></div>" +
      '<ul class="pandit-trust__grid">' +
      renderTrustItem("Verified pandit identity and profile checks") +
      renderTrustItem("On-time ceremony coordination and reminder support") +
      renderTrustItem("Guidance on ritual preparation and samagri essentials") +
      renderTrustItem("Support team available for booking or service questions") +
      "</ul></section>"
    );
  }

  root.innerHTML =
    '<article class="puja-detail-page pandit-detail-page">' +
    '<div class="pandit-detail-layout">' +
    '<aside class="pandit-detail-aside" aria-label="Book this pandit">' +
    renderBookingSidebar() +
    "</aside>" +
    renderCompactHeader() +
    '<div class="pandit-detail-main detail-body">' +
    renderServices(detail.services) +
    (detail.bio
      ? '<section class="detail-section pandit-about puja-prose__block"><div class="detail-section__head">' +
        '<span class="detail-section__icon" aria-hidden="true">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' +
        "</span>" +
        '<div class="detail-section__head-copy"><h2 class="detail-section__title">About</h2>' +
        '<p class="detail-section__lede">Experience, tradition, and devotion</p></div></div>' +
        '<div class="detail-section__content">' +
        renderBio(detail.bio) +
        "</div></section>"
      : "") +
    renderTrustSection() +
    renderLocation() +
    "</div></div></article>";

  var stickyName = document.getElementById("pandit-name");
  if (stickyName) stickyName.textContent = nameDisplay;
})();
