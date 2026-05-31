(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var activeCategory = "all";
  var heroEl = document.getElementById("blogs-hero");
  var categoriesEl = document.getElementById("blogs-categories");
  var featuredSplitEl = document.getElementById("blogs-featured-split");
  var featuredLeadEl = document.getElementById("blogs-featured-lead");
  var featuredStackEl = document.getElementById("blogs-featured-stack");
  var featuredEl = document.getElementById("blogs-featured-grid");

  var featured = DC.BLOGS.filter(function (b) {
    return b.featured;
  });
  if (!featured.length) featured = [DC.BLOGS[0]];
  var heroBlog = featured[0];

  function heroHtml(b) {
    var bg = b.heroImg || b.img;
    return (
      '<div class="blogs-hero__bg" style="background-image:url(\'' +
      bg +
      '\')"></div>' +
      '<div class="wrap blogs-hero__content">' +
      '<span class="blogs-hero__kicker">Featured</span>' +
      '<a href="' +
      DC.blogUrl(b.slug, false) +
      '" class="blogs-hero__cat">' +
      (b.categoryLabel || "Blog") +
      "</a>" +
      '<h1 id="blogs-hero-title" class="blogs-hero__title">' +
      b.title +
      "</h1>" +
      '<p class="blogs-hero__excerpt">' +
      (b.excerpt || "") +
      "</p>" +
      '<p class="blogs-hero__meta"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg> ' +
      b.date +
      " · " +
      b.readTime +
      (b.views ? " · " + b.views + " views" : "") +
      '</p><a href="' +
      DC.blogUrl(b.slug, false) +
      '" class="btn blogs-hero__cta">Read full article <span aria-hidden="true">→</span></a></div>'
    );
  }

  if (heroEl) heroEl.innerHTML = heroHtml(heroBlog);

  if (categoriesEl) {
    categoriesEl.innerHTML = DC.BLOG_CATEGORIES.map(function (cat) {
      var active = cat.id === activeCategory ? " is-active" : "";
      return (
        '<button type="button" class="blogs-cat-chip' +
        active +
        '" data-category="' +
        cat.id +
        '" aria-pressed="' +
        (active ? "true" : "false") +
        '"><span class="blogs-cat-chip__label">' +
        cat.label +
        '</span><span class="blogs-cat-chip__count">' +
        cat.count +
        "</span></button>"
      );
    }).join("");

    categoriesEl.querySelectorAll(".blogs-cat-chip").forEach(function (btn) {
      btn.addEventListener("click", function () {
        activeCategory = btn.getAttribute("data-category") || "all";
        categoriesEl.querySelectorAll(".blogs-cat-chip").forEach(function (b) {
          var on = b === btn;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        renderLists();
      });
    });
  }

  function filterBlogs() {
    if (activeCategory === "all") return DC.BLOGS.slice();
    return DC.BLOGS.filter(function (b) {
      return b.category === activeCategory;
    });
  }

  function renderLists() {
    var list = filterBlogs();

    var featuredInCategory = list.filter(function (b) {
      return b.featured;
    });
    var featuredPosts = featuredInCategory.filter(function (b) {
      return b.slug !== heroBlog.slug;
    });
    if (!featuredPosts.length && list.length) {
      featuredPosts = list.slice(0, Math.min(4, list.length)).filter(function (b) {
        return b.slug !== heroBlog.slug;
      });
    }
    if (!featuredPosts.length && list.length) featuredPosts = list.slice(0, 1);

    var useSplit = !!(featuredLeadEl && featuredStackEl && featuredSplitEl && featuredPosts.length >= 3);

    if (useSplit) {
      featuredSplitEl.hidden = false;
      featuredLeadEl.innerHTML = DC.renderBlogFeaturedCard(featuredPosts[0], false, "lead");
      featuredStackEl.innerHTML = featuredPosts
        .slice(1, 3)
        .map(function (b) {
          return DC.renderBlogFeaturedCard(b, false, "compact");
        })
        .join("");
      var rest = featuredPosts.slice(3);
      if (featuredEl)
        featuredEl.innerHTML =
          rest
            .map(function (b) {
              return DC.renderBlogFeaturedCard(b, false, "default");
            })
            .join("") ||
          "";
    } else {
      if (featuredSplitEl) featuredSplitEl.hidden = true;
      if (featuredLeadEl) featuredLeadEl.innerHTML = "";
      if (featuredStackEl) featuredStackEl.innerHTML = "";
      if (featuredEl)
        featuredEl.innerHTML =
          featuredPosts
            .map(function (b, i) {
              return DC.renderBlogFeaturedCard(b, false, i === 0 && featuredPosts.length > 1 ? "lead" : "default");
            })
            .join("") || "";
    }

    if (!list.length) {
      if (featuredSplitEl) featuredSplitEl.hidden = true;
      if (featuredLeadEl) featuredLeadEl.innerHTML = "";
      if (featuredStackEl) featuredStackEl.innerHTML = "";
      if (featuredEl) featuredEl.innerHTML = "";
    }
  }

  renderLists();

  var catParam = new URLSearchParams(location.search).get("category");
  if (catParam && categoriesEl) {
    var match = categoriesEl.querySelector('[data-category="' + catParam + '"]');
    if (match) match.click();
  }

  var form = document.getElementById("newsletter-form");
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for subscribing!");
      form.reset();
    });
  }
})();
