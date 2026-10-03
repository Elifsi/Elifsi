import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SpatialCard } from "@/components/3d/SpatialCard";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";
import { products, futureHorizons } from "@/lib/data/products";

export const metadata: Metadata = buildMetadata({
  title: "Products & Software Ecosystem — Elifsi Technologies",
  description:
    "Explore the software products engineered and operated by Elifsi Technologies Private Limited, including our flagship consumer super app Evrry, and our proprietary platform architecture.",
  path: "/products",
});

export default function ProductsPage() {
  const evrry = products.find((p) => p.id === "evrry")!;
  const coreEngine = products.find((p) => p.id === "elifsi-core-platform")!;

  return (
    <>
      {/* 1. Header Section */}
      <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#E5E7EB]">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Products", path: "/products" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Product Ecosystem</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827] text-balance">
              Software Products Built for Scale and Longevity
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#667085] leading-relaxed">
              Elifsi Technologies Private Limited designs, engineers, and operates modern software products.
              Rather than building single-purpose point solutions, we architect cohesive software systems that
              solve complex consumer and infrastructure problems.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Flagship Product: Evrry */}
      <Section tone="surface" id="flagship">
        <div className="rounded-2xl border border-[#E5E7EB] bg-white p-8 lg:p-12 shadow-card overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-[#E5E7EB]">
            <div className="flex items-center gap-3">
              <Badge variant="brand">Active Flagship Product</Badge>
              <span className="text-xs text-[#667085] hidden sm:inline">
                Created & Operated by Elifsi Technologies
              </span>
            </div>
            <Link
              href="/products/evrry"
              className="text-xs font-bold text-[#F51F3D] hover:underline flex items-center gap-1"
            >
              <span>Dedicated Product Page</span>
              <span>→</span>
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
                {evrry.name}
              </h2>
              <p className="text-base sm:text-lg font-semibold text-[#F51F3D] mt-1">
                {evrry.tagline}
              </p>
              <p className="mt-4 text-sm sm:text-base text-[#667085] leading-relaxed">
                {evrry.summary}
              </p>
              <p className="mt-3 text-sm text-[#667085] leading-relaxed">
                {evrry.description}
              </p>

              <div className="mt-6 p-4 rounded-lg bg-[#FFF1F3] border border-[#F51F3D]/20">
                <span className="text-xs font-bold uppercase tracking-wider text-[#D91432] block mb-1">
                  Eli — The AI Concierge
                </span>
                <p className="text-xs text-[#111827] leading-relaxed">
                  Evrry is powered by Eli, an intelligent assistant capable of parsing multi-faceted requests
                  and coordinating actions across food, mobility, reservations, and unified payments with natural ease.
                </p>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <Button href="/products/evrry" variant="primary" size="md">
                  Explore Evrry Features & Architecture
                </Button>
                <Button href="/contact?topic=product" variant="outline" size="md">
                  Product Inquiries
                </Button>
              </div>
            </div>

            <div className="lg:col-span-5">
              <SpatialCard className="rounded-xl border border-[#E5E7EB] bg-[#F7F8FA] p-6 shadow-sm">
                <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-[#111827] mb-3">
                  Service Verticals in Evrry
                </h4>
                <div className="space-y-2 text-xs">
                  {evrry.features.map((f) => (
                    <div key={f.title} className="p-3 bg-white rounded border border-[#E5E7EB]">
                      <span className="font-bold text-[#111827] block">{f.title}</span>
                      <span className="text-[#667085] text-[11px] mt-0.5 line-clamp-2 block leading-snug">
                        {f.description}
                      </span>
                    </div>
                  ))}
                </div>
              </SpatialCard>
            </div>
          </div>
        </div>
      </Section>

      {/* 3. Platform Architecture: Elifsi Core Engine */}
      <Section tone="white" id="core-engine">
        <div className="max-w-3xl mb-12">
          <Eyebrow>Foundation Infrastructure</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            {coreEngine.name}
          </h2>
          <p className="text-base font-semibold text-[#667085] mt-1">{coreEngine.tagline}</p>
          <p className="mt-4 text-base text-[#667085] leading-relaxed">{coreEngine.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {coreEngine.features.map((feat) => (
            <div key={feat.title} className="p-6 rounded-xl border border-[#E5E7EB] bg-[#F7F8FA]">
              <div className="w-2 h-2 rounded-full bg-[#111827] mb-3" />
              <h3 className="font-bold text-base text-[#111827]">{feat.title}</h3>
              <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 4. Future Product Horizons */}
      <Section tone="surface" id="future">
        <div className="max-w-3xl mb-10">
          <Eyebrow>Horizon Expansion</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111827] tracking-tight">
            More Products Will Follow
          </h2>
          <p className="mt-3 text-base text-[#667085]">
            Elifsi Technologies is designed to be a multi-product company. As our foundational intelligence
            and transactional infrastructure matures, we will launch complementary digital products across
            consumer and enterprise verticals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {futureHorizons.map((horizon) => (
            <div
              key={horizon.title}
              className="p-6 rounded-xl border border-dashed border-[#D1D5DB] bg-white flex flex-col justify-between"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#F51F3D]">
                  {horizon.category}
                </span>
                <h3 className="font-bold text-base text-[#111827] mt-1">{horizon.title}</h3>
                <p className="mt-2 text-xs sm:text-sm text-[#667085] leading-relaxed">
                  {horizon.description}
                </p>
              </div>
              <div className="mt-6 pt-3 border-t border-[#E5E7EB] text-[11px] font-mono text-[#667085]">
                Status: In Research & Prototyping
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* 5. CTA */}
      <CTASection
        heading="Experience Evrry or Build the Next Product."
        description="Discover how Evrry brings everyday life into one AI-first interface, or join the engineering team architecting our next software horizon."
        primaryCtaLabel="Inspect Evrry"
        primaryCtaHref="/products/evrry"
        secondaryCtaLabel="Engineering Careers"
        secondaryCtaHref="/careers"
      />
    </>
  );
}
