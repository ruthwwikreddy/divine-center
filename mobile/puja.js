(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

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

  function compactIntro(text) {
    var raw = String(text || "").replace(/\s+/g, " ").trim();
    if (!raw) return "";
    if (raw.indexOf("•") !== -1) raw = raw.split("•")[0].trim();
    if (raw.length > 200) raw = raw.slice(0, 197).trim() + "...";
    return raw;
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

  function renderBookingCard(compact) {
    var cls = compact ? "puja-booking-card puja-booking-card--sticky" : "puja-booking-card";
    var priceLabel = p.slug === "consultation" ? "per session" : "starting from";
    var badges = "";
    if (detail.onlineAvailable) {
      badges += '<span class="puja-hero__tag">Online</span>';
    }
    if (detail.doorstepAvailable) {
      badges += '<span class="puja-hero__tag">Doorstep</span>';
    }
    return (
      '<aside class="' +
      cls +
      '" aria-label="Book this service">' +
      '<div class="puja-booking-card__thumb">' +
      DC.imgPujaPhoto(p, "", 120, 90, "lazy") +
      "</div>" +
      '<p class="puja-booking-card__label">Book this puja</p>' +
      "<h2 class=\"puja-booking-card__name\">" +
      esc(detail.title) +
      "</h2>" +
      '<p class="puja-booking-card__price">' +
      esc(detail.price) +
      ' <span class="puja-booking-card__price-note">' +
      priceLabel +
      "</span></p>" +
      '<ul class="puja-booking-card__meta">' +
      "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2.5\"/></svg> " +
      esc(detail.durationLabel) +
      "</li>" +
      "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2\"/><circle cx=\"12\" cy=\"7\" r=\"4\"/></svg> " +
      esc(detail.pandits) +
      "</li>" +
      (detail.type
        ? "<li><svg width=\"14\" height=\"14\" viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\" aria-hidden=\"true\"><path d=\"M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z\"/></svg> " +
          esc(detail.type) +
          "</li>"
        : "") +
      "</ul>" +
      (badges ? '<div class="puja-booking-card__tags">' + badges + "</div>" : "") +
      '<div class="puja-booking-card__actions">' +
      '<a href="contact?subject=' +
      encodeURIComponent("Custom quote: " + detail.title) +
      '" class="btn btn--accent btn--block">Get Custom Quotation</a>' +
      "</div>" +
      '<p class="puja-booking-card__fine">Verified pandits · Transparent pricing</p>' +
      "</aside>"
    );
  }

  var priceLabel = p.slug === "consultation" ? "per session" : "starting from";
  var heroTagList = [];
  if (detail.onlineAvailable) {
    heroTagList.push("Online Available");
  }
  if (detail.doorstepAvailable) {
    heroTagList.push("Doorstep Service");
  }
  var heroTags = heroTagList
    .map(function (tag) {
      return '<span class="puja-hero__tag">' + esc(tag) + "</span>";
    })
    .join("");

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

  var bookSubject = encodeURIComponent("Book: " + detail.title);
  var quoteSubject = encodeURIComponent("Custom quote: " + detail.title);

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
    '<div class="puja-hero__price-row">' +
    '<div class="puja-hero__price">' +
    "<span class=\"puja-hero__price-amount\">" +
    esc(detail.price) +
    "</span>" +
    '<span class="puja-hero__price-label">' +
    priceLabel +
    "</span>" +
    "</div>" +
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
    "</div>" +
    (heroTags ? '<div class="puja-hero__tags">' + heroTags + "</div>" : "") +
    "<p class=\"puja-hero__intro\">" +
    esc(compactIntro(detail.intro)) +
    "</p>" +
    '<p class="puja-hero__note">' +
    esc(detail.bookingNote) +
    "</p>" +
    '<div class="puja-hero__actions puja-hero__actions--mobile">' +
    '<a href="contact?subject=' +
    quoteSubject +
    '" class="btn btn--accent">Get Custom Quotation</a>' +
    '<button type="button" class="btn btn--outline btn--icon puja-share-btn" aria-label="Share puja">' +
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>' +
    "</button></div>" +
    "</div></header>" +
    '<div class="puja-detail-layout">' +
    '<div class="puja-detail-main">' +
    samagriHtml +
    '<div class="puja-articles">' +
    renderSections(detail.sections) +
    whyHtml +
    "</div>" +
    renderRecommendedPandits() +
    '<aside class="puja-custom-cta">' +
    "<div class=\"puja-custom-cta__copy\">" +
    "<h2>Need a Custom Puja?</h2>" +
    "<p>Get a personalized ceremony planned by our experts</p>" +
    "</div>" +
    '<a href="contact" class="btn btn--accent">Chat With Experts</a>' +
    "</aside></div></div></article>";

  var bar = document.getElementById("puja-bar");
  if (bar) {
    var priceEl = document.getElementById("puja-price");
    var bookBtn = document.getElementById("book-btn");
    if (priceEl) priceEl.textContent = detail.price;
    if (bookBtn) {
      bookBtn.href = "contact?subject=" + quoteSubject;
      bookBtn.textContent = "Get Custom Quote";
    }
    bar.hidden = false;

  var heroShareBtn = root.querySelector(".puja-share-btn");
  if (heroShareBtn) {
    heroShareBtn.addEventListener("click", function () {
      var shareData = {
        title: detail.title + " | Divine Center",
        text: detail.subtitle || detail.intro,
        url: location.href,
      };
      if (navigator.share) {
        navigator.share(shareData).catch(function () {});
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(location.href).then(function () {
          heroShareBtn.setAttribute("aria-label", "Link copied");
          setTimeout(function () {
            heroShareBtn.setAttribute("aria-label", "Share puja");
          }, 1600);
        }).catch(function () {});
      }
    });
  }
    var subheaderTitle = document.querySelector(".m-subheader__title");
    if (subheaderTitle) {
      subheaderTitle.textContent = detail.title.replace(/\s+(Pooja|Ceremony)$/i, "");
    }
  }
})();
