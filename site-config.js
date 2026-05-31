/**
 * Divine Center — routes, contact, navigation (single source of truth)
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
    { id: "pandits", label: "Pandits", href: "pandits" },
    { id: "pujas", label: "Pujas", href: "pujas" },
    { id: "blogs", label: "Blogs", href: "blogs" },
    { id: "contact", label: "Contact Us", href: "contact" },
  ],
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
    mobileHost: "divine-center2.ruthwikreddy.live",
  },
  fonts:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:ital,wght@0,500;0,600;0,700;1,500&display=swap",
  fontsMobile:
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Lora:wght@500;600;700&display=swap",
};
