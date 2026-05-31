/**
 * Demo session + last booking — shared across wizard, success, and portals.
 */
(function () {
  "use strict";

  var SESSION_KEY = "dc_session";
  var BOOKING_KEY = "dc_last_booking";

  function getAuthSession() {
    try {
      var raw = sessionStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function getLastBooking() {
    try {
      var raw = sessionStorage.getItem(BOOKING_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      return null;
    }
  }

  function saveLastBooking(data) {
    try {
      sessionStorage.setItem(BOOKING_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function displayName(session) {
    session = session || getAuthSession();
    if (!session) return null;
    var n = session.name || session.email || "";
    n = String(n).trim();
    if (!n) return null;
    if (n.indexOf("@") > -1) n = n.split("@")[0];
    var part = n.split(/\s+/)[0];
    if (!part) return null;
    return part.charAt(0).toUpperCase() + part.slice(1);
  }

  function resolvePujaTitle(slug, DC) {
    if (!slug || !DC || !DC.PUJAS) return slug || "";
    for (var i = 0; i < DC.PUJAS.length; i++) {
      if (DC.PUJAS[i].slug === slug) return DC.PUJAS[i].title;
    }
    return slug;
  }

  function resolvePanditName(slug, DC) {
    if (!slug || !DC || !DC.PANDITS) return "";
    for (var i = 0; i < DC.PANDITS.length; i++) {
      if (DC.PANDITS[i].slug === slug) {
        var n = DC.PANDITS[i].name || "";
        return n.split("(")[0].trim();
      }
    }
    return "";
  }

  function formatDate(iso) {
    if (!iso) return "";
    try {
      return new Date(iso + "T12:00:00").toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch (e) {
      return iso;
    }
  }

  window.DivineCenterDemo = {
    getAuthSession: getAuthSession,
    getLastBooking: getLastBooking,
    saveLastBooking: saveLastBooking,
    displayName: displayName,
    resolvePujaTitle: resolvePujaTitle,
    resolvePanditName: resolvePanditName,
    formatDate: formatDate,
  };
})();
