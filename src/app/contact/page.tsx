import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { ContactForm } from "@/components/sections/ContactForm";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";
import { InquiryTopic } from "@/types/content";

export const metadata: Metadata = buildMetadata({
  title: "Contact — Elifsi Technologies Corporate Desk",
  description:
    "Direct corporate inquiries, partnership proposals, and product questions to Elifsi Technologies Private Limited.",
  path: "/contact",
});

interface ContactPageProps {
  searchParams: Promise<{ topic?: string }>;
}

export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { topic } = await searchParams;

  let prefilledTopic: InquiryTopic | undefined;
  if (topic === "product") prefilledTopic = "Evrry Product Inquiry";
  if (topic === "partnership") prefilledTopic = "Partnership & Ecosystem";
  if (topic === "business") prefilledTopic = "Business & Enterprise";
  if (topic === "careers") prefilledTopic = "Careers & Talent";
  if (topic === "media") prefilledTopic = "Media & Press";

  return (
    <>
      {/* 1. Header Section */}
      <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#E5E7EB]">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Corporate Inquiries</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827] text-balance">
              Contact Elifsi Technologies Private Limited
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-[#667085] leading-relaxed">
              We welcome dialogue with prospective partners, ecosystem participants, candidates, and industry
              colleagues. Inquiries submitted here are routed directly to the appropriate team.
            </p>
          </div>
        </Container>
      </section>

      {/* 2. Contact Form & Corporate Channels */}
      <Section tone="surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-card">
              <div className="border-b border-[#E5E7EB] pb-4 mb-6">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#F51F3D]">
                  Secure Transmission Gateway
                </span>
                <h2 className="text-xl font-bold text-[#111827] mt-0.5">
                  Send a Corporate Message
                </h2>
                <p className="text-xs text-[#667085] mt-1">
                  Fill in the details below. You will receive an immediate confirmation code.
                </p>
              </div>

              <ContactForm prefilledTopic={prefilledTopic} />
            </div>
          </div>

          {/* Right Column: Channels & Details */}
          <div className="lg:col-span-5 space-y-6">
            {/* Direct Communication Channels */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-5">
              <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">
                Direct Contact Desks
              </h3>

              <div className="space-y-4 text-xs">
                <div className="p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB]">
                  <span className="font-bold uppercase tracking-wider text-[#667085] block text-[10px]">
                    General & Corporate Inquiries
                  </span>
                  <a
                    href={`mailto:${siteConfig.contactEmail}`}
                    className="font-mono text-sm font-semibold text-[#F51F3D] hover:underline mt-1 block"
                  >
                    {siteConfig.contactEmail}
                  </a>
                  <p className="text-[#667085] mt-1 text-[11px]">
                    For company overview, institutional communication, and general requests.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB]">
                  <span className="font-bold uppercase tracking-wider text-[#667085] block text-[10px]">
                    Recruitment & Engineering Talent
                  </span>
                  <a
                    href={`mailto:${siteConfig.careersEmail}`}
                    className="font-mono text-sm font-semibold text-[#F51F3D] hover:underline mt-1 block"
                  >
                    {siteConfig.careersEmail}
                  </a>
                  <p className="text-[#667085] mt-1 text-[11px]">
                    For engineering candidates and recruitment discussions.
                  </p>
                </div>

                <div className="p-3.5 rounded-lg bg-[#F7F8FA] border border-[#E5E7EB]">
                  <span className="font-bold uppercase tracking-wider text-[#667085] block text-[10px]">
                    Evrry Ecosystem Partnerships
                  </span>
                  <span className="font-mono text-sm font-semibold text-[#111827] mt-1 block">
                    partnerships@elifsi.com
                  </span>
                  <p className="text-[#667085] mt-1 text-[11px]">
                    For merchant onboarding, fleet operators, and API integrations.
                  </p>
                </div>
              </div>
            </div>

            {/* Corporate Entity Details */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider mb-3">
                Corporate Headquarters
              </h3>
              <div className="text-xs text-[#667085] space-y-1.5 leading-relaxed">
                <p className="font-semibold text-[#111827]">{siteConfig.companyName}</p>
                <p>Incorporated under the Office of the Company Registrar, Nepal</p>
                <p>Headquarters: Janakpurdham (Janakpur), Madhesh Province, Nepal</p>
                <div className="pt-2 text-[11px] text-[#9CA3AF]">
                  Operating hours: Sunday – Friday, 09:30 – 17:30 NPT (UTC+5:45)
                </div>
              </div>
            </div>

            {/* Official Social Channels */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider mb-3">
                Official Social Channels
              </h3>
              <SocialLinks showLabels />
            </div>

            {/* Response Time Guarantee */}
            <div className="p-4 rounded-lg bg-[#FFF1F3] border border-[#F51F3D]/20 text-xs text-[#111827]">
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-[#F51F3D]" />
                <span className="font-bold text-[#D91432]">Response Protocol</span>
              </div>
              <p className="text-[#667085] leading-relaxed">
                All submissions receive an automated reference code. Our operations desk aims to review and
                respond to genuine business or product inquiries within 1–2 business days.
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
