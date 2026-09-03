/**
 * Site content for the MYPC concept demonstration.
 * Officer names/photos are concept stand-ins for the build; the Policy / Projects /
 * Appointments / Community service areas and the "Connect. Collaborate. Cultivate."
 * messaging are the approved brand direction.
 */

export const NAV = [
  { key: "home", label: "Home", href: "/" },
  { key: "council", label: "Council", href: "/council" },
  { key: "events", label: "Events", href: "/events" },
  { key: "news", label: "News", href: "/blog" },
  { key: "join", label: "Join", href: "/join" },
  { key: "about", label: "About", href: "/about" },
] as const;

export const HERO = {
  script: "The next generation of",
  title: ["Montgomery", "Leadership"],
  tagline: ["Connect.", "Collaborate.", "Cultivate."],
  lede: "A council of young professionals building the next generation of civic leaders who drive change, strengthen community, and serve Montgomery.",
  primary: { label: "Explore MYPC", href: "#focus" },
  secondary: { label: "Upcoming Events", href: "#events" },
};

export const FOCUS = {
  title: "Four ways we serve the city",
  lede: "The Council turns civic energy into policy, projects, and people ready to lead.",
  items: [
    {
      icon: "building",
      accent: "navy",
      title: "Policy",
      body: "We engage the civic issues shaping a stronger, more equitable Montgomery.",
    },
    {
      icon: "users",
      accent: "red",
      title: "Projects",
      body: "We lead and support projects that create lasting community impact.",
    },
    {
      icon: "briefcase",
      accent: "navy",
      title: "Appointments",
      body: "We prepare members for appointed civic service on boards and commissions.",
    },
    {
      icon: "heart",
      accent: "navy",
      title: "Community",
      body: "We celebrate, connect, and give back to a city on the move.",
    },
  ],
};

export const LEADERSHIP = {
  eyebrow: "Featured Leadership",
  title: "Meet the Council",
  viewAll: { label: "View all Council", href: "/council" },
  featured: {
    name: "Morgan Jackson",
    role: "President · 2026–2027",
    img: "/img/leadership/president.webp",
    blurb:
      "The President chairs the Council, sets the year's priorities with the officers, and keeps the committees moving on housing, workforce, and appointed service.",
  },
  members: [
    { name: "Marcus Ellison", role: "Vice President", img: "/img/leadership/vicepresident.webp" },
    { name: "Danielle Carter", role: "Policy Chair", img: "/img/leadership/policy.webp" },
    { name: "Morgan Clausell", role: "Marketing Chair", img: "/img/leadership/marketing.webp" },
    { name: "Andre Whitfield", role: "Events Chair", img: "/img/leadership/events.webp" },
  ],
};

export const MEMBERSHIP = {
  title: "How to Join",
  lede: "Membership is open to young professionals who live or work in Montgomery and are ready to lead, serve, and grow.",
  steps: [
    { n: 1, title: "Check Eligibility", body: "Review the requirements and confirm you qualify." },
    { n: 2, title: "Apply Online", body: "Submit a short application and background information." },
    { n: 3, title: "Interview", body: "Meet with the Membership Committee." },
    { n: 4, title: "Get Connected", body: "Join the cohort and start serving with MYPC." },
  ],
  cta: { label: "Apply to Join", href: "/join" },
};

export const SOCIAL = {
  eyebrow: "In the community",
  headline: "Young professionals, invested in Montgomery",
  body: "MYPC members give their time to civic issues, neighborhood projects, and appointed service across the city — and the Council is always looking for the next group ready to step up.",
  cta: { label: "Apply to Join", href: "/join" },
  secondary: { label: "See upcoming events", href: "/events" },
};

export const FOOTER = {
  blurb:
    "A council of young professionals committed to civic engagement, leadership development, and community impact.",
  quickLinks: NAV,
  contact: {
    email: "info@mypcmgm.org",
  },
};
