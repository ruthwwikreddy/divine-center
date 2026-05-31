(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var SHARE_ICON =
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">' +
    '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>' +
    '<path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>';

  function bindShareButton(btn, shareData, label) {
    if (!btn) return;
    label = label || "Share";
    btn.addEventListener("click", function () {
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(shareData.url || location.href).then(function () {
          btn.setAttribute("aria-label", "Link copied");
          btn.classList.add("is-copied");
          setTimeout(function () {
            btn.setAttribute("aria-label", label);
            btn.classList.remove("is-copied");
          }, 1600);
        }).catch(function () {});
      }
    });
  }

  var slug = new URLSearchParams(location.search).get("p") || "griha-pravesh";
  var detail = DC.getPujaDetail(slug);
  var p = DC.getPuja(slug);
  var root = document.getElementById("puja-detail-root") || document.getElementById("puja-detail");
  var crumb = document.getElementById("puja-crumb");

  if (!detail || !p || !root) {
    if (root) {
      root.innerHTML =
        '<p class="pujas-directory__empty">Service not found. <a href="pujas">Browse all pujas</a></p>';
    }
    return;
  }

  (function () {
    var brand = "Divine Center";
    var base = (detail.seoTitle || detail.title).replace(
      new RegExp("(\\s*\\|\\s*" + brand + "\\s*)+$", "gi"),
      ""
    );
    document.title = base.trim() + " | " + brand;
  })();

  var metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute("content", detail.intro.substring(0, 155) + "…");
  }
  if (crumb) crumb.textContent = detail.title.replace(/\s+(Pooja|Ceremony|Service)$/i, "");

  function esc(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderSamagri(groups) {
    return groups
      .map(function (g) {
        return (
          '<div class="puja-samagri__col">' +
          "<h3 class=\"puja-samagri__col-title\">" +
          esc(g.title) +
          "</h3>" +
          '<ul class="puja-samagri__list">' +
          g.items
            .map(function (item) {
              return (
                '<li><span class="puja-samagri__check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span>' +
                esc(item) +
                "</li>"
              );
            })
            .join("") +
          "</ul></div>"
        );
      })
      .join("");
  }

  function renderSections(sections) {
    return sections
      .map(function (s, i) {
        var html =
          '<section class="puja-article" aria-labelledby="puja-sec-' +
          i +
          '">' +
          '<h2 id="puja-sec-' +
          i +
          '" class="puja-article__title">' +
          esc(s.title) +
          "</h2>" +
          '<div class="puja-article__body">';
        if (s.lead) {
          html += '<p class="puja-article__lead">' + esc(s.lead) + "</p>";
        }
        if (s.intro) {
          html += "<p>" + esc(s.intro) + "</p>";
        }
        if (s.paragraphs) {
          html += s.paragraphs
            .map(function (para) {
              return "<p>" + esc(para) + "</p>";
            })
            .join("");
        }
        if (s.list && s.list.length) {
          html +=
            '<ol class="puja-article__steps">' +
            s.list
              .map(function (item) {
                return "<li>" + esc(item) + "</li>";
              })
              .join("") +
            "</ol>";
        }
        if (s.outro) {
          html += "<p>" + esc(s.outro) + "</p>";
        }
        html += "</div></section>";
        return html;
      })
      .join("");
  }

  function renderRecommendedPandits() {
    var list = DC.getRecommendedPanditsForPuja(p);
    if (!list.length && DC.PANDITS && DC.PANDITS.length) {
      list = DC.PANDITS.slice(0, 4);
    }
    return DC.renderRecommendedPanditsSection(list, document.body.classList.contains("m-app"));
  }

  function renderBookingSidebar() {
    var Sidebar = window.DivineCenterBookingSidebar;
    if (!Sidebar) return "";
    var eyebrow = detail.category || "Puja service";
    return Sidebar.render({
      eyebrow: eyebrow,
      serviceTitle: detail.title,
      hideCta: true,
    });
  }

  var heroTags = "";
  if (detail.onlineAvailable) {
    heroTags += '<span class="puja-hero__tag">Online Available</span>';
  }
  if (detail.doorstepAvailable) {
    heroTags += '<span class="puja-hero__tag">Doorstep Service</span>';
  }

  var samagriHtml = "";
  if (!detail.hideSamagri && detail.samagri && detail.samagri.length) {
    samagriHtml =
      '<section class="puja-panel puja-samagri" aria-labelledby="puja-samagri-title">' +
      '<div class="puja-panel__head">' +
      "<h2 id=\"puja-samagri-title\" class=\"puja-panel__title\">Puja Samagri</h2>" +
      '<p class="puja-panel__lede">Your pandit confirms the final list based on your tradition and location.</p>' +
      "</div>" +
      '<div class="puja-samagri__grid">' +
      renderSamagri(detail.samagri) +
      "</div></section>";
  }

  var whyHtml = "";
  if (!detail.hideWhyChoose && detail.whyChoose && detail.whyChoose.length) {
    whyHtml =
      '<section class="puja-panel puja-panel--why" aria-labelledby="puja-why-title">' +
      "<h2 id=\"puja-why-title\" class=\"puja-panel__title\">Why choose Divine Center?</h2>" +
      "<p class=\"puja-panel__lede\">" +
      esc(
        detail.whyChooseIntro ||
          "Experienced pandits, scriptural accuracy, and honest pricing for every family."
      ) +
      "</p>" +
      '<ul class="puja-why__list">' +
      detail.whyChoose
        .map(function (item) {
          return (
            '<li><span class="puja-why__check" aria-hidden="true"><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M20 6L9 17l-5-5"/></svg></span>' + esc(item) + "</li>"
          );
        })
        .join("") +
      "</ul>";
    if (detail.whyChooseClosing) {
      whyHtml += '<p class="puja-why__closing"><em>' + esc(detail.whyChooseClosing) + "</em></p>";
    }
    whyHtml += "</section>";
  }

  var quoteSubject = encodeURIComponent("Get quote: " + detail.title);
  var bookingNote = (detail.bookingNote || "").replace(
    "Book directly with fixed pricing, or get a personalized quote for custom needs (e.g. samagri, venue).",
    ""
  ).trim();

  root.innerHTML =
    '<article class="puja-detail-page">' +
    '<header class="puja-hero">' +
    '<div class="puja-hero__visual">' +
  '<div class="puja-hero__media">' +
    DC.imgPujaPhoto(p, "puja-hero__img", 720, 540, "eager") +
    "</div>" +
    (detail.category
      ? '<span class="puja-hero__category">' + esc(detail.category) + "</span>"
      : "") +
    "</div>" +
    '<div class="puja-hero__body">' +
    "<h1 class=\"puja-hero__title\">" +
    esc(detail.title) +
    "</h1>" +
    "<p class=\"puja-hero__subtitle\">" +
    esc(detail.subtitle) +
    "</p>" +
    '<dl class="puja-hero__facts">' +
    "<div class=\"puja-hero__fact\"><dt>Duration</dt><dd>" +
    esc(detail.durationLabel) +
    "</dd></div>" +
    "<div class=\"puja-hero__fact\"><dt>Pandits</dt><dd>" +
    esc(detail.pandits) +
    "</dd></div>" +
    "<div class=\"puja-hero__fact\"><dt>Service</dt><dd>" +
    esc(detail.type) +
    "</dd></div>" +
    "</dl>" +
    (heroTags ? '<div class="puja-hero__tags">' + heroTags + "</div>" : "") +
    "<p class=\"puja-hero__intro\">" +
    esc(detail.intro) +
    "</p>" +
    (bookingNote ? '<p class="puja-hero__note">' + esc(bookingNote) + "</p>" : "") +
    '<div class="puja-hero__actions">' +
    '<a href="contact?subject=' +
    quoteSubject +
    '" class="btn btn--accent">Get quote</a>' +
    '<button class="btn btn--outline btn--icon puja-share-btn" type="button" aria-label="Share puja">' +
    SHARE_ICON +
    "</button>" +
    "</div>" +
    "</div></header>" +
    '<div class="puja-detail-layout">' +
    '<aside class="puja-detail-aside" aria-label="Book this puja">' +
    renderBookingSidebar() +
    renderRecommendedPandits() +
    '<div class="puja-custom-cta">' +
    "<div class=\"puja-custom-cta__copy\">" +
    "<h2>Need a Custom Puja?</h2>" +
    "<p>Get a personalized ceremony planned by our experts</p>" +
    "</div>" +
    '<a href="contact" class="btn btn--accent">Chat With Experts</a>' +
    "</div></aside>" +
    '<div class="puja-detail-main">' +
    samagriHtml +
    '<div class="puja-articles">' +
    renderSections(detail.sections) +
    whyHtml +
    "</div></div></div></article>";

  bindShareButton(root.querySelector(".puja-share-btn"), {
    title: detail.title + " | Divine Center",
    text: detail.subtitle || detail.intro,
    url: location.href,
  }, "Share puja");

  var bar = document.getElementById("puja-bar");
  if (bar) {
    var priceEl = document.getElementById("puja-price");
    var bookBtn = document.getElementById("book-btn");
    if (priceEl) priceEl.textContent = "Personalized for you";
    if (bookBtn) {
      bookBtn.href = "contact?subject=" + quoteSubject;
      bookBtn.textContent = "Get quote";
    }
    bar.hidden = false;
    var subheaderTitle = document.querySelector(".m-subheader__title");
    if (subheaderTitle) {
      subheaderTitle.textContent = detail.title.replace(/\s+(Pooja|Ceremony)$/i, "");
    }
  }
})();
