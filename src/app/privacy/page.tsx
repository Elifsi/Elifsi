import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Privacy Policy — Elifsi Technologies",
  description:
    "Official Privacy Policy of Elifsi Technologies Private Limited governing corporate website usage, candidate submissions, and product data standards.",
  path: "/privacy",
});

export default function PrivacyPage() {
  const lastUpdated = "October 2026";

  return (
    <>
      <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#E5E7EB]">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Privacy Policy", path: "/privacy" },
            ]}
          />
          <div className="max-w-3xl">
            <Eyebrow>Data Governance & Privacy</Eyebrow>
            <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-[#111827]">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-[#667085]">
              Last updated: {lastUpdated} · Official Policy of {siteConfig.companyName}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="white">
        <div className="max-w-3xl mx-auto space-y-10 text-sm leading-relaxed text-[#667085]">
          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">1. Executive Overview</h2>
            <p>
              This Privacy Policy explains how <strong>{siteConfig.companyName}</strong> (&ldquo;Elifsi,&rdquo; &ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;)
              collects, processes, and protects information gathered through our corporate website ({siteConfig.url})
              and related communication channels.
            </p>
            <p className="mt-2">
              We respect user privacy and do not sell, rent, or monetize personal data to third-party ad brokers.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">2. Information Collected via Corporate Services</h2>
            <p>We collect information you explicitly provide when interacting with our corporate website:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>
                <strong>Corporate Inquiries:</strong> When submitting our contact form, we collect your name, email,
                phone number, organization, topic classification, and message contents.
              </li>
              <li>
                <strong>Job Applications:</strong> When applying for roles via our Careers portal, we collect your full
                name, contact details, location, portfolio/GitHub/LinkedIn URLs, cover letter, and resume document.
              </li>
              <li>
                <strong>Technical Telemetry:</strong> Standard non-identifying server logs including IP addresses,
                browser types, and timestamp data for the sole purpose of DDoS mitigation and rate limiting.
              </li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">3. Purpose and Legal Basis of Processing</h2>
            <p>We process collected data exclusively for:</p>
            <ul className="list-disc pl-5 mt-2 space-y-1.5">
              <li>Responding to business inquiries and partnership discussions.</li>
              <li>Evaluating candidate suitability for open positions and talent pool records.</li>
              <li>Safeguarding our infrastructure against malicious automated spam and attacks.</li>
              <li>Complying with statutory and regulatory obligations under applicable laws.</li>
            </ul>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">4. Candidate Resume & Career Data Protection</h2>
            <p>
              Resumes and candidate materials submitted through our website are stored securely and accessed strictly
              by authorized engineering leadership and hiring personnel. Candidate files are retained solely for
              recruitment evaluation and are purged upon candidate request.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">5. Relationship to Products (Evrry)</h2>
            <p>
              Our flagship consumer application, <strong>Evrry</strong>, operates under specific product terms and
              end-user privacy agreements configured to safeguard personal travel, dining, and financial preferences.
              Corporate website telemetry is completely decoupled from Evrry consumer account records.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">6. Data Security Measures</h2>
            <p>
              We implement industry-standard encryption in transit (TLS 1.3) and at rest, principle-of-least-privilege
              access controls, and regular architectural audits. Our email infrastructure is hosted through verified
              transactional providers adhering to SOC 2 Type II compliance.
            </p>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[#111827] mb-3">7. Your Rights and Inquiries</h2>
            <p>
              You have the right to request access to, correction of, or deletion of personal information held by
              Elifsi Technologies. To exercise these rights, email our data desk at{" "}
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
