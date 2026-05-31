/**
 * Customer dashboard — demo data & rendering
 */
(function () {
  "use strict";

  var DC = window.DivineCenter;
  var PLACEHOLDER = "assets/images/placeholders/pandit-avatar.svg";

  var DEMO_USER = { name: "Rahul Sharma", displayName: "Ruthwik" };

  var DEMO_BOOKINGS = [
    {
      pandit: "Keeya Pathak",
      avatar: PLACEHOLDER,
      ritual: "Namakaran",
      mode: "Offline",
      status: "confirmed",
      datetime: "12 Jun 2026 · 9:00 AM",
    },
    {
      pandit: "Aman Pathak",
      avatar: PLACEHOLDER,
      ritual: "Griha Pravesh",
      mode: "Online",
      status: "pending",
      datetime: "18 Jun 2026 · 6:30 PM",
    },
    {
      pandit: "Keeya Pathak",
      avatar: PLACEHOLDER,
      ritual: "Satyanarayana",
      mode: "Offline",
      status: "cancelled",
      datetime: "22 May 2026 · 7:00 AM",
    },
  ];

  var STATUS_LABELS = {
    confirmed: "Confirmed",
    pending: "Pending",
    cancelled: "Cancelled",
  };

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function formatPrice(p) {
    if (!p) return "₹5,100";
    return p.replace(/^₹?/, "₹");
  }

  function renderBookings() {
    var tbody = document.getElementById("dash-bookings-body");
    if (!tbody) return;

    tbody.innerHTML = DEMO_BOOKINGS.map(function (b) {
      return (
        "<tr>" +
        '<td><div class="dash-pandit-cell">' +
        '<img src="' +
        esc(b.avatar) +
        '" alt="" width="36" height="36" loading="lazy" />' +
        "<span>" +
        esc(b.pandit) +
        "</span></div></td>" +
        '<td><span class="dash-tag">' +
        esc(b.ritual) +
        "</span></td>" +
        "<td>" +
        esc(b.mode) +
        "</td>" +
        '<td><span class="dash-badge dash-badge--' +
        esc(b.status) +
        '">' +
        esc(STATUS_LABELS[b.status] || b.status) +
        "</span></td>" +
        "<td>" +
        esc(b.datetime) +
        "</td>" +
        '<td><a href="dashboard-booking-detail?id=DC-001" class="dash-action-btn dash-action-btn--view" aria-label="View booking details">' +
        '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg>' +
        "</a></td>" +
        "</tr>"
      );
    }).join("");
  }

  function renderServices() {
    var track = document.getElementById("dash-services-track");
    if (!track) return;

    var pujas = (DC && DC.PUJAS) || [];
    var items = pujas.slice(0, 6);
    if (!items.length) {
      items = [
        { title: "Havan / Homam", desc: "Sacred fire ritual for purification and divine blessings.", img: "assets/icons/Rudrabhishekam.png", slug: "rudrabhishekam" },
        { title: "Namakaran", desc: "Traditional naming ceremony with Vedic mantras for your child.", img: "assets/icons/Annaprashan.png", slug: "annaprashan" },
        { title: "Annaprashanna", desc: "Blessed first rice feeding ceremony with auspicious timing.", img: "assets/icons/Annaprashan.png", slug: "annaprashan" },
      ];
    }

    track.innerHTML = items
      .map(function (p) {
        var img = p.img || "assets/images/hero-priest.jpg";
        var href = "puja?slug=" + encodeURIComponent(p.slug || "");
        return (
          '<a class="dash-service-card" href="' +
          esc(href) +
          '">' +
          '<div class="dash-service-card__img">' +
          '<img src="' +
          esc(img) +
          '" alt="" loading="lazy" />' +
          '<span class="dash-service-card__title">' +
          esc(p.title) +
          "</span></div>" +
          '<div class="dash-service-card__body">' +
          '<p class="dash-service-card__desc">' +
          esc(p.desc) +
          '</p><span class="dash-service-card__more">…read more</span></div></a>'
        );
      })
      .join("");
  }

  function renderPandits() {
    var track = document.getElementById("dash-pandits-track");
    if (!track) return;

    var pandits = (DC && DC.PANDITS) || [];
    var items = pandits.slice(0, 8);
    if (!items.length) return;

    track.innerHTML = items
      .map(function (p, i) {
        var photo = (DC && DC.resolvePanditPhoto && DC.resolvePanditPhoto(p.photo, p)) || p.photo || PLACEHOLDER;
        var rating = (4.7 + (i % 3) * 0.1).toFixed(1);
        var reviews = 12 + i * 3;
        var price = formatPrice(["₹5,100", "₹4,800", "₹6,200", "₹5,500"][i % 4]);
        var role = (p.services && p.services[0]) ? p.services.slice(0, 2).join(" & ") : p.role;
        var href = "pandit?slug=" + encodeURIComponent(p.slug || "");

        return (
          '<article class="dash-pandit-card">' +
          '<div class="dash-pandit-card__visual">' +
          '<a href="' +
          esc(href) +
          '"><img class="dash-pandit-card__photo" src="' +
          esc(photo) +
          '" alt="' +
          esc(p.name) +
          '" loading="lazy" onerror="this.src=\'' +
          PLACEHOLDER +
          "'\" /></a>" +
          '<button type="button" class="dash-pandit-card__fav" aria-label="Add to favourites">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>' +
          "</button></div>" +
          '<div class="dash-pandit-card__body">' +
          '<p class="dash-pandit-card__rating"><svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 7L12 17.8 5.7 21.2 7 14.2 2 9.3l7-1z"/></svg> ' +
          rating +
          " (" +
          reviews +
          ")</p>" +
          '<h3 class="dash-pandit-card__name"><a href="' +
          esc(href) +
          '">' +
          esc(p.name.split("(")[0].trim()) +
          "</a></h3>" +
          '<p class="dash-pandit-card__role">' +
          esc(role) +
          "</p>" +
          '<ul class="dash-pandit-card__meta">' +
          '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg> ' +
          esc(p.location || p.city || "India") +
          "</li>" +
          '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v6l3 2"/></svg> ' +
          esc(p.exp || "10+ years") +
          " experience</li></ul>" +
          '<div class="dash-pandit-card__langs">' +
          (p.langs || ["Hindi"])
            .slice(0, 3)
            .map(function (l) {
              return '<span class="dash-pandit-card__lang">' + esc(l) + "</span>";
            })
            .join("") +
          "</div>" +
          '<p class="dash-pandit-card__price"><span>Starting from </span>' +
          price +
          "</p></div></article>"
        );
      })
      .join("");

    track.querySelectorAll(".dash-pandit-card__fav").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.toggle("is-active");
      });
    });
  }

  function initGreeting() {
    var el = document.getElementById("dash-greeting");
    if (el) el.textContent = "Welcome Back, " + DEMO_USER.name + "! 🙏";

    var nameEl = document.getElementById("dash-profile-name");
    if (nameEl) nameEl.textContent = DEMO_USER.displayName;
  }

  function initSearch() {
    var form = document.getElementById("dash-search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (form.querySelector("input") || {}).value || "";
      if (q.trim()) {
        window.location.href = "pandits?q=" + encodeURIComponent(q.trim());
      } else {
        window.location.href = "pandits";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGreeting();
    renderBookings();
    renderServices();
    renderPandits();
    initSearch();
  });
})();
