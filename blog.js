(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var slug =
    new URLSearchParams(location.search).get("b") ||
    "varalakshmi-vratam-significance-rituals-muhurat";
  var b = DC.getBlog(slug);
  var heroEl = document.getElementById("blog-hero");
  var articleEl = document.getElementById("blog-article");
  if (!b) {
    if (articleEl) articleEl.innerHTML = '<p class="blogs-latest__empty">Article not found. <a href="blogs">Back to blogs</a></p>';
    return;
  }

  document.title = b.title + " — Divine Center";

  var bg = b.heroImg || b.img;
  if (heroEl) {
    heroEl.innerHTML =
      '<div class="blog-article-hero__bg" style="background-image:url(\'' +
      bg +
      '\')"></div>' +
      '<div class="wrap blog-article-hero__content">' +
      '<span class="blog-article-hero__cat">' +
      (b.categoryLabel || "Blog") +
      "</span>" +
      '<h1 id="blog-hero-title" class="blog-article-hero__title">' +
      b.title +
      "</h1>" +
      '<p class="blog-article-hero__meta"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> ' +
      b.date +
      "</p></div>";
  }

  if (articleEl) {
    var intro = (b.body || [])
      .map(function (p) {
        return '<p class="blog-article__p">' + p + "</p>";
      })
      .join("");
    var sections = DC.renderBlogArticleSections(b.sections);
    articleEl.innerHTML =
      DC.img(b.img, b.title, "blog-article__featured", 800, 480, "eager") +
      '<div class="blog-article__content">' +
      intro +
      sections +
      "</div>";
  }

  var topicsEl = document.getElementById("sidebar-topics");
  if (topicsEl) {
    topicsEl.innerHTML = DC.BLOG_CATEGORIES.filter(function (c) {
      return c.id !== "all";
    })
      .map(function (cat) {
        var active = b.category === cat.id ? " blog-sidebar__topic--active" : "";
        return (
          '<li><a href="blogs?category=' +
          cat.id +
          '" class="blog-sidebar__topic' +
          active +
          '">' +
          cat.label +
          ' <span>(' +
          cat.count +
          ")</span></a></li>"
        );
      })
      .join("");
  }

  var popular = DC.BLOGS.slice(0, 3);
  var recent = DC.BLOGS.filter(function (x) {
    return x.slug !== slug;
  }).slice(0, 3);

  var popularEl = document.getElementById("sidebar-popular");
  var recentEl = document.getElementById("sidebar-recent");
  if (popularEl) popularEl.innerHTML = popular.map(DC.renderBlogSidebarPost).join("");
  if (recentEl) recentEl.innerHTML = recent.map(DC.renderBlogSidebarPost).join("");

})();
