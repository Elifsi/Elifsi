import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About Elifsi Technologies — Company & Engineering Principles",
  description:
    "Learn about Elifsi Technologies Private Limited: our mission, corporate structure, engineering discipline, and how we build independent software products including Evrry.",
  path: "/company",
});

export default function CompanyPage() {
  const pillars = [
    {
      title: "Independent Product Ownership",
      description:
        "Elifsi Technologies is an owner-operator software company. We do not build client projects for hire, nor do we run an outsourcing agency. We conceive, architect, launch, and operate our own intellectual property for the long run.",
    },
    {
      title: "Multi-Product Architecture",
      description:
        "Our business model is structured to launch multiple digital products under the same corporate umbrella. Evrry is our active consumer flagship, backed by a foundational platform designed to power future software horizons.",
    },
    {
      title: "Autonomous Intelligence (Eli)",
      description:
        "We build specialized AI reasoning agents that execute concrete cross-service actions. Rather than surface-level chat widgets, we build AI directly into user workflows and transactional data layers.",
    },
    {
      title: "High Engineering Standards",
      description:
        "From microsecond latency budgets to fault-tolerant distributed consensus, we engineer software that remains stable and predictable at consumer scale.",
    },
  ];

  const standards = [
    {
      label: "Zero Fabricated Claims",
      desc: "We communicate only verifiable engineering facts, active architectures, and real team capabilities. We do not invent vanity metrics or fake testimonials.",
    },
    {
      label: "User Privacy by Default",
      desc: "Consumer data gathered in products like Evrry is treated with rigorous cryptographic isolation. We never sell personal information to third-party ad brokers.",
    },
    {
      label: "Long-Term Craftsmanship",
      desc: "We avoid disposable software trends in favor of modular, typed, resilient codebases designed to evolve over decades.",
    },
  ];

  return (
    <>
      {/* 1. Header Section */}
      <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#E5E7EB]">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Company", path: "/company" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>About the Company</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827] text-balance">
              Elifsi Technologies Private Limited
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#667085] leading-relaxed">
              We are a software and technology company dedicated to engineering modern digital products,
              intelligent software platforms, and unified everyday consumer experiences.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Core Positioning & Company Identity */}
      <Section tone="surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7">
            <Eyebrow>Corporate Positioning</Eyebrow>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
              A Company Built to Create Software Products
            </h2>
            <div className="mt-6 space-y-4 text-sm sm:text-base text-[#667085] leading-relaxed">
              <p>
                In an era dominated by superficial software wrappers and short-lived startup templates,{" "}
                <strong>Elifsi Technologies</strong> was established to build serious, long-term software assets.
                We believe that software is an engineering discipline requiring deep technical rigor, sovereign
                intellectual property ownership, and obsessive attention to user experience.
              </p>
              <p>
                Our foundational company identity is deliberately separate from any single application. While{" "}
                <Link href="/products/evrry" className="text-[#F51F3D] font-semibold hover:underline">
                  Evrry
                </Link>{" "}
                is our current active consumer flagship, Elifsi Technologies possesses the technical infrastructure,
                product vision, and organizational architecture to conceive, launch, and operate a portfolio of
                software products over time.
              </p>
            </div>

            <div className="mt-8 p-4 rounded-lg bg-white border border-[#E5E7EB]">
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#111827]">
                Clear Brand Hierarchy
              </h4>
              <p className="mt-1 text-xs text-[#667085]">
                <strong>Elifsi Technologies Private Limited</strong> (The Company) →{" "}
                <strong>Evrry</strong> (Flagship Consumer Super App) →{" "}
                <strong>Eli</strong> (Embedded AI Concierge)
              </p>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-card space-y-6">
              <div className="border-b border-[#E5E7EB] pb-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F51F3D]">
                  Entity Profile
                </span>
                <h3 className="font-bold text-lg text-[#111827] mt-0.5">Corporate Specification</h3>
              </div>

              <dl className="space-y-4 text-xs">
                <div>
                  <dt className="font-bold uppercase tracking-wider text-[#667085]">Legal Entity</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-[#111827]">
                    Elifsi Technologies Private Limited
                  </dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-wider text-[#667085]">Primary Domain</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-[#111827]">
                    Software Engineering, AI Platforms, Consumer Super Apps
                  </dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-wider text-[#667085]">Current Flagship Product</dt>
                  <dd className="mt-0.5 text-sm font-semibold text-[#F51F3D]">
                    Evrry (Everyday Consumer Super App)
                  </dd>
                </div>
                <div>
                  <dt className="font-bold uppercase tracking-wider text-[#667085]">Operating Model</dt>
                  <dd className="mt-0.5 text-sm text-[#111827]">
                    Independent product ownership, proprietary IP, long-term operational stewardship
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. The Four Pillars */}
      <Section tone="white" id="principles">
        <div className="max-w-2xl mb-12">
          <Eyebrow>Strategic Foundations</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            How We Operate
          </h2>
          <p className="mt-3 text-base text-[#667085]">
            The non-negotiable architectural tenets guiding our team.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar) => (
            <div
              key={pillar.title}
              className="p-8 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] hover:bg-white hover:border-[#D1D5DB] transition-all"
            >
              <h3 className="text-xl font-bold text-[#111827]">{pillar.title}</h3>
              <p className="mt-3 text-sm text-[#667085] leading-relaxed">{pillar.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Standards & Ethics */}
      <Section tone="surface">
        <div className="max-w-3xl">
          <Eyebrow>Integrity & Ethics</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            Our Standard of Conduct
          </h2>
          <p className="mt-4 text-base text-[#667085] leading-relaxed">
            We hold ourselves to a strict standard of engineering truthfulness. We do not inflate capabilities,
            fabricate partnerships, or make unverified claims.
          </p>
        </div>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {standards.map((s) => (
            <div key={s.label} className="p-6 rounded-lg bg-white border border-[#E5E7EB]">
              <h4 className="font-bold text-base text-[#111827]">{s.label}</h4>
              <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. CTA */}
      <CTASection
        heading="Collaborate with Elifsi Technologies."
        description="We invite exceptional engineers, product designers, and ecosystem partners to connect with our corporate team."
        primaryCtaLabel="Contact Corporate Desk"
        primaryCtaHref="/contact"
        secondaryCtaLabel="View Careers"
        secondaryCtaHref="/careers"
      />
    </>
  );
}
