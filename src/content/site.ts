export type Diagram = {
  title: string;
  steps: string[];
  caption: string;
};

export type Section = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type CaseLink = {
  label: string;
  href: string;
};

export type Shot = {
  src: string;
  alt: string;
  caption: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  domain: string;
  lede: string;
  role: string;
  dates: string;
  status: string;
  kind: string;
  tags: string[];
  links: CaseLink[];
  summary: string;
  points: string[];
  placement: "flagship" | "featured" | "more";
  diagram: Diagram;
  sections: Section[];
  cover?: Shot;
  frames?: Shot[];
};

export const person = {
  name: "Pariola Ololade",
  handle: "LOPAM",
  role: "Software Engineer",
  location: "Lagos, Nigeria",
  email: "lopampariola@gmail.com",
  github: "https://github.com/loppam",
  linkedin: "https://www.linkedin.com/in/thatboylopam/",
  x: "https://x.com/Lopam_",
  resume: "/OloladePariola.pdf",
};

const nda =
  "More of the operational detail sits under NDA. Customer records, internal numbers, and authenticated screens stay off this page.";

export const cases: CaseStudy[] = [
  {
    slug: "noctix",
    title: "Noctix",
    domain: "Event ticketing and operations",
    lede: "The sale is only finished when the person is through the door, including on a bad network.",
    role: "Software Engineer",
    dates: "Nov 2025–Present",
    status: "Production product",
    kind: "Product engineering",
    tags: ["React", "TypeScript", "Nomba"],
    links: [{ label: "Public site", href: "https://getnoctix.com" }],
    cover: {
      src: "/work/sites/noctix.jpg",
      alt: "Noctix homepage: Ticketing that feels alive before the doors open.",
      caption:
        "getnoctix.com is the public site. The attendee app, the organizer desk, and the door tool are behind login.",
    },
    summary:
      "Noctix sells tickets and then has to honor them at the door. I build the attendee, organizer, and admin interfaces around that path: find an event, pay with Nomba, hold a QR code, and still get scanned if the venue network drops. Firebase is only sign-in and push. The records live on our own backend.",
    points: [
      "A failed scan is stored on the device and sent later, with backoff, and it stops if the signed-in account changes mid-sync.",
      "PostgreSQL holds the durable records. Redis holds the short-lived coordination.",
    ],
    placement: "flagship",
    diagram: {
      title: "From checkout to the door",
      steps: [
        "Someone picks an event and pays",
        "Nomba confirms the money",
        "Door staff scan the QR",
        "A dead network keeps the scan and syncs it later",
      ],
      caption:
        "The path the web client and API have to carry. This is a diagram, not a product screenshot.",
    },
    sections: [
      {
        heading: "What the visitor is actually deciding",
        paragraphs: [
          "A ticketing site converts when a person believes the ticket will work tonight, not when they admire the poster. The public site introduces the event. The work that matters is the stretch after that: payment state that does not lie, a ticket the attendee can find again, and a door scan that still counts if the venue Wi-Fi folds.",
          "I work on those web surfaces. Attendees, organizers, vendors, door staff, and platform operators do not share one screen, and they should not. Other people own pieces of the backend, the infrastructure, and the native shell. My title on the work is Software Engineer.",
        ],
      },
      {
        heading: "The door",
        paragraphs: [
          "Check-in prepares an offline session, caches the event, and keeps a ticket snapshot on the device. If the scan cannot reach the server, the client stores it as pending and retries with backoff once the network returns. The payload is marked as an offline sync, so the server can tell a live scan from one that arrived late.",
          "If the signed-in account changes while those scans are still queued, that run stops. A scan from one door account should never land on another.",
        ],
      },
      {
        heading: "Money and identity",
        paragraphs: [
          "Nomba is the payment authority. The purchase screen has to show pending, failed, and completed without inventing a second ledger in the browser. Firebase handles sign-in and push. Tickets, permissions, and money records stay in the custom backend: PostgreSQL for what must survive, Redis for what is only coordination, object storage for media. Web, API, and worker ship as separate services.",
        ],
      },
      {
        heading: "What I can show",
        paragraphs: [
          "getnoctix.com is the public face. It is not the organizer desk or the door tool. " +
            nda,
        ],
      },
    ],
  },
  {
    slug: "buffer",
    title: "Buffer",
    domain: "Multi-location scheduling",
    lede: "The homepage sells a booking. The product is the desk that keeps that booking from colliding with three other locations.",
    role: "Frontend Engineer",
    dates: "Feb 2026–Sep 2026",
    status: "Employment",
    kind: "Employment",
    tags: ["React", "TypeScript", "Turborepo"],
    links: [{ label: "Marketing site", href: "https://buffer.so/" }],
    cover: {
      src: "/work/sites/buffer.jpg",
      alt: "Buffer marketing page: Scheduling Made Simple for Multi-Location Businesses, with a sample dashboard below the headline.",
      caption:
        "buffer.so is the public marketing site. The scheduling desk I worked on is behind login.",
    },
    summary:
      "Buffer is scheduling for businesses that run more than one location: pharmacies, clinics, service teams. A visitor on the marketing site is choosing a slot. I worked on the authenticated product around that choice, and on the monorepo that keeps the public site and the dashboard from drifting apart.",
    points: [
      "Dashboard behavior sits in reducer-driven hooks, so the screen state is explicit.",
      "The marketing site and the dashboard share frontend utilities in a Turbo monorepo.",
    ],
    placement: "featured",
    diagram: {
      title: "Two surfaces, one frontend",
      steps: [
        "Marketing site at buffer.so",
        "Shared utilities in the Turbo monorepo",
        "Scheduling dashboard behind login",
      ],
      caption:
        "How the frontend is split. The image above is the public site, not the desk.",
    },
    sections: [
      {
        heading: "The booking has to survive the building",
        paragraphs: [
          "buffer.so tells a multi-location business that appointments, virtual visits, and round-robin assignment can live in one place. That page is a pitch. The conversion that matters happens after someone is inside the product: a patient finds a slot that is actually free, a manager sees today's book across locations, and a reminder goes out before the no-show.",
          "I was the primary frontend engineer on those scheduling and admin workflows, beside a backend developer.",
        ],
      },
      {
        heading: "State you can point at",
        paragraphs: [
          "The dashboard keeps its behavior in reducer-driven custom hooks. When a booking changes status, the screen is not guessing from five scattered pieces of state. The public site and that dashboard share a Turbo monorepo, so a utility fixed for one surface does not have to be rewritten for the other.",
        ],
      },
      {
        heading: "What I can show",
        paragraphs: [
          "The screenshot on this page is the marketing site. It includes a sample of the dashboard, which is not a capture of a live account. " +
            nda,
        ],
      },
    ],
  },
  {
    slug: "jexpay",
    title: "JexPay",
    domain: "Crypto and gift cards into naira",
    lede: "A person arrives with USDT or a gift card and leaves with naira in a bank, airtime, or data. The site has to make that trade feel specific.",
    role: "Frontend Developer",
    dates: "Aug 2025–Feb 2026",
    status: "Shipped frontend",
    kind: "Frontend engagement",
    tags: ["React", "TypeScript", "Turborepo", "Vite"],
    links: [
      { label: "Marketing site", href: "https://jexpay.io/" },
      { label: "Design case study", href: "https://xyzdezin.figma.site/jexpay" },
    ],
    cover: {
      src: "/work/jexpay/landing.jpg",
      alt: "JexPay homepage: Turn digital assets into naira fast, with a USDT to naira converter.",
      caption:
        "jexpay.io is the public marketing site. The rate on that page belongs to the product, not to this write-up.",
    },
    frames: [
      {
        src: "/work/jexpay/admin-1.png",
        alt: "JexPay admin design frame showing a customer list filtered by KYC level.",
        caption: "Customers, filtered by KYC level. Design frame, placeholder names.",
      },
      {
        src: "/work/jexpay/admin-2.png",
        alt: "JexPay admin design frame for composing a push notification.",
        caption: "Broadcast. Staff write a push and choose who receives it.",
      },
      {
        src: "/work/jexpay/admin-3.png",
        alt: "JexPay admin design frame for gift card brands, countries, and naira rates.",
        caption: "Gift cards. A brand, a country, and the naira rate staff will honor.",
      },
      {
        src: "/work/jexpay/admin-4.png",
        alt: "JexPay admin design frame reviewing a completed gift card order.",
        caption: "An order, with the rate that was applied and the payout.",
      },
      {
        src: "/work/jexpay/admin-5.png",
        alt: "JexPay admin design frame for staff roles.",
        caption: "Staff roles. Super admin, operations, developer, customer care.",
      },
      {
        src: "/work/jexpay/admin-6.png",
        alt: "JexPay admin design frame for deposit, gift card, and withdrawal fees.",
        caption: "Fees on crypto deposits, gift cards, and withdrawals.",
      },
    ],
    summary:
      "JexPay turns crypto and gift cards into naira: sell USDT, sell a card, withdraw to a bank, or buy airtime and data. I built the marketing site and the staff admin. I did not build the mobile app. The frames below are the designer's admin screens, which the dashboard follows.",
    points: [
      "Marketing and admin applications cover transaction review, user and KYC management, and treasury.",
      "Live crypto and gift-card estimates call public APIs, with debounced requests and stale responses dropped.",
      "Shared typed API clients and response mappers live in the Turborepo, with permission-aware staff navigation.",
    ],
    placement: "featured",
    diagram: {
      title: "What a conversion touches",
      steps: [
        "Visitor sees a naira figure for USDT or a gift card",
        "They verify and sell",
        "Staff price the card, clear KYC, and release the payout",
        "Mobile app, outside this engagement",
      ],
      caption:
        "The marketing site is public. The admin frames are design references from Olopade John, with placeholder rows, not a live customer export.",
    },
    sections: [
      {
        heading: "Crypto in, naira out",
        paragraphs: [
          "JexPay, from Jex Digital Technologies LTD, is a crypto-to-naira desk with gift cards beside it. The public promise on jexpay.io is direct: turn a digital asset into naira, then withdraw to a bank or spend it on airtime and data. The homepage has to show a number a person can believe, asset against naira, before they create an account.",
          "I implemented that marketing site and the administration dashboard. Visitors get a product page. Staff get a desk: customers, KYC, transactions, gift-card rates, orders, broadcasts, roles, and fees. The two apps live in a Turborepo as apps/web and apps/admin, sharing @jexpay/ui and @jexpay/api, and the README deploys them as two Vercel projects behind a same-origin API proxy.",
        ],
      },
      {
        heading: "The desk behind the rate",
        paragraphs: [
          "A gift-card sale is a conversion with a human in the middle. Someone submits a card. Staff have to see the brand, the region, the rate that was quoted, and whether the order is still pending. The admin is that queue. User management filters by KYC level. A BVN or NIN override is a privileged action, and the profile screen checks an update-KYC permission before it submits.",
          "Fees are their own screen: a percentage on a stablecoin deposit, a percentage on a gift card, a flat amount on a withdrawal. If those numbers are wrong, the rate on the homepage is fiction. The slider is the design for that desk.",
        ],
      },
      {
        heading: "Design credit",
        paragraphs: [
          "Olopade John designed the product. The public case study at xyzdezin.figma.site/jexpay is the source of the admin frames on this page. Names, emails, balances, and card codes in those frames are placeholders. They are not JexPay customers and not a live export.",
          "That case study also describes a mobile app. I did not build it. A separate mobile project exists, and it stays out of this write-up.",
        ],
      },
      {
        heading: "What I can show",
        paragraphs: [
          "jexpay.io is the marketing site. The admin you can drag through here is the design, published so the shape of the desk is visible. The production admin is a staff tool. " +
            nda,
        ],
      },
    ],
  },
  {
    slug: "noc",
    title: "NOC",
    domain: "Solana launchpad",
    lede: "A token launch is a form until the quote pair, the fee, and the holder list are real.",
    role: "Engineering",
    dates: "In progress",
    status: "Public product",
    kind: "Technical project",
    tags: ["TypeScript", "Solana", "Meteora"],
    links: [{ label: "Public site", href: "https://noclaunch.fun/" }],
    cover: {
      src: "/work/sites/noc.jpg",
      alt: "NOC homepage: The night is open. Launch a token with a stock or crypto pair.",
      caption:
        "noclaunch.fun is the public launchpad. Markets, launch, and verify are on the site. Operational keys are not.",
    },
    summary:
      "NOC is a Solana launchpad on Meteora's dynamic bonding curve. The public site lets someone launch a token against a stock or crypto pair and browse markets. My engineering on it is the fee rules, which quote pairs can be admitted, a holder index for reward accounting, and a review queue for token impersonation.",
    points: [
      "Fee and quote-pair checks run against Meteora DBC, including xStock-style quotes.",
      "Vampless means token identity. It does not lock liquidity or defend a price.",
    ],
    placement: "featured",
    diagram: {
      title: "Launch, then the book",
      steps: [
        "A creator picks a stock or crypto quote",
        "Fee rules and the quote pair have to pass",
        "The market shows up on the public site",
        "Holder accounting is a separate job from the landing page",
      ],
      caption:
        "The public site is the storefront. The checks behind a launch are the engineering.",
    },
    sections: [
      {
        heading: "The night is open",
        paragraphs: [
          "noclaunch.fun opens with a simple offer: launch a token with a stock or crypto pair, then explore the markets. That is the conversion. A creator should be able to see the pair, the fee, and the market they are about to join before they sign anything.",
          "Under that page, the product uses Meteora's dynamic bonding curve and fee-sharing programs. I have worked on the fee rules and on which quote pairs can be admitted, including xStock-style configuration. A market that appears on the homepage still depends on those checks being right.",
        ],
      },
      {
        heading: "Holders, and what Vampless means",
        paragraphs: [
          "Rewards need a trustworthy set of holders. The work there is an index: qualify accounts, read balances, and be able to replay the index when it drifts. Reading who holds a token is not the same sentence as paying them.",
          "The API has a vampless review queue. In this product the word means token identity and impersonation. A copied name or a lookalike mint should be reviewable. Vampless does not lock liquidity, and it does not promise a price.",
        ],
      },
      {
        heading: "What I can show",
        paragraphs: [
          "The screenshot is the public site, including the mainnet badge it shows in the corner. Signer keys, admin trades, and the internal accounting stay unpublished. " +
            nda,
        ],
      },
    ],
  },
  {
    slug: "cope",
    title: "COPE",
    domain: "Social trading",
    lede: "Follow a wallet, catch the play early, and get there with your own account rather than a screenshot in a group chat.",
    role: "Engineering",
    dates: "Shipped",
    status: "Shipped product",
    kind: "Technical project",
    tags: ["React", "TypeScript", "Solana"],
    links: [{ label: "Public site", href: "https://www.trycope.com/" }],
    cover: {
      src: "/work/sites/cope.jpg",
      alt: "COPE welcome screen: Follow wallets, catch plays early, with Connect with X.",
      caption:
        "trycope.com is the front door. Connect with X, then the app. This frame is the public entry, not a funded wallet.",
    },
    summary:
      "COPE is a social trading app. You connect X, follow wallets you trust, and catch on-chain plays early. The product behind that door covers wallet setup, a token scanner, and trade. The current version is the one that looks for those early opportunities and lets you act on them.",
    points: [
      "The public entry is identity through X, then a feed of wallets worth following.",
      "Wallet funding, the scanner, and trade are in the app, past the welcome screen.",
    ],
    placement: "featured",
    diagram: {
      title: "From a follow to a trade",
      steps: [
        "Connect X and land a profile",
        "Follow wallets",
        "A scanner surfaces the play",
        "Trade from the same app",
      ],
      caption:
        "trycope.com stops at the door. The rest of this path is the product, and the screens sit behind login.",
    },
    sections: [
      {
        heading: "Catch it before the timeline does",
        paragraphs: [
          "The line on the product is catch on-chain plays early. That only works if the path is short: recognize a wallet, see the move, and have an account that can act. COPE starts with X. The public profile becomes the COPE profile, following is the social graph, and sharing a win is optional. The welcome screen says it does not read tweets or DMs. It only needs the public identity.",
          "Past that screen, the app is a React and TypeScript client. Wallet setup, funding and withdraw, a token scanner with results, a wallet detail page, and trade all live in the same product. This is the version that ships that loop, research and the trade together.",
        ],
      },
      {
        heading: "What the scanner is for",
        paragraphs: [
          "A scanner with no next step is a dashboard people screenshot. COPE pairs the read with the action. Structured signals and the research around a wallet exist so a person can decide, then trade from the same place instead of hopping to a second app and losing the moment.",
          "I am not publishing a win rate or a latency figure. The product claim I will stand behind is the path: follow, inspect, trade.",
        ],
      },
      {
        heading: "What I can show",
        paragraphs: [
          "The image is the public welcome screen at trycope.com. Wallet balances, followed addresses, and trade history are authenticated. " +
            nda,
        ],
      },
    ],
  },
  {
    slug: "nomba",
    title: "Nomba",
    domain: "Business banking",
    lede: "An account that opens in minutes still fails if verification comes back as a blank no.",
    role: "Frontend Engineer",
    dates: "Sep 2024–Feb 2025",
    status: "Employment",
    kind: "Employment",
    tags: ["React", "TypeScript", "REST"],
    links: [{ label: "Marketing site", href: "https://nomba.com/" }],
    cover: {
      src: "/work/sites/nomba.jpg",
      alt: "Nomba homepage: Banking that moves your business forward, with a sample business dashboard.",
      caption:
        "nomba.com is Nomba's public site. My work was inside the product, on verification and transactions.",
    },
    summary:
      "Nomba is business banking: accounts, payouts, POS, invoices. I was a frontend engineer on the verification and transaction flows, the part where a signup either becomes an account or stops with a reason a person can read.",
    points: [
      "A rejected verification needed the reason on the screen, matched to the API.",
      "Transaction tables needed search and pagination that followed the paged API.",
    ],
    placement: "featured",
    diagram: {
      title: "Open the account, then don't strand them",
      steps: [
        "A business starts verification",
        "A rejection has to say why",
        "Transactions stay searchable as the list grows",
        "Backend and QA own the cases I cannot see from the UI",
      ],
      caption:
        "The homepage is Nomba's. This diagram is the slice I worked on.",
    },
    sections: [
      {
        heading: "The account is the conversion",
        paragraphs: [
          "nomba.com asks a business to open an account, take payments, and hold more than one currency. The company publishes the scale of that: hundreds of thousands of businesses, a CBN-licensed bank, NDIC cover. I was not the author of that page. From September 2024 to February 2025 I was a frontend engineer on the product behind it.",
          "The title on my CV is Frontend Engineer. The work sat with backend and QA. I owned the screens where verification and transactions meet the person using them.",
        ],
      },
      {
        heading: "A no with a sentence attached",
        paragraphs: [
          "KYC that only says failed is a dead end, and dead ends leak the signup you just paid to acquire. The interface had to show the rejection reason and stay consistent with the API, so support and the user were looking at the same fact.",
          "Transaction resolution had the same kind of problem at a different scale. A table that cannot search or page turns a real ledger into a scroll. The UI followed the paged API instead of pretending the browser held the whole book.",
        ],
      },
      {
        heading: "What I can show",
        paragraphs: [
          "The screenshot is Nomba's marketing site, including their own sample dashboard. It is not a capture of my screens, and it is not my metric. " +
            nda,
        ],
      },
    ],
  },
  {
    slug: "sneaklin",
    title: "Sneaklin",
    domain: "E-commerce frontend",
    lede: "A catalog is a brochure until the cart and the checkout agree with each other on a phone.",
    role: "Frontend Developer",
    dates: "Jan 2022–Mar 2024",
    status: "Past project",
    kind: "Product frontend",
    tags: ["React", "CSS"],
    links: [{ label: "sneaklin.com", href: "https://sneaklin.com/" }],
    summary:
      "Sneaklin is a store. I worked on the storefront and the checkout: catalog, cart, and the small-screen layout that decides whether someone finishes the order.",
    points: [
      "The customer path is catalog, cart, checkout.",
      "Older revenue and load-time figures stay unpublished.",
    ],
    placement: "more",
    diagram: {
      title: "The only path that counts",
      steps: ["Catalog", "Cart", "Checkout"],
      caption: "The storefront surfaces. sneaklin.com is the live shop.",
    },
    sections: [
      {
        heading: "Finish the order",
        paragraphs: [
          "Sneaklin sells online. My work was the frontend a shopper actually uses: finding a product, keeping it in a cart, and paying without the layout falling apart on a phone. I worked on it from January 2022 to March 2024.",
          "The live shop is at sneaklin.com. Order totals and old performance claims stay off this page. " +
            nda,
        ],
      },
    ],
  },
  {
    slug: "unichow",
    title: "UniChow",
    domain: "Campus food payments",
    lede: "A food app converts when the wallet top-up either lands or explains itself.",
    role: "Frontend Engineer",
    dates: "2025",
    status: "Older project",
    kind: "Product frontend",
    tags: ["React", "TypeScript", "Paystack"],
    links: [
      { label: "GitHub", href: "https://github.com/loppam/unichow" },
      { label: "Demo", href: "https://unichow.vercel.app" },
    ],
    summary:
      "UniChow is a campus food app. I built the wallet and the Paystack top-up, including the screen you get when the payment fails. Paystack here is not the payment provider on Noctix.",
    points: [
      "Balance, top-up, and a visible failure.",
      "Firebase on this project says nothing about Noctix.",
    ],
    placement: "more",
    diagram: {
      title: "Top up, then eat",
      steps: ["Wallet balance", "Paystack top-up", "Success or a readable failure"],
      caption: "The payment path on UniChow. The demo link is separate from Noctix.",
    },
    sections: [
      {
        heading: "The top-up",
        paragraphs: [
          "Students needed a balance and a way to add to it. I built those screens and connected the top-up to Paystack, with a failure state that does not pretend the money arrived.",
          "An older note mentioned Firebase for updates on this project. That stays here. On Noctix, Firebase is sign-in and push, and Nomba takes the payment. " +
            nda,
        ],
      },
    ],
  },
];

export const experience = [
  {
    org: "Noctix",
    role: "Software Engineer",
    dates: "Nov 2025–Present",
    kind: "Product engineering",
    tools:
      "React, TypeScript, Tailwind CSS, TanStack Query, Redux Toolkit, IndexedDB, Fastify, PostgreSQL, Nomba",
    points: [
      "Attendee, organizer, and admin interfaces for an event-ticketing platform with 13,000+ tickets sold and 1,000+ registered users.",
      "Checkout, event management, and analytics in React and TypeScript, with TanStack Query and Redux Toolkit, plus offline check-in in IndexedDB.",
      "Nomba payment flows and typed API clients against a custom Fastify and PostgreSQL backend. Firebase stays on authentication and push notifications.",
    ],
  },
  {
    org: "Buffer",
    role: "Frontend Engineer",
    dates: "Feb 2026–Sep 2026",
    kind: "Employment",
    tools: "React, TypeScript, Turborepo, Tailwind CSS, Git",
    points: [
      "Booking, scheduling, and admin workflows as the primary frontend engineer, beside a backend developer.",
      "Loading, empty, and error states across dashboard workflows, with a reported 25% drop in UI-related support issues.",
      "10+ reducer-driven hooks and a Turborepo workspace that shares UI and utilities across separately deployed applications.",
    ],
  },
  {
    org: "JexPay",
    role: "Frontend Developer",
    dates: "Aug 2025–Feb 2026",
    kind: "Frontend engagement",
    tools:
      "React, TypeScript, React Router, Vite, Turborepo, Fetch API, Framer Motion, Recharts",
    points: [
      "Marketing and admin applications in React and TypeScript, including transaction reviews, user and KYC management, and treasury views.",
      "Live crypto and gift-card estimates from public APIs, with request debouncing and stale-response handling.",
      "Shared typed API clients and response mappers in a Turborepo, with reusable UI controls and permission-aware staff navigation.",
    ],
  },
  {
    org: "Nomba Financial Services Ltd.",
    role: "Frontend Engineer",
    dates: "Sep 2024–Feb 2025",
    kind: "Employment",
    tools: "React, TypeScript, JavaScript, REST APIs, Git, Linear",
    points: [
      "Pagination, search, and error handling, with a reported 20% reduction in user issues.",
      "BVN association and KYC rejection tracking, with a reported 30% reduction in verification errors.",
      "Transaction-flow defects and billing interfaces, with backend and QA engineers.",
    ],
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    items:
      "React, TypeScript, JavaScript, Tailwind CSS, React Router, Vite, HTML and CSS, Figma implementation.",
  },
  {
    label: "Application state",
    items:
      "TanStack Query, Redux Toolkit, React hooks, IndexedDB, PWA and Workbox, Capacitor.",
  },
  {
    label: "APIs and tools",
    items:
      "REST APIs, Fastify, PostgreSQL, Redis, Firebase Auth and FCM, Nomba, Git, Docker, Turborepo.",
  },
  {
    label: "AI-assisted development",
    items: "Cursor, OpenAI Codex, Grok, Claude.",
  },
];

export function getCase(slug: string | undefined) {
  return cases.find((item) => item.slug === slug);
}

export function nextCase(slug: string) {
  const index = cases.findIndex((item) => item.slug === slug);
  if (index < 0) return cases[0];
  return cases[(index + 1) % cases.length];
}
