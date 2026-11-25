export const siteConfig = {
  companyName: "Elifsi Technologies Private Limited",
  legalName: "Elifsi Technologies Private Limited",
  shortName: "Elifsi",
  headquarters: "Janakpur, Nepal",
  country: "Nepal",
  brandHeadline: "Engineering Modern Software Products and Intelligent Platforms",
  brandDescription:
    "Elifsi Technologies Private Limited is a software and technology company based in Janakpur, Nepal, creating, owning, and operating modern digital products, intelligent systems, and scalable technology platforms.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://www.elifsi.com",
  contactEmail: "contact@elifsi.com",
  careersEmail: "careers@elifsi.com",
  socials: [
    {
      id: "linkedin",
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/elifsi",
    },
    {
      id: "x",
      label: "X (Twitter)",
      href: "https://x.com/elifsi_tech",
    },
    {
      id: "instagram",
      label: "Instagram",
      href: "https://www.instagram.com/elifsitechnologies/",
    },
    {
      id: "facebook",
      label: "Facebook",
      href: "https://www.facebook.com/profile.php?id=61594541404980",
    },
    {
      id: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/elifsi",
    },
  ] as const,
  colors: {
    primary: "#F51F3D",
    primaryDark: "#D91432",
    text: "#111827",
    secondaryText: "#667085",
    background: "#FFFFFF",
    surface: "#F7F8FA",
    brandTint: "#FFF1F3",
    border: "#E5E7EB",
  },
  flagship: {
    name: "Evrry",
    tagline: "The AI-First Everyday Consumer Super App",
    assistant: "Eli",
    description:
      "Evrry is the flagship consumer super app created by Elifsi Technologies. Powered by Eli, an intelligent cross-domain AI concierge, Evrry unifies everyday services—food, grocery, mobility, stays, rentals, and payments—into a single seamless workflow.",
    url: "/products/evrry",
  },
  nav: [
    { label: "Products", href: "/products", sub: [{ label: "Overview", href: "/products" }, { label: "Evrry (Flagship)", href: "/products/evrry" }] },
    { label: "Company", href: "/company" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
  ],
  footer: {
    company: [
      { label: "About Elifsi", href: "/company" },
      { label: "Engineering & Architecture", href: "/company#philosophy" },
      { label: "Careers", href: "/careers" },
      { label: "Contact", href: "/contact" },
    ],
    products: [
      { label: "Product Portfolio", href: "/products" },
      { label: "Evrry Super App", href: "/products/evrry" },
      { label: "Eli AI Concierge", href: "/products/evrry#eli" },
      { label: "Platform Ecosystem", href: "/products#ecosystem" },
    ],
    legal: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Responsible Disclosure", href: "/contact?topic=security" },
    ],
  },
};
