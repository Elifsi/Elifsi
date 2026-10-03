"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { JobOpening, Department } from "@/types/content";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface JobManagementConsoleProps {
  initialJobs: JobOpening[];
}

export function JobManagementConsole({ initialJobs }: JobManagementConsoleProps) {
  const [jobs, setJobs] = useState<JobOpening[]>(initialJobs);
  const [filterDepartment, setFilterDepartment] = useState<string>("All");
  const [filterStatus, setFilterStatus] = useState<string>("All");
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  // Create Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    department: "Engineering" as Department,
    location: "Janakpur, Nepal / Hybrid",
    employmentType: "Full-time" as JobOpening["employmentType"],
    status: "open" as JobOpening["status"],
    summary: "",
    responsibilitiesText: "",
    requirementsText: "",
    niceToHaveText: "",
    benefitsText: "",
  });

  function handleTitleChange(val: string) {
    const generatedSlug = val
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    setFormData((prev) => ({
      ...prev,
      title: val,
      slug: generatedSlug,
    }));
  }

  async function handleCreateJob(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const responsibilities = formData.responsibilitiesText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const requirements = formData.requirementsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const niceToHave = formData.niceToHaveText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const benefits = formData.benefitsText
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      title: formData.title,
      slug: formData.slug,
      department: formData.department,
      location: formData.location,
      employmentType: formData.employmentType,
      status: formData.status,
      summary: formData.summary,
      responsibilities,
      requirements,
      niceToHave,
      benefits,
    };

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create job.");
      }

      setJobs((prev) => [data.job, ...prev.filter((j) => j.slug !== data.job.slug)]);
      setShowCreateModal(false);
      setFormData({
        title: "",
        slug: "",
        department: "Engineering",
        location: "Janakpur, Nepal / Hybrid",
        employmentType: "Full-time",
        status: "open",
        summary: "",
        responsibilitiesText: "",
        requirementsText: "",
        niceToHaveText: "",
        benefitsText: "",
      });
      router.refresh();
    } catch (err) {
      setErrorMessage(err instanceof Error ? err.message : "Error saving job.");
    } finally {
      setIsSubmitting(false);
    }
  }

  async function handleToggleStatus(slug: string, currentStatus: JobOpening["status"]) {
    const newStatus: JobOpening["status"] = currentStatus === "open" ? "archived" : "open";
    const job = jobs.find((j) => j.slug === slug);
    if (!job) return;

    try {
      const res = await fetch("/api/admin/jobs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...job, status: newStatus }),
      });

      if (res.ok) {
        setJobs((prev) =>
          prev.map((j) => (j.slug === slug ? { ...j, status: newStatus } : j))
        );
        router.refresh();
      }
    } catch (err) {
      console.error("[job-toggle-error]", err);
    }
  }

  async function handleDelete(slug: string) {
    if (!confirm(`Are you sure you want to permanently delete the position '${slug}'?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/jobs?slug=${encodeURIComponent(slug)}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setJobs((prev) => prev.filter((j) => j.slug !== slug));
        router.refresh();
      }
    } catch (err) {
      console.error("[job-delete-error]", err);
    }
  }

  const filteredJobs = jobs.filter((job) => {
    const matchDept = filterDepartment === "All" || job.department === filterDepartment;
    const matchStatus = filterStatus === "All" || job.status === filterStatus;
    return matchDept && matchStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header and Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Job Openings Console
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Publish, edit, and archive career listings across all Elifsi product initiatives.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#F51F3D] hover:bg-[#D91432] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
        >
          <span>+ Create New Position</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-[#E5E7EB]">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-[#667085]">Department:</span>
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="h-9 px-2.5 rounded border border-[#E5E7EB] text-xs font-medium text-[#111827] bg-[#F7F8FA] focus:outline-none"
          >
            <option value="All">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="AI & Systems">AI & Systems</option>
            <option value="Product & Design">Product & Design</option>
            <option value="Operations & Strategy">Operations & Strategy</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-[#667085]">Status:</span>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-9 px-2.5 rounded border border-[#E5E7EB] text-xs font-medium text-[#111827] bg-[#F7F8FA] focus:outline-none"
          >
            <option value="All">All Statuses</option>
            <option value="open">Open</option>
            <option value="upcoming">Upcoming</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="ml-auto text-xs text-[#667085] font-mono">
          Showing {filteredJobs.length} of {jobs.length} postings
        </div>
      </div>

      {/* Jobs Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] border-b border-[#E5E7EB] text-[#667085] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Title & Slug</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Posted Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredJobs.map((job) => (
                <tr key={job.slug} className="hover:bg-[#F7F8FA]/60 transition-colors">
                  <td className="py-3.5 px-4">
                    <span className="font-bold text-sm text-[#111827] block">{job.title}</span>
                    <span className="font-mono text-[10px] text-[#667085]">/careers/{job.slug}</span>
                  </td>
                  <td className="py-3.5 px-4 font-semibold text-[#111827]">{job.department}</td>
                  <td className="py-3.5 px-4 text-[#667085]">{job.location}</td>
                  <td className="py-3.5 px-4">
                    <span
                      className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                        job.status === "open"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : job.status === "upcoming"
                          ? "bg-blue-50 text-blue-700 border border-blue-200"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-[#667085]">{job.publishedAt}</td>
                  <td className="py-3.5 px-4 text-right space-x-2">
                    <Link
                      href={`/careers/${job.slug}`}
                      target="_blank"
                      className="px-2 py-1 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-[11px] font-semibold text-[#111827] hover:text-[#F51F3D]"
                    >
                      Preview
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleToggleStatus(job.slug, job.status)}
                      className="px-2 py-1 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-[11px] font-semibold text-[#111827] hover:bg-gray-200 cursor-pointer"
                    >
                      {job.status === "open" ? "Archive" : "Activate"}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(job.slug)}
                      className="px-2 py-1 rounded bg-red-50 border border-red-200 text-[11px] font-semibold text-red-600 hover:bg-red-100 cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Job Opening */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-6">
              <div>
                <h2 className="text-xl font-extrabold text-[#111827]">Create New Job Opening</h2>
                <p className="text-xs text-[#667085] mt-0.5">
                  Publishes to the live careers portal and Supabase database.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    Job Title <span className="text-[#F51F3D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => handleTitleChange(e.target.value)}
                    placeholder="e.g. Distributed Infrastructure Engineer"
                    className="w-full h-10 px-3 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    URL Slug <span className="text-[#F51F3D]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.slug}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, slug: e.target.value.toLowerCase() }))
                    }
                    placeholder="e.g. distributed-infrastructure-engineer"
                    className="w-full h-10 px-3 rounded border border-[#E5E7EB] font-mono text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    Department
                  </label>
                  <select
                    value={formData.department}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, department: e.target.value as Department }))
                    }
                    className="w-full h-10 px-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] bg-white focus:border-[#F51F3D] focus:outline-none"
                  >
                    <option value="Engineering">Engineering</option>
                    <option value="AI & Systems">AI & Systems</option>
                    <option value="Product & Design">Product & Design</option>
                    <option value="Operations & Strategy">Operations & Strategy</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    Employment Type
                  </label>
                  <select
                    value={formData.employmentType}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        employmentType: e.target.value as JobOpening["employmentType"],
                      }))
                    }
                    className="w-full h-10 px-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] bg-white focus:border-[#F51F3D] focus:outline-none"
                  >
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Contract">Contract</option>
                    <option value="Hybrid / Remote">Hybrid / Remote</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    Initial Status
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        status: e.target.value as JobOpening["status"],
                      }))
                    }
                    className="w-full h-10 px-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] bg-white focus:border-[#F51F3D] focus:outline-none"
                  >
                    <option value="open">Open (Live on Website)</option>
                    <option value="upcoming">Upcoming</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                  Location
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData((prev) => ({ ...prev, location: e.target.value }))}
                  placeholder="Janakpur, Nepal / Hybrid"
                  className="w-full h-10 px-3 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                />
              </div>

              <div>
                <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                  Role Summary <span className="text-[#F51F3D]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  value={formData.summary}
                  onChange={(e) => setFormData((prev) => ({ ...prev, summary: e.target.value }))}
                  placeholder="Concise overview of what this role entails at Elifsi Technologies..."
                  className="w-full p-3 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    Key Responsibilities (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.responsibilitiesText}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, responsibilitiesText: e.target.value }))
                    }
                    placeholder="Architect distributed systems...&#10;Optimize query latency...&#10;Lead technical reviews..."
                    className="w-full p-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    Requirements (one per line)
                  </label>
                  <textarea
                    rows={4}
                    value={formData.requirementsText}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, requirementsText: e.target.value }))
                    }
                    placeholder="4+ years experience...&#10;Deep proficiency in TypeScript or Go...&#10;Distributed systems background..."
                    className="w-full p-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    Nice to Have (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.niceToHaveText}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, niceToHaveText: e.target.value }))
                    }
                    placeholder="Open source contributions...&#10;Experience with Kafka or Redis..."
                    className="w-full p-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="font-bold uppercase tracking-wider text-[#111827] block mb-1">
                    Benefits & Perks (one per line)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.benefitsText}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, benefitsText: e.target.value }))
                    }
                    placeholder="Competitive equity...&#10;Comprehensive healthcare...&#10;Flexible hybrid setup..."
                    className="w-full p-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                  />
                </div>
              </div>

              {errorMessage && (
                <div className="p-3 rounded bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
                  {errorMessage}
                </div>
              )}

              <div className="pt-4 border-t border-[#E5E7EB] flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded border border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <Button type="submit" variant="primary" size="md" isLoading={isSubmitting}>
                  {isSubmitting ? "Publishing..." : "Publish Position"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
