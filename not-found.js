/**
 * 404 page — go back button (demo)
 */
(function () {
  "use strict";

  var back = document.getElementById("not-found-back");
  if (!back) return;

  back.addEventListener("click", function () {
    if (window.history.length > 1) {
      window.history.back();
      return;
    }
    window.location.href = "index";
  });
})();
