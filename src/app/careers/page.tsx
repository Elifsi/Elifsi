import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CTASection } from "@/components/sections/CTASection";
import { CareersList } from "@/components/careers/CareersList";
import { departments } from "@/lib/data/jobs";
import { getJobs } from "@/lib/db";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Careers — Build Software at Elifsi Technologies",
  description:
    "Explore engineering, AI systems, and product design roles at Elifsi Technologies Private Limited. Apply directly through our corporate website.",
  path: "/careers",
});

export const dynamic = "force-dynamic";

export default async function CareersPage() {
  const jobs = await getJobs();

  const benefits = [
    {
      title: "Direct Product Ownership",
      description:
        "Work on foundational products like Evrry from the ground floor. No agency billing hours or client handoffs—you own the systems you create.",
    },
    {
      title: "Top-Tier Hardware & Compute",
      description:
        "Engineers and researchers receive dedicated API compute budgets, GPU cluster access, and modern high-spec hardware allowances.",
    },
    {
      title: "Competitive Equity & Salary",
      description:
        "We believe that founders and early builders should participate directly in the long-term enterprise value of the company.",
    },
    {
      title: "Autonomous, Low-Meeting Culture",
      description:
        "We prioritize uninterrupted deep work, asynchronous technical RFCs, and high-trust engineering over bureaucratic ceremonies.",
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
              { name: "Careers", path: "/careers" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Careers & Engineering Talent</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827] text-balance">
              Build Foundational Software Products with Elifsi
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#667085] leading-relaxed">
              We are seeking exceptional engineers, systems architects, and product designers to build our
              flagship consumer applications and underlying platform infrastructure.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Open Roles Section */}
      <Section tone="surface" id="open-roles">
        <div className="max-w-2xl mb-8">
          <Eyebrow>Open Positions</Eyebrow>
          <h2 className="text-3xl font-extrabold text-[#111827] tracking-tight">
            Active Engineering & Product Roles
          </h2>
          <p className="mt-2 text-sm text-[#667085]">
            Each position offers direct application submission with secure resume upload.
          </p>
        </div>

        <CareersList jobs={jobs} departments={departments} />
      </Section>

      {/* 3. Engineering Culture & Benefits */}
      <Section tone="white">
        <div className="max-w-2xl mb-12">
          <Eyebrow>Working Environment</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            What We Offer Builders
          </h2>
          <p className="mt-3 text-base text-[#667085]">
            Our work culture is structured around technical excellence, high autonomy, and shared ownership.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((b) => (
            <div key={b.title} className="p-6 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA]">
              <h3 className="font-bold text-base text-[#111827]">{b.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">{b.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. CTA */}
      <CTASection
        eyebrow="Open Talent Pool"
        heading="Don't see your exact role listed?"
        description="We are always eager to talk with exceptional engineers, systems architects, and creators who want to build sovereign software products."
        primaryCtaLabel="Submit to General Talent Pool"
        primaryCtaHref="/careers/talent-pool-general-application"
        secondaryCtaLabel="Contact Corporate Team"
        secondaryCtaHref="/contact"
      />
    </>
  );
}
