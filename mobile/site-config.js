/**
 * Divine Center — mobile app config (standalone deploy)
 */
window.DivineCenterConfig = {
  demoMode: true,
  demo: {
    toast: "Done",
  },
  brand: "Divine Center",
  tagline: "Connecting Faith, Delivering Grace",
  contact: {
    email: "support@divinecenter.in",
    phone: "+919154900375",
    phoneDisplay: "+91 91549 00375",
    address: "Injapur, Abdullapurmet, Rangareddy District, Telangana 500070, India",
    addressShort: "Injapur, Telangana 500070",
    hours: "10:00 AM – 7:00 PM IST (Mon – Sat)",
  },
  social: {
    facebook: "https://www.facebook.com/divinecenter.in",
    instagram: "https://www.instagram.com/divinecenter_official/",
    youtube: "https://www.youtube.com/@divinecenter_official",
    whatsapp: "https://wa.me/919154900375",
  },
  nav: [
    { id: "home", label: "Home", href: "index" },
    { id: "bookings", label: "My Bookings", href: "bookings" },
    { id: "pujas", label: "Book Puja", href: "pujas" },
    { id: "pandits", label: "Pandits", href: "pandits" },
    { id: "blogs", label: "Blogs", href: "blogs" },
    { id: "contact", label: "Contact Us", href: "contact" },
    { id: "account", label: "Profile", href: "account" },
  ],
  mobileNav: [
    { id: "home", label: "Home", href: "index" },
    { id: "bookings", label: "My Bookings", href: "bookings" },
    { id: "pujas", label: "Book Puja", href: "pujas" },
    { id: "pandits", label: "Pandits", href: "pandits" },
    { id: "blogs", label: "Blogs", href: "blogs" },
    { id: "contact", label: "Contact Us", href: "contact" },
    { id: "account", label: "Profile", href: "account" },
  ],
  mobileTabs: [
    { id: "pujas", label: "Pujas", href: "pujas" },
    { id: "pandits", label: "Pandits", href: "pandits" },
    { id: "book", label: "Book", href: "pujas", center: true },
    { id: "bookings", label: "Bookings", href: "bookings" },
    { id: "profile", label: "Profile", href: "account" },
  ],
  mobileTabActiveMap: {
    home: "book",
    pujas: "pujas",
    pandits: "pandits",
    book: "book",
    bookings: "bookings",
    account: "profile",
    blogs: "",
    about: "",
    contact: "",
    wallet: "",
  },
  auth: {
    login: "login",
    registerCustomer: "register",
    registerPandit: "register-pandit",
    liveLogin: "https://divinecenter.in/login",
    liveRegister: "https://divinecenter.in/register",
    livePanditRegister: "https://divinecenter.in/register",
  },
  domains: {
    desktopHost: "divine-center.ruthwikreddy.live",
    mobileHost: "",
  },
  fontsMobile:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@500;600;700&display=swap",
};
