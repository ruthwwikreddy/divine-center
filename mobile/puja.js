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
      .map(function (g, idx) {
        var count = (g.items || []).length;
        return (
          '<details class="puja-samagri__group"' +
          (idx === 0 ? " open" : "") +
          ">" +
          '<summary class="puja-samagri__summary">' +
          '<span class="puja-samagri__group-title">' +
          esc(g.title) +
          "</span>" +
          '<span class="puja-samagri__group-count">' +
          count +
          " items</span>" +
          "</summary>" +
          '<ul class="puja-samagri__list">' +
          (g.items || [])
            .map(function (item) {
              return (
                '<li><span class="puja-samagri__check" aria-hidden="true"></span>' +
                esc(item) +
                "</li>"
              );
            })
            .join("") +
          "</ul></details>"
        );
      })
      .join("");
  }

  function buildSectionBody(s) {
    var html = "";
    if (s.lead) {
      html += '<p class="puja-faq__lead">' + esc(s.lead) + "</p>";
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
        '<ol class="puja-faq__steps">' +
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
    return html;
  }

  function renderFaqItem(title, body, open) {
    return (
      '<details class="puja-faq__item"' +
      (open ? " open" : "") +
      ">" +
      '<summary class="puja-faq__summary">' +
      esc(title) +
      "</summary>" +
      '<div class="puja-faq__body">' +
      body +
      "</div></details>"
    );
  }

  function buildWhyFaqBody() {
    if (detail.hideWhyChoose || !detail.whyChoose || !detail.whyChoose.length) return "";
    var html =
      "<p class=\"puja-faq__lede\">" +
      esc(
        detail.whyChooseIntro ||
          "Experienced pandits, scriptural accuracy, and honest pricing for every family."
      ) +
      "</p>" +
      '<ul class="puja-faq__why-list">' +
      detail.whyChoose
        .map(function (item) {
          return '<li><span class="puja-faq__check" aria-hidden="true"></span>' + esc(item) + "</li>";
        })
        .join("") +
      "</ul>";
    if (detail.whyChooseClosing) {
      html += '<p class="puja-faq__closing"><em>' + esc(detail.whyChooseClosing) + "</em></p>";
    }
    return html;
  }

  function renderFaqSection(sections) {
    var items = "";
    if (sections && sections.length) {
      items = sections
        .map(function (s, i) {
          return renderFaqItem(s.title, buildSectionBody(s), i === 0);
        })
        .join("");
    }
    var whyBody = buildWhyFaqBody();
    if (whyBody) {
      items += renderFaqItem("Why choose Divine Center?", whyBody, false);
    }
    if (!items) return "";
    return (
      '<section class="puja-faq" aria-labelledby="puja-faq-title">' +
      '<header class="puja-faq__head">' +
      '<h2 id="puja-faq-title" class="puja-faq__title">Frequently Asked Questions</h2>' +
      '<p class="puja-faq__sub">Everything you need to know before booking</p>' +
      "</header>" +
      '<div class="puja-faq__list">' +
      items +
      "</div></section>"
    );
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
    if (!Sidebar) return renderBookingCard();
    var eyebrow = detail.category || "Puja service";
    return Sidebar.render({
      eyebrow: eyebrow,
      serviceTitle: detail.title,
      hideCta: true,
    });
  }

  function renderBookingCard(compact) {
    var cls = compact ? "puja-booking-card puja-booking-card--sticky" : "puja-booking-card";
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
      '<p class="puja-booking-card__quote">Custom quote — personalized for your ritual needs</p>' +
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
      '<a href="book.html?p=' +
      encodeURIComponent(slug) +
      '" class="btn btn--accent btn--block">Book this puja</a>' +
      "</div>" +
      '<p class="puja-booking-card__fine">Verified pandits · Personalized planning</p>' +
      "</aside>"
    );
  }

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
    var samagriTotal = detail.samagri.reduce(function (sum, g) {
      return sum + ((g.items && g.items.length) || 0);
    }, 0);
    samagriHtml =
      '<section class="puja-samagri" aria-labelledby="puja-samagri-title" data-skip-accordion="true">' +
      '<header class="puja-samagri__head">' +
      "<h2 id=\"puja-samagri-title\" class=\"puja-samagri__title\">Puja Samagri</h2>" +
      '<p class="puja-samagri__lede">Your pandit confirms the final list based on your tradition and location.</p>' +
      '<span class="puja-samagri__badge">' +
      samagriTotal +
      " essentials listed</span>" +
      "</header>" +
      '<div class="puja-samagri__groups">' +
      renderSamagri(detail.samagri) +
      "</div></section>";
  }

  var quoteSubject = encodeURIComponent("Get quote: " + detail.title);
  var bookingNote = (detail.bookingNote || "")
    .replace(
      "Book directly with fixed pricing, or get a personalized quote for custom needs (e.g. samagri, venue).",
      ""
    )
    .trim();

  function renderPujaHeroVisual() {
    return (
      '<div class="puja-hero__visual">' +
      '<div class="puja-hero__toolbar">' +
      '<a href="pujas.html" class="puja-hero__nav-btn puja-hero__back" aria-label="Back">‹</a>' +
      '<button type="button" class="puja-hero__nav-btn puja-hero__share" aria-label="Share">' +
      '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7M16 6l-4-4-4 4M12 2v14"/></svg>' +
      "</button>" +
      "</div>" +
      '<div class="puja-hero__figure">' +
      '<div class="puja-hero__media">' +
      DC.imgPujaPhoto(p, "puja-hero__img", 720, 540, "eager") +
      "</div>" +
      '<div class="puja-hero__shade" aria-hidden="true"></div>' +
      (detail.category
        ? '<span class="puja-hero__category">' + esc(detail.category) + "</span>"
        : "") +
      "</div>" +
      "</div>"
    );
  }

  root.innerHTML =
    '<article class="puja-detail-page">' +
    '<header class="puja-hero">' +
    renderPujaHeroVisual() +
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
    esc(compactIntro(detail.intro)) +
    "</p>" +
    (bookingNote ? '<p class="puja-hero__note">' + esc(bookingNote) + "</p>" : "") +
    '<div class="puja-hero__actions puja-hero__actions--mobile">' +
    '<a href="contact?subject=' +
    quoteSubject +
    '" class="btn btn--accent">Get quote</a>' +
    '<button type="button" class="btn btn--outline btn--icon puja-share-btn" aria-label="Share puja">' +
    '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98"/></svg>' +
    "</button></div>" +
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
    renderFaqSection(detail.sections) +
    "</div></div></article>";

  var bar = document.getElementById("puja-bar");
  if (bar) {
    var stickyLabel = bar.querySelector(".m-sticky-bar__label");
    var priceEl = document.getElementById("puja-price");
    var bookBtn = document.getElementById("book-btn");
    if (stickyLabel) stickyLabel.textContent = "Get quote";
    if (priceEl) priceEl.textContent = "Personalized for you";
    if (bookBtn) {
      bookBtn.href = "contact?subject=" + quoteSubject;
      bookBtn.textContent = "Get quote";
    }
    bar.hidden = false;
  }

  function bindPujaShare(btn) {
    if (!btn || btn.dataset.bound) return;
    btn.dataset.bound = "1";
    btn.addEventListener("click", function () {
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
          btn.setAttribute("aria-label", "Link copied");
          setTimeout(function () {
            btn.setAttribute("aria-label", "Share");
          }, 1600);
        }).catch(function () {});
        return;
      }
      window.prompt("Copy link", location.href);
    });
  }

  bindPujaShare(root.querySelector(".puja-hero__share"));
  bindPujaShare(root.querySelector(".puja-share-btn"));

  var faqList = root.querySelector(".puja-faq__list");
  if (faqList) {
    faqList.querySelectorAll(".puja-faq__item").forEach(function (item) {
      item.addEventListener("toggle", function () {
        if (!item.open) return;
        faqList.querySelectorAll(".puja-faq__item").forEach(function (other) {
          if (other !== item) other.removeAttribute("open");
        });
      });
    });
  }

  var subheaderTitle = document.querySelector(".m-subheader__title");
  if (subheaderTitle) {
    subheaderTitle.textContent = detail.title.replace(/\s+(Pooja|Ceremony)$/i, "");
  }
})();
