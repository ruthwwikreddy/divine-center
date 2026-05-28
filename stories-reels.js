(function () {
  "use strict";

  var VIDEOS = [
    "assets/video/divinecenter_official_1779972528_3907014151198984199_80092279646.mp4",
    "assets/video/divinecenter_official_1779888901_3906307021802229872_80092279646.mp4",
    "assets/video/divinecenter_official_1778849446_3897593756687306122_80092279646.mp4",
    "assets/video/divinecenter_official_1777789442_3888701620863097677_80092279646.mp4",
    "assets/video/divinecenter_official_1773949066_3856485810438726826_80092279646.mp4",
    "assets/video/divinecenter_official_1773947632_3856472783182129643_80092279646.mp4",
  ];

  var ICON_MUTED =
    '<svg class="story-card__sound-icon story-card__sound-icon--muted" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M16 10l4 4M20 10l-4 4"/></svg>';
  var ICON_UNMUTED =
    '<svg class="story-card__sound-icon story-card__sound-icon--on" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M11 5L6 9H3v6h3l5 4V5z"/><path d="M15.5 8.5a5 5 0 010 7M18 6a8.5 8.5 0 010 12"/></svg>';

  function buildCard(src, index, isClone) {
    var cloneAttr = isClone ? ' data-clone="true" aria-hidden="true"' : "";
    return (
      '<article class="story-card"' +
      cloneAttr +
      ' data-story-index="' +
      index +
      '">' +
      '<div class="story-card__frame">' +
      '<video class="story-card__video" muted playsinline loop preload="metadata" autoplay>' +
      '<source src="' +
      src +
      '" type="video/mp4" />' +
      "</video>" +
      '<button type="button" class="story-card__sound" aria-label="Unmute and play" aria-pressed="false">' +
      ICON_MUTED +
      ICON_UNMUTED +
      "</button>" +
      '<div class="story-card__progress" aria-hidden="true"><span class="story-card__progress-bar"></span></div>' +
      "</div></article>"
    );
  }

  function renderTrack(track) {
    var html = VIDEOS.map(function (src, i) {
      return buildCard(src, i, false);
    }).join("");
    html += VIDEOS.map(function (src, i) {
      return buildCard(src, i, true);
    }).join("");
    track.innerHTML = html;
  }

  function initReels(root) {
    var track = root.querySelector(".stories-reels__track");
    if (!track) return;

    if (!track.children.length) {
      renderTrack(track);
    }

    var cards = Array.prototype.slice.call(
      track.querySelectorAll(".story-card:not([data-clone])")
    );
    if (!cards.length) {
      cards = Array.prototype.slice.call(track.querySelectorAll(".story-card"));
      cards = cards.filter(function (c, i) {
        return i < VIDEOS.length;
      });
    }

    var viewport = root.querySelector(".stories-reels__viewport");
    var scrollRaf = null;
    var scrollSpeed = 0.45;

    /** Index of the reel with sound on; -1 means marquee scroll is active. */
    var unmutedIndex = -1;

    function isMarqueeScrolling() {
      return unmutedIndex < 0;
    }

    function marqueeTick() {
      if (viewport && isMarqueeScrolling()) {
        viewport.scrollLeft += scrollSpeed;
        var half = track.scrollWidth / 2;
        if (half > 0 && viewport.scrollLeft >= half) {
          viewport.scrollLeft -= half;
        }
      }
      scrollRaf = requestAnimationFrame(marqueeTick);
    }

    function startMarqueeLoop() {
      if (scrollRaf) return;
      scrollRaf = requestAnimationFrame(marqueeTick);
    }

    function cardAt(index) {
      return cards[index] || null;
    }

    function resetCard(card) {
      if (!card) return;
      var video = card.querySelector(".story-card__video");
      var btn = card.querySelector(".story-card__sound");
      var bar = card.querySelector(".story-card__progress-bar");
      card.classList.remove("story-card--active", "story-card--playing");
      if (video) {
        video.muted = true;
        video.loop = true;
        video.pause();
        video.currentTime = 0;
        video.play().catch(function () {});
      }
      if (btn) {
        btn.setAttribute("aria-pressed", "false");
        btn.setAttribute("aria-label", "Unmute and play");
      }
      if (bar) bar.style.width = "0%";
    }

    function resetAll() {
      cards.forEach(resetCard);
    }

    function resumeMarquee() {
      unmutedIndex = -1;
      root.classList.remove("stories-reels--paused", "stories-reels--focus");
      resetAll();
    }

    function scrollCardIntoView(card) {
      if (!card || !viewport) return;
      var left = card.offsetLeft - (viewport.clientWidth - card.offsetWidth) / 2;
      viewport.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
    }

    function updateProgress(card, video) {
      var bar = card.querySelector(".story-card__progress-bar");
      if (!bar || !video.duration) return;
      bar.style.width = (video.currentTime / video.duration) * 100 + "%";
    }

    function playFocused(index) {
      var card = cardAt(index);
      if (!card) {
        resumeMarquee();
        return;
      }

      unmutedIndex = index;
      root.classList.add("stories-reels--paused", "stories-reels--focus");

      cards.forEach(function (c, i) {
        if (i !== index) resetCard(c);
      });

      var video = card.querySelector(".story-card__video");
      var btn = card.querySelector(".story-card__sound");
      if (!video) return;

      card.classList.add("story-card--active", "story-card--playing");
      scrollCardIntoView(card);

      video.muted = false;
      video.loop = false;
      video.currentTime = 0;

      if (btn) {
        btn.setAttribute("aria-pressed", "true");
        btn.setAttribute("aria-label", "Mute and resume scroll");
      }

      video.play().catch(function () {
        resumeMarquee();
      });

      function onTime() {
        updateProgress(card, video);
      }

      function onEnded() {
        video.removeEventListener("timeupdate", onTime);
        video.removeEventListener("ended", onEnded);
        var next = index + 1;
        if (next < cards.length) {
          playFocused(next);
        } else {
          resumeMarquee();
        }
      }

      video.addEventListener("timeupdate", onTime);
      video.addEventListener("ended", onEnded);
    }

    cards.forEach(function (card, index) {
      var btn = card.querySelector(".story-card__sound");
      if (!btn) return;

      btn.addEventListener("click", function (e) {
        e.stopPropagation();
        if (unmutedIndex === index) {
          resumeMarquee();
          return;
        }
        playFocused(index);
      });
    });

    root.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && unmutedIndex >= 0) {
        resumeMarquee();
      }
    });

    startMarqueeLoop();
  }

  function boot() {
    document.querySelectorAll("[data-stories-reels]").forEach(initReels);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
