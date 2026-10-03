import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section, Eyebrow } from "@/components/ui/Section";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Badge } from "@/components/ui/Badge";
import { JobApplicationForm } from "@/components/careers/JobApplicationForm";
import { jobOpenings } from "@/lib/data/jobs";
import { siteConfig } from "@/lib/site-config";
import { buildMetadata } from "@/lib/seo";

interface JobDetailPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return jobOpenings.map((job) => ({
    slug: job.slug,
  }));
}

export async function generateMetadata({ params }: JobDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = jobOpenings.find((j) => j.slug === slug);

  if (!job) {
    return buildMetadata({
      title: "Position Not Found",
      description: "The requested job opening does not exist.",
      noIndex: true,
    });
  }

  return buildMetadata({
    title: `${job.title} — Careers`,
    description: job.summary,
    path: `/careers/${job.slug}`,
  });
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { slug } = await params;
  const job = jobOpenings.find((j) => j.slug === slug);

  if (!job) {
    notFound();
  }

  const jobSchema = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.summary,
    datePosted: job.publishedAt,
    employmentType:
      job.employmentType === "Full-time"
        ? "FULL_TIME"
        : job.employmentType === "Part-time"
        ? "PART_TIME"
        : "CONTRACTOR",
    hiringOrganization: {
      "@type": "Organization",
      name: siteConfig.companyName,
      sameAs: siteConfig.url,
      logo: `${siteConfig.url}/logo.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressCountry: "IN",
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jobSchema) }}
      />

      {/* 1. Header Section */}
      <section className="bg-white pt-10 pb-16 lg:pt-16 lg:pb-20 border-b border-[#E5E7EB]">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Home", path: "/" },
              { name: "Careers", path: "/careers" },
              { name: job.title, path: `/careers/${job.slug}` },
            ]}
          />
          <div className="max-w-4xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-[#F51F3D]">
                {job.department}
              </span>
              <span className="text-[#E5E7EB]">·</span>
              <span className="text-xs text-[#667085]">{job.employmentType}</span>
              <span className="text-[#E5E7EB]">·</span>
              <Badge variant="brand">{job.status === "open" ? "Active Opening" : "Talent Pool"}</Badge>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-[#111827]">
              {job.title}
            </h1>

            <p className="mt-4 text-base sm:text-lg text-[#667085] leading-relaxed max-w-3xl">
              {job.summary}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-6 text-xs text-[#667085] pt-4 border-t border-[#E5E7EB]">
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>Posted {job.publishedAt}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span>Direct Applications Open</span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* 2. Main Job Details & Application Form */}
      <Section tone="surface">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Job Description and Application Form */}
          <div className="lg:col-span-8 space-y-12">
            {/* Responsibilities */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-xs">
              <h2 className="text-xl font-bold text-[#111827] mb-4">Core Responsibilities</h2>
              <ul className="space-y-3">
                {job.responsibilities.map((resp, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#667085] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F51F3D] mt-2 shrink-0" />
                    <span>{resp}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Requirements */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-xs">
              <h2 className="text-xl font-bold text-[#111827] mb-4">Requirements & Experience</h2>
              <ul className="space-y-3">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#667085] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#111827] mt-2 shrink-0" />
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Nice to Have */}
            {job.niceToHave.length > 0 && (
              <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-xs">
                <h2 className="text-xl font-bold text-[#111827] mb-4">Nice to Have</h2>
                <ul className="space-y-3">
                  {job.niceToHave.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-[#667085] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#9CA3AF] mt-2 shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-xs">
              <h2 className="text-xl font-bold text-[#111827] mb-4">Compensation & Benefits</h2>
              <ul className="space-y-3">
                {job.benefits.map((b, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-[#667085] leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Embedded Direct Application Form */}
            <div id="apply-form" className="rounded-xl border border-[#E5E7EB] bg-white p-8 shadow-card">
              <div className="border-b border-[#E5E7EB] pb-4 mb-6">
                <Eyebrow>Direct Submission</Eyebrow>
                <h2 className="text-2xl font-extrabold text-[#111827]">
                  Apply for {job.title}
                </h2>
                <p className="mt-1 text-xs text-[#667085]">
                  Please fill out the details below. We review every application carefully.
                </p>
              </div>

              <JobApplicationForm jobSlug={job.slug} jobTitle={job.title} />
            </div>
          </div>

          {/* Right Column: Corporate Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs space-y-4">
              <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider">
                About the Team
              </h3>
              <p className="text-xs text-[#667085] leading-relaxed">
                You will be working directly with the founding engineering and product leadership of{" "}
                <strong>Elifsi Technologies Private Limited</strong> on high-impact products including Evrry.
              </p>
              <div className="pt-3 border-t border-[#E5E7EB] text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-[#667085]">Department:</span>
                  <span className="font-semibold text-[#111827]">{job.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Location:</span>
                  <span className="font-semibold text-[#111827]">{job.location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#667085]">Employment Type:</span>
                  <span className="font-semibold text-[#111827]">{job.employmentType}</span>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-[#E5E7EB] bg-white p-6 shadow-xs">
              <h3 className="font-bold text-sm text-[#111827] uppercase tracking-wider mb-2">
                Hiring Process
              </h3>
              <ol className="space-y-3 text-xs text-[#667085]">
                <li className="flex gap-2">
                  <span className="font-mono font-bold text-[#F51F3D]">1.</span>
                  <span>Direct application & resume review</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono font-bold text-[#F51F3D]">2.</span>
                  <span>Introductory technical discussion</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono font-bold text-[#F51F3D]">3.</span>
                  <span>Deep-dive architecture or design walkthrough</span>
                </li>
                <li className="flex gap-2">
                  <span className="font-mono font-bold text-[#F51F3D]">4.</span>
                  <span>Offer and team onboarding</span>
                </li>
              </ol>
            </div>

            <div className="p-4 rounded-lg bg-[#FFF1F3] border border-[#F51F3D]/20 text-xs text-[#667085]">
              <span className="font-bold text-[#D91432] block mb-1">Corporate Inquiries</span>
              Have questions prior to submitting? Reach out to{" "}
              <a href="mailto:careers@elifsi.com" className="text-[#F51F3D] font-mono hover:underline">
                careers@elifsi.com
              </a>
              .
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
