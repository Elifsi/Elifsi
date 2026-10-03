import type { Metadata } from "next";
import Link from "next/link";
import { SystemCanvas } from "@/components/3d/SystemCanvas";
import { SpatialCard } from "@/components/3d/SpatialCard";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { jobOpenings } from "@/lib/data/jobs";

export const metadata: Metadata = buildMetadata({
  title: "Elifsi Technologies — Modern Software Products & Technology Platforms",
  description:
    "Official corporate website of Elifsi Technologies Private Limited. We design, engineer, and operate modern software products, intelligent platforms, and consumer ecosystems including our flagship super app, Evrry.",
});

export default function HomePage() {
  const activeJobs = jobOpenings.filter((j) => j.status === "open").slice(0, 3);

  const capabilities = [
    {
      title: "Software Products",
      badge: "Core Focus",
      description:
        "End-to-end product engineering from system architecture to pixel-level interaction design. We build self-contained, long-lasting software assets.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      ),
    },
    {
      title: "AI & Intelligent Systems",
      badge: "Platform Engine",
      description:
        "Agentic reasoning frameworks, context routing, and multimodal models engineered directly into operational user journeys—epitomized by Eli in Evrry.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Consumer Technology",
      badge: "High Scale",
      description:
        "High-density consumer applications addressing complex physical and digital coordination challenges across mobility, commerce, and living.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      title: "Digital Platforms & Mesh",
      badge: "Distributed Systems",
      description:
        "Unified financial ledgers, geospatial dispatching engines, and multi-tenant APIs engineered for high fault-tolerance and sub-50ms transaction latency.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
  ];

  const engineeringPrinciples = [
    {
      number: "01",
      title: "Product-Oriented Ownership",
      description:
        "We are not an agency or outsourcing contractor. We conceive, design, own, and operate our intellectual property with permanent long-term accountability.",
    },
    {
      number: "02",
      title: "AI-Native by Architecture",
      description:
        "Rather than bolting chatbots onto legacy interfaces, our systems are architected from the data layer up to support autonomous agentic workflows and dynamic context generation.",
    },
    {
      number: "03",
      title: "Engineered for Multi-Product Expansion",
      description:
        "Our underlying platforms, authentication grids, and ledger systems are intentionally decoupled so new software products can launch rapidly on proven infrastructure.",
    },
    {
      number: "04",
      title: "Craft & Technical Rigor",
      description:
        "We measure software quality through deterministic reliability, sub-millisecond execution loops, high accessibility, and restrained, intentional user experiences.",
    },
  ];

  return (
    <>
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-white pt-8 pb-16 lg:pt-14 lg:pb-24 border-b border-[#E5E7EB]">
        {/* Subtle grid background */}
        <div className="absolute inset-0 bg-grid-subtle opacity-60 pointer-events-none" />

        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Positioning & Narrative */}
            <div className="lg:col-span-6 z-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1F3] border border-[#F51F3D]/20 mb-6">
                <span className="w-2 h-2 rounded-full bg-[#F51F3D] animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#D91432]">
                  Corporate Website · Elifsi Technologies
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#111827] leading-[1.08] text-balance">
                Engineering modern software products and intelligent platforms.
              </h1>

              <p className="mt-6 text-base sm:text-lg text-[#667085] leading-relaxed max-w-xl">
                <strong>Elifsi Technologies Private Limited</strong> is a software company that creates, owns,
                and operates modern digital products. We build independent software architectures, high-performance
                consumer applications, and intelligent systems built for long-term growth.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/products" variant="primary" size="lg">
                  Explore Products
                </Button>
                <Button href="/company" variant="secondary" size="lg">
                  About Elifsi
                </Button>
              </div>

              {/* Distinction Micro-Banner */}
              <div className="mt-10 pt-6 border-t border-[#E5E7EB] flex items-center gap-4 text-xs text-[#667085]">
                <div className="w-1.5 h-8 bg-[#F51F3D] rounded-full shrink-0" />
                <div>
                  <span className="font-semibold text-[#111827]">Current Active Flagship:</span>{" "}
                  Evrry — the AI-first consumer super app, powered by Eli.
                </div>
              </div>
            </div>

            {/* Right Column: 3D Connected System Visualizer */}
            <div className="lg:col-span-6 relative">
              <div className="rounded-2xl border border-[#E5E7EB] bg-gradient-to-b from-[#F7F8FA] to-white p-2 shadow-card">
                <SystemCanvas />
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. COMPANY INTRODUCTION & ROLE */}
      <Section tone="surface">
        <div className="max-w-3xl">
          <Eyebrow>Corporate Identity</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            An independent software company designed to build lasting digital products.
          </h2>
          <p className="mt-5 text-base sm:text-lg text-[#667085] leading-relaxed">
            Elifsi Technologies was established with a clear mandate: to create and operate our own software
            products rather than servicing third-party agency contracts. We combine deep systems engineering,
            artificial intelligence, and restrained consumer product design to solve real everyday coordination
            problems.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-lg bg-white border border-[#E5E7EB] shadow-xs">
            <h3 className="font-bold text-base text-[#111827]">Proprietary IP Ownership</h3>
            <p className="mt-2 text-sm text-[#667085] leading-relaxed">
              Every system, algorithm, and product interface is owned, engineered, and continuously refined
              in-house by Elifsi Technologies.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#E5E7EB] shadow-xs">
            <h3 className="font-bold text-base text-[#111827]">Multi-Product Trajectory</h3>
            <p className="mt-2 text-sm text-[#667085] leading-relaxed">
              While Evrry is our active consumer flagship, our foundational architecture is engineered to launch
              and operate multiple products over time.
            </p>
          </div>

          <div className="p-6 rounded-lg bg-white border border-[#E5E7EB] shadow-xs">
            <h3 className="font-bold text-base text-[#111827]">Autonomous Intelligence</h3>
            <p className="mt-2 text-sm text-[#667085] leading-relaxed">
              We build specialized AI reasoning agents that execute concrete user actions, not superficial chatbots.
            </p>
          </div>
        </div>
      </Section>

      {/* 3. WHAT WE BUILD (AREAS OF FOCUS) */}
      <Section tone="white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Eyebrow>Technical Scope</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Core Areas of Capability
            </h2>
            <p className="mt-3 text-base text-[#667085]">
              The architectural domains guiding our active engineering and technology roadmap.
            </p>
          </div>
          <Button href="/company" variant="outline" size="sm">
            View Engineering Philosophy →
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap) => (
            <div
              key={cap.title}
              className="flex flex-col p-6 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#F51F3D]/40 hover:shadow-card transition-all duration-200"
            >
              <div className="w-12 h-12 rounded-lg bg-[#FFF1F3] border border-[#F51F3D]/20 flex items-center justify-center mb-5">
                {cap.icon}
              </div>
              <Badge variant="brand" className="self-start mb-2">
                {cap.badge}
              </Badge>
              <h3 className="font-bold text-lg text-[#111827]">{cap.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed flex-1">
                {cap.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. FEATURED PRODUCT: EVRRY */}
      <Section tone="surface" id="evrry">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 lg:p-12 shadow-card overflow-hidden relative">
          {/* Subtle branding watermark */}
          <div className="absolute -top-12 -right-12 select-none opacity-5 pointer-events-none">
            <span className="text-[180px] font-black font-mono">EVRRY</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1F3] border border-[#F51F3D]/25 mb-4">
                <span className="w-2 h-2 rounded-full bg-[#F51F3D]" />
                <span className="text-xs font-bold uppercase tracking-wider text-[#D91432]">
                  Flagship Product · By Elifsi Technologies
                </span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#111827] tracking-tight">
                Evrry
              </h2>
              <p className="text-lg font-semibold text-[#F51F3D] mt-1">
                The AI-First Everyday Consumer Super App
              </p>

              <p className="mt-4 text-base text-[#667085] leading-relaxed">
                Evrry is created and operated by Elifsi Technologies to replace the friction of fragmented single-purpose
                applications. By uniting dining, groceries, transit, lodging rentals, travel, and instant payments
                into one cohesive ecosystem, Evrry gives consumers single-touch access to everyday life.
              </p>

              {/* Eli Callout inside Evrry */}
              <div className="mt-6 p-4 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB]">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F51F3D]" />
                  <h4 className="font-bold text-sm text-[#111827]">
                    Powered by Eli — The Intelligent AI Concierge
                  </h4>
                </div>
                <p className="mt-1.5 text-xs text-[#667085] leading-relaxed">
                  Eli acts as an intelligent coordinator inside Evrry. Users can express complex, multi-service intentions
                  in natural language—such as planning dinner reservations followed by airport transit—and Eli
                  harmonizes the end-to-end booking workflow across services.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/products/evrry" variant="primary" size="md">
                  Explore Evrry in Detail
                </Button>
                <Button href="/products" variant="secondary" size="md">
                  View Full Product Architecture
                </Button>
              </div>
            </div>

            {/* Visual product preview widget */}
            <div className="lg:col-span-5">
              <SpatialCard className="rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] p-6 shadow-sm">
                <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-[#667085]">
                      Evrry System Mesh
                    </span>
                    <h5 className="font-bold text-sm text-[#111827]">Unified Service Verticals</h5>
                  </div>
                  <span className="text-[11px] font-bold text-[#F51F3D] px-2 py-0.5 rounded bg-[#FFF1F3] border border-[#F51F3D]/20">
                    Live Platform
                  </span>
                </div>

                <div className="mt-4 space-y-2.5">
                  {[
                    { label: "Dining & Quick Food Delivery", status: "Unified" },
                    { label: "Grocery & Daily Replenishment", status: "Unified" },
                    { label: "Rides, Cabs & Vehicle Rentals", status: "Unified" },
                    { label: "Hotels, Stays & Room Bookings", status: "Unified" },
                    { label: "Eli AI Cross-Service Concierge", status: "Active" },
                    { label: "Unified Instant Ledger & Payments", status: "Secured" },
                  ].map((service) => (
                    <div
                      key={service.label}
                      className="flex items-center justify-between p-2.5 rounded bg-white border border-[#E5E7EB] text-xs"
                    >
                      <span className="font-medium text-[#111827]">{service.label}</span>
                      <span className="font-mono text-[10px] font-bold text-[#667085]">
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-5 pt-4 border-t border-[#E5E7EB] text-center">
                  <span className="text-[11px] text-[#667085]">
                    Engineered & Owned by <strong>Elifsi Technologies Private Limited</strong>
                  </span>
                </div>
              </SpatialCard>
            </div>
          </div>
        </div>
      </Section>

      {/* 5. ENGINEERING & PRODUCT PHILOSOPHY */}
      <Section tone="white">
        <div className="max-w-2xl mb-12">
          <Eyebrow>Principles & Discipline</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            How We Build Software
          </h2>
          <p className="mt-3 text-base text-[#667085]">
            Our operating philosophy is grounded in technical rigor, sovereign IP ownership, and restrained design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {engineeringPrinciples.map((item) => (
            <div
              key={item.title}
              className="p-8 rounded-xl border border-[#E5E7EB] bg-white relative hover:border-[#D1D5DB] transition-colors"
            >
              <span className="font-mono text-xs font-bold text-[#F51F3D] tracking-wider block mb-2">
                {item.number}
              </span>
              <h3 className="text-xl font-bold text-[#111827]">{item.title}</h3>
              <p className="mt-3 text-sm text-[#667085] leading-relaxed">{item.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 6. FUTURE HORIZONS (MORE PRODUCTS WILL FOLLOW) */}
      <Section tone="surface">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 lg:p-12 shadow-card">
          <div className="max-w-3xl">
            <Eyebrow>Long-Term Trajectory</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              An Expanding Software Portfolio
            </h2>
            <p className="mt-4 text-base text-[#667085] leading-relaxed">
              Evrry is the beginning of Elifsi Technologies, not the entirety of our horizon. We are continuously
              researching and architecting software platforms across intelligent automation, developer infrastructure,
              and enterprise systems.
            </p>
            <p className="mt-2 text-sm font-semibold text-[#111827]">
              More products will follow as our technological foundations expand.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-5 rounded-lg border border-[#E5E7EB] bg-[#F7F8FA]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-1">
                Active Tier
              </div>
              <h4 className="font-bold text-base text-[#111827]">Evrry Consumer Ecosystem</h4>
              <p className="mt-2 text-xs text-[#667085] leading-relaxed">
                Super app architecture, unified daily commerce, mobility, and Eli AI concierge.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-[#E5E7EB] bg-[#F7F8FA]">
              <div className="text-xs font-bold uppercase tracking-wider text-[#667085] mb-1">
                Platform Tier
              </div>
              <h4 className="font-bold text-base text-[#111827]">Elifsi Core Engine</h4>
              <p className="mt-2 text-xs text-[#667085] leading-relaxed">
                Distributed orchestration, high-throughput financial ledgers, and cognitive context routers.
              </p>
            </div>

            <div className="p-5 rounded-lg border border-dashed border-[#D1D5DB] bg-white flex flex-col justify-center">
              <div className="text-xs font-bold uppercase tracking-wider text-[#F51F3D] mb-1">
                Pipeline
              </div>
              <h4 className="font-bold text-base text-[#111827]">Future Software Products</h4>
              <p className="mt-2 text-xs text-[#667085] leading-relaxed">
                New consumer and business software solutions currently under research and system prototyping.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* 7. CAREERS PREVIEW */}
      <Section tone="white">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Eyebrow>Talent & Engineering</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              Build with Elifsi Technologies
            </h2>
            <p className="mt-3 text-base text-[#667085]">
              We recruit engineers, systems architects, and product designers who love end-to-end craftsmanship
              and sovereign product building.
            </p>
          </div>
          <Button href="/careers" variant="primary" size="md">
            View All Open Roles ({jobOpenings.filter((j) => j.status === "open").length})
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activeJobs.map((job) => (
            <div
              key={job.slug}
              className="flex flex-col p-6 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#F51F3D]/30 hover:shadow-card transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F51F3D]">
                  {job.department}
                </span>
                <span className="text-[10px] font-semibold text-[#667085] px-2 py-0.5 rounded bg-[#F7F8FA] border border-[#E5E7EB]">
                  {job.employmentType}
                </span>
              </div>
              <h3 className="font-bold text-base text-[#111827]">{job.title}</h3>
              <p className="text-xs text-[#667085] mt-1">{job.location}</p>
              <p className="mt-3 text-xs text-[#667085] leading-relaxed line-clamp-3 flex-1">
                {job.summary}
              </p>
              <div className="mt-6 pt-4 border-t border-[#E5E7EB]">
                <Button href={`/careers/${job.slug}`} variant="secondary" size="sm" className="w-full">
                  Inspect Role & Apply →
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 8. CORPORATE CALL TO ACTION */}
      <CTASection
        eyebrow="Corporate Engagement"
        heading="Connect with Elifsi Technologies."
        description="Whether you are an engineering applicant, prospective ecosystem partner, or interested in the architecture behind Evrry, our corporate desk is open."
        primaryCtaLabel="Contact the Company"
        primaryCtaHref="/contact"
        secondaryCtaLabel="Explore Evrry"
        secondaryCtaHref="/products/evrry"
      />
    </>
  );
}
