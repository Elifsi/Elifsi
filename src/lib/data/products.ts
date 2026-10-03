import { ProductInfo } from "@/types/content";

export const products: ProductInfo[] = [
  {
    id: "evrry",
    name: "Evrry",
    slug: "evrry",
    tagline: "The AI-First Everyday Consumer Super App",
    category: "Consumer Super App & Unified Services",
    status: "Active Flagship",
    summary:
      "Evrry is the current flagship consumer application created and operated by Elifsi Technologies. It unifies everyday lifestyle and mobility services into an intelligent, AI-guided interface powered by Eli.",
    description:
      "Modern digital life is fragmented across dozens of disconnected applications—each requiring its own login, payment profile, navigation logic, and separate customer service. Evrry solves this fragmentation by building a unified everyday platform where food, grocery, hotel bookings, dining reservations, transit, car rentals, room stays, travel, and peerless unified payments coexist harmoniously under one roof.",
    features: [
      {
        title: "Eli — The Intelligent AI Concierge",
        description:
          "Eli understands high-level consumer intent and coordinates complex, multi-service actions across the platform in natural language. Plan a weekend getaway, book travel, reserve dining, and coordinate airport transport with a single conversational request.",
      },
      {
        title: "Everyday Dining & Quick Commerce",
        description:
          "Instant food delivery and essential grocery replenishment with smart order combining, hyper-local inventory sync, and dynamic re-ordering schedules.",
      },
      {
        title: "Mobility & Transportation Ecosystem",
        description:
          "Integrated on-demand ride hailing, planned airport commutes, and self-drive vehicle rentals connected directly to your travel itineraries.",
      },
      {
        title: "Stays, Hotels & Room Rentals",
        description:
          "Comprehensive discovery and reservation engine for boutique hotels, business accommodations, and verified homestays with unified billing.",
      },
      {
        title: "Unified Secure Payments",
        description:
          "Single-click checkout across every service line with transparent transaction ledgers, split billing, and automated merchant settlements.",
      },
    ],
    metricsOrBadges: [
      "AI-First Architecture",
      "Unified Super App",
      "Eli Intelligent Concierge",
      "Real-Time Multi-Service Mesh",
    ],
    href: "/products/evrry",
  },
  {
    id: "elifsi-core-platform",
    name: "Elifsi Core Engine",
    slug: "elifsi-core-platform",
    tagline: "High-Throughput Distributed Orchestration Mesh",
    category: "Proprietary Technology Platform",
    status: "Core Architecture",
    summary:
      "The foundational software platform engineered by Elifsi Technologies that powers transaction consensus, agentic context routing, and multi-tenant service federation.",
    description:
      "Underpinning Evrry and all future Elifsi products is our proprietary software core. Built for ultra-low latency, strict fault tolerance, and cross-domain data consistency, the platform enables rapid product iteration and reliable high-volume operation.",
    features: [
      {
        title: "Agentic Context Engine",
        description:
          "Stateful orchestration pipeline that enables Eli to parse multi-step user intents, run cross-domain constraint solvers, and dispatch transactions securely.",
      },
      {
        title: "Unified Ledger & Settlement Mesh",
        description:
          "Distributed, audit-compliant transactional backbone coordinating payments across disparate third-party service providers, merchants, and banking gateways.",
      },
      {
        title: "High-Concurrency Dispatch Service",
        description:
          "Real-time event streaming and geo-spatial matching algorithms powering on-demand logistics, delivery routing, and ride assignment.",
      },
    ],
    metricsOrBadges: [
      "Fault-Tolerant Distributed Mesh",
      "Sub-50ms Decision Latency",
      "Multi-Tenant Microservices",
    ],
    href: "/products#core-engine",
  },
];

export const futureHorizons = [
  {
    title: "AI-Native Productivity & Automation",
    category: "Systems & Intelligence",
    description:
      "Expanding the agentic architecture developed for Eli into specialized business workflows, autonomous task coordination, and intelligent decision systems.",
  },
  {
    title: "Connected Commerce Infrastructure",
    category: "Digital Platforms",
    description:
      "Software frameworks and open APIs enabling merchants, fleet operators, and service providers to seamlessly integrate into Elifsi's unified digital ecosystem.",
  },
  {
    title: "Developer Tools & Runtime Systems",
    category: "Software Tooling",
    description:
      "Internal tools, state machines, and microservice SDKs refined during the development of our flagship products, built to accelerate future software creation.",
  },
];
