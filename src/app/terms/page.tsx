import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Terms of Service — Elifsi Technologies",
  description:
    "Official Terms of Service governing the use of Elifsi Technologies Private Limited corporate website and digital assets.",
  path: "/terms",
});

export default function TermsPage() {
  const lastUpdated = "October 2026";

  return (
    <>
      <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#E5E7EB]">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Terms of Service", path: "/terms" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Legal & Governance</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827]">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-[#667085]">
              Last updated: {lastUpdated} · Official Terms of {siteConfig.companyName}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed text-[#667085]">
          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">1. Acceptance of Terms</h2>
            <p>
              By accessing or using the corporate website of <strong>{siteConfig.companyName}</strong> (&ldquo;Elifsi,&rdquo; &ldquo;we,&rdquo; or &ldquo;us&rdquo;),
              you agree to comply with and be bound by these Terms of Service. If you do not agree with any part
              of these terms, you must discontinue use of this site immediately.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">2. Corporate Positioning & Intellectual Property</h2>
            <p>
              All materials, design marks, graphics, source code, 3D assets, logos, and textual content on this website
              are the exclusive intellectual property of <strong>{siteConfig.companyName}</strong>.
            </p>
            <p className="mt-2">
              <strong>Evrry</strong> and <strong>Eli</strong> are proprietary trademarks and product assets created and
              operated by Elifsi Technologies Private Limited. Unauthorized duplication, reproduction, reverse
              engineering, or distribution of these brand identities is strictly prohibited.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">3. Permissible Website Usage</h2>
            <p>You agree not to:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>Use the website in any manner that impairs, overburdens, or damages our server infrastructure.</li>
              <li>Submit fraudulent contact requests or inject automated bot payloads into application endpoints.</li>
              <li>Transmit unauthorized promotional materials or spam through our corporate communication desks.</li>
              <li>Attempt unauthorized penetration testing without prior written authorization from our security team.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">4. Candidate Submissions & Accuracy</h2>
            <p>
              Candidates applying for employment through our Careers portal warrant that all provided resume data,
              educational qualifications, and employment histories are accurate and truthful. Providing fraudulent
              credentials constitutes grounds for immediate disqualification.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">5. Disclaimer of Warranties</h2>
            <p>
              This website and its contents are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis.
              Elifsi Technologies makes no express or implied representations regarding uninterrupted site availability,
              and reserves the right to modify or restructure digital routes without prior notification.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">6. Governing Law & Jurisdiction</h2>
            <p>
              These Terms of Service are governed by and construed in accordance with the laws of Nepal. Any disputes
              arising out of or related to these terms shall be subject to the exclusive jurisdiction of the competent
              courts located in Janakpurdham, Dhanusha District, Nepal.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">7. Corporate Contact</h2>
            <p>
              For legal inquiries or notices regarding these Terms, contact our corporate affairs desk at{" "}
              <a href={`mailto:${siteConfig.contactEmail}`} className="text-[#F51F3D] font-mono hover:underline">
                {siteConfig.contactEmail}
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
}
