(function () {
  "use strict";

  var LANG_KEY = "dc_lang";
  var LANG_DISMISS_KEY = "dc_lang_prompt_dismissed";
  var currentLang = "en";
  var SUPPORTED_LANGS = ["en", "te", "hi", "ml", "ta", "mr"];

  var I18N = {
    en: {
      chooseLanguage: "Choose your language",
      chooseLanguageSub: "Use Divine Center in your preferred language.",
      english: "English",
      telugu: "Telugu",
      hindi: "Hindi",
      malayalam: "Malayalam",
      tamil: "Tamil",
      marathi: "Marathi",
      dontShowAgain: "Don't show again",
      language: "Language",
      skipContent: "Skip to content",
      heroEyebrow: "The Future of Faith is Here",
      heroTitle: "The Sanctity of the Temple, Delivered Home.",
      heroText:
        "India's most trusted platform for booking verified Acharyas — scriptural purity, punctual service, and honest pricing for every sacred occasion.",
      heroSearchBtn: "Search",
      heroExplore: "Explore Pujas",
      heroMeet: "Meet Pandits",
      quickBook: "Book Puja",
      quickFindPandit: "Find Pandit",
      quickBookings: "View Bookings",
      quickWallet: "Wallet",
    },
    te: {
      chooseLanguage: "మీ భాషను ఎంచుకోండి",
      chooseLanguageSub: "Divine Center ను మీకు నచ్చిన భాషలో ఉపయోగించండి.",
      english: "ఇంగ్లీష్",
      telugu: "తెలుగు",
      hindi: "హిందీ",
      malayalam: "మలయాళం",
      tamil: "తమిళం",
      marathi: "మరాఠీ",
      dontShowAgain: "మళ్లీ చూపవద్దు",
      language: "భాష",
      skipContent: "కంటెంట్‌కి వెళ్లండి",
      heroEyebrow: "భక్తి భవిష్యత్తు ఇక్కడే",
      heroTitle: "దేవాలయ పవిత్రత, ఇప్పుడు మీ ఇంటికే.",
      heroText:
        "ధృవీకరించబడిన ఆచార్యులతో వేద సంప్రదాయ పూజలను సమయపాలనతో, పారదర్శక ధరలతో అనుభవించండి.",
      heroSearchBtn: "శోధించండి",
      heroExplore: "పూజలు చూడండి",
      heroMeet: "పండితులను చూడండి",
      quickBook: "పూజ బుక్ చేయండి",
      quickFindPandit: "పండితుడిని కనుగొనండి",
      quickBookings: "బుకింగ్స్ చూడండి",
      quickWallet: "వాలెట్",
    },
    hi: {
      chooseLanguage: "अपनी भाषा चुनें",
      chooseLanguageSub: "Divine Center को अपनी पसंदीदा भाषा में उपयोग करें।",
      english: "अंग्रेज़ी",
      telugu: "तेलुगु",
      hindi: "हिंदी",
      malayalam: "मलयालम",
      tamil: "तमिल",
      marathi: "मराठी",
      dontShowAgain: "दोबारा न दिखाएं",
      language: "भाषा",
      skipContent: "सामग्री पर जाएँ",
      heroEyebrow: "आस्था का भविष्य यहीं है",
      heroTitle: "मंदिर की पवित्रता, अब आपके घर तक।",
      heroText:
        "सत्यापित आचार्यों के साथ वैदिक विधियों का अनुभव करें — शास्त्रीय शुद्धता, समय पालन और पारदर्शी शुल्क के साथ।",
      heroSearchBtn: "खोजें",
      heroExplore: "पूजा देखें",
      heroMeet: "पंडित देखें",
      quickBook: "पूजा बुक करें",
      quickFindPandit: "पंडित खोजें",
      quickBookings: "बुकिंग देखें",
      quickWallet: "वॉलेट",
    },
    ml: {
      chooseLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
      chooseLanguageSub: "Divine Center നിങ്ങളുടെ ഇഷ്ടഭാഷയിൽ ഉപയോഗിക്കുക.",
      english: "ഇംഗ്ലീഷ്",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      malayalam: "മലയാളം",
      tamil: "தமிழ்",
      marathi: "मराठी",
      dontShowAgain: "വീണ്ടും കാണിക്കേണ്ട",
      language: "ഭാഷ",
      skipContent: "ഉള്ളടക്കത്തിലേക്ക് പോകുക",
      heroEyebrow: "ഭക്തിയുടെ ഭാവി ഇവിടെ",
      heroTitle: "ക്ഷേത്രത്തിന്റെ പരിശുദ്ധി ഇനി നിങ്ങളുടെ വീട്ടിലേക്ക്.",
      heroText:
        "സ്ഥിരീകരിച്ച ആചാര്യന്മാരിലൂടെ വേദിക കർമങ്ങൾ — ശാസ്ത്രീയ ശുദ്ധി, സമയനിഷ്ഠ, തുറന്ന നിരക്ക്.",
      heroSearchBtn: "തിരയുക",
      heroExplore: "പൂജകൾ കാണുക",
      heroMeet: "പണ്ഡിതരെ കാണുക",
      quickBook: "പൂജ ബുക്ക് ചെയ്യുക",
      quickFindPandit: "പണ്ഡിതരെ കണ്ടെത്തുക",
      quickBookings: "ബുക്കിംഗുകൾ കാണുക",
      quickWallet: "വാലറ്റ്",
    },
    ta: {
      chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
      chooseLanguageSub: "Divine Center-ஐ உங்கள் விருப்ப மொழியில் பயன்படுத்துங்கள்.",
      english: "ஆங்கிலம்",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      malayalam: "മലയാളം",
      tamil: "தமிழ்",
      marathi: "मराठी",
      dontShowAgain: "மீண்டும் காண்பிக்க வேண்டாம்",
      language: "மொழி",
      skipContent: "உள்ளடக்கத்துக்கு செல்லவும்",
      heroEyebrow: "ஆன்மீகத்தின் எதிர்காலம் இங்கே",
      heroTitle: "கோவிலின் புனிதம் இப்போது உங்கள் இல்லத்துக்கு.",
      heroText:
        "சரிபார்க்கப்பட்ட ஆசார்யர்களுடன் வேத சடங்குகள் — சாஸ்திர துல்லியம், நேர்த்தி, வெளிப்படையான கட்டணம்.",
      heroSearchBtn: "தேடுக",
      heroExplore: "பூஜைகளை பார்க்க",
      heroMeet: "பண்டிதரை பார்க்க",
      quickBook: "பூஜை பதிவு",
      quickFindPandit: "பண்டிதரை கண்டுபிடிக்க",
      quickBookings: "பதிவுகள்",
      quickWallet: "வாலெட்",
    },
    mr: {
      chooseLanguage: "आपली भाषा निवडा",
      chooseLanguageSub: "Divine Center आपल्या पसंतीच्या भाषेत वापरा.",
      english: "इंग्रजी",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      malayalam: "മലയാളം",
      tamil: "தமிழ்",
      marathi: "मराठी",
      dontShowAgain: "पुन्हा दाखवू नका",
      language: "भाषा",
      skipContent: "माहितीकडे जा",
      heroEyebrow: "भक्तीचे भविष्य इथे आहे",
      heroTitle: "मंदिराची पवित्रता, आता तुमच्या घरी.",
      heroText:
        "प्रमाणित आचार्यांसोबत वैदिक विधी — शास्त्रोक्त पद्धत, वेळेचे पालन आणि पारदर्शक दर.",
      heroSearchBtn: "शोधा",
      heroExplore: "पूजा पहा",
      heroMeet: "पंडित पहा",
      quickBook: "पूजा बुक करा",
      quickFindPandit: "पंडित शोधा",
      quickBookings: "बुकिंग पहा",
      quickWallet: "वॉलेट",
    },
  };

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en && I18N.en[key]) || key;
  }

  function detectLang() {
    try {
      var s = localStorage.getItem(LANG_KEY);
      if (SUPPORTED_LANGS.indexOf(s) !== -1) return s;
    } catch (e) {}
    var nav = (navigator.language || "").toLowerCase();
    if (nav.indexOf("te") === 0) return "te";
    if (nav.indexOf("hi") === 0) return "hi";
    if (nav.indexOf("ml") === 0) return "ml";
    if (nav.indexOf("ta") === 0) return "ta";
    if (nav.indexOf("mr") === 0) return "mr";
    return "en";
  }

  function applyTranslations() {
    document.documentElement.setAttribute("lang", currentLang);
    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var key = el.getAttribute("data-i18n");
      if (!key) return;
      el.textContent = t(key);
    });
    document.querySelectorAll("[data-i18n-placeholder]").forEach(function (el) {
      var key = el.getAttribute("data-i18n-placeholder");
      if (!key) return;
      el.setAttribute("placeholder", t(key));
    });
    var select = document.getElementById("desktop-lang-select");
    if (select) select.value = currentLang;
    document.querySelectorAll(".nav__lang-option").forEach(function (option) {
      var lang = option.getAttribute("data-lang");
      var active = lang === currentLang;
      option.classList.toggle("is-active", active);
      option.setAttribute("aria-selected", active ? "true" : "false");
    });
  }

  function setLang(lang) {
    currentLang = SUPPORTED_LANGS.indexOf(lang) !== -1 ? lang : "en";
    try {
      localStorage.setItem(LANG_KEY, currentLang);
    } catch (e) {}
    applyTranslations();
    if (window.applyGoogleTranslateLang) {
      window.applyGoogleTranslateLang(currentLang);
    }
  }

  function maybeShowFirstRunModal() {
    try {
      if (localStorage.getItem(LANG_DISMISS_KEY) === "1") return;
      if (localStorage.getItem(LANG_KEY)) return;
    } catch (e) {}
    var modal =
      '<div id="desktop-lang-modal" style="position:fixed;inset:0;z-index:1200;background:rgba(0,0,0,.45);display:grid;place-items:center;padding:16px;">' +
      '<div style="width:min(100%,420px);background:#fff;border-radius:16px;padding:16px;border:1px solid rgba(74,28,20,.1)">' +
      '<h2 style="margin:0 0 6px;color:#4a1c14;font-family:Lora,serif;">' + t("chooseLanguage") + "</h2>" +
      '<p style="margin:0 0 12px;color:#6f5a54;">' + t("chooseLanguageSub") + "</p>" +
      '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;">' +
      '<button data-lang="en" style="padding:10px;border-radius:10px;border:1px solid rgba(74,28,20,.2);background:#fff;">' + t("english") + "</button>" +
      '<button data-lang="te" style="padding:10px;border-radius:10px;border:none;background:#d36b2b;color:#fff;">' + t("telugu") + "</button>" +
      '<button data-lang="hi" style="padding:10px;border-radius:10px;border:1px solid rgba(74,28,20,.2);background:#fff;">' + t("hindi") + "</button>" +
      '<button data-lang="ml" style="padding:10px;border-radius:10px;border:1px solid rgba(74,28,20,.2);background:#fff;">' + t("malayalam") + "</button>" +
      '<button data-lang="ta" style="padding:10px;border-radius:10px;border:1px solid rgba(74,28,20,.2);background:#fff;">' + t("tamil") + "</button>" +
      '<button data-lang="mr" style="padding:10px;border-radius:10px;border:1px solid rgba(74,28,20,.2);background:#fff;">' + t("marathi") + "</button></div>" +
      '<label style="display:flex;gap:8px;align-items:center;margin-top:10px;color:#6f5a54;font-size:13px;"><input id="desktop-lang-dont-show" type="checkbox"> ' + t("dontShowAgain") + "</label>" +
      "</div></div>";
    document.body.insertAdjacentHTML("beforeend", modal);
    var root = document.getElementById("desktop-lang-modal");
    if (!root) return;
    root.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        setLang(btn.getAttribute("data-lang") || "en");
        var dontShow = document.getElementById("desktop-lang-dont-show");
        if (dontShow && dontShow.checked) {
          try {
            localStorage.setItem(LANG_DISMISS_KEY, "1");
          } catch (e) {}
        }
        root.remove();
      });
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    currentLang = detectLang();
    applyTranslations();
    if (window.applyGoogleTranslateLang) {
      window.applyGoogleTranslateLang(currentLang);
    }
    maybeShowFirstRunModal();
    window.DesktopI18n = { setLang: setLang, getLang: function () { return currentLang; } };
  });
})();
