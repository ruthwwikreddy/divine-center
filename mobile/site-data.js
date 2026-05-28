/**
 * Shared content for desktop + all mobile screens
 */
window.DivineCenter = (function () {
  "use strict";

  var PUJA_ICONS = [
    { puja: "Griha Pravesh", slug: "griha-pravesh", src: "assets/icons/griha.png", labelHtml: "Griha Pravesh" },
    { puja: "Satyanarayana Pooja", slug: "satyanarayana", src: "assets/icons/satya.png", labelHtml: "Satyanarayana<br />Pooja" },
    { puja: "Varalakshmi Vratam", slug: "varalakshmi", src: "assets/icons/Varalakshmi.png", labelHtml: "Varalakshmi<br />Vratam" },
    { puja: "Rudrabhishekam", slug: "rudrabhishekam", src: "assets/icons/Rudrabhishekam.png", labelHtml: "Rudrabhishekam<br />Pooja" },
    { puja: "Hanuman Puja", slug: "hanuman", src: "assets/icons/hanuman.png", labelHtml: "Hanuman Puja" },
    { puja: "Annaprashan", slug: "annaprashan", src: "assets/icons/Annaprashan.png", labelHtml: "Annaprashan<br />Ceremony" },
    { puja: "Aksharabhyasam", slug: "aksharabhyasam", src: "assets/icons/Aksharabhyasam.png", labelHtml: "Aksharabhyasam" },
    { puja: "Consultation", slug: "consultation", src: "assets/icons/Consultation.png", labelHtml: "Consultation<br />Service" },
  ];

  var PUJAS = [
    {
      slug: "griha-pravesh",
      title: "Griha Pravesh Pooja",
      desc: "Sacred housewarming ritual for prosperity and positive energy in your new home.",
      img: "assets/icons/griha.png",
      price: "₹4,999",
      duration: "2–3 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Housewarming",
      included: ["Ganesh Puja", "Navagraha Shanti", "Havan", "Prasad distribution"],
    },
    {
      slug: "satyanarayana",
      title: "Satyanarayana Pooja",
      desc: "Blessings of Lord Vishnu for peace, success, and family harmony.",
      img: "assets/icons/satya.png",
      price: "₹3,499",
      duration: "2 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Satyanarayan",
      included: ["Kalash Sthapana", "Satyanarayan Katha", "Aarti", "Prasad"],
    },
    {
      slug: "varalakshmi",
      title: "Varalakshmi Vratam",
      desc: "Invoke Goddess Lakshmi for wealth, well-being, and auspicious beginnings.",
      img: "assets/icons/Varalakshmi.png",
      price: "₹2,999",
      duration: "1.5 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Vratam",
      included: ["Kalash decoration", "Lakshmi Puja", "Mantras", "Prasad"],
    },
    {
      slug: "rudrabhishekam",
      title: "Rudrabhishekam Pooja",
      desc: "Powerful Shiva abhishekam for health, protection, and spiritual upliftment.",
      img: "assets/icons/Rudrabhishekam.png",
      price: "₹5,499",
      duration: "3 Hours",
      pandits: "1–2 Pandits",
      type: "Temple",
      category: "Shiva Puja",
      included: ["Abhishekam", "Bilva leaves", "Rudram chanting", "Prasad"],
    },
    {
      slug: "hanuman",
      title: "Hanuman Puja",
      desc: "Strength, courage, and removal of obstacles through Hanuman worship.",
      img: "assets/icons/hanuman.png",
      price: "₹2,499",
      duration: "1.5 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Shiva Puja",
      included: ["Hanuman Chalisa", "Sindoor offering", "Aarti", "Prasad"],
    },
    {
      slug: "annaprashan",
      title: "Annaprashan Ceremony",
      desc: "Blessed first rice feeding for your child with traditional mantras.",
      img: "assets/icons/Annaprashan.png",
      price: "₹3,999",
      duration: "2 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Ceremony",
      included: ["Muhurat selection", "First feeding ritual", "Blessings", "Prasad"],
    },
    {
      slug: "aksharabhyasam",
      title: "Aksharabhyasam",
      desc: "Auspicious start to education — writing first letters with divine grace.",
      img: "assets/icons/Aksharabhyasam.png",
      price: "₹3,499",
      duration: "2 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Ceremony",
      included: ["Ganesh Puja", "Saraswati invocation", "Writing ceremony", "Prasad"],
    },
    {
      slug: "consultation",
      title: "Consultation Service",
      desc: "Speak with a verified Acharya about rituals, muhurat, and spiritual guidance.",
      img: "assets/icons/Consultation.png",
      price: "₹499",
      duration: "30 Mins",
      pandits: "1 Pandit",
      type: "Online",
      category: "Consultation",
      included: ["Video or phone call", "Ritual guidance", "Muhurat advice"],
    },
    {
      slug: "kedareshwara-vratam",
      title: "Kedareshwara Vratam",
      desc: "Sacred observance for Lord Shiva's blessings, health, and spiritual strength.",
      img: "assets/icons/kedareshwara-vratam.svg",
      price: "₹2,799",
      duration: "2 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Vratam",
      included: ["Kalash puja", "Vratam katha", "Abhishekam", "Prasad"],
    },
    {
      slug: "kala-sarpa-dosha",
      title: "Kala Sarpa Dosha Puja",
      desc: "Remedial rituals to pacify Kala Sarpa dosha and restore harmony in life.",
      img: "assets/icons/kala-sarpa-dosha.svg",
      price: "₹6,999",
      duration: "3–4 Hours",
      pandits: "1–2 Pandits",
      type: "Temple",
      category: "Dosha Nivaran",
      included: ["Dosha assessment", "Rahu-Ketu puja", "Havan", "Prasad"],
    },
    {
      slug: "vastu-shanti",
      title: "Vastu Shanti Pooja",
      desc: "Harmonize your home or workspace with Vastu-aligned Shanti rituals.",
      img: "assets/icons/vastu-shanti.svg",
      price: "₹4,499",
      duration: "2–3 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Housewarming",
      included: ["Vastu consultation", "Ganesh puja", "Havan", "Prasad"],
    },
    {
      slug: "mangala-dosha",
      title: "Mangala Dosha Puja",
      desc: "Traditional remedies for Mangal dosha before marriage or major life events.",
      img: "assets/icons/mangala-dosha.svg",
      price: "₹3,999",
      duration: "2 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Dosha Nivaran",
      included: ["Mangal shanti", "Mantra japa", "Aarti", "Prasad"],
    },
    {
      slug: "kalyanam",
      title: "Kalyanam",
      desc: "Complete Vedic wedding rituals performed by experienced Vivah specialists.",
      img: "assets/icons/kalyanam.svg",
      price: "₹24,999",
      duration: "Full Day",
      pandits: "2+ Pandits",
      type: "Home",
      category: "Ceremony",
      included: ["Muhurat", "Vivah homam", "Saptapadi", "Blessings"],
    },
    {
      slug: "shani-shanti",
      title: "Shani Shanti Puja",
      desc: "Appease Shani Dev for relief from Sade Sati and planetary hardships.",
      img: "assets/icons/shani-shanti.svg",
      price: "₹4,999",
      duration: "2.5 Hours",
      pandits: "1 Pandit",
      type: "Temple",
      category: "Dosha Nivaran",
      included: ["Shani stotram", "Oil abhishekam", "Havan", "Prasad"],
    },
    {
      slug: "mahalakshmi-homam",
      title: "Mahalakshmi Homam",
      desc: "Invoke Goddess Lakshmi for prosperity, abundance, and family well-being.",
      img: "assets/icons/mahalakshmi-homam.svg",
      price: "₹5,499",
      duration: "3 Hours",
      pandits: "1–2 Pandits",
      type: "Home",
      category: "Homam",
      included: ["Homam setup", "Lakshmi mantras", "Havan", "Prasad"],
    },
    {
      slug: "rahu-ketu-shanti",
      title: "Rahu Ketu Shanti Puja",
      desc: "Balance Rahu and Ketu influences for clarity, success, and peace of mind.",
      img: "assets/icons/rahu-ketu-shanti.svg",
      price: "₹5,999",
      duration: "3 Hours",
      pandits: "1–2 Pandits",
      type: "Temple",
      category: "Dosha Nivaran",
      included: ["Navagraha puja", "Rahu-Ketu havan", "Mantras", "Prasad"],
    },
    {
      slug: "navagraha-shanti",
      title: "Navagraha Shanti Pooja",
      desc: "Worship all nine grahas for overall harmony, health, and auspicious outcomes.",
      img: "assets/icons/navagraha-shanti.svg",
      price: "₹4,499",
      duration: "2.5 Hours",
      pandits: "1 Pandit",
      type: "Home",
      category: "Dosha Nivaran",
      included: ["Nine graha kalash", "Havan", "Aarti", "Prasad"],
    },
    {
      slug: "ati-rudra-homam",
      title: "Ati Rudra Homam",
      desc: "Grand Shiva homam for profound spiritual merit and removal of obstacles.",
      img: "assets/icons/ati-rudra-homam.svg",
      price: "₹12,999",
      duration: "4+ Hours",
      pandits: "2+ Pandits",
      type: "Temple",
      category: "Homam",
      included: ["Rudram chanting", "Maha abhishekam", "Havan", "Prasad"],
    },
  ];

  var PUJA_TYPES = ["Home", "Temple", "Online"];
  var PUJA_DETAILS = typeof window !== "undefined" && window.DivineCenterPujaDetails ? window.DivineCenterPujaDetails : {};
  var PUJA_CATEGORIES = [
    "Housewarming",
    "Vratam",
    "Satyanarayan",
    "Shiva Puja",
    "Dosha Nivaran",
    "Ceremony",
    "Homam",
    "Consultation",
  ];

  var PANDITS = [
    {
      slug: "panduranga-charyulu",
      liveSlug: "krishna-kanth",
      name: "Panduranga Charyulu (Sri Krishna Kanth)",
      role: "Expert Vedic Priest for All Poojas",
      location: "Vanasthalipuram, Telangana",
      city: "Vanasthalipuram",
      exp: "3 years",
      langs: ["English", "Sanskrit", "Hindi"],
      initials: "PK",
      mode: "Both",
      services: ["Griha Pravesh", "Satyanarayana", "Hanuman Puja", "Varalakshmi Vratam", "Aksharabhyasam", "Vastu Shanti Pooja"],
      photo: "assets/images/pandits/pandit-rajesh-sharma.png",
    },
    {
      slug: "narasimhacharyulu",
      liveSlug: "a-narasimhan",
      name: "A Narasimhacharyulu",
      role: "Expert Vedic Priest for All Poojas",
      location: "Vanasthalipuram, Telangana",
      city: "Vanasthalipuram",
      exp: "20 years",
      langs: ["Telugu", "Sanskrit"],
      initials: "AN",
      mode: "Offline",
      services: ["Satyanarayana", "Rudrabhishekam", "Varalakshmi Vratam", "Navagraha Shanti Pooja"],
      photo: "assets/images/pandits/pandit-venkatesh-iyer.png",
    },
    {
      slug: "anantha-krishna-vangipuram",
      liveSlug: "anantha-krishna-vangipuram",
      name: "Anantha Krishna Vangipuram",
      role: "Expert Vedic Priest for All Poojas",
      location: "Hyderabad, Telangana",
      city: "Hyderabad",
      exp: "10 years",
      langs: ["Telugu"],
      initials: "AK",
      mode: "Both",
      services: ["Griha Pravesh", "Consultation"],
      photo: "assets/images/pandits/pandit-krishna-murthy.png",
    },
    {
      slug: "sri-krishna-charyulu",
      liveSlug: "sri-krishna-charyulu",
      name: "Sri Krishna Charyulu",
      role: "Expert Vedic Priest for All Poojas",
      location: "BN Reddy, Telangana",
      city: "BN Reddy",
      exp: "24 years",
      langs: ["English", "Telugu", "Sanskrit"],
      initials: "SK",
      mode: "Online",
      services: ["Varalakshmi Vratam", "Aksharabhyasam"],
      photo: "assets/images/pandits/pandit-sri-krishna-charyulu.png",
    },
    {
      slug: "chandra-mohan",
      liveSlug: "chandra-mohan-1",
      name: "Chandra Mohan",
      role: "Expert Vedic Priest for All Poojas",
      location: "BN Reddy, Telangana",
      city: "BN Reddy",
      exp: "20 years",
      langs: ["Telugu", "Hindi"],
      initials: "CM",
      mode: "Offline",
      services: ["Annaprashan", "Griha Pravesh", "Satyanarayana"],
      photo: "assets/images/pandits/pandit-suresh-bhatt.png",
    },
    {
      slug: "ayyuluri-venkateshwarlu",
      liveSlug: "ayyuluri-venkateshwarlu",
      name: "Ayyuluri Venkateshwarlu",
      role: "Expert Vedic Priest for All Poojas",
      location: "Pentlavelli, Telangana",
      city: "Pentlavelli",
      exp: "5 years",
      langs: ["English", "Hindi"],
      initials: "AV",
      mode: "Both",
      services: ["Hanuman Puja", "Consultation"],
      photo: "assets/images/pandits/pandit-ramesh-dixit.png",
    },
    {
      slug: "eruvinti-balakrishna",
      liveSlug: "eruvinti-balakrishna",
      name: "Eruvinti Balakrishna",
      role: "Expert Vedic Priest for All Poojas",
      location: "Pentlavelli, Telangana",
      city: "Pentlavelli",
      exp: "30 years",
      langs: ["Telugu", "Sanskrit", "English"],
      initials: "EB",
      mode: "Offline",
      services: ["Rudrabhishekam", "Satyanarayana", "Griha Pravesh", "Vastu Shanti Pooja", "Navagraha Shanti Pooja"],
      photo: "assets/images/pandits/pandit-eruvinti-balakrishna.png",
    },
    {
      slug: "ramashankar-kurmeti",
      liveSlug: "ramashankar-kkurmeti",
      name: "Ramashankar kurmeti",
      role: "Expert Vedic Priest for All Poojas",
      location: "BN Reddy, Telangana",
      city: "BN Reddy",
      exp: "24 years",
      langs: ["English", "Hindi"],
      initials: "RK",
      mode: "Both",
      services: ["Griha Pravesh", "Consultation", "Satyanarayana", "Varalakshmi Vratam", "Rudrabhishekam", "Hanuman Puja", "Aksharabhyasam", "Annaprashan", "Vastu Shanti Pooja", "Navagraha Shanti Pooja"],
      photo: "assets/images/pandits/pandit-suresh-bhatt.png",
    },
  ];

  /** Local pandit portraits (never use pandit-anand-joshi — stock ceremony image). */
  var PANDIT_PHOTO_FALLBACKS = [
    "assets/images/pandits/pandit-rajesh-sharma.png",
    "assets/images/pandits/pandit-venkatesh-iyer.png",
    "assets/images/pandits/pandit-krishna-murthy.png",
    "assets/images/pandits/pandit-suresh-bhatt.png",
    "assets/images/pandits/pandit-ramesh-dixit.png",
    "assets/images/pandits/pandit-sri-krishna-charyulu.png",
    "assets/images/pandits/pandit-eruvinti-balakrishna.png",
  ];

  var BANNED_PANDIT_PHOTO = /pandit-anand-joshi/i;

  function resolvePanditPhoto(photo, pandit) {
    if (photo && /^https?:\/\//i.test(photo) && !BANNED_PANDIT_PHOTO.test(photo)) {
      return photo;
    }
    if (photo && !BANNED_PANDIT_PHOTO.test(photo)) {
      return photo;
    }
    var idx = pandit ? -1 : 0;
    if (pandit) {
      for (var i = 0; i < PANDITS.length; i++) {
        if (PANDITS[i] === pandit || PANDITS[i].slug === pandit.slug) {
          idx = i;
          break;
        }
      }
    }
    if (idx < 0) idx = 0;
    return PANDIT_PHOTO_FALLBACKS[idx % PANDIT_PHOTO_FALLBACKS.length];
  }

  function imgPandit(p, className, w, h, loading) {
    var src = resolvePanditPhoto(p.photo, p);
    var fb = PANDIT_PHOTO_FALLBACKS[0];
    var c = "media-img" + (className ? " " + className : "");
    return (
      '<img class="' +
      c +
      '" src="' +
      src +
      '" alt="' +
      (p.name || "") +
      '" width="' +
      w +
      '" height="' +
      h +
      '" loading="' +
      (loading || "lazy") +
      '" decoding="async" data-pandit-fallback="' +
      fb +
      '" onerror="var f=this.getAttribute(\'data-pandit-fallback\');if(f&&this.src!==f){this.src=f;}" />'
    );
  }

  var BLOG_CATEGORIES = [
    { id: "all", label: "All Blogs", count: 0 },
    { id: "vratas", label: "Vratas & Festivals", count: 0 },
    { id: "festivals", label: "Festivals & Rituals", count: 0 },
    { id: "wisdom", label: "Spiritual Wisdom", count: 0 },
    { id: "guides", label: "Puja Guides", count: 0 },
  ];

  var BLOG_SLUG_ALIASES = {
    "varalakshmi-guide": "varalakshmi-vratam-significance-rituals-muhurat",
    "hanuman-jayanti": "hanuman-jayanti-rituals-timings-and-41-day-deeksha",
    "griha-pravesh-2026": "griha-pravesh-puja",
    "sawan-somvar-vrat": "hanuman-jayanti-rituals-timings-and-41-day-deeksha",
    "navagraha-shanti-guide": "griha-pravesh-puja",
    "daily-prayers-power": "why-satyanarayana-puja-is-one-of-the-most-powerful-hindu-rituals",
  };

  var BLOGS = window.DivineCenterBlogDetails ? window.DivineCenterBlogDetails.slice() : [
    {
      slug: "varalakshmi-guide",
      title: "Varalakshmi Vratam: The Ultimate Guide to Invoking Goddess Lakshmi's Blessings",
      excerpt: "Discover the sacred observances, ideal muhurat, and home rituals for Varalakshmi Vratam.",
      img: "assets/images/blog/varalakshmi-guide.png",
      heroImg: "assets/images/blog/varalakshmi-guide.png",
      date: "5 Apr 2026",
      readTime: "8 min read",
      views: "2.5K",
      category: "vratas",
      categoryLabel: "Vratas & Festivals",
      featured: true,
      body: [
        "Varalakshmi Vratam is one of the most cherished festivals for invoking the blessings of Goddess Lakshmi. Devotees observe this vratam with deep devotion, seeking prosperity, harmony, and spiritual grace for their families.",
      ],
      sections: [
        {
          type: "heading",
          title: "Significance of Varalakshmi Vratam",
        },
        {
          type: "text",
          content:
            "The name Varalakshmi combines 'Vara' (boon) and 'Lakshmi' (goddess of wealth). Worshipping her on this vratam is believed to grant Ashta Lakshmi — the eight forms of divine abundance.",
        },
        {
          type: "highlight",
          text: "Varalakshmi Vratam is traditionally observed on the Friday before Pournami in the month of Shravana (July–August).",
        },
        {
          type: "heading",
          title: "Puja Procedure",
        },
        {
          type: "steps",
          items: [
            "Clean the puja area and arrange kalash with coconut, mango leaves, and turmeric.",
            "Invoke Ganesh and perform sankalpa stating your family's name and gotra.",
            "Decorate the idol or photo of Goddess Lakshmi with flowers and saree.",
            "Offer naivedyam including sweets, fruits, and traditional dishes.",
            "Recite Lakshmi Ashtottara and perform aarti with family members.",
          ],
        },
        {
          type: "heading",
          title: "Benefits of Observing Varalakshmi Vratam",
        },
        {
          type: "benefits",
          items: [
            "Brings wealth and prosperity",
            "Family harmony and well-being",
            "Removal of obstacles",
            "Spiritual merit (punya)",
            "Blessings for generations",
          ],
        },
        {
          type: "quote",
          text: "When the heart is pure and the offering is sincere, the Divine Mother bestows her grace without measure.",
        },
      ],
    },
    {
      slug: "hanuman-jayanti",
      title: "Hanuman Jayanti: Rituals, Timing & Significance",
      excerpt: "Discover the sacred observances, ideal muhurat, and home rituals to honor Lord Hanuman.",
      img: "assets/images/blog/hanuman-jayanti.png",
      heroImg: "assets/images/blog/hanuman-jayanti.png",
      date: "8 Mar 2026",
      readTime: "6 min read",
      views: "1.8K",
      category: "festivals",
      categoryLabel: "Festivals & Rituals",
      body: [
        "Hanuman Jayanti marks the birth of Lord Hanuman, the embodiment of strength, devotion, and selfless service. Devotees observe fasting, recite Hanuman Chalisa, and visit temples.",
        "Home rituals may include lighting lamps, offering sindoor and marigolds, and chanting with family members gathered in a spirit of reverence.",
      ],
    },
    {
      slug: "griha-pravesh-2026",
      title: "Griha Pravesh 2026: Auspicious Dates Guide",
      excerpt: "Plan your housewarming with verified muhurats and essentials for Vastu-aligned entry.",
      img: "assets/images/blog/griha-pravesh-2026.png",
      heroImg: "assets/images/blog/griha-pravesh-2026.png",
      date: "1 Mar 2026",
      readTime: "5 min read",
      views: "3.1K",
      category: "guides",
      categoryLabel: "Puja Guides",
      featured: true,
      body: [
        "Moving into a new home is a milestone best begun with Griha Pravesh — a Vedic housewarming that invites divine blessings into your living space.",
        "Consult a verified pandit for muhurat selection aligned with your nakshatra and regional traditions.",
      ],
    },
    {
      slug: "navagraha-shanti-guide",
      title: "Navagraha Shanti Puja — Benefits, Procedure & Muhurat",
      excerpt: "Balance planetary influences with authentic Navagraha rituals performed at home.",
      img: "assets/images/blog/navagraha-shanti-guide.png",
      heroImg: "assets/images/blog/navagraha-shanti-guide.png",
      date: "22 Feb 2026",
      readTime: "7 min read",
      views: "1.2K",
      category: "guides",
      categoryLabel: "Puja Guides",
      body: [
        "Navagraha Shanti aligns the nine grahas for harmony in health, career, and relationships. A verified Acharya guides the homam and offerings.",
      ],
    },
    {
      slug: "daily-prayers-power",
      title: "The Power of Daily Prayers in Modern Life",
      excerpt: "Simple Sanskrit prayers and routines that anchor your day in mindfulness and dharma.",
      img: "assets/images/blog/daily-prayers-power.png",
      heroImg: "assets/images/blog/daily-prayers-power.png",
      date: "15 Feb 2026",
      readTime: "4 min read",
      views: "980",
      category: "wisdom",
      categoryLabel: "Spiritual Wisdom",
      body: [
        "Daily prayer need not be lengthy — consistency and sincerity matter more than duration. Start with Ganesh invocation and close with gratitude.",
      ],
    },
    {
      slug: "sawan-somvar-vrat",
      title: "Sawan Somvar Vrat — Complete Observance Guide",
      excerpt: "Honor Lord Shiva during Shravan with fasting, abhishekam, and family traditions.",
      img: "assets/images/blog/sawan-somvar.png",
      heroImg: "assets/images/blog/sawan-somvar.png",
      date: "10 Feb 2026",
      readTime: "6 min read",
      views: "2.1K",
      category: "vratas",
      categoryLabel: "Vratas & Festivals",
      featured: true,
      body: [
        "Mondays in Shravan are especially sacred for Shiva bhakti. Observe with bilva leaves, milk abhishekam, and Rudram chanting when possible.",
      ],
    },
  ];

  if (window.DivineCenterBlogDetails && window.DivineCenterBlogDetails.length) {
    BLOGS = window.DivineCenterBlogDetails.slice();
  }

  BLOG_CATEGORIES.forEach(function (cat) {
    if (cat.id === "all") {
      cat.count = BLOGS.length;
    } else {
      cat.count = BLOGS.filter(function (b) {
        return b.category === cat.id;
      }).length;
    }
  });

  var HOME_GALLERY = [
    { slug: "griha-pravesh", title: "Griha Pravesh", caption: "Sacred housewarming" },
    { slug: "varalakshmi", title: "Varalakshmi Vratam", caption: "Prosperity & grace" },
    { slug: "rudrabhishekam", title: "Rudrabhishekam", caption: "Shiva abhishekam" },
    { slug: "kalyanam", title: "Kalyanam", caption: "Vedic wedding rites" },
    { slug: "navagraha-shanti", title: "Navagraha Shanti", caption: "Planetary harmony" },
    { slug: "hanuman", title: "Hanuman Puja", caption: "Strength & devotion" },
  ];

  var TESTIMONIALS = [
    {
      name: "Anitha Reddy",
      city: "Hyderabad",
      puja: "Griha Pravesh",
      rating: 5,
      text: "Panditji arrived exactly on muhurat time. The entire Griha Pravesh was conducted with devotion and clarity — our family felt truly blessed.",
    },
    {
      name: "Rahul & Meera Iyer",
      city: "Bangalore",
      puja: "Satyanarayana Pooja",
      rating: 5,
      text: "Transparent pricing, punctual service, and authentic mantras. Divine Center made booking a family puja effortless from start to finish.",
    },
    {
      name: "Lakshmi Devi",
      city: "Chennai",
      puja: "Varalakshmi Vratam",
      rating: 5,
      text: "The Acharya explained every step of the vratam in Telugu. Beautifully arranged kalash and prasad — exactly as our elders remember it.",
    },
    {
      name: "Vikram Patel",
      city: "Pune",
      puja: "Rudrabhishekam",
      rating: 5,
      text: "We booked a temple Rudrabhishekam through the site. Verification gave us confidence — the ritual was powerful and professionally handled.",
    },
    {
      name: "Sunita & Arjun Rao",
      city: "Hyderabad",
      puja: "Annaprashan",
      rating: 5,
      text: "Our son’s first rice ceremony was serene and scripturally correct. The pandit was gentle with our elders and patient with all our questions.",
    },
    {
      name: "Priya Sharma",
      city: "Delhi NCR",
      puja: "Consultation",
      rating: 5,
      text: "The online consultation helped us pick the right muhurat for our homam. Felt like speaking to a family priest, not a call center.",
    },
  ];

  function blogUrl(slug, forMobile) {
    return "blog?b=" + slug;
  }

  function img(src, alt, className, w, h, loading) {
    var c = "media-img" + (className ? " " + className : "");
    return (
      '<img class="' +
      c +
      '" src="' +
      src +
      '" alt="' +
      (alt || "") +
      '" width="' +
      w +
      '" height="' +
      h +
      '" loading="' +
      (loading || "lazy") +
      '" decoding="async" />'
    );
  }

  var PUJA_IMG_ONERROR =
    "var w=this.closest('[data-puja-media]');var f=this.getAttribute('data-fallback');if(w&&f&&this.src!==f){w.classList.remove('is-icon');w.classList.add(/assets\\/icons\\//.test(f)?'is-icon':'is-fallback');this.src=f;}";

  function isPujaIconSrc(src) {
    return /assets\/icons\//.test(src || "");
  }

  function pujaIconPath(p) {
    if (p.img) return p.img;
    return "assets/icons/" + p.slug + ".svg";
  }

  function pujaPhotoPath(p) {
    if (p.photo) return p.photo;
    return "assets/images/pujas/" + p.slug + ".jpg";
  }

  function pujaUrl(slug, forMobile) {
    return "puja?p=" + slug;
  }

  function imgPujaPhoto(p, className, w, h, loading) {
    var photo = pujaPhotoPath(p);
    var iconFallback = pujaIconPath(p);
    var c = "media-img" + (className ? " " + className : "");
    var wrapClass = "puja-media";
    var onerror =
      ' onerror="' +
      PUJA_IMG_ONERROR +
      '" data-fallback="' +
      iconFallback +
      '"';
    return (
      '<div class="' +
      wrapClass +
      '" data-puja-media>' +
      '<img class="' +
      c +
      '" src="' +
      photo +
      '" alt="' +
      (p.title || "") +
      '" width="' +
      w +
      '" height="' +
      h +
      '" loading="' +
      (loading || "lazy") +
      '" decoding="async"' +
      onerror +
      " /></div>"
    );
  }

  function getPuja(slug) {
    return PUJAS.filter(function (p) {
      return p.slug === slug;
    })[0];
  }

  function buildDefaultPujaDetail(p) {
    var shortName = p.title.replace(/\s+(Pooja|Ceremony|Service)$/i, "");
    return {
      subtitle: "Book verified Vedic pandits for " + shortName,
      durationLabel: p.duration,
      onlineAvailable: p.type === "Online" || p.type === "Home" || p.type === "Both",
      doorstepAvailable: p.type === "Home" || p.type === "Temple",
      seoTitle: p.title + " | " + p.category,
      hideSamagri: false,
      hideWhyChoose: false,
      intro:
        p.desc +
        " Our experienced Acharyas perform every ritual with scriptural accuracy, punctual timing, and transparent pricing tailored to your family's traditions.",
      bookingNote:
        "Book directly with fixed pricing, or get a personalized quote for custom needs (e.g. samagri, venue).",
      samagri: [{ title: "Ritual essentials", items: p.included }],
      sections: [
        {
          title: "About " + p.title,
          paragraphs: [p.desc],
        },
        {
          title: "What's included in our service",
          list: p.included,
        },
      ],
      whyChoose: [
        "Trusted & experienced priests",
        "Transparent pricing — no hidden charges",
        "Doorstep or temple service as per your need",
        "Regional customs respected & followed",
      ],
      whyChooseClosing: "We are here to help your family observe this ritual with devotion and peace of mind.",
    };
  }

  function getPujaDetail(slug) {
    var p = getPuja(slug);
    if (!p) return null;
    var extra = PUJA_DETAILS[slug] || buildDefaultPujaDetail(p);
    return {
      slug: p.slug,
      title: p.title,
      price: p.price,
      duration: p.duration,
      pandits: p.pandits,
      type: p.type,
      category: p.category,
      included: p.included,
      img: p.img,
      subtitle: extra.subtitle,
      durationLabel: extra.durationLabel || p.duration,
      onlineAvailable: extra.onlineAvailable !== false,
      doorstepAvailable: extra.doorstepAvailable !== false,
      intro: extra.intro,
      bookingNote: extra.bookingNote,
      seoTitle: extra.seoTitle,
      samagri: extra.samagri,
      sections: extra.sections,
      whyChoose: extra.whyChoose || [],
      whyChooseClosing: extra.whyChooseClosing || "",
      whyChooseIntro: extra.whyChooseIntro || "",
      hideSamagri: !!extra.hideSamagri,
      hideWhyChoose: !!extra.hideWhyChoose,
    };
  }

  function panditDetailSlug(p) {
    return p.liveSlug || p.slug;
  }

  function panditDetailHref(p, linkPrefix) {
    linkPrefix = linkPrefix || "";
    return linkPrefix + "pandit?p=" + encodeURIComponent(panditDetailSlug(p));
  }

  function panditServiceNames(p) {
    var key = panditDetailSlug(p);
    var extra = (window.DivineCenterPanditDetails || {})[key];
    if (extra && extra.services && extra.services.length) {
      return extra.services.map(function (s) {
        return s.name;
      });
    }
    return p.services || [];
  }

  function getRecommendedPanditsForPuja(p) {
    var titleLower = p.title.toLowerCase();
    var matched = PANDITS.filter(function (pt) {
      return panditServiceNames(pt).some(function (s) {
        var sLower = s.toLowerCase();
        if (p.slug === "consultation") {
          return sLower.indexOf("consult") !== -1 || titleLower.indexOf(sLower) !== -1;
        }
        if (p.slug === "varalakshmi") {
          return (
            sLower.indexOf("varalakshmi") !== -1 ||
            sLower.indexOf("lakshmi") !== -1 ||
            titleLower.indexOf(sLower) !== -1
          );
        }
        if (p.slug === "satyanarayana") {
          return (
            sLower.indexOf("satyanar") !== -1 ||
            titleLower.indexOf(sLower) !== -1 ||
            sLower.indexOf(titleLower.split(" ")[0]) !== -1
          );
        }
        if (p.slug === "rudrabhishekam") {
          return (
            sLower.indexOf("rudrabhishek") !== -1 ||
            sLower.indexOf("shiva") !== -1 ||
            titleLower.indexOf(sLower) !== -1
          );
        }
        if (p.slug === "hanuman") {
          return (
            sLower.indexOf("hanuman") !== -1 ||
            titleLower.indexOf(sLower) !== -1
          );
        }
        if (p.slug === "aksharabhyasam") {
          return (
            sLower.indexOf("aksharabhyas") !== -1 ||
            sLower.indexOf("saraswati") !== -1 ||
            titleLower.indexOf(sLower) !== -1
          );
        }
        if (p.slug === "annaprashan") {
          return (
            sLower.indexOf("annaprashan") !== -1 ||
            titleLower.indexOf(sLower) !== -1
          );
        }
        if (p.slug === "vastu-shanti") {
          return (
            sLower.indexOf("vastu") !== -1 ||
            titleLower.indexOf("vastu") !== -1 ||
            titleLower.indexOf(sLower) !== -1
          );
        }
        if (p.slug === "navagraha-shanti") {
          return (
            sLower.indexOf("navagraha") !== -1 ||
            titleLower.indexOf("navagraha") !== -1 ||
            titleLower.indexOf(sLower) !== -1
          );
        }
        if (p.slug === "mangala-dosha") {
          return (
            sLower.indexOf("mangala") !== -1 ||
            sLower.indexOf("mars") !== -1 ||
            sLower.indexOf("kuja") !== -1 ||
            sLower.indexOf("dosha") !== -1 ||
            titleLower.indexOf("mangala") !== -1
          );
        }
        if (p.slug === "kedareshwara-vratam") {
          return (
            sLower.indexOf("kedareshwara") !== -1 ||
            sLower.indexOf("vratam") !== -1 ||
            titleLower.indexOf("kedareshwara") !== -1
          );
        }
        if (p.slug === "kala-sarpa-dosha") {
          return (
            sLower.indexOf("kala") !== -1 ||
            sLower.indexOf("sarpa") !== -1 ||
            sLower.indexOf("dosha") !== -1
          );
        }
        if (p.slug === "kalyanam") {
          return (
            sLower.indexOf("kalyan") !== -1 ||
            sLower.indexOf("wedding") !== -1 ||
            sLower.indexOf("vivah") !== -1 ||
            titleLower.indexOf("wedding") !== -1
          );
        }
        if (p.slug === "shani-shanti") {
          return sLower.indexOf("shani") !== -1 || titleLower.indexOf("shani") !== -1;
        }
        if (p.slug === "mahalakshmi-homam") {
          return (
            sLower.indexOf("lakshmi") !== -1 ||
            sLower.indexOf("homam") !== -1 ||
            titleLower.indexOf("mahalakshmi") !== -1
          );
        }
        if (p.slug === "rahu-ketu-shanti") {
          return (
            sLower.indexOf("rahu") !== -1 ||
            sLower.indexOf("ketu") !== -1 ||
            titleLower.indexOf("rahu") !== -1
          );
        }
        if (p.slug === "ati-rudra-homam") {
          return (
            sLower.indexOf("rudra") !== -1 ||
            sLower.indexOf("ati") !== -1 ||
            titleLower.indexOf("rudra") !== -1
          );
        }
        return titleLower.indexOf(sLower) !== -1 || sLower.indexOf(titleLower.split(" ")[0]) !== -1;
      });
    });
    if (matched.length < 2) {
      matched = PANDITS.slice();
    }
    return matched.slice(0, 4);
  }

  function getPandit(slug) {
    if (!slug) return null;
    return (
      PANDITS.filter(function (p) {
        return p.slug === slug || p.liveSlug === slug;
      })[0] || null
    );
  }

  function getPanditDetail(slug) {
    var p = getPandit(slug);
    if (!p) return null;
    var key = panditDetailSlug(p);
    var extra = (window.DivineCenterPanditDetails || {})[key] || {};
    var location = extra.location || p.location;
    var detail = {
      slug: p.slug,
      liveSlug: key,
      name: p.name,
      role: extra.role || p.role,
      location: location,
      city: p.city,
      exp: extra.experienceLabel || p.exp,
      langs: extra.languages || p.langs,
      mode: p.mode,
      photo: resolvePanditPhoto(extra.photo || p.photo, p),
      bio: extra.bio || "",
      onlineAvailable: extra.onlineAvailable !== false,
      offlineAvailable: extra.offlineAvailable !== false,
      services: extra.services || (p.services || []).map(function (s) {
        return { name: s, pujaSlug: "" };
      }),
      seoTitle: extra.seoTitle || p.name + " | Verified Pandit",
      mapQuery: extra.mapQuery || "",
    };
    detail.mapEmbedUrl = panditMapEmbedUrl(detail);
    detail.mapLinkUrl = panditMapLinkUrl(detail);
    return detail;
  }

  function panditMapQuery(detail) {
    if (detail.mapQuery) return detail.mapQuery;
    if (detail.location) {
      return /india/i.test(detail.location) ? detail.location : detail.location + ", India";
    }
    if (detail.city) return detail.city + ", Telangana, India";
    return "Hyderabad, Telangana, India";
  }

  function panditMapEmbedUrl(detail) {
    return (
      "https://maps.google.com/maps?q=" +
      encodeURIComponent(panditMapQuery(detail)) +
      "&hl=en&z=13&output=embed"
    );
  }

  function panditMapLinkUrl(detail) {
    return (
      "https://www.google.com/maps/search/?api=1&query=" +
      encodeURIComponent(panditMapQuery(detail))
    );
  }

  function getBlog(slug) {
    if (!slug) return null;
    var resolved = BLOG_SLUG_ALIASES[slug] || slug;
    return BLOGS.filter(function (b) {
      return b.slug === resolved;
    })[0];
  }

  function renderPujaIcon(item, linkPrefix) {
    linkPrefix = linkPrefix || "";
    return (
      '<a href="' +
      linkPrefix +
      "puja?p=" +
      item.slug +
      '" class="puja-icons__item" data-puja="' +
      item.puja +
      '">' +
      '<span class="puja-icons__ring">' +
      img(item.src, "", "", 92, 92) +
      "</span>" +
      '<span class="puja-icons__label">' +
      item.labelHtml +
      "</span></a>"
    );
  }

  function renderPujaIcons(linkPrefix) {
    return PUJA_ICONS.map(function (item) {
      return renderPujaIcon(item, linkPrefix);
    }).join("");
  }

  function renderPujaGrid(linkPrefix) {
    linkPrefix = linkPrefix || "";
    return (
      '<div class="m-puja-grid">' +
      PUJA_ICONS.map(function (item) {
        return (
          '<a href="' +
          linkPrefix +
          "puja?p=" +
          item.slug +
          '" class="m-puja-grid__item">' +
          '<span class="puja-icons__ring">' +
          img(item.src, "", "", 64, 64) +
          "</span>" +
          '<span class="m-puja-grid__label">' +
          item.puja.replace(" Pooja", "") +
          "</span></a>"
        );
      }).join("") +
      "</div>"
    );
  }

  function renderPanditCard(p, linkPrefix) {
    linkPrefix = linkPrefix || "";
    var tags = p.langs
      .map(function (l) {
        return '<span class="pandit-card__tag">' + l + "</span>";
      })
      .join("");
    return (
      '<article class="pandit-card">' +
      imgPandit(p, "pandit-card__photo", 88, 88) +
      '<h3 class="pandit-card__name">' +
      p.name +
      "</h3>" +
      '<p class="pandit-card__role">' +
      p.role +
      "</p>" +
      '<ul class="pandit-card__meta">' +
      '<li><span aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span> ' +
      p.location +
      "</li>" +
      '<li><span aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2.5"/></svg></span> ' +
      p.exp +
      "</li>" +
      "</ul>" +
      '<div class="pandit-card__tags">' +
      tags +
      "</div>" +
      '<a href="' +
      panditDetailHref(p) +
      '" class="pandit-card__btn">View Profile</a>' +
      "</article>"
    );
  }

  function panditInitials(p) {
    if (p.initials) return p.initials;
    return p.name
      .replace(/\(.*\)/g, "")
      .split(/\s+/)
      .filter(Boolean)
      .slice(0, 2)
      .map(function (w) {
        return w.charAt(0);
      })
      .join("")
      .toUpperCase();
  }

  function renderPanditListingCard(p, linkPage) {
    linkPage = linkPage || "pandits";
    var tags = p.langs
      .slice(0, 4)
      .map(function (l) {
        return '<span class="pandit-listing__tag">' + l + "</span>";
      })
      .join("");
    var nameDisplay = p.name.replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (!nameDisplay) nameDisplay = p.name;
    return (
      '<a href="' +
      panditDetailHref(p) +
      '" class="pandit-listing">' +
      '<div class="pandit-listing__visual">' +
      imgPandit(p, "pandit-listing__photo", 400, 300) +
      "</div>" +
      '<div class="pandit-listing__body">' +
      '<span class="pandit-listing__verified"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg> Verified Acharya</span>' +
      "<h3 class=\"pandit-listing__name\">" +
      nameDisplay +
      "</h3>" +
      "<p class=\"pandit-listing__role\">" +
      p.role +
      "</p>" +
      '<ul class="pandit-listing__meta">' +
      '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
      p.location +
      "</li>" +
      '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>' +
      p.exp +
      " experience</li>" +
      '<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' +
      homePanditModeLabel(p.mode) +
      "</li></ul>" +
      '<div class="pandit-listing__tags">' +
      tags +
      "</div>" +
      '<span class="pandit-listing__cta">View profile <span aria-hidden="true">→</span></span>' +
      "</div></a>"
    );
  }

  function renderPanditListings(linkPage) {
    return PANDITS.map(function (p) {
      return renderPanditListingCard(p, linkPage);
    }).join("");
  }

  function getPanditCities() {
    var seen = {};
    var cities = [];
    PANDITS.forEach(function (p) {
      if (p.city && !seen[p.city]) {
        seen[p.city] = true;
        cities.push(p.city);
      }
    });
    return cities.sort();
  }

  function renderPanditRow(p) {
    var tags = p.langs
      .map(function (l) {
        return '<span class="pandit-row__tag">' + l + "</span>";
      })
      .join("");
    return (
      '<article class="pandit-row">' +
      imgPandit(p, "pandit-row__photo", 72, 72) +
      '<div class="pandit-row__body">' +
      "<h3>" +
      p.name +
      "</h3>" +
      "<p>" +
      p.role +
      "</p>" +
      '<p class="pandit-row__meta"><span aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg></span> ' +
      p.location +
      ' · <span aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2.5"/></svg></span> ' +
      p.exp +
      "</p>" +
      '<div class="pandit-row__tags">' +
      tags +
      "</div>" +
      "</div>" +
      '<a href="' +
      panditDetailHref(p) +
      '" class="pandit-row__btn">View Profile</a>' +
      "</article>"
    );
  }

  function homePanditModeLabel(mode) {
    if (mode === "Both") return "Online & In-person";
    if (mode === "Online") return "Online rituals";
    return "At your place";
  }

  /** Landing page — editorial cards (desktop); links to pandits directory */
  function renderHomePanditCard(p) {
    var tags = p.langs
      .slice(0, 4)
      .map(function (l) {
        return '<span class="home-pandit-card__tag">' + l + "</span>";
      })
      .join("");
    var nameDisplay = p.name.replace(/\s*\([^)]*\)\s*$/, "").trim();
    if (!nameDisplay) nameDisplay = p.name;
    return (
      '<a href="' +
      panditDetailHref(p) +
      '" class="home-pandit-card">' +
      '<div class="home-pandit-card__visual">' +
      imgPandit(p, "home-pandit-card__photo", 340, 255) +
      "</div>" +
      '<div class="home-pandit-card__body">' +
      '<span class="home-pandit-card__verified"><svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.25" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20 6L9 17l-5-5"/></svg> Verified Acharya</span>' +
      '<h3 class="home-pandit-card__name">' +
      nameDisplay +
      "</h3>" +
      '<p class="home-pandit-card__role">' +
      p.role +
      "</p>" +
      '<ul class="home-pandit-card__meta">' +
      '<li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 21s7-4.5 7-11a7 7 0 10-14 0c0 6.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>' +
      p.location +
      "</li>" +
      '<li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M8 2v4M16 2v4M3 10h18"/></svg>' +
      p.exp +
      " experience</li>" +
      '<li><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>' +
      homePanditModeLabel(p.mode) +
      "</li></ul>" +
      '<div class="home-pandit-card__tags">' +
      tags +
      "</div>" +
      '<span class="home-pandit-card__cta">View profile <span aria-hidden="true">→</span></span>' +
      "</div></a>"
    );
  }

  function renderHomePandits() {
    return PANDITS.map(renderHomePanditCard).join("");
  }

  function renderRecommendedPanditsSection(pandits, forMobile) {
    if (!pandits || !pandits.length) return "";
    var cards;
    var trackClass;
    if (forMobile) {
      cards = pandits
        .map(function (p) {
          return renderPanditCard(p);
        })
        .join("");
      trackClass = "puja-pandits__track m-pandits__track";
    } else {
      cards = pandits
        .map(function (p) {
          return renderHomePanditCard(p);
        })
        .join("");
      trackClass = "puja-pandits__track pandits__track--landing";
    }
    return (
      '<section class="puja-pandits" aria-labelledby="puja-pandits-title">' +
      '<div class="puja-pandits__head">' +
      '<h2 id="puja-pandits-title" class="puja-pandits__title">Top Recommended Pandits</h2>' +
      '<a href="pandits" class="btn btn--outline btn--sm">View More</a>' +
      "</div>" +
      '<div class="' +
      trackClass +
      '" tabindex="0" role="list" aria-label="Recommended pandits">' +
      cards +
      "</div></section>"
    );
  }

  function renderPandits(mode) {
    if (mode === "row") return PANDITS.map(renderPanditRow).join("");
    return PANDITS.map(function (p) {
      return renderPanditCard(p);
    }).join("");
  }

  function renderPujaServiceCard(p, forMobile) {
    forMobile = !!forMobile;
    return (
      '<a href="' +
      pujaUrl(p.slug, forMobile) +
      '" class="puja-service-card">' +
      imgPujaPhoto(p, "puja-service-card__img", 120, 120) +
      '<div class="puja-service-card__body">' +
      '<span class="puja-service-card__type">' +
      p.type +
      "</span>" +
      "<h3>" +
      p.title +
      "</h3>" +
      "<p>" +
      p.desc +
      "</p>" +
      '<div class="puja-service-card__meta"><span>' +
      p.price +
      "</span><span>" +
      p.duration +
      "</span></div>" +
      '<span class="puja-service-card__cta">View Service →</span>' +
      "</div></a>"
    );
  }

  function renderPujaServices() {
    return PUJAS.map(renderPujaServiceCard).join("");
  }

  function renderPujaListingCard(p, forMobile) {
    forMobile = !!forMobile;
    return (
      '<a href="' +
      pujaUrl(p.slug, forMobile) +
      '" class="puja-card">' +
      '<div class="puja-card__media-wrap">' +
      imgPujaPhoto(p, "puja-card__img", 320, 240) +
      '<span class="puja-card__badge">' +
      p.type +
      "</span></div>" +
      '<div class="puja-card__body">' +
      "<h3 class=\"puja-card__title\">" +
      p.title +
      "</h3>" +
      "<p class=\"puja-card__desc\">" +
      p.desc +
      "</p>" +
      '<div class="puja-card__meta">' +
      "<span class=\"puja-card__price\">" +
      p.price +
      "</span>" +
      "<span>" +
      p.duration +
      "</span></div>" +
      '<span class="puja-card__more">View details <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M9 18l6-6-6-6"/></svg></span>' +
      "</div></a>"
    );
  }

  function renderPujaListings(forMobile) {
    if (forMobile === undefined) forMobile = false;
    return PUJAS.map(function (p) {
      return renderPujaListingCard(p, forMobile);
    }).join("");
  }

  function renderBlogFeaturedCard(b, forMobile, cardVariant) {
    cardVariant = cardVariant || "default";
    var cls =
      "blog-featured-card blog-featured-card--media" +
      (cardVariant === "lead"
        ? " blog-featured-card--lead"
        : cardVariant === "compact"
          ? " blog-featured-card--compact"
          : "");
    var excerptHtml =
      b.excerpt && cardVariant === "lead"
        ? '<p class="blog-featured-card__excerpt">' + b.excerpt + "</p>"
        : "";
    var readMore =
      cardVariant === "lead"
        ? '<span class="blog-featured-card__read">Read article <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>'
        : "";
    return (
      '<a href="' +
      blogUrl(b.slug, forMobile) +
      '" class="' +
      cls +
      '">' +
      '<div class="blog-featured-card__media">' +
      img(b.img, b.title, "blog-featured-card__img", 560, 360) +
      "</div>" +
      '<div class="blog-featured-card__body">' +
      '<span class="blog-featured-card__cat">' +
      (b.categoryLabel || "Blog") +
      "</span>" +
      "<h3>" +
      b.title +
      "</h3>" +
      excerptHtml +
      '<span class="blog-featured-card__meta">' +
      b.date +
      " · " +
      b.readTime +
      (b.views ? " · " + b.views + " views" : "") +
      "</span>" +
      readMore +
      "</div></a>"
    );
  }

  function renderBlogLatestRow(b, forMobile) {
    return (
      '<a href="' +
      blogUrl(b.slug, forMobile) +
      '" class="blog-latest-row">' +
      img(b.img, "", "blog-latest-row__thumb", 120, 90) +
      '<div class="blog-latest-row__body">' +
      '<span class="blog-latest-row__cat">' +
      (b.categoryLabel || "Blog") +
      "</span>" +
      "<h3>" +
      b.title +
      "</h3>" +
      "<p>" +
      b.excerpt +
      "</p>" +
      '<span class="blog-latest-row__meta">' +
      b.date +
      " · " +
      b.readTime +
      "</span></div>" +
      '<span class="blog-latest-row__bookmark" aria-hidden="true"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z"/></svg></span></a>'
    );
  }

  function renderBlogSidebarPost(b, forMobile) {
    return (
      '<a href="' +
      blogUrl(b.slug, forMobile) +
      '" class="blog-sidebar-post">' +
      img(b.img, "", "blog-sidebar-post__thumb", 72, 72) +
      "<div><h4>" +
      b.title.substring(0, 55) +
      (b.title.length > 55 ? "…" : "") +
      "</h4>" +
      '<span class="blog-sidebar-post__cat">' +
      (b.categoryLabel || "") +
      "</span>" +
      '<span class="blog-sidebar-post__date">' +
      b.date +
      "</span></div></a>"
    );
  }

  function renderBlogCard(b, forMobile) {
    return (
      '<a href="' +
      blogUrl(b.slug, forMobile) +
      '" class="blog-card">' +
      img(b.img, "", "blog-card__img", 400, 300) +
      '<div class="blog-card__body">' +
      '<h3 class="blog-card__title">' +
      b.title +
      "</h3>" +
      '<p class="blog-card__excerpt">' +
      b.excerpt +
      "</p>" +
      "</div></a>"
    );
  }

  function renderBlogListItem(b, forMobile) {
    return (
      '<a href="' +
      blogUrl(b.slug, forMobile !== false && forMobile) +
      '" class="blog-list-item">' +
      img(b.img, "", "blog-list-item__thumb", 80, 80) +
      '<div class="blog-list-item__body">' +
      "<h3>" +
      b.title +
      "</h3>" +
      "<p>" +
      b.excerpt +
      "</p>" +
      '<span class="blog-list-item__meta">' +
      b.date +
      " · " +
      b.readTime +
      "</span>" +
      "</div></a>"
    );
  }

  function renderBlogs(mode, forMobile) {
    var list = BLOGS;
    if (mode === "home") {
      var featSet = {};
      BLOGS.forEach(function (b) {
        if (b.featured) featSet[b.slug] = true;
      });
      list = BLOGS.filter(function (b) {
        return !featSet[b.slug];
      });
      if (list.length < 3) {
        list = BLOGS.slice(0, 3);
      } else {
        list = list.slice(0, 3);
      }
    }
    if (mode === "list") {
      return list
        .map(function (b) {
          return renderBlogListItem(b, forMobile);
        })
        .join("");
    }
    return list
      .map(function (b) {
        return renderBlogCard(b, forMobile);
      })
      .join("");
  }

  function renderHomeGallery(forMobile) {
    forMobile = !!forMobile;
    return HOME_GALLERY.map(function (item, index) {
      var puja = getPuja(item.slug) || { slug: item.slug, title: item.title };
      var photo = pujaPhotoPath(puja);
      var featured = index === 0 ? " home-gallery__item--featured" : "";
      return (
        '<a href="' +
        pujaUrl(item.slug, forMobile) +
        '" class="home-gallery__item' +
        featured +
        '">' +
        '<img class="home-gallery__img media-img" src="' +
        photo +
        '" alt="' +
        item.title +
        '" width="480" height="360" loading="lazy" decoding="async" />' +
        '<span class="home-gallery__shade" aria-hidden="true"></span>' +
        '<span class="home-gallery__copy">' +
        '<span class="home-gallery__title">' +
        item.title +
        "</span>" +
        '<span class="home-gallery__caption">' +
        item.caption +
        "</span></span></a>"
      );
    }).join("");
  }

  function renderHomeStories(forMobile) {
    var featured = BLOGS.filter(function (b) {
      return b.featured;
    });
    if (!featured.length) featured = BLOGS.slice(0, 3);
    else featured = featured.slice(0, 3);
    return featured
      .map(function (b) {
        return renderBlogFeaturedCard(b, forMobile, "compact");
      })
      .join("");
  }

  function testimonialStars(rating) {
    var html = "";
    for (var i = 1; i <= 5; i++) {
      html +=
        i <= rating
          ? '<svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2l3.1 7.4H23l-6.1 4.7 2.3 7.4L12 17.3 4.8 21.5l2.3-7.4L1 9.4h7.9L12 2z"/></svg>'
          : '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 2l3.1 7.4H23l-6.1 4.7 2.3 7.4L12 17.3 4.8 21.5l2.3-7.4L1 9.4h7.9L12 2z"/></svg>';
    }
    return html;
  }

  function renderHomeTestimonials() {
    return TESTIMONIALS.map(function (t) {
      var initials = t.name
        .replace(/\([^)]*\)/g, "")
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map(function (w) {
          return w.charAt(0);
        })
        .join("")
        .toUpperCase();
      return (
        '<article class="testimonial-card">' +
        '<div class="testimonial-card__stars" aria-label="' +
        t.rating +
        ' out of 5 stars">' +
        testimonialStars(t.rating) +
        "</div>" +
        '<blockquote class="testimonial-card__quote"><p>“' +
        t.text +
        '”</p></blockquote>' +
        '<footer class="testimonial-card__footer">' +
        '<span class="testimonial-card__avatar" aria-hidden="true">' +
        initials +
        "</span>" +
        "<div>" +
        '<cite class="testimonial-card__name">' +
        t.name +
        "</cite>" +
        '<span class="testimonial-card__meta">' +
        t.city +
        " · " +
        t.puja +
        "</span></div></footer></article>"
      );
    }).join("");
  }

  function renderBlogArticleSections(sections) {
    if (!sections || !sections.length) return "";
    return sections
      .map(function (s) {
        if (s.type === "heading") {
          return (
            '<h2 class="blog-article__h2"><span class="eyebrow__flourish" aria-hidden="true"></span>' +
            s.title +
            "</h2>"
          );
        }
        if (s.type === "text") {
          return '<p class="blog-article__p">' + s.content + "</p>";
        }
        if (s.type === "highlight") {
          return (
            '<aside class="blog-article__highlight"><span class="blog-article__highlight-icon" aria-hidden="true"><svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 3l2.2 6.8L21 12l-6.8 2.2L12 21l-2.2-6.8L3 12l6.8-2.2L12 3z"/></svg></span><p>' +
            s.text +
            "</p></aside>"
          );
        }
        if (s.type === "steps") {
          return (
            '<ol class="blog-article__steps">' +
            s.items
              .map(function (item, i) {
                return '<li><span class="blog-article__step-num">' + (i + 1) + "</span>" + item + "</li>";
              })
              .join("") +
            "</ol>"
          );
        }
        if (s.type === "benefits") {
          return (
            '<ul class="blog-article__benefits">' +
            s.items
              .map(function (item) {
                return '<li><span class="blog-article__benefit-icon" aria-hidden="true">◆</span>' + item + "</li>";
              })
              .join("") +
            "</ul>"
          );
        }
        if (s.type === "quote") {
          return '<blockquote class="blog-article__quote"><p>“' + s.text + '”</p></blockquote>';
        }
        return "";
      })
      .join("");
  }

  return {
    PUJA_ICONS: PUJA_ICONS,
    PUJAS: PUJAS,
    PUJA_TYPES: PUJA_TYPES,
    PUJA_CATEGORIES: PUJA_CATEGORIES,
    PANDITS: PANDITS,
    BLOGS: BLOGS,
    BLOG_CATEGORIES: BLOG_CATEGORIES,
    HOME_GALLERY: HOME_GALLERY,
    TESTIMONIALS: TESTIMONIALS,
    blogUrl: blogUrl,
    pujaUrl: pujaUrl,
    pujaPhotoPath: pujaPhotoPath,
    imgPujaPhoto: imgPujaPhoto,
    img: img,
    resolvePanditPhoto: resolvePanditPhoto,
    imgPandit: imgPandit,
    getPuja: getPuja,
    getPujaDetail: getPujaDetail,
    getRecommendedPanditsForPuja: getRecommendedPanditsForPuja,
    getPandit: getPandit,
    getPanditDetail: getPanditDetail,
    panditMapEmbedUrl: panditMapEmbedUrl,
    panditMapLinkUrl: panditMapLinkUrl,
    panditDetailHref: panditDetailHref,
    getBlog: getBlog,
    renderPujaIcons: renderPujaIcons,
    renderPujaGrid: renderPujaGrid,
    renderPandits: renderPandits,
    renderHomePandits: renderHomePandits,
    renderRecommendedPanditsSection: renderRecommendedPanditsSection,
    renderPanditRow: renderPanditRow,
    renderPanditListings: renderPanditListings,
    renderPanditListingCard: renderPanditListingCard,
    getPanditCities: getPanditCities,
    renderPujaServices: renderPujaServices,
    renderPujaListingCard: renderPujaListingCard,
    renderPujaListings: renderPujaListings,
    renderBlogs: renderBlogs,
    renderHomeGallery: renderHomeGallery,
    renderHomeStories: renderHomeStories,
    renderHomeTestimonials: renderHomeTestimonials,
    renderBlogFeaturedCard: renderBlogFeaturedCard,
    renderBlogLatestRow: renderBlogLatestRow,
    renderBlogSidebarPost: renderBlogSidebarPost,
    renderBlogArticleSections: renderBlogArticleSections,
  };
})();
