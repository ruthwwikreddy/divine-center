(function () {
  "use strict";

  var DC = window.DivineCenter;
  var panditsTrack = document.getElementById("pandits-track");
  var galleryGrid = document.getElementById("home-gallery-grid");
  var testimonialsGrid = document.getElementById("home-testimonials-grid");
  var blogGrid = document.getElementById("blog-grid");
  var navMenu = document.getElementById("nav-menu");

  if (galleryGrid) galleryGrid.innerHTML = DC.renderHomeGallery();
  if (testimonialsGrid) testimonialsGrid.innerHTML = DC.renderHomeTestimonials();
  if (panditsTrack) panditsTrack.innerHTML = DC.renderHomePandits();
  if (blogGrid) blogGrid.innerHTML = DC.renderBlogs("home");

  function initCarousel() {
    var track = document.getElementById("pandits-track");
    var prev = document.getElementById("pandits-prev");
    var next = document.getElementById("pandits-next");
    if (!track) return;
    var firstCard = track.querySelector(".home-pandit-card");
    var step = firstCard ? firstCard.offsetWidth + 20 : 320;
    if (prev)
      prev.addEventListener("click", function () {
        track.scrollBy({ left: -step, behavior: "smooth" });
      });
    if (next)
      next.addEventListener("click", function () {
        track.scrollBy({ left: step, behavior: "smooth" });
      });
  }

  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (!href || href === "#") return;
      var target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      if (navMenu) navMenu.classList.remove("is-open");
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  function wireHomeSearchForms() {
    document.querySelectorAll(".home-hero-search").forEach(function (searchForm) {
      var searchInput = searchForm.querySelector(".search-pill__field");
      var heroRoot = searchForm.closest(".hero");
      var searchHint =
        (heroRoot && heroRoot.querySelector(".home-hero-hint")) ||
        document.querySelector(".home-hero-hint");
      if (!searchInput) return;
      searchForm.addEventListener("submit", function (e) {
        e.preventDefault();
        var q = searchInput.value.trim();
        if (q) {
          location.href = "pujas.html?q=" + encodeURIComponent(q);
          return;
        }
        location.href = "pujas.html";
      });
    });
  }

  document.querySelectorAll(".puja-icons__item").forEach(function (el) {
    el.addEventListener("click", function () {
      var name = el.getAttribute("data-puja") || "";
      document.querySelectorAll(".search-pill__field").forEach(function (inp) {
        inp.value = name;
      });
      document.querySelectorAll(".home-hero-hint").forEach(function (hint) {
        hint.textContent = "Selected: " + name;
      });
    });
  });

  wireHomeSearchForms();

  initCarousel();
})();
