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
  phone: "+2349138027017",
  phoneDisplay: "+234 913 802 7017",
  email: "lopampariola@gmail.com",
  github: "https://github.com/loppam",
  linkedin: "https://www.linkedin.com/in/thatboylopam/",
  x: "https://x.com/Lopam_",
  resume: "/OloladePariola.pdf",
};

export const cases: CaseStudy[] = [
  {
    "slug": "noctix",
    "title": "Noctix",
    "domain": "Event ticketing and operations",
    "lede": "React and TypeScript interfaces for event discovery, ticket purchases, organizer operations, and QR check-in.",
    "role": "Software Engineer",
    "dates": "Nov 2025–Present",
    "status": "Production product",
    "kind": "Product engineering",
    "tags": [
      "React",
      "TypeScript",
      "Nomba"
    ],
    "links": [
      {
        "label": "Public site",
        "href": "https://getnoctix.com"
      }
    ],
    "cover": {
      "src": "/work/sites/noctix.jpg",
      "alt": "Noctix homepage: Ticketing that feels alive before the doors open.",
      "caption": "getnoctix.com is the public site. The attendee app, the organizer desk, and the door tool are behind login."
    },
    "summary": "I build Noctix’s attendee, organizer, and admin interfaces, including Nomba checkout and offline check-in with queued synchronization.",
    "points": [
      "Typed API clients separate backend responses from UI contracts.",
      "Offline check-in stores ticket updates and pending scans together in IndexedDB.",
      "Account checks prevent a queued scan from syncing under a different user."
    ],
    "placement": "flagship",
    "diagram": {
      "title": "Check-in when the connection drops",
      "steps": [
        "Prepare an authorized event session online",
        "Read the cached ticket snapshot",
        "Record the check-in and pending sync together",
        "Retry when connected, under the same account"
      ],
      "caption": "Offline check-in requires a prepared session. Rejected tickets are not accepted merely because a request fails."
    },
    "sections": [
      {
        "heading": "Product and responsibility",
        "paragraphs": [
          "Noctix is a Nigerian event discovery and ticketing platform, and the first venture under NOC (Nocturnal). I work on its React and TypeScript applications for attendees, organizers, and platform administrators.",
          "The frontend covers event discovery, checkout, event management, analytics, and admission. My work also crosses into API integration and deployment so that these interfaces reflect the state of the underlying product."
        ]
      },
      {
        "heading": "State and API boundaries",
        "paragraphs": [
          "Redux Toolkit handles application state, including authentication, while TanStack Query manages server data. Typed clients and service mappers translate backend responses into the objects used by the UI.",
          "Authentication changes clear user-scoped caches. Payment and other mutations need explicit recovery rather than automatic retries that could repeat an action."
        ]
      },
      {
        "heading": "Offline admission with recovery",
        "paragraphs": [
          "Door staff prepare an authorized session online and cache the event’s ticket snapshot. If a request fails because the network is unavailable, the app can check against that snapshot and write the ticket update and pending scan in one IndexedDB transaction.",
          "Queued scans retain identifiers for retries. Synchronization uses backoff, shows pending and failed work, and stops when the signed-in account changes. This supports admission through a connection loss; it does not guarantee duplicate prevention across disconnected devices."
        ]
      },
      {
        "heading": "Payments and deployment",
        "paragraphs": [
          "Nomba handles payment processing. The UI distinguishes pending, failed, and completed purchases; it does not treat a browser redirect as proof of payment. Firebase is used for authentication and push notifications. The custom backend holds durable records in PostgreSQL and uses Redis for coordination.",
          "Web, API, and worker services deploy separately. The screenshot shows the public site; authenticated operational screens and customer records are not published here."
        ]
      }
    ]
  },
  {
    "slug": "buffer",
    "title": "Buffer",
    "domain": "Multi-location scheduling",
    "lede": "Booking, scheduling, and administration interfaces for businesses operating across multiple locations.",
    "role": "Frontend Engineer",
    "dates": "Feb 2026–Sep 2026",
    "status": "Employment",
    "kind": "Employment",
    "tags": [
      "React",
      "TypeScript",
      "Turborepo"
    ],
    "links": [
      {
        "label": "Marketing site",
        "href": "https://buffer.so/"
      }
    ],
    "cover": {
      "src": "/work/sites/buffer.jpg",
      "alt": "Buffer marketing page: Scheduling Made Simple for Multi-Location Businesses, with a sample dashboard below the headline.",
      "caption": "buffer.so is the public marketing site. The scheduling desk I worked on is behind login."
    },
    "summary": "As the primary frontend engineer, I built scheduling workflows with reducer-driven hooks and shared UI utilities in a Turborepo workspace.",
    "points": [
      "Dashboard behavior sits in reducer-driven hooks, so the screen state is explicit.",
      "The marketing site and the dashboard share frontend utilities in a Turbo monorepo."
    ],
    "placement": "featured",
    "diagram": {
      "title": "Two surfaces, one frontend",
      "steps": [
        "Marketing site at buffer.so",
        "Shared utilities in the Turbo monorepo",
        "Scheduling dashboard behind login"
      ],
      "caption": "How the frontend is split. The image above is the public site, not the desk."
    },
    "sections": [
      {
        "heading": "Scheduling across locations",
        "paragraphs": [
          "Buffer provides booking and scheduling tools for multi-location businesses. I worked as the primary frontend engineer alongside a backend developer, implementing the authenticated dashboard and administrative workflows."
        ]
      },
      {
        "heading": "Keeping screen state explicit",
        "paragraphs": [
          "Reducer-driven custom hooks organize workflow state and transitions outside the rendering components. Loading, empty, and error states are part of the interface rather than separate follow-up screens.",
          "The public and dashboard applications share UI utilities in a Turborepo workspace while remaining separately deployable. That makes common behavior reusable without requiring both applications to share a single release."
        ]
      },
      {
        "heading": "What the image represents",
        "paragraphs": [
          "The screenshot is the public marketing site and includes its sample dashboard. It is not a capture of a customer account. Internal scheduling screens and customer records remain private."
        ]
      }
    ]
  },
  {
    "slug": "jexpay",
    "title": "JexPay",
    "domain": "Crypto and gift cards into naira",
    "lede": "API-connected exchange estimates and staff workflows for reviewing crypto transactions, gift cards, and identity verification.",
    "role": "Frontend Developer",
    "dates": "Aug 2025–Feb 2026",
    "status": "Shipped frontend",
    "kind": "Frontend engagement",
    "tags": [
      "React",
      "TypeScript",
      "Turborepo",
      "Vite"
    ],
    "links": [
      {
        "label": "Marketing site",
        "href": "https://jexpay.io/"
      },
      {
        "label": "Design case study",
        "href": "https://xyzdezin.figma.site/jexpay"
      }
    ],
    "cover": {
      "src": "/work/jexpay/landing.jpg",
      "alt": "JexPay homepage: Turn digital assets into naira fast, with a USDT to naira converter.",
      "caption": "jexpay.io is the public marketing site. The rate on that page belongs to the product, not to this write-up."
    },
    "frames": [
      {
        "src": "/work/jexpay/admin-1.png",
        "alt": "JexPay admin design frame showing a customer list filtered by KYC level.",
        "caption": "Customers, filtered by KYC level. Design frame, placeholder names."
      },
      {
        "src": "/work/jexpay/admin-2.png",
        "alt": "JexPay admin design frame for composing a push notification.",
        "caption": "Broadcast. Staff write a push and choose who receives it."
      },
      {
        "src": "/work/jexpay/admin-3.png",
        "alt": "JexPay admin design frame for gift card brands, countries, and naira rates.",
        "caption": "Gift cards. A brand, a country, and the naira rate staff will honor."
      },
      {
        "src": "/work/jexpay/admin-4.png",
        "alt": "JexPay admin design frame reviewing a completed gift card order.",
        "caption": "An order, with the rate that was applied and the payout."
      },
      {
        "src": "/work/jexpay/admin-5.png",
        "alt": "JexPay admin design frame for staff roles.",
        "caption": "Staff roles. Super admin, operations, developer, customer care."
      },
      {
        "src": "/work/jexpay/admin-6.png",
        "alt": "JexPay admin design frame for deposit, gift card, and withdrawal fees.",
        "caption": "Fees on crypto deposits, gift cards, and withdrawals."
      }
    ],
    "summary": "I connected the React marketing and admin apps to shared typed API clients, built exchange estimates, and implemented permission-aware transaction and KYC workflows.",
    "points": [
      "Marketing and admin applications cover transaction review, user and KYC management, and treasury.",
      "Live crypto and gift-card estimates call public APIs, with debounced requests and stale responses dropped.",
      "Shared typed API clients and response mappers live in the Turborepo, with permission-aware staff navigation."
    ],
    "placement": "featured",
    "diagram": {
      "title": "A transaction review in the admin",
      "steps": [
        "Load and filter the transaction queue",
        "Inspect a pending transaction",
        "Approve or reject with the required UI permission",
        "Refresh the list and pending counts"
      ],
      "caption": "The frontend checks available permissions. The backend remains responsible for authorizing each request."
    },
    "sections": [
      {
        "heading": "Scope of the engagement",
        "paragraphs": [
          "JexPay exchanges cryptocurrency and gift cards for naira. My frontend work covered the marketing and administration applications in a shared React and TypeScript monorepo. I contributed API integration, application workflows, and shared packages to an existing codebase. I did not build the mobile application.",
          "The Turborepo separates apps/web and apps/admin, with shared UI controls and typed API clients. Response mappers keep backend field differences out of individual screens."
        ]
      },
      {
        "heading": "Exchange estimates without stale results",
        "paragraphs": [
          "The public crypto and gift-card calculators request estimates from backend APIs. Input changes are debounced, and request identifiers prevent an earlier response from replacing a newer quote. Loading and error states make it clear when an estimate is still being calculated or cannot be retrieved."
        ]
      },
      {
        "heading": "Operational review and permissions",
        "paragraphs": [
          "The admin includes transaction review, gift-card workflows, user management, KYC, rates, and treasury views. Pending transaction actions submit approval or rejection and then refresh the table and pending counts.",
          "KYC overrides validate the identity-number length and require a reason. Navigation and privileged actions consult frontend permissions; those checks are not a substitute for backend authorization.",
          "Some controls in the repository remain incomplete, including parts of export and profile editing. They are not included here as completed accomplishments."
        ]
      },
      {
        "heading": "Design references and implementation",
        "paragraphs": [
          "Olopade John designed the product. The gallery below reproduces publicly published design references, with placeholder records. These frames explain the intended interface and are not screenshots of the live administration application.",
          "The landing screenshot shows the public marketing site. Internal customer data and authenticated production screens remain private."
        ]
      }
    ]
  },
  {
    "slug": "noc",
    "title": "Vampless",
    "domain": "Solana launchpad",
    "lede": "A separate Solana engineering project covering launch validation, market interfaces, and holder accounting.",
    "role": "Engineering",
    "dates": "In progress",
    "status": "Public product",
    "kind": "Technical project",
    "tags": [
      "TypeScript",
      "Solana",
      "Meteora"
    ],
    "links": [
      {
        "label": "Earlier public site",
        "href": "https://noclaunch.fun/"
      }
    ],
    "cover": {
      "src": "/work/sites/noc.jpg",
      "alt": "Earlier public launchpad homepage, shown under its previous NOC branding",
      "caption": "Historical public-site screenshot under previous branding. Vampless is separate from NOC (Nocturnal)."
    },
    "summary": "I work on launch and quote-pair validation, Meteora integrations, holder indexing, and token-identity review. This crypto project is separate from NOC (Nocturnal).",
    "points": [
      "Fee and quote-pair checks run against Meteora DBC, including xStock-style quotes.",
      "Vampless means token identity. It does not lock liquidity or defend a price."
    ],
    "placement": "featured",
    "diagram": {
      "title": "Validate before submission",
      "steps": [
        "Choose a launch configuration",
        "Check quote-pair admission",
        "Validate fee configuration",
        "Present the transaction for signing"
      ],
      "caption": "A workflow overview, not evidence of a completed mainnet launch or payout."
    },
    "sections": [
      {
        "heading": "A separate engineering project",
        "paragraphs": [
          "Vampless is the separate crypto project previously presented here under the NOC launchpad name. It is not part of NOC (Nocturnal), the company behind Noctix. This case study retains its existing URL so older links continue to work."
        ]
      },
      {
        "heading": "Validation around a launch",
        "paragraphs": [
          "The work includes fee rules and quote-pair admission for Meteora’s dynamic bonding curve, alongside market and launch interfaces. A supported configuration has to be checked before a transaction is submitted."
        ]
      },
      {
        "heading": "Accounting and token identity",
        "paragraphs": [
          "Holder indexing tracks qualifying accounts and balances for accounting. Index recovery and reconciliation are separate from executing a payout.",
          "Token-identity review deals with impersonation and lookalike tokens. It is not a liquidity lock or a promise about token price. The public screenshot records an earlier version and branding, not a verification of current financial operations."
        ]
      }
    ]
  },
  {
    "slug": "cope",
    "title": "COPE",
    "domain": "Wallet research and social trading",
    "lede": "React interfaces for token scanning, wallet analytics, and authenticated watchlists.",
    "role": "Engineering",
    "dates": "Shipped",
    "status": "Shipped product",
    "kind": "Technical project",
    "tags": [
      "React",
      "TypeScript",
      "Solana"
    ],
    "links": [
      {
        "label": "Public site",
        "href": "https://www.trycope.com/"
      }
    ],
    "cover": {
      "src": "/work/sites/cope.jpg",
      "alt": "COPE welcome screen: Follow wallets, catch plays early, with Connect with X.",
      "caption": "trycope.com is the front door. Connect with X, then the app. This frame is the public entry, not a funded wallet."
    },
    "summary": "I worked on COPE’s React and TypeScript client, connecting scanner results to wallet analytics and watchlist actions with loading and error feedback.",
    "points": [
      "Wallet-detail pages retrieve analytics using the selected wallet address.",
      "Watchlist actions check authentication and duplicate entries before submitting."
    ],
    "placement": "featured",
    "diagram": {
      "title": "Inspect a wallet",
      "steps": [
        "Open scanner results",
        "Select a wallet",
        "Fetch wallet analytics",
        "Add it to an authenticated watchlist"
      ],
      "caption": "This describes the research interface. It is not evidence of trade execution or investment performance."
    },
    "sections": [
      {
        "heading": "The product and frontend scope",
        "paragraphs": [
          "COPE combines wallet research with a social trading interface. The React and TypeScript application contains onboarding, wallet setup, token-scanner results, wallet details, watchlists, and trading screens.",
          "My focus here is the frontend implementation: routing between research screens, presenting API data, and handling user actions and their failure states."
        ]
      },
      {
        "heading": "Wallet details and service integration",
        "paragraphs": [
          "The wallet-detail route takes an address from route parameters or navigation state and requests analytics through a service function. It shows a loading state during the request and reports a failed lookup rather than silently treating it as complete.",
          "Navigation state can carry scanner results into the detail screen. The page presents fetched analytics when available, keeping the selected wallet connected to the research that opened it."
        ]
      },
      {
        "heading": "Watchlist interactions",
        "paragraphs": [
          "Adding a wallet checks whether the user is authenticated and whether the address is already watched. The action exposes an in-progress state, submits through the authentication context, and displays success or error feedback.",
          "The public welcome image provides product context. The presence of funding and trade routes does not establish successful live execution, and no trading performance or latency claim is made here."
        ]
      }
    ]
  },
  {
    "slug": "nomba",
    "title": "Nomba",
    "domain": "Business banking",
    "lede": "Frontend work on identity verification, rejection feedback, and searchable transaction interfaces.",
    "role": "Frontend Engineer",
    "dates": "Sep 2024–Feb 2025",
    "status": "Employment",
    "kind": "Employment",
    "tags": [
      "React",
      "TypeScript",
      "REST"
    ],
    "links": [
      {
        "label": "Marketing site",
        "href": "https://nomba.com/"
      }
    ],
    "cover": {
      "src": "/work/sites/nomba.jpg",
      "alt": "Nomba homepage: Banking that moves your business forward, with a sample business dashboard.",
      "caption": "nomba.com is Nomba's public site. My work was inside the product, on verification and transactions."
    },
    "summary": "I implemented verification and transaction flows, including BVN association, readable KYC rejection reasons, and API-backed search and pagination.",
    "points": [
      "A rejected verification needed the reason on the screen, matched to the API.",
      "Transaction tables needed search and pagination that followed the paged API."
    ],
    "placement": "featured",
    "diagram": {
      "title": "Verification feedback",
      "steps": [
        "Submit verification details",
        "Read the API result",
        "Show the rejection reason when present",
        "Keep the UI consistent with the account state"
      ],
      "caption": "My scope was the product frontend, working with backend and QA engineers."
    },
    "sections": [
      {
        "heading": "My role",
        "paragraphs": [
          "I worked as a Frontend Engineer at Nomba from September 2024 to February 2025. My scope covered verification and transaction interfaces, with backend and QA collaboration on API behavior and defects."
        ]
      },
      {
        "heading": "Verification and transaction flows",
        "paragraphs": [
          "BVN association and KYC rejection tracking required the screen to reflect the API result and give the user a readable reason when verification failed.",
          "Transaction search and pagination followed the paged API, with loading and error handling around requests. I also worked on transaction-flow defects and billing interfaces."
        ]
      },
      {
        "heading": "Public context",
        "paragraphs": [
          "The image shows Nomba’s marketing site, including its own sample dashboard. I did not author that page; it provides context for the product. My authenticated screens and internal metrics are not published here."
        ]
      }
    ]
  },
  {
    "slug": "sneaklin",
    "title": "Sneaklin",
    "domain": "E-commerce frontend",
    "lede": "A responsive React storefront covering product browsing, cart, and checkout.",
    "role": "Frontend Developer",
    "dates": "Jan 2022–Mar 2024",
    "status": "Past project",
    "kind": "Product frontend",
    "tags": [
      "React",
      "CSS"
    ],
    "links": [
      {
        "label": "sneaklin.com",
        "href": "https://sneaklin.com/"
      }
    ],
    "summary": "I built storefront and checkout interfaces in React and CSS, with layouts for shoppers on mobile.",
    "points": [
      "Catalog, cart, and checkout interfaces.",
      "Responsive layouts across the shopping flow."
    ],
    "placement": "more",
    "diagram": {
      "title": "Shopping flow",
      "steps": [
        "Browse products",
        "Review the cart",
        "Continue to checkout"
      ],
      "caption": "The customer-facing areas covered by the frontend work."
    },
    "sections": [
      {
        "heading": "Storefront implementation",
        "paragraphs": [
          "I worked on Sneaklin’s frontend from January 2022 to March 2024. The work covered the product catalog, shopping cart, and checkout using React and CSS."
        ]
      },
      {
        "heading": "Mobile layouts",
        "paragraphs": [
          "The same shopping flow needed to remain readable and usable on a phone. My focus was implementing the storefront and checkout layouts across screen sizes. No revenue or performance uplift is claimed here."
        ]
      }
    ]
  },
  {
    "slug": "unichow",
    "title": "UniChow",
    "domain": "Campus food payments",
    "lede": "Wallet and Paystack top-up interfaces for a campus food application.",
    "role": "Frontend Engineer",
    "dates": "2025",
    "status": "Older project",
    "kind": "Product frontend",
    "tags": [
      "React",
      "TypeScript",
      "Paystack"
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/loppam/unichow"
      },
      {
        "label": "Demo",
        "href": "https://unichow.vercel.app"
      }
    ],
    "summary": "I built the wallet balance and Paystack top-up flow, with explicit success and failure states.",
    "points": [
      "Wallet balance and payment initiation.",
      "Visible success and failure feedback."
    ],
    "placement": "more",
    "diagram": {
      "title": "Wallet top-up",
      "steps": [
        "View balance",
        "Start a Paystack payment",
        "Show the payment outcome"
      ],
      "caption": "The wallet flow implemented for UniChow."
    },
    "sections": [
      {
        "heading": "Wallet and payments",
        "paragraphs": [
          "UniChow is a campus food application. I built wallet screens in React and TypeScript and integrated top-ups with Paystack."
        ]
      },
      {
        "heading": "Handling payment outcomes",
        "paragraphs": [
          "The interface distinguishes a successful top-up from a failed payment so the user can understand the outcome. The repository and demo are linked above for further context."
        ]
      }
    ]
  }
];

export const experience = [
  {
    "org": "Noctix",
    "role": "Software Engineer",
    "dates": "Nov 2025–Present",
    "kind": "Product engineering",
    "tools": "React, TypeScript, Tailwind CSS, TanStack Query, Redux Toolkit, IndexedDB, Fastify, PostgreSQL, Nomba",
    "points": [
      "Attendee, organizer, and admin interfaces for event discovery, checkout, event management, and analytics.",
      "Checkout, event management, and analytics in React and TypeScript, with TanStack Query and Redux Toolkit, plus offline check-in in IndexedDB.",
      "Nomba payment flows and typed API clients against a custom Fastify and PostgreSQL backend. Firebase stays on authentication and push notifications."
    ]
  },
  {
    "org": "Buffer",
    "role": "Frontend Engineer",
    "dates": "Feb 2026–Sep 2026",
    "kind": "Employment",
    "tools": "React, TypeScript, Turborepo, Tailwind CSS, Git",
    "points": [
      "Booking, scheduling, and admin workflows as the primary frontend engineer, beside a backend developer.",
      "Loading, empty, and error states across booking and administrative workflows.",
      "Reducer-driven custom hooks and shared UI utilities across separately deployed Turborepo applications."
    ]
  },
  {
    "org": "JexPay",
    "role": "Frontend Developer",
    "dates": "Aug 2025–Feb 2026",
    "kind": "Frontend engagement",
    "tools": "React, TypeScript, React Router, Vite, Turborepo, Fetch API, Framer Motion, Recharts",
    "points": [
      "Marketing and admin applications in React and TypeScript, including transaction reviews, user and KYC management, and treasury views.",
      "Live crypto and gift-card estimates from public APIs, with request debouncing and stale-response handling.",
      "Shared typed API clients and response mappers in a Turborepo, with reusable UI controls and permission-aware staff navigation."
    ]
  },
  {
    "org": "Nomba Financial Services Ltd.",
    "role": "Frontend Engineer",
    "dates": "Sep 2024–Feb 2025",
    "kind": "Employment",
    "tools": "React, TypeScript, JavaScript, REST APIs, Git, Linear",
    "points": [
      "API-backed transaction search, pagination, and error handling.",
      "BVN association and readable KYC rejection feedback aligned with backend responses.",
      "Transaction-flow defects and billing interfaces, with backend and QA engineers."
    ]
  }
];

export const skillGroups = [
  {
    "label": "React & TypeScript",
    "items": "Component-based applications and typed API contracts across Noctix, JexPay, and Buffer. Responsive layouts with CSS and Tailwind."
  },
  {
    "label": "State & recovery",
    "items": "TanStack Query and Redux Toolkit in Noctix; reducer-driven hooks in Buffer; IndexedDB queues for offline check-in."
  },
  {
    "label": "API integration",
    "items": "Nomba checkout, JexPay exchange estimates, and Paystack top-ups. Loading, validation, errors, and retries belong in the flow."
  },
  {
    "label": "Delivery & collaboration",
    "items": "Figma implementation, Git, Vite, and shared Turborepo packages. Work across frontend, API, and deployment boundaries when the feature needs it."
  }
];

export function getCase(slug: string | undefined) {
  return cases.find((item) => item.slug === slug);
}

export function nextCase(slug: string) {
  const index = cases.findIndex((item) => item.slug === slug);
  if (index < 0) return cases[0];
  return cases[(index + 1) % cases.length];
}
