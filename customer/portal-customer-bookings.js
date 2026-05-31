/**
 * Shared customer booking cards + filter hub (dashboard & bookings list)
 */
(function () {
  "use strict";

  var PLACEHOLDER = "../assets/images/placeholders/pandit-avatar.svg";

  var STATUS_LABELS = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
  };

  var MODE_ICON =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>';
  var MODE_ICON_ONLINE =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M2 12h20M12 2a15 15 0 010 20M12 2a15 15 0 000 20"/></svg>';
  var MODE_ICON_TEMPLE =
    '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 3l7 4v2H5V7l7-4z"/><path d="M5 9h14v11H5z"/><path d="M9 20v-6h6v6"/></svg>';

  var DEFAULT_BOOKINGS = [
    {
      id: "DC-002",
      pandit: "Keeya Pathak",
      avatar: PLACEHOLDER,
      ritual: "Namakaran",
      mode: "Offline",
      status: "confirmed",
      date: "12 Jun 2026",
      month: "Jun",
      day: "12",
      time: "9:00 AM",
      slot: "Morning",
      amount: "₹4,033",
    },
    {
      id: "DC-003",
      pandit: "Aman Pathak",
      avatar: PLACEHOLDER,
      ritual: "Griha Pravesh",
      mode: "Online",
      status: "pending",
      date: "18 Jun 2026",
      month: "Jun",
      day: "18",
      time: "6:30 PM",
      slot: "Evening",
      amount: "₹5,100",
    },
    {
      id: "DC-004",
      pandit: "Keeya Pathak",
      avatar: PLACEHOLDER,
      ritual: "Satyanarayana",
      mode: "Offline",
      status: "cancelled",
      date: "22 May 2026",
      month: "May",
      day: "22",
      time: "7:00 AM",
      slot: "Morning",
      amount: "₹3,850",
    },
  ];

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function modeLabel(mode) {
    if (mode === "Online") return "Online ritual";
    if (mode === "Temple") return "At temple";
    return "At home";
  }

  function modeIcon(mode) {
    if (mode === "Online") return MODE_ICON_ONLINE;
    if (mode === "Temple") return MODE_ICON_TEMPLE;
    return MODE_ICON;
  }

  function parseBookingDate(b) {
    var parts = (b.date || "").split(" ");
    return {
      month: b.month || parts[1] || "",
      day: b.day || parts[0] || "",
    };
  }

  function mergeLastBooking(bookings) {
    var Demo = window.DivineCenterDemo;
    if (!Demo || !Demo.getLastBooking) return bookings;
    var last = Demo.getLastBooking();
    if (!last || !last.pujaTitle) return bookings;

    var copy = bookings.slice();
    var entry = {
      id: String(last.id || "DC-001").replace(/^#/, ""),
      pandit: last.panditName || "Assigning pandit…",
      avatar: PLACEHOLDER,
      ritual: last.pujaTitle,
      mode: last.mode || "Offline",
      status: "pending",
      date: last.date && Demo.formatDate ? Demo.formatDate(last.date) : "Feb 15, 2026",
      month: "Feb",
      day: "15",
      time: "10:00 AM",
      slot: last.slot || "Morning",
      amount: last.amount || "₹4,033",
    };
    if (copy.length && copy[0].id === entry.id) {
      copy[0] = entry;
    } else {
      copy.unshift(entry);
    }
    return copy;
  }

  function bookingMatchesFilter(b, activeFilter) {
    if (activeFilter === "upcoming" && b.status === "cancelled") return false;
    if (activeFilter === "pending" && b.status !== "pending") return false;
    if (activeFilter === "cancelled" && b.status !== "cancelled") return false;
    return true;
  }

  function findNextBooking(bookings) {
    for (var i = 0; i < bookings.length; i++) {
      if (bookings[i].status !== "cancelled") return bookings[i].id;
    }
    return null;
  }

  function renderBookingCard(b, isNext) {
    var cal = parseBookingDate(b);
    var detailHref = "booking-detail?id=" + encodeURIComponent(b.id);

    var secondary =
      window.DivineCenterBookingActions
        ? window.DivineCenterBookingActions.dashFootActions(b.status, b.id)
        : "";
    if (secondary) {
      secondary =
        '<div class="portal-record-card__actions">' + secondary + "</div>";
    }

    return (
      '<article class="portal-record-card portal-record-card--booking portal-record-card--' +
      esc(b.status) +
      (isNext ? " portal-record-card--next" : "") +
      '" role="listitem" data-booking-id="' +
      esc(b.id) +
      '">' +
      '<a href="' +
      esc(detailHref) +
      '" class="portal-record-card__link">' +
      '<span class="portal-record-card__date" aria-hidden="true">' +
      '<span class="portal-record-card__month">' +
      esc(cal.month) +
      '</span><span class="portal-record-card__day">' +
      esc(cal.day) +
      "</span></span>" +
      '<span class="portal-record-card__body">' +
      '<strong class="portal-record-card__title">' +
      esc(b.ritual) +
      "</strong>" +
      '<span class="portal-record-card__meta">' +
      esc(b.pandit) +
      " · #" +
      esc(b.id) +
      "</span>" +
      '<span class="portal-record-card__detail">' +
      esc(b.time) +
      " · " +
      esc(modeLabel(b.mode)) +
      "</span></span>" +
      '<span class="portal-record-card__end">' +
      (isNext ? '<span class="portal-record-card__chip">Next</span>' : "") +
      '<span class="portal-record-card__badge portal-record-card__badge--' +
      esc(b.status) +
      '">' +
      esc(STATUS_LABELS[b.status] || b.status) +
      "</span>" +
      '<span class="portal-record-card__amount">' +
      esc(b.amount || "Custom quote") +
      "</span></span></a>" +
      secondary +
      "</article>"
    );
  }

  function initHub(options) {
    var list = document.getElementById(options.listId || "dash-bookings-body");
    if (!list) return null;

    var activeFilter = "all";
    var searchQuery = "";
    var bookings = options.bookings || DEFAULT_BOOKINGS.slice();

    function getItems() {
      return mergeLastBooking(bookings);
    }

    function syncFilters() {
      var bar = document.getElementById(options.filtersId || "dash-bookings-filters");
      if (!bar) return;
      bar.querySelectorAll("[data-booking-filter]").forEach(function (b) {
        var on = b.getAttribute("data-booking-filter") === activeFilter;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
    }

    function render() {
      var items = getItems();

      var filtered = items.filter(function (b) {
        if (!bookingMatchesFilter(b, activeFilter)) return false;
        if (!searchQuery) return true;
        var q = searchQuery.toLowerCase();
        var hay = (b.ritual || "") + " " + (b.pandit || "") + " " + (b.id || "");
        return hay.toLowerCase().indexOf(q) !== -1;
      });

      var nextId = options.highlightNext ? findNextBooking(items) : null;
      var countEl = document.getElementById(options.countId || "dash-bookings-count");

      if (countEl) {
        countEl.textContent =
          filtered.length +
          (filtered.length === 1 ? " booking" : " bookings") +
          (activeFilter !== "all" || searchQuery ? " shown" : "");
      }

      if (!filtered.length) {
        list.innerHTML =
          '<div class="portal-hub-empty">' +
          '<span class="portal-hub-empty__icon" aria-hidden="true"><svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg></span>' +
          "<p>No bookings match this filter.</p>" +
          '<button type="button" class="dash-btn dash-btn--outline" data-booking-filter-reset>Clear filters</button>' +
          '<a href="../pandits/booking" class="dash-btn dash-btn--accent">Book a puja</a></div>';
        var reset = list.querySelector("[data-booking-filter-reset]");
        if (reset) {
          reset.addEventListener("click", function () {
            activeFilter = "all";
            searchQuery = "";
            var searchInput = document.getElementById(options.searchId || "dash-bookings-search");
            if (searchInput) searchInput.value = "";
            syncFilters();
            render();
          });
        }
        return;
      }

      list.innerHTML = filtered
        .map(function (b) {
          return renderBookingCard(
            b,
            options.highlightNext && b.id === nextId && b.status !== "cancelled"
          );
        })
        .join("");
    }

    var bar = document.getElementById(options.filtersId || "dash-bookings-filters");
    if (bar) {
      bar.querySelectorAll("[data-booking-filter]").forEach(function (btn) {
        btn.addEventListener("click", function () {
          activeFilter = btn.getAttribute("data-booking-filter") || "all";
          syncFilters();
          render();
        });
      });
    }

    var searchInput = document.getElementById(options.searchId || "dash-bookings-search");
    if (searchInput) {
      searchInput.addEventListener(
        "input",
        function () {
          searchQuery = (searchInput.value || "").trim();
          render();
        },
        { passive: true }
      );
    }

    syncFilters();
    render();

    return { refresh: render };
  }

  window.DivineCenterCustomerBookingsHub = {
    init: initHub,
    DEFAULT_BOOKINGS: DEFAULT_BOOKINGS,
  };
})();
