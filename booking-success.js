/**
 * Apply query params + last demo booking to booking-success page.
 */
(function () {
  "use strict";

  var params = new URLSearchParams(location.search);
  var Demo = window.DivineCenterDemo;
  var DC = window.DivineCenter;
  var stored = Demo && Demo.getLastBooking ? Demo.getLastBooking() : null;

  var pujaSlug = params.get("puja") || (stored && stored.puja) || "annaprashan";
  var title =
    (stored && stored.pujaTitle) ||
    (Demo && Demo.resolvePujaTitle(pujaSlug, DC)) ||
    pujaSlug;

  var dateStr = params.get("date") || (stored && stored.date) || "";
  var dateLabel = Demo && Demo.formatDate ? Demo.formatDate(dateStr) : dateStr || "Feb 15, 2026";

  var mode = params.get("mode") || (stored && stored.mode) || "";
  var panditName =
    (stored && stored.panditName) ||
    (Demo && Demo.resolvePanditName(params.get("pandit") || (stored && stored.pandit), DC)) ||
    "";

  var bookingId = (stored && stored.id) || "DC-001";
  var amount = (stored && stored.amount) || "₹4,033";

  var sub = document.querySelector(".success-card p");
  if (sub) {
    sub.innerHTML =
      "Booking <strong>#" +
      bookingId +
      "</strong> — " +
      title +
      (dateLabel ? " · " + dateLabel : "") +
      (mode ? " · " + mode : "");
  }

  var dl = document.querySelector(".success-details");
  if (dl) {
    var rows = dl.querySelectorAll("dd");
    if (rows[0]) {
      rows[0].textContent = panditName
        ? "We will confirm " + panditName + " within 24 hours."
        : "We will match a verified Acharya within 24 hours.";
    }
    if (rows[1]) rows[1].textContent = amount + " — payment confirmed.";
  }

  var track = document.querySelector('.success-actions a[href*="booking-detail"]');
  if (track) track.setAttribute("href", "customer/booking-detail?id=" + encodeURIComponent(bookingId));
})();
