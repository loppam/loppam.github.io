export const projects = [
  {
    id: "sneaklin",
    title: "Sneaklin — E-commerce Platform",
    role: "Frontend Developer",
    duration: "Jan 2021 – Present",
    tech: ["React", "HTML", "CSS", "Git", "Bootstrap"],
    live_demo: "https://lopam.pario.la/sneaklin",
    repo: "https://github.com/loppam/final",
    summary:
      "Built and maintained a production e-commerce app handling 30+ daily orders and $10k+ revenue. Focus: responsive UI, performance optimization, checkout UX.",
    impact: [
      "Reduced page load times by 25% through code refactors",
      "Maintained responsive UX across devices",
      "Integrated payment flows",
    ],
    takeaway:
      "I focus on practical performance wins and shipping customer-facing features.",
    problem:
      "Sneaklin needed a robust e-commerce platform that could handle high daily transaction volumes while maintaining excellent performance and user experience across all devices.",
    responsibilities: [
      "Built responsive product catalog and shopping cart interfaces",
      "Implemented checkout flows with payment gateway integration",
      "Optimized asset loading and code splitting for faster page loads",
      "Collaborated with backend team on API integration",
      "Maintained and debugged production issues",
    ],
    approach:
      "I architected the frontend using React with a component-based approach, focusing on reusability and maintainability. Performance was critical, so I implemented lazy loading for images, code splitting for routes, and optimized bundle sizes. For the checkout flow, I prioritized clarity and trust signals to reduce cart abandonment.",
    whatIdDoDifferently:
      "I'd implement a state management solution like Zustand from the start to better handle complex cart and checkout states.",
  },
  {
    id: "nomba-kyc",
    title: "Nomba — KYC & Transaction UX Improvements",
    role: "Frontend Engineer Intern",
    duration: "Sept 2024 – Feb 2025",
    tech: ["React", "TypeScript", "REST APIs"],
    live_demo: null,
    repo: "https://github.com/loppam/unichow",
    summary:
      "Enhanced KYC workflows and transaction UIs—added rejection reasons, pagination, search, and verification fixes, improving compliance and reducing errors.",
    impact: [
      "Improved verification accuracy",
      "Optimized transaction resolution tables",
      "Reduced data inconsistencies",
    ],
    takeaway:
      "I work well with backend teams to solve reliability and UX problems in fintech.",
    problem:
      "The existing KYC verification system lacked clear feedback mechanisms for rejections, making it difficult for support teams to communicate issues to users. Transaction tables were difficult to navigate with large datasets.",
    responsibilities: [
      "Redesigned KYC rejection workflow with detailed reason codes",
      "Implemented advanced filtering and search for transaction tables",
      "Added pagination for better performance with large datasets",
      "Fixed verification edge cases and state management issues",
      "Worked closely with backend team to ensure data consistency",
    ],
    approach:
      "I focused on improving the UX for internal teams first, since they were the primary users. This meant adding comprehensive search, filters, and clear status indicators. For the KYC improvements, I worked directly with compliance to understand rejection categories and implemented a clear, structured feedback system. TypeScript helped catch potential data inconsistencies early.",
    whatIdDoDifferently:
      "I'd advocate for more comprehensive E2E testing earlier to catch edge cases in the verification flow.",
  },
  {
    id: "unichow",
    title: "UniChow — Wallet & Payment Integration",
    role: "Frontend Engineer",
    duration: "2025",
    tech: ["TypeScript", "React", "Paystack", "Firebase"],
    live_demo: "https://lopam.pario.la/unichow",
    repo: "https://github.com/loppam/unichow",
    summary:
      "Implemented wallet top-up using Paystack and built user-facing payment flows for a campus food app.",
    impact: [
      "Delivered a wallet top-up flow to production",
      "Improved UX for payments and order flows",
    ],
    takeaway:
      "I build payments & integrations that prioritize security and usability.",
    problem:
      "UniChow needed a seamless wallet system that would allow students to load funds and make quick purchases without repeatedly entering payment details.",
    responsibilities: [
      "Integrated Paystack payment gateway for wallet top-ups",
      "Built wallet balance display and transaction history",
      "Implemented secure payment flow with proper error handling",
      "Connected frontend to Firebase backend for real-time updates",
      "Designed intuitive UX for payment confirmation and receipts",
    ],
    approach:
      "Security and trust were paramount for payment features. I implemented clear loading states, confirmation dialogs, and success feedback. The Paystack integration was wrapped in a robust error handling layer to gracefully manage failed transactions. Real-time wallet updates via Firebase ensured users always saw accurate balances.",
    whatIdDoDifferently:
      "I'd add more comprehensive transaction receipt views and implement offline support for viewing transaction history.",
  },
];
