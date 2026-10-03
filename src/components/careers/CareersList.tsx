"use client";

import { useState } from "react";
import Link from "next/link";
import { JobOpening, Department } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface CareersListProps {
  jobs: JobOpening[];
  departments: readonly Department[];
}

export function CareersList({ jobs, departments }: CareersListProps) {
  const [selectedDepartment, setSelectedDepartment] = useState<string>("All");

  const filteredJobs =
    selectedDepartment === "All"
      ? jobs
      : jobs.filter((j) => j.department === selectedDepartment);

  return (
    <div>
      {/* Department Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setSelectedDepartment("All")}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
            selectedDepartment === "All"
              ? "bg-[#111827] text-white"
              : "bg-[#F7F8FA] text-[#667085] hover:bg-[#E5E7EB] hover:text-[#111827]"
          }`}
        >
          All Positions ({jobs.length})
        </button>

        {departments.map((dept) => {
          const count = jobs.filter((j) => j.department === dept).length;
          return (
            <button
              key={dept}
              type="button"
              onClick={() => setSelectedDepartment(dept)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-colors cursor-pointer ${
                selectedDepartment === dept
                  ? "bg-[#111827] text-white"
                  : "bg-[#F7F8FA] text-[#667085] hover:bg-[#E5E7EB] hover:text-[#111827]"
              }`}
            >
              {dept} ({count})
            </button>
          );
        })}
      </div>

      {/* Jobs Grid or Authentic Empty State */}
      {filteredJobs.length === 0 ? (
        <div className="rounded-xl border border-[#E5E7EB] bg-white p-8 text-center max-w-lg mx-auto">
          <div className="w-10 h-10 rounded-full bg-[#F7F8FA] text-[#667085] flex items-center justify-center mx-auto mb-3">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h3 className="font-bold text-base text-[#111827]">
            No Active Roles in {selectedDepartment} Right Now
          </h3>
          <p className="mt-2 text-xs text-[#667085] leading-relaxed">
            We are not actively hiring for this specific department at this time. However, exceptional
            talent is always invited to submit their credentials to our general talent pool.
          </p>
          <div className="mt-5">
            <Button
              href="/careers/talent-pool-general-application"
              variant="primary"
              size="sm"
            >
              Submit General Application
            </Button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredJobs.map((job) => (
            <div
              key={job.slug}
              className="flex flex-col p-6 rounded-xl border border-[#E5E7EB] bg-white hover:border-[#F51F3D]/40 hover:shadow-card transition-all duration-200"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#F51F3D]">
                  {job.department}
                </span>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-[#667085]">{job.employmentType}</span>
                  <Badge variant={job.status === "open" ? "brand" : "neutral"}>
                    {job.status === "open" ? "Actively Hiring" : "Upcoming"}
                  </Badge>
                </div>
              </div>

              <h3 className="font-bold text-xl text-[#111827]">
                <Link
                  href={`/careers/${job.slug}`}
                  className="hover:text-[#F51F3D] transition-colors"
                >
                  {job.title}
                </Link>
              </h3>

              <p className="text-xs text-[#667085] mt-1 flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{job.location}</span>
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[#667085] leading-relaxed flex-1 line-clamp-3">
                {job.summary}
              </p>

              <div className="mt-6 pt-4 border-t border-[#E5E7EB] flex items-center justify-between">
                <span className="text-[11px] font-mono text-[#9CA3AF]">
                  Ref: {job.slug}
                </span>
                <Button href={`/careers/${job.slug}`} variant="secondary" size="sm">
                  View Role & Apply →
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
