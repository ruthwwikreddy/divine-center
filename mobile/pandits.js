(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var listEl = document.getElementById("pandits-list");
  var emptyEl = document.getElementById("pandits-empty");
  var countEl = document.getElementById("pandits-count");
  var finderStatEl = document.getElementById("pandits-finder-stat");
  var resetBtn = document.getElementById("pandits-reset-filters");
  var form = document.getElementById("pandits-filter");
  var serviceSelect = document.getElementById("filter-service");
  var citySelect = document.getElementById("filter-city");
  var modeSelect = document.getElementById("filter-mode");
  var listLinkPage = "pandits";

  function populateSelects() {
    if (serviceSelect && serviceSelect.options.length <= 1) {
      DC.PUJAS.forEach(function (puja) {
        var opt = document.createElement("option");
        opt.value = puja.title.replace(" Pooja", "").replace(" Ceremony", "").replace(" Service", "");
        opt.textContent = puja.title;
        serviceSelect.appendChild(opt);
      });
    }
    if (citySelect && citySelect.options.length <= 1) {
      DC.getPanditCities().forEach(function (city) {
        var opt = document.createElement("option");
        opt.value = city;
        opt.textContent = city;
        citySelect.appendChild(opt);
      });
    }
  }

  function matchesMode(p, modeVal) {
    if (!modeVal) return true;
    if (modeVal === "place") return p.mode === "Offline" || p.mode === "Both";
    return p.mode === modeVal;
  }

  function matches(p, filters) {
    if (filters.city && p.city !== filters.city) return false;
    if (!matchesMode(p, filters.mode)) return false;
    if (filters.service) {
      var svc = filters.service.toLowerCase();
      var ok = (p.services || []).some(function (s) {
        return s.toLowerCase().indexOf(svc) !== -1;
      });
      if (!ok) return false;
    }
    return true;
  }

  function render() {
    var filters = {
      service: (serviceSelect && serviceSelect.value) || "",
      city: (citySelect && citySelect.value) || "",
      mode: (modeSelect && modeSelect.value) || "",
    };
    var results = DC.PANDITS.filter(function (p) {
      return matches(p, filters);
    });
    if (listEl) {
      listEl.innerHTML = results
        .map(function (p) {
          return DC.renderPanditListingCard(p, listLinkPage);
        })
        .join("");
    }
    if (emptyEl) {
      emptyEl.hidden = results.length > 0;
    }
    if (countEl) {
      var n = results.length;
      var total = DC.PANDITS.length;
      if (n === 0) {
        countEl.textContent = "No matches";
      } else if (n === total) {
        countEl.textContent = n + " Acharya" + (n === 1 ? "" : "s");
      } else {
        countEl.textContent = n + " of " + total + " shown";
      }
    }
    if (finderStatEl) {
      var totalCount = DC.PANDITS.length;
      finderStatEl.textContent = totalCount + " verified";
    }
  }

  populateSelects();

  function clearFilters() {
    if (serviceSelect) serviceSelect.value = "";
    if (citySelect) citySelect.value = "";
    if (modeSelect) modeSelect.value = "";
    render();
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", clearFilters);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      render();
    });
    [serviceSelect, citySelect, modeSelect].forEach(function (el) {
      if (el) el.addEventListener("change", render);
    });
  }

  render();
})();
