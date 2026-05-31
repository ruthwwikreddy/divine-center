/**
 * Favorite pandits / services lists — demo hub
 */
(function () {
  "use strict";

  var DC = window.DivineCenter;
  var track = document.getElementById("dash-fav-track");
  if (!track) return;

  var isPandits = /\/pandits/.test(window.location.pathname);
  var ROOT = /\/customer\/favorites\//.test(window.location.pathname) ? "../../" : "../";
  var PLACEHOLDER = ROOT + "assets/images/placeholders/pandit-avatar.svg";

  var activeFilter = "all";
  var searchQuery = "";

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function panditPhoto(p) {
    if (DC && DC.imgPandit) {
      return DC.imgPandit(p, "portal-pandit-card__photo", 88, 88, "lazy").replace(
        /src="(?!https?:\/\/)/g,
        'src="' + ROOT
      );
    }
    var photo =
      (DC && DC.resolvePanditPhoto && DC.resolvePanditPhoto(p.photo, p)) || p.photo || PLACEHOLDER;
    if (photo.indexOf("http") !== 0 && photo.indexOf(ROOT) !== 0) {
      photo = ROOT + photo.replace(/^\//, "");
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

  function matchesFilter(p) {
    var mode = (p.mode || "").toLowerCase();
    if (activeFilter === "offline" && mode !== "offline") return false;
    if (activeFilter === "both" && mode !== "both") return false;
    if (!searchQuery) return true;
    var q = searchQuery.toLowerCase();
    var hay =
      (p.name || "") +
      " " +
      (p.location || "") +
      " " +
      (p.city || "") +
      " " +
      (p.role || "") +
      " " +
      ((p.services || []).join(" "));
    return hay.toLowerCase().indexOf(q) !== -1;
  }

  function renderPanditCard(p, i) {
    var slug = p.slug || "";
    var profileHref = ROOT + "pandit?p=" + encodeURIComponent(slug);
    var bookHref = ROOT + "pandits/booking?pandit=" + encodeURIComponent(slug);
    var rating = (4.7 + (i % 3) * 0.1).toFixed(1);
    var reviews = 12 + i * 3;
    var services =
      p.services && p.services.length
        ? p.services.slice(0, 2).join(" · ")
        : p.role || "Vedic rituals";
    var langs = (p.langs || ["Hindi"]).slice(0, 3);
    var price = "₹5,100";

    return (
      '<article class="portal-pandit-card portal-pandit-card--saved" role="listitem" data-pandit-mode="' +
      esc((p.mode || "both").toLowerCase()) +
      '">' +
      '<div class="portal-pandit-card__head">' +
      '<a class="portal-pandit-card__avatar" href="' +
      esc(profileHref) +
      '">' +
      panditPhoto(p) +
      "</a>" +
      '<div class="portal-pandit-card__intro">' +
      '<span class="portal-pandit-card__verified">Saved · Verified</span>' +
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
      '<button type="button" class="portal-pandit-card__fav is-active" aria-label="Remove from favourites" aria-pressed="true">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 00-7.8 0L12 5.6l-1-1a5.5 5.5 0 00-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 000-7.8z"/></svg>' +
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
      '<span class="portal-pandit-card__quote">From <strong>' +
      esc(price) +
      "</strong></span>" +
      '<div class="portal-pandit-card__actions">' +
      '<a href="' +
      esc(profileHref) +
      '" class="dash-btn dash-btn--outline portal-pandit-card__btn">Profile</a>' +
      '<a href="' +
      esc(bookHref) +
      '" class="dash-btn dash-btn--accent portal-pandit-card__btn">Book again</a>' +
      "</div></div></article>"
    );
  }

  function renderPandits() {
    var pandits = ((DC && DC.PANDITS) || []).slice(0, 6);
    var filtered = pandits.filter(matchesFilter);
    var emptyEl = document.getElementById("fav-pandits-empty");
    track.innerHTML = filtered
      .map(function (p, i) {
        return renderPanditCard(p, i);
      })
      .join("");

    if (emptyEl) {
      emptyEl.classList.toggle("is-hidden", filtered.length > 0);
    }

    track.querySelectorAll(".portal-pandit-card__fav").forEach(function (btn) {
      btn.addEventListener("click", function () {
        btn.classList.toggle("is-active");
        btn.setAttribute("aria-pressed", btn.classList.contains("is-active") ? "true" : "false");
      });
    });
  }

  function renderServices() {
    var pujas = (DC && DC.PUJAS) || [];
    track.className = "portal-fav-services-grid";
    track.innerHTML = pujas
      .slice(0, 6)
      .map(function (p) {
        return (
          '<a class="portal-fav-service-card" href="' +
          ROOT +
          "puja?slug=" +
          encodeURIComponent(p.slug) +
          '" role="listitem">' +
          '<div class="portal-fav-service-card__img">' +
          '<img src="' +
          ROOT +
          esc(p.img || "assets/images/hero-priest.jpg") +
          '" alt="" loading="lazy" />' +
          '<span class="portal-fav-service-card__badge">Saved</span></div>' +
          '<div class="portal-fav-service-card__body">' +
          "<h3>" +
          esc(p.title) +
          "</h3>" +
          "<p>" +
          esc(p.desc) +
          "</p>" +
          '<span class="portal-fav-service-card__price">' +
          esc(p.price || "Custom quote") +
          "</span>" +
          '<span class="portal-fav-service-card__cta">Book again</span></div></a>'
        );
      })
      .join("");
  }

  function initFilters() {
    var filters = document.getElementById("fav-pandits-filters");
    if (!filters) return;
    filters.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-fav-filter]");
      if (!btn) return;
      activeFilter = btn.getAttribute("data-fav-filter") || "all";
      filters.querySelectorAll(".portal-fav-pandits-hub__filter").forEach(function (b) {
        var on = b === btn;
        b.classList.toggle("is-active", on);
        b.setAttribute("aria-selected", on ? "true" : "false");
      });
      renderPandits();
    });
  }

  function initSearch() {
    var form = document.getElementById("dash-search-form");
    if (!form || !isPandits) return;
    var input = form.querySelector("input");
    if (!input) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      searchQuery = (input.value || "").trim();
      renderPandits();
    });
    input.addEventListener(
      "input",
      function () {
        searchQuery = (input.value || "").trim();
        renderPandits();
      },
      { passive: true }
    );
  }

  if (isPandits) {
    renderPandits();
    initFilters();
    initSearch();
  } else {
    renderServices();
  }
})();
