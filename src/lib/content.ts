/**
 * Site content. Everything a visitor reads lives here so copy, links and
 * metadata can be edited without touching components.
 *
 * Values marked PLACEHOLDER are stand-ins — replace them before launch.
 */

export const site = {
  name: "Fachru",
  role: "Creative Developer",
  // PLACEHOLDER: the production domain. Used for canonical + Open Graph URLs.
  url: "https://fachru.dev",
  title: "Fachru — Creative Developer",
  description:
    "Fachru is a creative developer who designs and builds interactive stories, motion-rich interfaces and design systems for the web.",
  // PLACEHOLDER
  email: "hello@fachru.dev",
  // PLACEHOLDER
  location: "Indonesia, working with teams worldwide",
  // PLACEHOLDER
  availability: "Taking on new projects from January 2027",
  copyrightYear: 2026,
  locale: "en_US",
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "project", label: "Project" },
  { id: "notes", label: "Notes" },
  { id: "contact", label: "Contact" },
] as const;

export type SectionId = (typeof navItems)[number]["id"];

// PLACEHOLDER: update handles and URLs.
export const socials = [
  { label: "GitHub", handle: "@FchDxCode", href: "https://github.com/FchDxCode" },
  { label: "LinkedIn", handle: "in/fachru", href: "https://www.linkedin.com/in/fachru" },
  { label: "Dribbble", handle: "@fachru", href: "https://dribbble.com/fachru" },
  { label: "Read.cv", handle: "fachru", href: "https://read.cv/fachru" },
] as const;

export const hero = {
  headline: "Interfaces that feel grown, not assembled.",
  intro:
    "I’m Fachru, a creative developer. I design and build web experiences where the motion, the type and the code are considered together, from the first sketch to the production deploy.",
  facts: [
    { label: "Based in", value: site.location },
    { label: "Focus", value: "Interactive storytelling, motion and design systems" },
    // PLACEHOLDER
    { label: "Currently", value: "Prototyping tactile interfaces in CSS 3D" },
  ],
};

export const about = {
  heading: "I work where design decisions meet the browser.",
  paragraphs: [
    "Most of my projects start as a question: how should this feel when someone actually uses it? I prototype in code early, because timing, weight and responsiveness are easier to judge on a screen than in a static frame.",
    "I’ve worked with studios, product teams and independent publishers, usually as the person who turns a strong visual direction into something fast, accessible and maintainable.",
  ],
  capabilities: [
    { title: "Interactive storytelling", detail: "Scroll-driven narratives, data stories and editorial microsites." },
    { title: "Motion & interaction", detail: "Interaction models, transitions and micro-feedback that explain change." },
    { title: "Design systems", detail: "Token architecture, component libraries and documentation teams use." },
    { title: "Frontend engineering", detail: "React, Next.js and TypeScript with a bias for performance." },
  ],
  toolkit: [
    "TypeScript",
    "React",
    "Next.js",
    "Motion",
    "Tailwind CSS",
    "Three.js",
    "GLSL",
    "Figma",
    "Storybook",
    "Playwright",
  ],
  // PLACEHOLDER: replace with real roles.
  timeline: [
    { period: "2024–now", role: "Independent creative developer", place: "Studio and product clients" },
    { period: "2021–2024", role: "Senior frontend engineer", place: "Product design studio" },
    { period: "2019–2021", role: "Interactive developer", place: "Digital publishing team" },
  ],
  offScreen:
    "Away from the keyboard I keep a balcony garden that is far too small for the chili plants in it, and I sketch typefaces I will probably never finish.",
};

export type CoverVariant = "tide" | "kit" | "rooms" | "type";

export type Project = {
  slug: string;
  title: string;
  year: string;
  role: string;
  summary: string;
  tags: string[];
  cover: CoverVariant;
  coverLabel: string;
  details: { label: string; text: string }[];
  /** Optional links. Cards render them only when provided. */
  links?: { label: string; href: string }[];
};

// PLACEHOLDER: sample projects that show the layout — swap for real work.
export const projects: Project[] = [
  {
    slug: "tidepool",
    title: "Tidepool",
    year: "2026",
    role: "Design & development",
    summary:
      "An interactive data story that lets readers scrub through forty years of coastal water levels and see their own street change.",
    tags: ["Data story", "Canvas", "Next.js"],
    cover: "tide",
    coverLabel: "Abstract contour rings rising like a tide line",
    details: [
      { label: "Challenge", text: "Make decades of tide-gauge data legible to readers who have never seen a chart like it." },
      { label: "Approach", text: "A single scrubbable timeline drives the map, the narration and the sound design together." },
      { label: "Outcome", text: "Average time on page above six minutes, with the story cited in two regional council briefings." },
    ],
  },
  {
    slug: "greenhouse-kit",
    title: "Greenhouse UI kit",
    year: "2025",
    role: "Design system lead",
    summary:
      "A token-based component library that unified four internal tools for a nursery and garden-supply company.",
    tags: ["Design system", "React", "Storybook"],
    cover: "kit",
    coverLabel: "Stacked interface components: a toggle, a button and a card",
    details: [
      { label: "Challenge", text: "Four tools, four visual languages and no shared components between the teams building them." },
      { label: "Approach", text: "Started from tokens and accessibility rules, then grew components from real screens rather than a wishlist." },
      { label: "Outcome", text: "New screens now ship in days instead of weeks, and UI bugs reported per release fell by about half." },
    ],
  },
  {
    slug: "small-rooms",
    title: "Atlas of Small Rooms",
    year: "2025",
    role: "Creative development",
    summary:
      "A scroll-driven editorial piece about compact homes, built with layered illustration and view transitions.",
    tags: ["Editorial", "Scroll", "View transitions"],
    cover: "rooms",
    coverLabel: "Nested arched doorways receding into depth",
    details: [
      { label: "Challenge", text: "Keep a heavily illustrated story smooth on mid-range phones." },
      { label: "Approach", text: "Composited CSS layers instead of video, with each chapter loading only when it nears the viewport." },
      { label: "Outcome", text: "Under one second to interactive on a throttled 4G profile, and a feature in a design newsletter." },
    ],
  },
  {
    slug: "loam",
    title: "Loam",
    year: "2024",
    role: "Concept & build",
    summary:
      "A generative type playground where letterforms grow, erode and settle based on pointer movement and sound.",
    tags: ["Generative", "WebGL", "Typography"],
    cover: "type",
    coverLabel: "Large organic letterforms with soft blob shapes",
    details: [
      { label: "Challenge", text: "Make a shader-heavy experiment feel calm and approachable rather than technical." },
      { label: "Approach", text: "Few controls, slow easing and a clear way to save and share a composition." },
      { label: "Outcome", text: "Used by students in two typography courses as a warm-up exercise." },
    ],
  },
];

export type Note = {
  slug: string;
  kind: "Essay" | "Today I learned" | "Field note" | "Quote" | "List";
  title: string;
  date: string; // ISO date
  readingTime?: string;
  body: string | string[];
  /** Optional link to the full note. Rendered only when present. */
  href?: string;
};

// PLACEHOLDER: sample notes.
export const notes: Note[] = [
  {
    slug: "motion-explains-change",
    kind: "Essay",
    title: "Motion should explain what changed",
    date: "2026-09-18",
    readingTime: "6 min read",
    body:
      "Animation earns its place when it answers a question the person just asked: where did that panel come from, what did my click do, what is loading. Everything else is decoration, and decoration has a cost: attention, battery and patience. I now start every motion pass by listing the state changes on a screen, and only animate the ones that could confuse someone.",
  },
  {
    slug: "color-mix-tokens",
    kind: "Today I learned",
    title: "color-mix() makes derived tokens painless",
    date: "2026-08-30",
    body:
      "Instead of maintaining hover and subtle variants for every colour in both themes, I define the base palette once and derive the rest with color-mix() in oklab. Dark mode comes almost for free.",
  },
  {
    slug: "pace-of-scroll",
    kind: "Quote",
    title: "On pacing",
    date: "2026-08-12",
    body: "A scroll story is paced by the reader, not by the timeline. Design the pauses first.",
  },
  {
    slug: "prototype-checklist",
    kind: "List",
    title: "What I check before a prototype leaves my machine",
    date: "2026-07-27",
    body: [
      "Does it work with a keyboard alone?",
      "What happens with reduced motion turned on?",
      "Is it still readable at 200% zoom?",
      "Does it hold up on a mid-range phone?",
      "Can someone else run it in one command?",
    ],
  },
  {
    slug: "css-3d-is-enough",
    kind: "Field note",
    title: "CSS 3D is often enough",
    date: "2026-06-21",
    readingTime: "4 min read",
    body:
      "Before reaching for a WebGL scene, I try stacking a few transformed layers with preserve-3d. For soft, sculptural shapes it is lighter, themeable with plain CSS variables and accessible by default because it is just markup.",
  },
  {
    slug: "naming-tokens",
    kind: "Essay",
    title: "Name tokens after intent, not appearance",
    date: "2026-05-09",
    readingTime: "5 min read",
    body:
      "A token called green-500 breaks the day the brand changes. A token called surface or text-secondary keeps working through every rebrand and every theme. The hardest part is agreeing on the intents with the team. The CSS is the easy part.",
  },
  {
    slug: "font-loading",
    kind: "Today I learned",
    title: "Fallback metrics stop layout shift",
    date: "2026-04-02",
    body:
      "Matching a fallback font’s size and ascent to the web font removes nearly all of the jump when it loads. Next.js font loading does this automatically, which is one less thing to hand-tune.",
  },
];
