import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SpatialCard } from "@/components/3d/SpatialCard";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata, buildProductSchema } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Evrry — The AI-First Everyday Consumer Super App",
  description:
    "Evrry is the flagship consumer super app created by Elifsi Technologies Private Limited. Powered by Eli AI concierge, Evrry integrates food, grocery, mobility, stays, and unified payments into a seamless experience.",
  path: "/products/evrry",
});

export default function EvrryProductPage() {
  const productSchema = buildProductSchema();

  const verticals = [
    {
      title: "Food & Restaurant Dining",
      badge: "On-Demand Delivery & Reservations",
      description:
        "Order from premier local kitchens, explore chef-curated menus, or reserve tables at top-rated dining establishments with synchronized travel arrival times.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
    },
    {
      title: "Grocery & Everyday Essentials",
      badge: "Predictive & Instant Replenishment",
      description:
        "Restock pantry staples, organic fresh produce, and household necessities. Eli anticipates regular re-order cycles and aggregates items to reduce delivery overhead.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
        </svg>
      ),
    },
    {
      title: "Cabs, Rides & Transit",
      badge: "Instant & Scheduled Mobility",
      description:
        "Call on-demand rides, schedule reliable airport departures, or book multi-stop city transits connected directly to your calendar commitments.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      ),
    },
    {
      title: "Vehicle & Car Rentals",
      badge: "Flexible Self-Drive Fleet",
      description:
        "Select verified self-drive vehicles, SUVs for weekend escapes, or premium sedans with transparent hourly or daily pricing and instant digital key handoff.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
        </svg>
      ),
    },
    {
      title: "Hotels, Stays & Room Rentals",
      badge: "Verified Accommodations",
      description:
        "Discover boutique hotels, executive serviced apartments, and verified long-stay rooms with transparent amenities, verified host reviews, and unified checkout.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      ),
    },
    {
      title: "Unified Payments & Ledger",
      badge: "Instant Frictionless Checkout",
      description:
        "A single, secure payment profile handles all transactions across every Evrry vertical—eliminating repetitive credential entry, enabling split payments, and tracking unified spending.",
      icon: (
        <svg className="w-6 h-6 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* 1. Header with Company Attribution */}
      <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#E5E7EB]">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
              { name: "Evrry", path: "/products/evrry" },
            ]}
          />
          <div className="max-w-4xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1F3] border border-[#F51F3D]/25 mb-4">
              <span className="w-2 h-2 rounded-full bg-[#F51F3D]" />
              <span className="text-xs font-bold uppercase tracking-wider text-[#D91432]">
                A Product Created by Elifsi Technologies Private Limited
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#111827]">
              Evrry
            </h1>
            <p className="mt-3 text-xl sm:text-2xl font-semibold text-[#F51F3D]">
              The AI-First Everyday Consumer Super App
            </p>
            <p className="mt-6 text-base sm:text-lg text-[#667085] leading-relaxed max-w-3xl">
              Modern digital life is fragmented across dozens of disconnected applications—each requiring
              its own login, payment profile, navigation logic, and separate customer service. Evrry solves
              this fragmentation by bringing everyday services into a unified experience orchestrated by
              intelligent AI.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Button href="#eli" variant="primary" size="md">
                Meet Eli — The AI Concierge
              </Button>
              <Button href="#verticals" variant="secondary" size="md">
                Explore Service Verticals
              </Button>
              <Button href="/contact?topic=product" variant="outline" size="md">
                Contact Product Team
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Deep Dive: Eli AI Assistant */}
      <Section tone="surface" id="eli">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 lg:p-12 shadow-card">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <Eyebrow>Embedded Intelligence</Eyebrow>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                Eli — The Intelligent AI Concierge
              </h2>
              <p className="mt-4 text-base text-[#667085] leading-relaxed">
                Eli is the cognitive layer built inside Evrry. Rather than a superficial text assistant that
                merely answers queries, Eli acts as an active concierge capable of understanding multi-dimensional
                user goals, discovering relevant services, comparing options, coordinating cross-service constraints,
                and guiding users to completion.
              </p>

              <div className="mt-6 space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFF1F3] text-[#F51F3D] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#111827]">Cross-Domain Coordination</h4>
                    <p className="text-xs text-[#667085]">
                      Coordinate a dinner reservation, cab pickup, and stay booking within a single natural language request.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFF1F3] text-[#F51F3D] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#111827]">Context-Aware Preferences</h4>
                    <p className="text-xs text-[#667085]">
                      Eli learns your dietary tastes, commuting habits, and hotel preferences while keeping your data cryptographically private.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-[#FFF1F3] text-[#F51F3D] flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-[#111827]">Autonomous Constraint Solving</h4>
                    <p className="text-xs text-[#667085]">
                      Automatically handles schedule delays—if a flight is pushed, Eli adjusts connected airport taxi pickups seamlessly.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Eli Interaction Simulation Card */}
            <div className="lg:col-span-5">
              <SpatialCard className="rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] p-6 shadow-sm">
                <div className="flex items-center justify-between pb-3 border-b border-[#E5E7EB]">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#F51F3D]" />
                    <span className="font-bold text-xs uppercase tracking-wider text-[#111827]">
                      Eli Concierge Preview
                    </span>
                  </div>
                  <span className="text-[10px] font-mono font-bold text-[#F51F3D]">AI AGENT</span>
                </div>

                <div className="mt-4 space-y-3">
                  {/* User Request Bubble */}
                  <div className="rounded-lg bg-white border border-[#E5E7EB] p-3 text-xs text-[#111827] shadow-2xs">
                    <span className="font-mono text-[10px] font-bold text-[#667085] block mb-1">
                      USER REQUEST
                    </span>
                    &ldquo;Eli, I have a client meeting in Bengaluru on Friday afternoon. Book a reliable cab from airport, a boutique hotel nearby, and a dinner table for two at 8 PM.&rdquo;
                  </div>

                  {/* Eli Plan Execution */}
                  <div className="rounded-lg bg-[#FFF1F3] border border-[#F51F3D]/25 p-3 text-xs text-[#111827]">
                    <span className="font-mono text-[10px] font-bold text-[#D91432] block mb-1">
                      ELI ORCHESTRATION PIPELINE
                    </span>
                    <ul className="space-y-1.5 text-[11px] text-[#667085]">
                      <li className="flex items-center gap-2 text-[#111827]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F51F3D]" />
                        <span>1. Matched Airport Cab dispatch for Friday 13:45</span>
                      </li>
                      <li className="flex items-center gap-2 text-[#111827]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F51F3D]" />
                        <span>2. Reserved Executive Room at partner hotel</span>
                      </li>
                      <li className="flex items-center gap-2 text-[#111827]">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F51F3D]" />
                        <span>3. Confirmed 2-guest dinner table at 20:00</span>
                      </li>
                    </ul>
                    <div className="mt-2.5 pt-2 border-t border-[#F51F3D]/20 text-[10px] font-semibold text-[#D91432]">
                      Unified Checkout Ready · 1 Click Confirmation
                    </div>
                  </div>
                </div>
              </SpatialCard>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Service Verticals */}
      <Section tone="white" id="verticals">
        <div className="max-w-3xl mb-12">
          <Eyebrow>Comprehensive Scope</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Everyday Services Harmonized in One Interface
          </h2>
          <p className="mt-3 text-base text-[#667085]">
            Evrry eliminates the need to cycle between half a dozen fragmented single-purpose applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticals.map((vert) => (
            <div
              key={vert.title}
              className="flex flex-col p-6 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#F51F3D]/30 hover:shadow-card transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-[#FFF1F3] border border-[#F51F3D]/20 flex items-center justify-center mb-4">
                {vert.icon}
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#F51F3D] mb-1">
                {vert.badge}
              </span>
              <h3 className="font-bold text-lg text-[#111827]">{vert.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed flex-1">
                {vert.description}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Company Ownership Statement */}
      <Section tone="surface">
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center max-w-3xl mx-auto">
          <Badge variant="dark" className="mb-3">
            Corporate Architecture
          </Badge>
          <h3 className="text-2xl font-bold text-[#111827]">
            Evrry is Engineered by Elifsi Technologies Private Limited
          </h3>
          <p className="mt-3 text-sm text-[#667085] leading-relaxed">
            All proprietary algorithms, AI models, transactional engines, and operational frameworks powering
            Evrry are designed, developed, and owned by Elifsi Technologies.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Button href="/company" variant="outline" size="sm">
              About Elifsi Technologies
            </Button>
            <Button href="/contact" variant="primary" size="sm">
              Partner with Evrry
            </Button>
          </div>
        </div>
      </Section>

      {/* 5. CTA */}
      <CTASection
        eyebrow="Ecosystem Collaboration"
        heading="Bring your services to Evrry."
        description="Whether you are a merchant, fleet operator, hotelier, or developer, connect with the Elifsi Technologies team to explore integration opportunities."
        primaryCtaLabel="Contact Corporate Desk"
        primaryCtaHref="/contact?topic=partnership"
        secondaryCtaLabel="View Company Overview"
        secondaryCtaHref="/company"
      />
    </>
  );
}
