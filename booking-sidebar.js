/**
 * Sticky booking card — pandit & puja detail pages (no fixed pricing)
 */
(function (global) {
  "use strict";

  var DEFAULT_ASSURANCE = [
    "Free cancellation if cancelled 24h before",
    "Free reschedule available",
    "Travel charges extra for home visits",
  ];

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderBookingSidebar(opts) {
    opts = opts || {};
    var eyebrow = opts.eyebrow || "Booking";
    var serviceTitle = opts.serviceTitle || "Book a ritual";
    var bookingHref = opts.bookingHref || "pandits/booking";
    var ctaLabel = opts.ctaLabel || "Book now";
    var assurance = opts.assurance || DEFAULT_ASSURANCE;
    var hideCta = opts.hideCta === true;

    var ctaHtml = hideCta
      ? ""
      : '<a href="' +
        esc(bookingHref) +
        '" class="btn btn--accent btn--block pandit-booking-card__cta">' +
        esc(ctaLabel) +
        "</a>";

    return (
      '<div class="pandit-booking-card pandit-booking-card--sticky">' +
      '<div class="pandit-booking-card__head">' +
      '<span class="pandit-booking-card__head-icon" aria-hidden="true">' +
      '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/><path d="M12 14v3"/></svg>' +
      "</span>" +
      '<div class="pandit-booking-card__head-copy">' +
      '<p class="pandit-booking-card__head-title">Make your booking now</p>' +
      '<p class="pandit-booking-card__head-sub">Verified pandit · Instant confirmation</p>' +
      "</div></div>" +
      '<div class="pandit-booking-card__body">' +
      '<p class="pandit-booking-card__eyebrow">' +
      esc(eyebrow) +
      "</p>" +
      '<h2 class="pandit-booking-card__service">' +
      esc(serviceTitle) +
      "</h2>" +
      ctaHtml +
      '<ul class="pandit-booking-card__assurance">' +
      assurance
        .map(function (line) {
          return (
            '<li><span class="pandit-booking-card__check" aria-hidden="true"></span>' +
            esc(line) +
            "</li>"
          );
        })
        .join("") +
      "</ul></div></div>"
    );
  }

  global.DivineCenterBookingSidebar = {
    render: renderBookingSidebar,
  };
})(typeof window !== "undefined" ? window : this);
