"use client";

import { useState } from "react";
import { StoredJobApplication } from "@/lib/db";
import { Button } from "@/components/ui/Button";

interface ApplicationTrackingConsoleProps {
  initialApplications: StoredJobApplication[];
}

export function ApplicationTrackingConsole({
  initialApplications,
}: ApplicationTrackingConsoleProps) {
  const [applications, setApplications] = useState<StoredJobApplication[]>(initialApplications);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedApp, setSelectedApp] = useState<StoredJobApplication | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editNotes, setEditNotes] = useState("");

  function openCandidateDetail(app: StoredJobApplication) {
    setSelectedApp(app);
    setEditNotes(app.notes || "");
  }

  async function handleStatusChange(
    id: string,
    newStatus: StoredJobApplication["status"],
    notesToSave?: string
  ) {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/applications", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          notes: notesToSave !== undefined ? notesToSave : editNotes,
        }),
      });

      if (res.ok) {
        setApplications((prev) =>
          prev.map((a) =>
            a.id === id
              ? {
                  ...a,
                  status: newStatus,
                  notes: notesToSave !== undefined ? notesToSave : editNotes,
                }
              : a
          )
        );
        if (selectedApp && selectedApp.id === id) {
          setSelectedApp((prev) =>
            prev
              ? {
                  ...prev,
                  status: newStatus,
                  notes: notesToSave !== undefined ? notesToSave : editNotes,
                }
              : null
          );
        }
      }
    } catch (err) {
      console.error("[app-update-error]", err);
    } finally {
      setIsUpdating(false);
    }
  }

  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.referenceId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || app.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
          Candidate Pipeline (ATS)
        </h1>
        <p className="text-xs text-[#667085] mt-1">
          Review candidate profiles, evaluate resumes, track interview stages, and store hiring notes.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-[#E5E7EB]">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search candidates by name, email, role, or ref ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 px-3 rounded border border-[#E5E7EB] text-xs text-[#111827] bg-[#F7F8FA] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-[#667085]">Stage:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-2.5 rounded border border-[#E5E7EB] text-xs font-medium text-[#111827] bg-[#F7F8FA] focus:outline-none"
          >
            <option value="All">All Stages</option>
            <option value="new">New</option>
            <option value="reviewing">In Review</option>
            <option value="interviewed">Interviewed</option>
            <option value="accepted">Accepted</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="text-xs text-[#667085] font-mono">
          Showing {filteredApps.length} of {applications.length} applicants
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] border-b border-[#E5E7EB] text-[#667085] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Applicant & Reference</th>
                <th className="py-3 px-4">Position</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4">Resume</th>
                <th className="py-3 px-4">Stage</th>
                <th className="py-3 px-4">Applied Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredApps.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#667085]">
                    No candidates found matching the active filters.
                  </td>
                </tr>
              ) : (
                filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-[#F7F8FA]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-sm text-[#111827] block">
                        {app.fullName}
                      </span>
                      <span className="text-[#667085] text-xs block">{app.email}</span>
                      <span className="font-mono text-[10px] text-[#F51F3D]">
                        {app.referenceId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-[#111827] block">{app.jobTitle}</span>
                      <span className="text-[10px] font-mono text-[#667085]">{app.jobSlug}</span>
                    </td>
                    <td className="py-3.5 px-4 text-[#667085]">{app.location}</td>
                    <td className="py-3.5 px-4">
                      {app.resumeFileName ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#111827]">
                          <svg className="w-3.5 h-3.5 text-[#F51F3D]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                          <span>{app.resumeFileName}</span>
                        </span>
                      ) : (
                        <span className="text-[#9CA3AF] text-[11px]">No file</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          app.status === "new"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : app.status === "reviewing"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : app.status === "interviewed"
                            ? "bg-purple-50 text-purple-700 border border-purple-200"
                            : app.status === "accepted"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#667085] text-[11px]">
                      {app.createdAt.slice(0, 10)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => openCandidateDetail(app)}
                        className="px-2.5 py-1 rounded bg-[#F7F8FA] border border-[#E5E7EB] font-semibold text-[#111827] hover:text-[#F51F3D] hover:bg-white cursor-pointer"
                      >
                        Review Profile
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Candidate Detail Modal / Drawer */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-in fade-in zoom-in-95 duration-150 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#F51F3D] uppercase tracking-wider block">
                  Reference: {selectedApp.referenceId}
                </span>
                <h2 className="text-xl font-extrabold text-[#111827] mt-0.5">
                  {selectedApp.fullName}
                </h2>
                <p className="text-xs text-[#667085]">
                  Applying for <strong>{selectedApp.jobTitle}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedApp(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Quick Contact & Links */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs bg-[#F7F8FA] p-4 rounded-xl border border-[#E5E7EB]">
              <div>
                <span className="text-[#667085] block">Email:</span>
                <a href={`mailto:${selectedApp.email}`} className="font-semibold text-[#F51F3D] hover:underline">
                  {selectedApp.email}
                </a>
              </div>
              <div>
                <span className="text-[#667085] block">Phone:</span>
                <span className="font-semibold text-[#111827]">{selectedApp.phone}</span>
              </div>
              <div>
                <span className="text-[#667085] block">Location:</span>
                <span className="text-[#111827]">{selectedApp.location}</span>
              </div>
              <div>
                <span className="text-[#667085] block">External Links:</span>
                <div className="flex gap-3 mt-0.5">
                  {selectedApp.githubUrl && (
                    <a href={selectedApp.githubUrl} target="_blank" className="text-[#F51F3D] hover:underline font-semibold">
                      GitHub
                    </a>
                  )}
                  {selectedApp.linkedinUrl && (
                    <a href={selectedApp.linkedinUrl} target="_blank" className="text-[#F51F3D] hover:underline font-semibold">
                      LinkedIn
                    </a>
                  )}
                  {selectedApp.portfolioUrl && (
                    <a href={selectedApp.portfolioUrl} target="_blank" className="text-[#F51F3D] hover:underline font-semibold">
                      Portfolio
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Resume Document Link */}
            {selectedApp.resumeFileName && (
              <div className="p-3.5 rounded-lg border border-[#E5E7EB] bg-white flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded bg-[#FFF1F3] text-[#F51F3D]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#111827] block">
                      {selectedApp.resumeFileName}
                    </span>
                    <span className="text-[10px] text-[#667085]">Attached CV Document</span>
                  </div>
                </div>

                {selectedApp.resumeData && (
                  <a
                    href={`data:application/octet-stream;base64,${selectedApp.resumeData}`}
                    download={selectedApp.resumeFileName}
                    className="px-3 py-1.5 rounded bg-[#F7F8FA] border border-[#E5E7EB] text-xs font-semibold text-[#111827] hover:bg-gray-100"
                  >
                    Download CV ↓
                  </a>
                )}
              </div>
            )}

            {/* Cover letter */}
            {selectedApp.coverLetter && (
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#667085] mb-2">
                  Cover Letter / Context
                </h4>
                <div className="p-4 rounded-lg border border-[#E5E7EB] bg-[#F7F8FA] text-xs text-[#111827] leading-relaxed whitespace-pre-wrap">
                  {selectedApp.coverLetter}
                </div>
              </div>
            )}

            {/* Additional notes from applicant */}
            {selectedApp.additionalMessage && (
              <div>
                <h4 className="font-bold text-xs uppercase tracking-wider text-[#667085] mb-1">
                  Additional Notes
                </h4>
                <p className="text-xs text-[#667085] leading-relaxed">
                  {selectedApp.additionalMessage}
                </p>
              </div>
            )}

            {/* Stage Selector & Reviewer Notes */}
            <div className="pt-4 border-t border-[#E5E7EB] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Update Candidate Stage:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(["new", "reviewing", "interviewed", "accepted", "archived"] as const).map(
                    (stage) => (
                      <button
                        key={stage}
                        type="button"
                        onClick={() => handleStatusChange(selectedApp.id, stage)}
                        disabled={isUpdating}
                        className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                          selectedApp.status === stage
                            ? "bg-[#111827] text-white"
                            : "bg-[#F7F8FA] text-[#667085] border border-[#E5E7EB] hover:bg-gray-200"
                        }`}
                      >
                        {stage}
                      </button>
                    )
                  )}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827] block mb-1">
                  Private Hiring Team Notes
                </label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record interview notes, technical assessment feedback, or decision rationales..."
                  className="w-full p-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleStatusChange(selectedApp.id, selectedApp.status, editNotes)}
                  disabled={isUpdating}
                  className="mt-2 px-3 py-1.5 rounded bg-[#F51F3D] hover:bg-[#D91432] text-white text-xs font-semibold shadow-xs cursor-pointer"
                >
                  {isUpdating ? "Saving..." : "Save Internal Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
