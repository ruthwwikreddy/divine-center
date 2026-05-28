(function () {
  "use strict";

  var DC = window.DivineCenter;
  if (!DC) return;

  var listEl = document.getElementById("pujas-list");
  var emptyEl = document.getElementById("pujas-empty");
  var form = document.getElementById("pujas-filter");
  var qInput = document.getElementById("filter-q");
  var typeSelect = document.getElementById("filter-type");
  var categorySelect = document.getElementById("filter-category");
  DC.PUJA_TYPES.forEach(function (t) {
    var opt = document.createElement("option");
    opt.value = t;
    opt.textContent = t;
    typeSelect.appendChild(opt);
  });

  DC.PUJA_CATEGORIES.forEach(function (c) {
    var opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    categorySelect.appendChild(opt);
  });

  function matches(p, filters) {
    if (filters.q) {
      var q = filters.q.toLowerCase();
      if (p.title.toLowerCase().indexOf(q) === -1 && p.desc.toLowerCase().indexOf(q) === -1) return false;
    }
    if (filters.type && p.type !== filters.type) return false;
    if (filters.category && p.category !== filters.category) return false;
    return true;
  }

  function render() {
    var filters = {
      q: (qInput && qInput.value.trim()) || "",
      type: (typeSelect && typeSelect.value) || "",
      category: (categorySelect && categorySelect.value) || "",
    };
    var results = DC.PUJAS.filter(function (p) {
      return matches(p, filters);
    });
    if (listEl) {
      listEl.innerHTML = results
        .map(function (p) {
          return DC.renderPujaListingCard(p, false);
        })
        .join("");
    }
    if (emptyEl) {
      emptyEl.hidden = results.length > 0;
    }
  }

  if (listEl) {
    listEl.innerHTML = DC.renderPujaListings();
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      render();
    });
    [qInput, typeSelect, categorySelect].forEach(function (el) {
      if (el) {
        el.addEventListener("change", render);
        if (el === qInput) el.addEventListener("input", render);
      }
    });
  }

  var params = new URLSearchParams(location.search);
  if (params.get("q") && qInput) {
    qInput.value = params.get("q");
    render();
  }

})();
