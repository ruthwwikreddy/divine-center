/**
 * Shared Reschedule / Cancel / Get help actions (customer portal)
 */
(function (global) {
  "use strict";

  var MSG_RESCHEDULE =
    "Choose a new date and time slot.";
  var MSG_CANCEL =
    "Cancellation will trigger a refund review.";

  var ICON_RESCHEDULE =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>';
  var ICON_CANCEL =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M15 9l-6 6M9 9l6 6"/></svg>';
  var ICON_HELP =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"/></svg>';

  function escAttr(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function btnReschedule(extraClass, compact) {
    var cls =
      "portal-booking-action-btn portal-booking-action-btn--reschedule" +
      (extraClass ? " " + extraClass : "") +
      (compact ? " portal-booking-action-btn--compact" : "");
    return (
      '<button type="button" class="' +
      cls +
      '" data-demo-action data-demo-message="' +
      escAttr(MSG_RESCHEDULE) +
      '" aria-label="Reschedule booking">' +
      '<span class="portal-booking-action-btn__icon" aria-hidden="true">' +
      ICON_RESCHEDULE +
      "</span>" +
      '<span class="portal-booking-action-btn__label">Reschedule</span></button>'
    );
  }

  function btnCancel(extraClass, compact) {
    var cls =
      "portal-booking-action-btn portal-booking-action-btn--cancel" +
      (extraClass ? " " + extraClass : "") +
      (compact ? " portal-booking-action-btn--compact" : "");
    return (
      '<button type="button" class="' +
      cls +
      '" data-demo-action data-demo-message="' +
      escAttr(MSG_CANCEL) +
      '" aria-label="Cancel booking">' +
      '<span class="portal-booking-action-btn__icon" aria-hidden="true">' +
      ICON_CANCEL +
      "</span>" +
      '<span class="portal-booking-action-btn__label">Cancel</span></button>'
    );
  }

  function linkHelp(href, extraClass, compact, label) {
    var cls =
      "portal-booking-action-btn portal-booking-action-btn--help" +
      (extraClass ? " " + extraClass : "") +
      (compact ? " portal-booking-action-btn--compact" : "");
    return (
      '<a href="' +
      escAttr(href || "support") +
      '" class="' +
      cls +
      '">' +
      '<span class="portal-booking-action-btn__icon" aria-hidden="true">' +
      ICON_HELP +
      "</span>" +
      '<span class="portal-booking-action-btn__label">' +
      (label || "Get help") +
      "</span></a>"
    );
  }

  function cardActions(bookingId) {
    var id = String(bookingId || "").replace(/^#/, "");
    var supportHref = id ? "support?booking=" + encodeURIComponent(id) : "support";
    return (
      '<div class="portal-booking-action-bar portal-booking-action-bar--stack" role="group" aria-label="Booking actions">' +
      btnReschedule() +
      btnCancel() +
      linkHelp(supportHref, null, false, "Get help") +
      "</div>"
    );
  }

  function dashFootActions(status, bookingId) {
    var id = String(bookingId || "").replace(/^#/, "");
    var supportHref = id ? "support?booking=" + encodeURIComponent(id) : "support";
    if (status === "cancelled") return "";
    if (status === "pending") {
      return (
        '<div class="portal-booking-action-bar portal-booking-action-bar--inline">' +
        linkHelp(supportHref, null, true, "Need help?") +
        "</div>"
      );
    }
    if (status === "confirmed") {
      return (
        '<div class="portal-booking-action-bar portal-booking-action-bar--inline">' +
        btnReschedule(null, true) +
        linkHelp(supportHref, null, true, "Help") +
        "</div>"
      );
    }
    return "";
  }

  global.DivineCenterBookingActions = {
    btnReschedule: btnReschedule,
    btnCancel: btnCancel,
    linkHelp: linkHelp,
    cardActions: cardActions,
    dashFootActions: dashFootActions,
  };
})(typeof window !== "undefined" ? window : this);
