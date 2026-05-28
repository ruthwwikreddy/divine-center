(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var panditsTrack = document.getElementById("m-pandits-track");
  var pujaGrid = document.getElementById("m-puja-grid");
  var galleryEl = document.getElementById("m-home-gallery");
  var testimonialsEl = document.getElementById("m-home-testimonials");
  var storiesEl = document.getElementById("m-home-stories");
  var blogList = document.getElementById("m-blog-list");

  if (panditsTrack) panditsTrack.innerHTML = DC.renderPandits();
  if (pujaGrid) pujaGrid.innerHTML = DC.renderPujaGrid();
  if (galleryEl) galleryEl.innerHTML = DC.renderHomeGallery(true);
  if (testimonialsEl) testimonialsEl.innerHTML = DC.renderHomeTestimonials();
  if (storiesEl) storiesEl.innerHTML = DC.renderHomeStories(true);
  if (blogList) blogList.innerHTML = DC.renderBlogs("list", true);

  document.querySelectorAll(".m-home-hero-search").forEach(function (form) {
    var input = form.querySelector(".search-pill__field");
    if (!input) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = input.value.trim();
      location.href = q ? "pujas?q=" + encodeURIComponent(q) : "pujas";
    });
  });

  document.querySelectorAll(".puja-icons__item, .m-puja-card").forEach(function (el) {
    el.addEventListener("click", function () {
      var name = el.getAttribute("data-puja") || el.querySelector(".m-puja-card__title")?.textContent?.trim() || "";
      if (!name) return;
      document.querySelectorAll(".m-home-hero-search .search-pill__field").forEach(function (inp) {
        inp.value = name;
      });
      document.querySelectorAll(".m-home-hero-hint").forEach(function (hint) {
        hint.textContent = "Selected: " + name;
      });
    });
  });
})();
