/**
 * Shared mobile UI: drawer + bottom navigation (see site-config.js)
 */
(function () {
  "use strict";

  var CFG = window.DivineCenterConfig || {};
  var nav = CFG.mobileNav || [];
  var tabs = CFG.mobileTabs || [];
  var activeMap = CFG.mobileTabActiveMap || {};
  var LANG_KEY = "dc_lang";
  var LANG_DISMISS_KEY = "dc_lang_prompt_dismissed";
  var currentLang = "en";
  var SUPPORTED_LANGS = ["en", "te", "hi", "ml", "ta", "mr"];

  var I18N = {
    en: {
      home: "Home",
      pujas: "Pujas",
      bookings: "Bookings",
      pandits: "Pandits",
      book: "Book",
      wallet: "Wallet",
      profile: "Profile",
      login: "Login",
      register: "Register",
      registerPandit: "Register as Pandit",
      fullDesktop: "Full desktop site",
      chooseLanguage: "Choose your language",
      chooseLanguageSub: "Use Divine Center in your preferred language.",
      english: "English",
      telugu: "Telugu",
      hindi: "Hindi",
      malayalam: "Malayalam",
      tamil: "Tamil",
      marathi: "Marathi",
      continueText: "Continue",
      dontShowAgain: "Don't show again",
      save: "Save",
      appLanguage: "App language",
      settings: "Settings",
      heroEyebrow: "Premium Spiritual Services",
      heroTitle: "Bring sacred rituals home with trusted Acharyas.",
      heroText: "Book verified pandits and get complete ritual guidance from booking through ceremony.",
      heroExplore: "Book a Puja",
      heroMeet: "Find Pandit",
      quickBook: "Book Puja",
      quickBookDesc: "Choose a ritual",
      quickFindPandit: "Find Pandit",
      quickFindPanditDesc: "Top rated priests",
      quickBookings: "View Bookings",
      quickBookingsDesc: "Track service status",
      quickWallet: "Wallet",
      quickWalletDesc: "Offers & balance",
    },
    te: {
      home: "హోమ్",
      pujas: "పూజలు",
      bookings: "బుకింగ్స్",
      pandits: "పండితులు",
      book: "బుక్",
      wallet: "వాలెట్",
      profile: "ప్రొఫైల్",
      login: "లాగిన్",
      register: "రిజిస్టర్",
      registerPandit: "పండిట్‌గా నమోదు",
      fullDesktop: "డెస్క్‌టాప్ సైట్",
      chooseLanguage: "మీ భాషను ఎంచుకోండి",
      chooseLanguageSub: "Divine Center ను మీకు నచ్చిన భాషలో ఉపయోగించండి.",
      english: "ఇంగ్లీష్",
      telugu: "తెలుగు",
      hindi: "హిందీ",
      malayalam: "మలయాళం",
      tamil: "తమిళం",
      marathi: "మరాఠీ",
      continueText: "కొనసాగించండి",
      dontShowAgain: "మళ్లీ చూపవద్దు",
      save: "సేవ్ చేయండి",
      appLanguage: "యాప్ భాష",
      settings: "సెట్టింగ్స్",
      heroEyebrow: "ప్రిమియమ్ ఆధ్యాత్మిక సేవలు",
      heroTitle: "నమ్మకమైన ఆచార్యులతో పవిత్ర పూజలను మీ ఇంటికే తీసుకురండి.",
      heroText: "ధృవీకరించిన పండితులు, పారదర్శక ధరలు, ప్రారంభం నుంచి ముగింపు వరకు పూర్తి మార్గదర్శనం.",
      heroExplore: "పూజ బుక్ చేయండి",
      heroMeet: "పండితుడిని కనుగొనండి",
      quickBook: "పూజ బుక్ చేయండి",
      quickBookDesc: "ఒక పూజను ఎంచుకోండి",
      quickFindPandit: "పండితుడిని కనుగొనండి",
      quickFindPanditDesc: "టాప్ రేటెడ్ పూజారులు",
      quickBookings: "బుకింగ్స్ చూడండి",
      quickBookingsDesc: "సేవ స్థితిని ట్రాక్ చేయండి",
      quickWallet: "వాలెట్",
      quickWalletDesc: "ఆఫర్లు & బ్యాలెన్స్",
    },
    hi: {
      home: "होम",
      pujas: "पूजा",
      bookings: "बुकिंग",
      pandits: "पंडित",
      book: "बुक",
      wallet: "वॉलेट",
      profile: "प्रोफ़ाइल",
      login: "लॉगिन",
      register: "रजिस्टर",
      registerPandit: "पंडित के रूप में रजिस्टर",
      fullDesktop: "डेस्कटॉप साइट",
      chooseLanguage: "अपनी भाषा चुनें",
      chooseLanguageSub: "Divine Center को अपनी पसंद की भाषा में उपयोग करें।",
      english: "अंग्रेज़ी",
      telugu: "तेलुगु",
      hindi: "हिंदी",
      malayalam: "मलयालम",
      tamil: "तमिल",
      marathi: "मराठी",
      continueText: "जारी रखें",
      dontShowAgain: "दोबारा न दिखाएं",
      save: "सेव करें",
      appLanguage: "ऐप भाषा",
      settings: "सेटिंग्स",
      heroEyebrow: "प्रीमियम आध्यात्मिक सेवाएं",
      heroTitle: "विश्वसनीय आचार्यों के साथ पवित्र अनुष्ठान घर तक लाएं।",
      heroText: "सत्यापित पंडित, पारदर्शी शुल्क और शुरुआत से अंत तक पूर्ण मार्गदर्शन।",
      heroExplore: "पूजा बुक करें",
      heroMeet: "पंडित खोजें",
      quickBook: "पूजा बुक करें",
      quickBookDesc: "एक अनुष्ठान चुनें",
      quickFindPandit: "पंडित खोजें",
      quickFindPanditDesc: "शीर्ष रेटेड पुजारी",
      quickBookings: "बुकिंग देखें",
      quickBookingsDesc: "सेवा स्थिति ट्रैक करें",
      quickWallet: "वॉलेट",
      quickWalletDesc: "ऑफर और बैलेंस",
    },
    ml: {
      home: "ഹോം",
      pujas: "പൂജകൾ",
      bookings: "ബുക്കിംഗുകൾ",
      pandits: "പണ്ഡിതർ",
      book: "ബുക്ക്",
      wallet: "വാലറ്റ്",
      profile: "പ്രൊഫൈൽ",
      login: "ലോഗിൻ",
      register: "രജിസ്റ്റർ",
      registerPandit: "പണ്ഡിതനായി രജിസ്റ്റർ ചെയ്യുക",
      fullDesktop: "ഡെസ്ക്ടോപ്പ് സൈറ്റ്",
      chooseLanguage: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
      chooseLanguageSub: "Divine Center നിങ്ങളുടെ ഇഷ്ട ഭാഷയിൽ ഉപയോഗിക്കുക.",
      english: "ഇംഗ്ലീഷ്",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      malayalam: "മലയാളം",
      tamil: "தமிழ்",
      marathi: "मराठी",
      continueText: "തുടരുക",
      dontShowAgain: "വീണ്ടും കാണിക്കേണ്ട",
      save: "സേവ്",
      appLanguage: "ആപ്പ് ഭാഷ",
      settings: "സെറ്റിംഗ്സ്",
      heroEyebrow: "പ്രിമിയം ആത്മീയ സേവനങ്ങൾ",
      heroTitle: "വിശ്വസനീയ ആചാര്യന്മാരോടൊപ്പം പൂജകൾ നിങ്ങളുടെ വീട്ടിലേക്ക്.",
      heroText: "സ്ഥിരീകരിച്ച പണ്ഡിതർ, തുറന്ന നിരക്ക്, തുടക്കം മുതൽ അവസാനം വരെ മാർഗനിർദേശം.",
      heroExplore: "പൂജ ബുക്ക് ചെയ്യുക",
      heroMeet: "പണ്ഡിതനെ കണ്ടെത്തുക",
      quickBook: "പൂജ ബുക്ക് ചെയ്യുക",
      quickBookDesc: "ഒരു ചടങ്ങ് തിരഞ്ഞെടുക്കുക",
      quickFindPandit: "പണ്ഡിതനെ കണ്ടെത്തുക",
      quickFindPanditDesc: "മികച്ച റേറ്റിംഗ് ഉള്ള പൂജാരികൾ",
      quickBookings: "ബുക്കിംഗുകൾ കാണുക",
      quickBookingsDesc: "സേവന നില ട്രാക്ക് ചെയ്യുക",
      quickWallet: "വാലറ്റ്",
      quickWalletDesc: "ഓഫറുകളും ബാലൻസും",
    },
    ta: {
      home: "முகப்பு",
      pujas: "பூஜைகள்",
      bookings: "பதிவுகள்",
      pandits: "பண்டிதர்கள்",
      book: "புக்",
      wallet: "வாலெட்",
      profile: "சுயவிவரம்",
      login: "உள்நுழை",
      register: "பதிவு",
      registerPandit: "பண்டிதராக பதிவு செய்யவும்",
      fullDesktop: "டெஸ்க்டாப் தளம்",
      chooseLanguage: "உங்கள் மொழியைத் தேர்ந்தெடுக்கவும்",
      chooseLanguageSub: "Divine Center-ஐ உங்கள் விருப்ப மொழியில் பயன்படுத்துங்கள்.",
      english: "ஆங்கிலம்",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      malayalam: "മലയാളം",
      tamil: "தமிழ்",
      marathi: "मराठी",
      continueText: "தொடரவும்",
      dontShowAgain: "மீண்டும் காட்ட வேண்டாம்",
      save: "சேமிக்க",
      appLanguage: "ஆப் மொழி",
      settings: "அமைப்புகள்",
      heroEyebrow: "பிரீமியம் ஆன்மீக சேவைகள்",
      heroTitle: "நம்பகமான ஆசார்யர்களுடன் புனித சடங்குகளை உங்கள் இல்லத்துக்கு கொண்டுவருங்கள்.",
      heroText: "சரிபார்க்கப்பட்ட பண்டிதர்கள், தெளிவான கட்டணம், முழு வழிகாட்டுதல்.",
      heroExplore: "பூஜை பதிவு செய்",
      heroMeet: "பண்டிதரை தேடு",
      quickBook: "பூஜை பதிவு",
      quickBookDesc: "ஒரு சடங்கைத் தேர்ந்தெடுக்கவும்",
      quickFindPandit: "பண்டிதரை கண்டுபிடி",
      quickFindPanditDesc: "உயர் மதிப்பீட்டுப் பூஜாரிகள்",
      quickBookings: "பதிவுகள் பார்க்க",
      quickBookingsDesc: "சேவை நிலையை கண்காணிக்கவும்",
      quickWallet: "வாலெட்",
      quickWalletDesc: "சலுகைகள் & இருப்பு",
    },
    mr: {
      home: "मुख्यपृष्ठ",
      pujas: "पूजा",
      bookings: "बुकिंग्स",
      pandits: "पंडित",
      book: "बुक",
      wallet: "वॉलेट",
      profile: "प्रोफाइल",
      login: "लॉगिन",
      register: "नोंदणी",
      registerPandit: "पंडित म्हणून नोंदणी",
      fullDesktop: "डेस्कटॉप साइट",
      chooseLanguage: "आपली भाषा निवडा",
      chooseLanguageSub: "Divine Center आपल्या पसंतीच्या भाषेत वापरा.",
      english: "इंग्रजी",
      telugu: "తెలుగు",
      hindi: "हिंदी",
      malayalam: "മലയാളം",
      tamil: "தமிழ்",
      marathi: "मराठी",
      continueText: "सुरू ठेवा",
      dontShowAgain: "पुन्हा दाखवू नका",
      save: "सेव्ह",
      appLanguage: "अ‍ॅप भाषा",
      settings: "सेटिंग्ज",
      heroEyebrow: "प्रीमियम आध्यात्मिक सेवा",
      heroTitle: "विश्वासार्ह आचार्यांसह पवित्र विधी तुमच्या घरी आणा.",
      heroText: "प्रमाणित पंडित, पारदर्शक शुल्क आणि सुरुवातीपासून शेवटपर्यंत मार्गदर्शन.",
      heroExplore: "पूजा बुक करा",
      heroMeet: "पंडित शोधा",
      quickBook: "पूजा बुक करा",
      quickBookDesc: "एक विधी निवडा",
      quickFindPandit: "पंडित शोधा",
      quickFindPanditDesc: "उच्च रेटिंग असलेले पुजारी",
      quickBookings: "बुकिंग पहा",
      quickBookingsDesc: "सेवेची स्थिती ट्रॅक करा",
      quickWallet: "वॉलेट",
      quickWalletDesc: "ऑफर्स व बॅलन्स",
    },
  };

  function detectLang() {
    try {
      var fromStorage = localStorage.getItem(LANG_KEY);
      if (SUPPORTED_LANGS.indexOf(fromStorage) !== -1) return fromStorage;
    } catch (e) {}
    var browser = (navigator.language || "").toLowerCase();
    if (browser.indexOf("te") === 0) return "te";
    if (browser.indexOf("hi") === 0) return "hi";
    if (browser.indexOf("ml") === 0) return "ml";
    if (browser.indexOf("ta") === 0) return "ta";
    if (browser.indexOf("mr") === 0) return "mr";
    return "en";
  }

  function setLang(lang) {
    currentLang = SUPPORTED_LANGS.indexOf(lang) !== -1 ? lang : "en";
    try {
      localStorage.setItem(LANG_KEY, currentLang);
    } catch (e) {}
    document.documentElement.setAttribute("lang", currentLang);
    if (window.MobileI18n && typeof window.MobileI18n.apply === "function") {
      window.MobileI18n.apply();
    }
    if (window.applyGoogleTranslateLang) {
      window.applyGoogleTranslateLang(currentLang);
    }
  }

  function t(key) {
    return (I18N[currentLang] && I18N[currentLang][key]) || (I18N.en && I18N.en[key]) || key;
  }

  function desktopViewHref() {
    var d = (CFG && CFG.domains) || {};
    if (d.desktopHost) return "https://" + d.desktopHost + "/";
    return "https://divine-center.ruthwikreddy.live/";
  }

  var BRAND_SVG =
    '<img class="brand__icon" src="assets/logo/image.png" alt="Divine Center" width="44" height="44" />';

  /** Tab icon paths (stroke) except center lotus rendered in FAB */
  var TAB_ICON_PATHS = {
    pujas:
      '<path d="M12 3c1.2 2.4 3.6 4 6 4.5-3.6 1.2-6 4.2-6 8.5 0-4.3-2.4-7.3-6-8.5 2.4-.5 4.8-2.1 6-4.5z"/>' +
      '<path d="M8 18h8M10 21h4"/>',
    home: '<path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1h-5v-7H9v7H4a1 1 0 01-1-1V9.5z"/>',
    bookings:
      '<rect x="3" y="4" width="18" height="18" rx="2"/>' +
      '<path d="M8 2v4M16 2v4M3 10h18M9 14h3M9 18h9"/>',
    pandits:
      '<path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/>' +
      '<path d="M22 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/>',
    book: '<circle cx="12" cy="10" r="2.5"/><path d="M12 3c1.8 4 5 6 8 7-5 2-8 6-8 11 0-5-3-9-8-11 3-1 6.2-3 8-7z"/><path d="M12 12v9"/>',
    wallet: '<rect x="2" y="6" width="20" height="14" rx="2"/><path d="M16 14h3"/>',
    profile: '<circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>',
  };

  var LOTUS_FAB =
    '<img src="assets/images/image.png" alt="" width="24" height="24" aria-hidden="true" />';

  function drawerNavHtml() {
    var auth = CFG.auth || {};
    var navKeyMap = {
      home: "home",
      pujas: "pujas",
      bookings: "bookings",
      pandits: "pandits",
      wallet: "wallet",
      account: "profile",
    };
    return (
      nav
        .map(function (item) {
          var key = (item.id || "").toLowerCase();
          var labelKey = navKeyMap[key];
          var label = labelKey ? t(labelKey) : item.label || t(key);
          return '<a href="' + item.href + '">' + label + "</a>";
        })
        .join("") +
      '<div class="m-drawer__auth">' +
      '<a href="' +
      (auth.login || "login") +
      '">' + t("login") + "</a>" +
      '<a href="' +
      (auth.registerCustomer || "register") +
      '">' + t("register") + "</a>" +
      '<a href="' +
      (auth.registerPandit || "register-pandit") +
      '">' + t("registerPandit") + "</a>" +
      "</div>" +
      '<a href="' +
      desktopViewHref() +
      '">' + t("fullDesktop") + "</a>"
    );
  }

  function tabSvgInner(tabId) {
    var path = TAB_ICON_PATHS[tabId] || TAB_ICON_PATHS.home;
    return (
      '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75">' +
      path +
      "</svg>"
    );
  }

  function tabbarHtml() {
    return tabs
      .map(function (tab) {
        if (tab.center) {
          return (
            '<a href="' +
            tab.href +
            '" class="m-tab m-tab--fab" data-tab="' +
            tab.id +
            '"><span class="m-tab__fab">' +
            LOTUS_FAB +
            '</span><span class="m-tab__label">' +
            t(tab.id) +
            "</span></a>"
          );
        }
        return (
          '<a href="' +
          tab.href +
          '" class="m-tab" data-tab="' +
          tab.id +
          '">' +
          tabSvgInner(tab.id) +
          '<span class="m-tab__label">' +
            t(tab.id) +
          "</span></a>"
        );
      })
      .join("");
  }

  var DRAWER_HTML =
    '<div class="m-drawer" id="m-drawer" aria-hidden="true">' +
    '<div class="m-drawer__backdrop" id="m-drawer-backdrop"></div>' +
    '<aside class="m-drawer__panel" role="dialog" aria-label="Menu">' +
    '<div class="m-drawer__head">' +
    '<a href="index" class="brand brand--mark">' + BRAND_SVG + "</a>" +
    '<button type="button" class="m-drawer__close" id="m-drawer-close" aria-label="Close menu">×</button>' +
    "</div>" +
    '<nav class="m-drawer__nav" id="m-drawer-nav"></nav></aside></div>';

  function openDrawer() {
    var d = document.getElementById("m-drawer");
    if (!d) return;
    d.classList.add("is-open");
    d.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
  }

  function closeDrawer() {
    var d = document.getElementById("m-drawer");
    if (!d) return;
    d.classList.remove("is-open");
    d.setAttribute("aria-hidden", "true");
    document.body.classList.remove("drawer-open");
  }

  function effectiveTabId(pageSlug) {
    if (!pageSlug) return "book";
    if (Object.prototype.hasOwnProperty.call(activeMap, pageSlug)) {
      return activeMap[pageSlug];
    }
    return pageSlug;
  }

  function shouldShowTabbar() {
    return document.body.getAttribute("data-tabbar") !== "off";
  }

  function initShell(forcedPageSlug) {
    setLang(detectLang());

    var pageSlug = forcedPageSlug || document.body.getAttribute("data-page") || "home";
    var tabHighlight = effectiveTabId(pageSlug);

    if (!document.getElementById("m-drawer")) {
      document.body.insertAdjacentHTML("beforeend", DRAWER_HTML);
      var drawerNav = document.getElementById("m-drawer-nav");
      if (drawerNav) drawerNav.innerHTML = drawerNavHtml();
    }

    var showBar = shouldShowTabbar();

    if (showBar) {
      if (!document.querySelector(".m-tabbar")) {
        document.body.insertAdjacentHTML(
          "beforeend",
          '<nav class="m-tabbar m-tabbar--fab" aria-label="Primary">' + tabbarHtml() + "</nav>"
        );
      }
    } else {
      var tb = document.querySelector(".m-tabbar");
      if (tb) tb.remove();
    }

    document.querySelectorAll(".m-tab").forEach(function (tab) {
      var on = !!tabHighlight && tab.getAttribute("data-tab") === tabHighlight;
      tab.classList.toggle("m-tab--active", on);
      if (on) tab.setAttribute("aria-current", "page");
      else tab.removeAttribute("aria-current");
    });

    var menuBtn = document.getElementById("m-menu-btn");
    if (menuBtn && !menuBtn.dataset.bound) {
      menuBtn.dataset.bound = "1";
      menuBtn.addEventListener("click", openDrawer);
    }

    var closeBtn = document.getElementById("m-drawer-close");
    var backdrop = document.getElementById("m-drawer-backdrop");
    if (closeBtn && !closeBtn.dataset.bound) {
      closeBtn.dataset.bound = "1";
      closeBtn.addEventListener("click", closeDrawer);
    }
    if (backdrop && !backdrop.dataset.bound) {
      backdrop.dataset.bound = "1";
      backdrop.addEventListener("click", closeDrawer);
    }
  }

  window.MobileShell = {
    init: initShell,
    openDrawer: openDrawer,
    closeDrawer: closeDrawer,
    setLang: setLang,
    getLang: function () {
      return currentLang;
    },
    t: t,
  };

  window.MobileI18n = window.MobileI18n || {};
  window.MobileI18n.apply = function () {
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
  };

  function maybeShowFirstRunLanguageModal() {
    try {
      if (localStorage.getItem(LANG_DISMISS_KEY) === "1") return;
      if (localStorage.getItem("dc_lang")) return;
    } catch (e) {}

    var modal =
      '<div class="m-lang-modal" id="m-lang-modal" role="dialog" aria-label="' + t("chooseLanguage") + '">' +
      '<div class="m-lang-modal__card">' +
      "<h2>" + t("chooseLanguage") + "</h2>" +
      "<p>" + t("chooseLanguageSub") + "</p>" +
      '<div class="m-lang-modal__actions">' +
      '<button type="button" class="btn btn--outline" data-lang="en">' + t("english") + "</button>" +
      '<button type="button" class="btn btn--accent" data-lang="te">' + t("telugu") + "</button>" +
      '<button type="button" class="btn btn--outline" data-lang="hi">' + t("hindi") + "</button>" +
      '<button type="button" class="btn btn--outline" data-lang="ml">' + t("malayalam") + "</button>" +
      '<button type="button" class="btn btn--outline" data-lang="ta">' + t("tamil") + "</button>" +
      '<button type="button" class="btn btn--outline" data-lang="mr">' + t("marathi") + "</button>" +
      "</div>" +
      '<label class="m-auth-check m-auth-check--block"><input type="checkbox" id="m-lang-dont-show"> ' + t("dontShowAgain") + "</label>" +
      "</div></div>";

    document.body.insertAdjacentHTML("beforeend", modal);
    var root = document.getElementById("m-lang-modal");
    if (!root) return;
    root.querySelectorAll("[data-lang]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var lang = btn.getAttribute("data-lang") || "en";
        setLang(lang);
        var dontShow = document.getElementById("m-lang-dont-show");
        if (dontShow && dontShow.checked) {
          try {
            localStorage.setItem(LANG_DISMISS_KEY, "1");
          } catch (e2) {}
        }
        root.remove();
      });
    });
  }

  function initGoogleTranslate() {
    var SCRIPT_ID = "google-translate-script";
    if (!document.getElementById("google_translate_element")) {
      var holder = document.createElement("div");
      holder.id = "google_translate_element";
      holder.style.display = "none";
      document.body.appendChild(holder);
    }

    var GT_PENDING_KEY = "dc_gt_pending_lang";
    var GT_RELOAD_GUARD_KEY = "dc_gt_reload_guard";
    var map = { en: "en", te: "te", hi: "hi", ml: "ml", ta: "ta", mr: "mr" };

    function normalizedTarget(langCode) {
      return map[langCode] || "en";
    }

    function getCurrentGoogTransTarget() {
      var m = document.cookie.match(/(?:^|;\s*)googtrans=([^;]+)/);
      if (!m) return "en";
      var raw = decodeURIComponent(m[1] || "");
      var parts = raw.split("/");
      return parts[2] || "en";
    }

    function setGoogTransCookie(target) {
      var val = "/en/" + target;
      try {
        document.cookie = "googtrans=" + encodeURIComponent(val) + ";path=/;max-age=31536000;samesite=lax";
        if (location.hostname && location.hostname.indexOf(".") > -1) {
          document.cookie =
            "googtrans=" +
            encodeURIComponent(val) +
            ";path=/;max-age=31536000;domain=." +
            location.hostname.replace(/^www\./, "") +
            ";samesite=lax";
        }
      } catch (e) {
        return false;
      }
      return getCurrentGoogTransTarget() === target;
    }

    window.__dcApplyGoogleTranslate = function (langCode) {
      var target = normalizedTarget(langCode);
      var current = getCurrentGoogTransTarget();
      if (current === target) {
        try {
          sessionStorage.removeItem(GT_PENDING_KEY);
        } catch (e) {}
        return true;
      }
      try {
        if (sessionStorage.getItem(GT_PENDING_KEY) === target) return true;
        sessionStorage.setItem(GT_PENDING_KEY, target);
        var guardRaw = sessionStorage.getItem(GT_RELOAD_GUARD_KEY);
        if (guardRaw) {
          var guard = JSON.parse(guardRaw);
          if (guard && guard.target === target && Date.now() - (guard.ts || 0) < 5000) return true;
        }
        sessionStorage.setItem(GT_RELOAD_GUARD_KEY, JSON.stringify({ target: target, ts: Date.now() }));
      } catch (e) {}
      if (!setGoogTransCookie(target)) return false;
      location.reload();
      return true;
    };

    window.applyGoogleTranslateLang = function (langCode) {
      if (window.__dcApplyGoogleTranslate(langCode)) return;
      window.__dcPendingLang = langCode;
    };

    window.googleTranslateElementInit = function () {
      if (!window.google || !window.google.translate || !window.google.translate.TranslateElement) return;
      new window.google.translate.TranslateElement(
        { pageLanguage: "en", autoDisplay: false, includedLanguages: "en,te,hi,ml,ta,mr" },
        "google_translate_element"
      );
      var initial = window.__dcPendingLang || currentLang || "en";
      setTimeout(function () {
        window.__dcApplyGoogleTranslate(initial);
      }, 300);
    };

    if (!document.getElementById("google-translate-hide-css")) {
      var css = document.createElement("style");
      css.id = "google-translate-hide-css";
      css.textContent =
        ".goog-te-banner-frame.skiptranslate{display:none!important;}body{top:0!important;}" +
        ".goog-te-gadget,.goog-te-gadget .goog-te-combo{font-size:0!important;}" +
        ".goog-logo-link,.goog-te-gadget span{display:none!important;}";
      document.head.appendChild(css);
    }

    if (!document.getElementById(SCRIPT_ID)) {
      var s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      s.async = true;
      document.head.appendChild(s);
    }
  }

  document.addEventListener("DOMContentLoaded", function () {
    initGoogleTranslate();
    initShell();
    maybeShowFirstRunLanguageModal();
    if (window.MobileI18n && typeof window.MobileI18n.apply === "function") {
      window.MobileI18n.apply();
    }
  });
})();
