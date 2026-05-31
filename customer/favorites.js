/**
 * Favorites hub — saved pandits & pujas inline
 */
(function () {
  "use strict";

  var DC = window.DivineCenter;
  var ROOT = "../";
  var PLACEHOLDER = ROOT + "assets/images/placeholders/pandit-avatar.svg";
  var CHEVRON =
    '<svg class="portal-fav-item__chevron" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg>';

  function esc(s) {
    var d = document.createElement("div");
    d.textContent = s || "";
    return d.innerHTML;
  }

  function panditPhoto(p) {
    if (DC && DC.imgPandit) {
      return DC.imgPandit(p, "portal-fav-item__avatar", 48, 48, "lazy").replace(
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
      '<img class="portal-fav-item__avatar" src="' +
      esc(photo) +
      '" alt="" width="48" height="48" loading="lazy" onerror="this.src=\'' +
      PLACEHOLDER +
      "'\" />"
    );
  }

  function renderPanditItem(p) {
    var slug = p.slug || "";
    var href = ROOT + "pandit?p=" + encodeURIComponent(slug);
    var name = (p.name || "").split("(")[0].trim();
    var meta = p.location || p.city || p.role || "Verified Acharya";

    return (
      '<li role="listitem">' +
      '<a href="' +
      esc(href) +
      '" class="portal-fav-item">' +
      panditPhoto(p) +
      '<span class="portal-fav-item__body">' +
      "<strong>" +
      esc(name) +
      "</strong>" +
      "<span>" +
      esc(meta) +
      "</span></span>" +
      CHEVRON +
      "</a></li>"
    );
  }

  function renderPujaItem(p) {
    var href = ROOT + "puja?slug=" + encodeURIComponent(p.slug || "");
    var img = ROOT + (p.img || "assets/images/hero-priest.jpg").replace(/^\//, "");

    return (
      '<li role="listitem">' +
      '<a href="' +
      esc(href) +
      '" class="portal-fav-item">' +
      '<span class="portal-fav-item__thumb-wrap">' +
      '<img class="portal-fav-item__thumb" src="' +
      esc(img) +
      '" alt="" width="48" height="48" loading="lazy" /></span>' +
      '<span class="portal-fav-item__body">' +
      "<strong>" +
      esc(p.title) +
      "</strong>" +
      "<span>" +
      esc(p.duration || p.type || "Vedic ritual") +
      "</span></span>" +
      CHEVRON +
      "</a></li>"
    );
  }

  function renderSection(listId, emptyId, items, renderItem) {
    var list = document.getElementById(listId);
    var empty = document.getElementById(emptyId);
    if (!list) return;

    if (!items.length) {
      list.innerHTML = "";
      if (empty) empty.classList.remove("is-hidden");
      return;
    }

    list.innerHTML = items.map(renderItem).join("");
    if (empty) empty.classList.add("is-hidden");
  }

  function renderHub() {
    var pandits = ((DC && DC.PANDITS) || []).slice(0, 6);
    var pujas = ((DC && DC.PUJAS) || []).slice(0, 6);

    renderSection("fav-pandits-list", "fav-pandits-empty", pandits, renderPanditItem);
    renderSection("fav-pujas-list", "fav-pujas-empty", pujas, renderPujaItem);
  }

  function initSearch() {
    var form = document.getElementById("dash-search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (form.querySelector("input") || {}).value || "";
      window.location.href = q.trim()
        ? "../pandits?q=" + encodeURIComponent(q.trim())
        : "../pandits";
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    renderHub();
    initSearch();
  });
})();
