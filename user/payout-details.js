/**
 * Pandit payout details — bank form with demo persistence
 */
(function () {
  "use strict";

  var STORAGE_KEY = "dc_pandit_payout";
  var IFSC_PATTERN = /^[A-Za-z]{4}0[A-Za-z0-9]{6}$/;

  var DEFAULTS = {
    holder: "Panduranga Charyulu",
    account: "50100234521",
    ifsc: "HDFC0001234",
    bankName: "HDFC Bank, Banjara Hills",
  };

  function loadPayout() {
    try {
      var raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return Object.assign({}, DEFAULTS);
      return Object.assign({}, DEFAULTS, JSON.parse(raw));
    } catch (e) {
      return Object.assign({}, DEFAULTS);
    }
  }

  function savePayout(data) {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function maskAccount(num) {
    var digits = String(num || "").replace(/\D/g, "");
    if (digits.length < 4) return "•••• •••• ••••";
    return "•••• •••• " + digits.slice(-4);
  }

  function wireAccountToggle(input, btn) {
    var revealed = false;

    function syncDisplay() {
      input.value = revealed ? input.dataset.full || "" : maskAccount(input.dataset.full);
      btn.setAttribute("aria-pressed", revealed ? "true" : "false");
      btn.setAttribute("aria-label", revealed ? "Hide account number" : "Show account number");
    }

    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      revealed = !revealed;
      syncDisplay();
    });

    input.addEventListener("focus", function () {
      if (!revealed) {
        revealed = true;
        syncDisplay();
      }
    });

    input.addEventListener("input", function () {
      var typed = input.value.replace(/\s/g, "");
      if (/^\d+$/.test(typed) && typed.length >= 4) {
        input.dataset.full = typed;
      }
    });

    syncDisplay();
  }

  function updateIfscState(form) {
    var ifsc = form.querySelector("#payout-ifsc");
    if (!ifsc) return;
    var val = (ifsc.value || "").trim().toUpperCase();
    var valid = IFSC_PATTERN.test(val);
    var invalid = val.length >= 5 && !valid;
    ifsc.classList.toggle("portal-payout-hub__ifsc--valid", valid);
    ifsc.classList.toggle("portal-payout-hub__ifsc--invalid", invalid);
    var wrap = document.getElementById("payout-ifsc-wrap");
    if (wrap) {
      if (valid) wrap.setAttribute("data-ifsc-state", "valid");
      else if (invalid) wrap.setAttribute("data-ifsc-state", "invalid");
      else wrap.removeAttribute("data-ifsc-state");
    }
  }

  function updateFormProgress(form, activeStep) {
    var step = activeStep || 1;
    var fill = document.getElementById("payout-progress-fill");
    if (fill) fill.style.width = Math.round((step / 3) * 100) + "%";

    form.querySelectorAll(".portal-payout-form__progress-steps li").forEach(function (li) {
      var n = parseInt(li.getAttribute("data-payout-step"), 10);
      li.classList.toggle("is-active", n === step);
      li.classList.toggle("is-done", n < step);
    });

    form.querySelectorAll(".portal-payout-form__step").forEach(function (section) {
      var n = parseInt(section.getAttribute("data-payout-step"), 10);
      section.classList.toggle("portal-payout-form__step--active", n === step);
    });
  }

  function wireStepFocus(form) {
    var map = { "payout-holder": 1, "payout-account": 2, "payout-ifsc": 3, "payout-bank": 3 };
    form.addEventListener(
      "focusin",
      function (e) {
        var id = e.target && e.target.id;
        if (id && map[id]) updateFormProgress(form, map[id]);
      },
      true
    );
  }

  function populateForm(form, data) {
    var holder = form.querySelector("#payout-holder");
    var account = form.querySelector("#payout-account");
    var ifsc = form.querySelector("#payout-ifsc");
    var bank = form.querySelector("#payout-bank");

    if (holder) holder.value = data.holder || DEFAULTS.holder;
    if (account) {
      account.dataset.full = data.account || DEFAULTS.account;
    }
    if (ifsc) ifsc.value = data.ifsc || DEFAULTS.ifsc;
    if (bank) bank.value = data.bankName || DEFAULTS.bankName;

    updateIfscState(form);
  }

  function readForm(form) {
    var account = form.querySelector("#payout-account");
    var rawAccount = account && account.dataset.full ? account.dataset.full : DEFAULTS.account;

    if (account && document.activeElement === account) {
      var typed = account.value.replace(/\s/g, "");
      if (/^\d+$/.test(typed) && typed.length >= 4) {
        rawAccount = typed;
        account.dataset.full = typed;
      }
    }

    return {
      holder: (form.querySelector("#payout-holder") || {}).value || DEFAULTS.holder,
      account: rawAccount,
      ifsc: ((form.querySelector("#payout-ifsc") || {}).value || DEFAULTS.ifsc).toUpperCase(),
      bankName: (form.querySelector("#payout-bank") || {}).value || DEFAULTS.bankName,
    };
  }

  function showNote(message) {
    var note = document.getElementById("payout-save-note");
    if (!note) return;
    note.hidden = false;
    note.textContent = message;
    clearTimeout(showNote._t);
    showNote._t = setTimeout(function () {
      note.hidden = true;
    }, 3200);
  }

  function wireForm() {
    var form = document.getElementById("payout-form");
    if (!form) return;

    populateForm(form, loadPayout());
    updateFormProgress(form, 1);
    wireStepFocus(form);

    var account = form.querySelector("#payout-account");
    var toggle = form.querySelector("[data-toggle-account]");
    if (account && toggle) {
      wireAccountToggle(account, toggle);
    }

    form.querySelectorAll("#payout-holder, #payout-ifsc, #payout-bank").forEach(function (el) {
      el.addEventListener("input", function () {
        if (el.id === "payout-ifsc") {
          el.value = el.value.toUpperCase();
          updateIfscState(form);
        }
      });
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }

      var data = readForm(form);
      savePayout(data);
      populateForm(form, data);

      if (account && toggle) {
        var revealed = toggle.getAttribute("aria-pressed") === "true";
        if (revealed) {
          account.value = maskAccount(data.account);
          toggle.setAttribute("aria-pressed", "false");
          toggle.setAttribute("aria-label", "Show account number");
        }
      }

      showNote("Bank details saved. Withdrawals will use this account.");

      if (window.DivineCenterDemo && window.DivineCenterDemo.showToast) {
        window.DivineCenterDemo.showToast("Payout account updated.");
      }
    });
  }

  function initSearch() {
    var form = document.getElementById("dash-search-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var q = (form.querySelector("input") || {}).value || "";
      if (q.trim()) {
        window.location.href = "../pandits?q=" + encodeURIComponent(q.trim());
      } else {
        window.location.href = "../pandits";
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    wireForm();
    initSearch();
  });
})();
