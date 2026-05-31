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
    reset: {
      title: "Reset password",
      subtitle: "We'll help you regain access to bookings and your saved profile.",
      perks: ["Secure, one-time reset links", "Works with email or mobile login", "Support team available 10–7 IST"],
    },
    "reset-update": {
      title: "New password",
      subtitle: "Choose a strong password to protect your account.",
      perks: ["Minimum 8 characters", "Never shared with pandits", "Encrypted in transit"],
    },
    verify: {
      title: "Verify email",
      subtitle: "Confirm your address to receive booking updates and receipts.",
      perks: ["One-click verification", "Required for first booking", "Secure verification"],
    },
    oauth: {
      title: "Google sign-in",
      subtitle: "Fast access with your Google account.",
      perks: ["No password to remember", "Secure OAuth flow at launch", "Same booking history"],
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
    reset: {
      title: "Pandit password reset",
      subtitle: "Recover access to bookings, wallet, and your public profile.",
      perks: ["Secure reset links", "Protects payout details", "Never shared"],
    },
    "reset-update": {
      title: "Set pandit password",
      subtitle: "Keep your earnings and profile secure.",
      perks: ["Strong password required", "Not shown to devotees", "Encrypted storage"],
    },
    verify: {
      title: "Verify pandit email",
      subtitle: "Required before accepting paid bookings.",
      perks: ["Builds devotee trust", "Payout notifications", "Instant verification"],
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
