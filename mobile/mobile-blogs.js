(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var activeCategory = "all";
  var searchTerm = "";
  var pageSize = 6;
  var visibleCount = pageSize;
  var heroEl = document.getElementById("m-blogs-hero");
  var categoriesEl = document.getElementById("m-blogs-categories");
  var latestEl = document.getElementById("m-blogs-latest");
  var emptyEl = document.getElementById("m-blogs-empty");
  var loadMoreBtn = document.getElementById("m-blogs-load-more");
  var searchInput = document.getElementById("m-blogs-search-input");
  var searchForm = document.getElementById("m-blogs-search-form");

  function classifyCategory(blog) {
    var text = ((blog.category || "") + " " + (blog.categoryLabel || "") + " " + (blog.title || "")).toLowerCase();
    if (text.indexOf("festival") !== -1) return "festivals";
    if (text.indexOf("vrat") !== -1) return "vratams";
    if (text.indexOf("temple") !== -1 || text.indexOf("tradition") !== -1) return "traditions";
    return "rituals";
  }

  function renderHero(blog) {
    if (!heroEl) return;
    if (!blog) {
      heroEl.innerHTML = "";
      return;
    }
    var bg = blog.heroImg || blog.img;
    heroEl.innerHTML =
      '<a href="' + DC.blogUrl(blog.slug, true) + '" class="m-blog-hero__link" style="background-image:url(\'' + bg + "')\">" +
      '<span class="m-blog-hero__cat">' + (blog.categoryLabel || "Blog") + "</span>" +
      "<h2>" + blog.title + "</h2>" +
      '<p class="m-blog-hero__excerpt">' + (blog.excerpt || "").slice(0, 120) + "</p>" +
      '<span class="m-blog-hero__meta">' + blog.date + " · " + blog.readTime + "</span></a>";
  }

  function bindCategoryEvents() {
    if (!categoriesEl) return;
    categoriesEl.querySelectorAll(".m-blog-cat").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.getAttribute("data-category") || "all";
        visibleCount = pageSize;
        categoriesEl.querySelectorAll(".m-blog-cat").forEach(function (el) {
          el.classList.toggle("is-active", el === btn);
        });
        renderLists();
      });
    });
  }

  function filterBlogs() {
    return DC.BLOGS.filter(function (b) {
      var categoryMatch = activeCategory === "all" || classifyCategory(b) === activeCategory;
      var q = searchTerm.trim().toLowerCase();
      var searchMatch =
        !q ||
        (b.title && b.title.toLowerCase().indexOf(q) !== -1) ||
        (b.excerpt && b.excerpt.toLowerCase().indexOf(q) !== -1) ||
        (b.categoryLabel && b.categoryLabel.toLowerCase().indexOf(q) !== -1);
      return categoryMatch && searchMatch;
    });
  }

  function renderArticleCard(b) {
    return (
      '<a href="' + DC.blogUrl(b.slug, true) + '" class="blog-latest-row blog-latest-row--reading">' +
      DC.img(b.img, "", "blog-latest-row__thumb", 120, 90) +
      '<div class="blog-latest-row__body">' +
      '<h3 class="blog-latest-row__title">' + b.title + "</h3>" +
      '<p class="blog-latest-row__excerpt">' + (b.excerpt || "").slice(0, 108) + "</p>" +
      '<span class="blog-latest-row__meta">' + b.readTime + " · " + b.date + "</span>" +
      "</div></a>"
    );
  }

  function renderLists() {
    var list = filterBlogs();
    renderHero(list[0] || null);

    var rows = list.slice(0, visibleCount);
    if (latestEl) {
      latestEl.innerHTML = rows.map(renderArticleCard).join("");
    }
    if (emptyEl) emptyEl.hidden = list.length > 0;
    if (loadMoreBtn) {
      loadMoreBtn.hidden = list.length <= visibleCount || list.length === 0;
    }
  }

  bindCategoryEvents();
  renderLists();

  if (searchForm) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault();
    });
  }
  if (searchInput) {
    searchInput.addEventListener("input", function () {
      searchTerm = searchInput.value || "";
      visibleCount = pageSize;
      renderLists();
    });
  }
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      visibleCount += pageSize;
      renderLists();
    });
  }
})();
