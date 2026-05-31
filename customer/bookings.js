/**
 * My Bookings — shared booking hub
 */
(function () {
  "use strict";

  var Hub = window.DivineCenterCustomerBookingsHub;
  var PLACEHOLDER = "../assets/images/placeholders/pandit-avatar.svg";

  var ALL_BOOKINGS = [
    {
      id: "DC-001",
      pandit: "Keeya Pathak",
      avatar: PLACEHOLDER,
      ritual: "Namakaran",
      mode: "Offline",
      status: "confirmed",
      date: "1 Jan 2025",
      month: "Jan",
      day: "1",
      time: "8:05 PM",
      slot: "Evening",
      amount: "₹4,033",
    },
  ].concat(Hub ? Hub.DEFAULT_BOOKINGS : []);

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
    if (Hub) {
      Hub.init({
        bookings: ALL_BOOKINGS,
        highlightNext: true,
      });
    }
    initSearch();
  });
})();
