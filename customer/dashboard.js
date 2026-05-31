/**
 * Customer dashboard — demo data & rendering
 */
(function () {
  "use strict";

  var DC = window.DivineCenter;
  var PLACEHOLDER = "../assets/images/placeholders/pandit-avatar.svg";

  var DEMO_USER = { name: "Rahul Sharma", displayName: "Ruthwik" };

  function esc(s) {
    if (!s) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function portalPujaPhoto(p) {
    if (DC && DC.imgPujaPhoto) {
      return DC.imgPujaPhoto(p, "portal-service-card__photo", 280, 168, "lazy").replace(
        /src="assets\//g,
        'src="../assets/'
      );
    }
    var img = "../" + (p.img || "assets/images/hero-priest.jpg");
    return (
      '<div class="portal-service-card__media-wrap">' +
      '<img class="portal-service-card__photo" src="' +
      esc(img) +
      '" alt="' +
      esc(p.title || "") +
      '" width="280" height="168" loading="lazy" /></div>'
    );
  }

  function renderServices() {
    var track = document.getElementById("dash-services-track");
    if (!track) return;

    var pujas = (DC && DC.PUJAS) || [];
    var items = pujas.slice(0, 6);
    if (!items.length) {
      items = [
        { title: "Havan / Homam", desc: "Sacred fire ritual for purification and divine blessings.", img: "assets/icons/rudrabhishekam.svg", slug: "rudrabhishekam", type: "Home", duration: "2–3 Hours" },
        { title: "Namakaran", desc: "Traditional naming ceremony with Vedic mantras for your child.", img: "assets/icons/annaprashan.svg", slug: "annaprashan", type: "Home", duration: "1.5 Hours" },
        { title: "Annaprashanna", desc: "Blessed first rice feeding ceremony with auspicious timing.", img: "assets/icons/annaprashan.svg", slug: "annaprashan", type: "Home", duration: "2 Hours" },
      ];
    }

    track.innerHTML = items
      .map(function (p) {
        var slug = p.slug || "";
        var detailHref = "../puja?p=" + encodeURIComponent(slug);
        var bookHref = "../pandits/booking?puja=" + encodeURIComponent(slug);
        return (
          '<article class="portal-service-card" role="listitem">' +
          '<a class="portal-service-card__media" href="' +
          esc(detailHref) +
          '">' +
          portalPujaPhoto(p) +
          '<span class="portal-service-card__badge">' +
          esc(p.type || "Home") +
          "</span></a>" +
          '<div class="portal-service-card__body">' +
          '<h3 class="portal-service-card__title"><a href="' +
          esc(detailHref) +
          '">' +
          esc(p.title) +
          "</a></h3>" +
          '<p class="portal-service-card__desc">' +
          esc(p.desc) +
          "</p>" +
          '<ul class="portal-service-card__meta">' +
          "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2.5\"/></svg> " +
          esc(p.duration || "2–3 hrs") +
          "</li>" +
          "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6\"/></svg> Custom quote</li>" +
          "</ul>" +
          '<div class="portal-service-card__actions">' +
          '<a href="' +
          esc(detailHref) +
          '" class="dash-btn dash-btn--outline portal-service-card__btn">Details</a>' +
          '<a href="' +
          esc(bookHref) +
          '" class="dash-btn dash-btn--accent portal-service-card__btn">Book</a>' +
          "</div></div></article>"
        );
      })
      .join("");
  }

  function portalPanditPhoto(p) {
    if (DC && DC.imgPandit) {
      return DC.imgPandit(p, "portal-pandit-card__photo", 88, 88, "lazy").replace(
        /src="(?!https?:\/\/)/g,
        'src="../'
      );
    }
    var photo =
      (DC && DC.resolvePanditPhoto && DC.resolvePanditPhoto(p.photo, p)) || p.photo || PLACEHOLDER;
    if (photo.indexOf("http") !== 0 && photo.indexOf("../") !== 0) {
      photo = "../" + photo.replace(/^\//, "");
    }
    return (
      '<img class="portal-pandit-card__photo" src="' +
      esc(photo) +
      '" alt="' +
      esc(p.name || "") +
      '" width="88" height="88" loading="lazy" onerror="this.src=\'' +
      PLACEHOLDER +
      "'\" />"
    );
  }

  function renderPandits() {
    var track = document.getElementById("dash-pandits-track");
    if (!track) return;

    var pandits = (DC && DC.PANDITS) || [];
    var items = pandits.slice(0, 8);
    if (!items.length) return;

    track.innerHTML = items
      .map(function (p, i) {
        var slug = p.slug || "";
        var profileHref = "../pandit?p=" + encodeURIComponent(slug);
        var bookHref = "../pandits/booking?pandit=" + encodeURIComponent(slug);
        var rating = (4.7 + (i % 3) * 0.1).toFixed(1);
        var reviews = 12 + i * 3;
        var services =
          p.services && p.services.length
            ? p.services.slice(0, 2).join(" · ")
            : p.role || "Vedic rituals";
        var langs = (p.langs || ["Hindi"]).slice(0, 3);

        return (
          '<article class="portal-pandit-card" role="listitem">' +
          '<div class="portal-pandit-card__head">' +
          '<a class="portal-pandit-card__avatar" href="' +
          esc(profileHref) +
          '">' +
          portalPanditPhoto(p) +
          "</a>" +
          '<div class="portal-pandit-card__intro">' +
          '<span class="portal-pandit-card__verified">Verified Acharya</span>' +
          '<h3 class="portal-pandit-card__name"><a href="' +
          esc(profileHref) +
          '">' +
          esc(p.name.split("(")[0].trim()) +
          "</a></h3>" +
          '<p class="portal-pandit-card__rating">' +
          '<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 6.3 7 1-5 4.9 1.2 7L12 17.8 5.7 21.2 7 14.2 2 9.3l7-1z"/></svg> ' +
          rating +
          " · " +
          reviews +
          " reviews</p></div>" +
          '<button type="button" class="portal-pandit-card__fav" aria-label="Add to favourites">' +
          '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>' +
          "</button></div>" +
          '<p class="portal-pandit-card__services">' +
          esc(services) +
          "</p>" +
          '<ul class="portal-pandit-card__meta">' +
          "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z\"/><circle cx=\"12\" cy=\"10\" r=\"2.5\"/></svg> " +
          esc(p.location || p.city || "India") +
          "</li>" +
          "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v6l3 2\"/></svg> " +
          esc(p.exp || "10+ years") +
          "</li>" +
          (p.mode
            ? "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z\"/></svg> " +
              esc(p.mode) +
              "</li>"
            : "") +
          "</ul>" +
          '<div class="portal-pandit-card__langs">' +
          langs
            .map(function (l) {
              return '<span class="portal-pandit-card__lang">' + esc(l) + "</span>";
            })
            .join("") +
          "</div>" +
          '<div class="portal-pandit-card__foot">' +
          '<span class="portal-pandit-card__quote">Custom quote</span>' +
          '<div class="portal-pandit-card__actions">' +
          '<a href="' +
          esc(profileHref) +
          '" class="dash-btn dash-btn--outline portal-pandit-card__btn">Profile</a>' +
          '<a href="' +
          esc(bookHref) +
          '" class="dash-btn dash-btn--accent portal-pandit-card__btn">Book</a>' +
          "</div></div></article>"
        );
      })
      .join("");

    track.querySelectorAll(".portal-pandit-card__fav").forEach(function (btn) {
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
        window.location.href = "../pandits?q=" + encodeURIComponent(q.trim());
      } else {
        window.location.href = "../pandits";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGreeting();
    var Hub = window.DivineCenterCustomerBookingsHub;
    if (Hub) {
      Hub.init({ highlightNext: true });
    }
    renderServices();
    renderPandits();
    initSearch();
  });
})();
