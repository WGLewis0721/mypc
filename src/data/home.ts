/**
 * PLACEHOLDER CONTENT for the MYPC concept build.
 * Everything here is illustrative and easy to swap. Fictional people and events
 * are marked; anything that would be a real-world fact (dates, venues, contact
 * details, sponsorship terms) is left as `TODO: client to supply`.
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
  // "Connect. Collaborate. Cultivate." + city line are the MYPC brandkit tagline / statement.
  script: "The next generation of",
  title: ["Montgomery", "Leadership"],
  tagline: ["Connect.", "Collaborate.", "Cultivate."],
  lede: "A city-sponsored council building the next generation of civic leaders who drive change, strengthen community, and serve Montgomery.",
  primary: { label: "Explore MYPC", href: "#focus" },
  secondary: { label: "Upcoming Events", href: "#events" },
};

/** Illustrative figures for the concept build (brandkit stat-card style). TODO: client to supply real numbers. */
export const STATS = [
  { icon: "users", value: "100+", label: "Members" },
  { icon: "briefcase", value: "25+", label: "Projects" },
  { icon: "star", value: "10K+", label: "Community impact" },
] as const;

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
      body: "We serve on boards and commissions to represent the next generation.",
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
  // Concept build: portraits are generated placeholders; names from the MYPC brandkit where shown,
  // otherwise illustrative. TODO: client to supply the confirmed roster, bios, and real headshots.
  featured: {
    name: "Morgan Jackson",
    role: "President · 2026–2027",
    img: "/img/leadership/president.webp",
    blurb:
      "“Our charge is simple — connect this generation to the work of the city, then give them a real seat at the table. This year we’re focused on housing, workforce, and getting more members appointed to boards.”",
  },
  members: [
    { name: "Marcus Ellison", role: "Vice President", img: "/img/leadership/vicepresident.webp" },
    { name: "Danielle Carter", role: "Policy Chair", img: "/img/leadership/policy.webp" },
    { name: "Morgan Clausell", role: "Marketing Chair", img: "/img/leadership/marketing.webp" },
    { name: "Andre Whitfield", role: "Events Chair", img: "/img/leadership/events.webp" },
  ],
};

export const EVENTS = {
  title: "Upcoming Events",
  viewAll: { label: "View calendar", href: "/#events" },
  // Illustrative event concepts. Dates, times and venues: TODO client to supply.
  featured: {
    month: "MON",
    day: "00",
    kicker: "Featured event",
    title: "New Member Mixer",
    time: "TODO: time",
    venue: "TODO: venue, Montgomery, AL",
    blurb:
      "An evening for prospective members to meet the Council, hear about the year’s initiatives, and start an application.",
  },
  items: [
    {
      month: "MON",
      day: "00",
      title: "Civic Roundtable",
      time: "TODO: time",
      venue: "TODO: venue, Montgomery, AL",
    },
    {
      month: "MON",
      day: "00",
      title: "Community Service Day",
      time: "TODO: time",
      venue: "TODO: venue, Montgomery, AL",
    },
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
  title: "Follow the Movement",
  lede: "Where the Council shares its work between meetings.",
  featured: {
    tag: "Latest",
    title: "Community highlight headline (placeholder)",
    body: "TODO: a short standfirst from the client. This slot features one recent story, spotlight, or announcement with an image.",
  },
  more: [
    { tag: "Recap", title: "Event recap headline (placeholder)" },
    { tag: "Spotlight", title: "Member spotlight headline (placeholder)" },
  ],
  channels: [
    { icon: "instagram", label: "Instagram", handle: "TODO: @handle" },
    { icon: "linkedin", label: "LinkedIn", handle: "TODO: /company" },
    { icon: "facebook", label: "Facebook", handle: "TODO: /page" },
  ],
};

export const FOOTER = {
  blurb:
    "A city-sponsored council of young professionals committed to civic engagement, leadership development, and community impact.",
  quickLinks: NAV,
  contact: {
    email: "info@mypcmgm.org", // from the MYPC brandkit
    phone: "TODO: phone (client to supply)",
    address: "TODO: mailing address (client to supply)",
  },
  sponsor: {
    line: "In partnership with the City of Montgomery",
    note: "TODO: confirm relationship, wording, and logo usage rights with the City.",
  },
};
