/**
 * Copy & field definitions for login / register (customer & pandit).
 */
window.DivineCenterAuthContent = {
  customer: {
    login: {
      title: "Welcome back",
      subtitle: "Sign in to book pujas, track bookings, and manage your profile.",
      perks: [
        "Book verified Acharyas at home",
        "Transparent pricing — no hidden fees",
        "Muhurat guidance & ritual reminders",
      ],
    },
    register: {
      title: "Create your account",
      subtitle: "Join as a devotee to book authentic Vedic rituals with verified pandits.",
      perks: [
        "Save addresses & family details",
        "Reorder favorite pujas in one tap",
        "Secure payments & booking history",
      ],
    },
  },
  pandit: {
    login: {
      title: "Pandit login",
      subtitle: "Access your dashboard — manage bookings, availability, and earnings.",
      perks: [
        "Receive qualified devotee leads",
        "Set your services & pricing",
        "Verification badge on your profile",
      ],
    },
    register: {
      title: "Register as a Pandit",
      subtitle: "Join Divine Center and reach devotees seeking authentic Vedic rituals.",
      perks: [
        "Background verification & trust badge",
        "Doorstep & temple ceremony bookings",
        "Dedicated support: Mon–Sat, 10 AM–7 PM IST",
      ],
    },
  },
  fields: {
    customerRegister: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "Your full name" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "phone", label: "Mobile number", type: "tel", required: true, placeholder: "+91 98765 43210" },
      { name: "city", label: "City", type: "text", required: true, placeholder: "Hyderabad" },
      { name: "password", label: "Password", type: "password", required: true, placeholder: "Min. 8 characters", minlength: 8 },
      { name: "confirmPassword", label: "Confirm password", type: "password", required: true, placeholder: "Re-enter password", minlength: 8 },
    ],
    panditRegister: [
      { name: "fullName", label: "Full name", type: "text", required: true, placeholder: "As on certificates" },
      { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com" },
      { name: "phone", label: "Mobile number", type: "tel", required: true, placeholder: "+91 98765 43210" },
      { name: "city", label: "Primary city", type: "text", required: true, placeholder: "Service city" },
      { name: "experience", label: "Years of experience", type: "number", required: true, placeholder: "10", min: 1, max: 60 },
      {
        name: "languages",
        label: "Languages",
        type: "text",
        required: true,
        placeholder: "Telugu, Sanskrit, Hindi",
      },
      {
        name: "specializations",
        label: "Puja specializations",
        type: "text",
        required: true,
        placeholder: "Griha Pravesh, Satyanarayana, Vivah…",
      },
      { name: "password", label: "Password", type: "password", required: true, placeholder: "Min. 8 characters", minlength: 8 },
      { name: "confirmPassword", label: "Confirm password", type: "password", required: true, placeholder: "Re-enter password", minlength: 8 },
    ],
  },
};
