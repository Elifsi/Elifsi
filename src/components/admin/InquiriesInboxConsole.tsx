"use client";

import { useState } from "react";
import { StoredContactInquiry } from "@/lib/db";

interface InquiriesInboxConsoleProps {
  initialInquiries: StoredContactInquiry[];
}

export function InquiriesInboxConsole({ initialInquiries }: InquiriesInboxConsoleProps) {
  const [inquiries, setInquiries] = useState<StoredContactInquiry[]>(initialInquiries);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedInquiry, setSelectedInquiry] = useState<StoredContactInquiry | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editNotes, setEditNotes] = useState("");

  function openDetail(inq: StoredContactInquiry) {
    setSelectedInquiry(inq);
    setEditNotes(inq.notes || "");
  }

  async function handleStatusChange(
    id: string,
    newStatus: StoredContactInquiry["status"],
    notesToSave?: string
  ) {
    setIsUpdating(true);
    try {
      const res = await fetch("/api/admin/inquiries", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id,
          status: newStatus,
          notes: notesToSave !== undefined ? notesToSave : editNotes,
        }),
      });

      if (res.ok) {
        setInquiries((prev) =>
          prev.map((i) =>
            i.id === id
              ? {
                  ...i,
                  status: newStatus,
                  notes: notesToSave !== undefined ? notesToSave : editNotes,
                }
              : i
          )
        );
        if (selectedInquiry && selectedInquiry.id === id) {
          setSelectedInquiry((prev) =>
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
      console.error("[inquiry-update-error]", err);
    } finally {
      setIsUpdating(false);
    }
  }

  const filteredInquiries = inquiries.filter((inq) => {
    const matchesSearch =
      inq.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (inq.organization && inq.organization.toLowerCase().includes(searchQuery.toLowerCase())) ||
      inq.referenceId.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div>
        <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
          Corporate Inquiries & Leads Inbox
        </h1>
        <p className="text-xs text-[#667085] mt-1">
          Review incoming business partnerships, Evrry merchant requests, and institutional communications.
        </p>
      </div>

      {/* Filter & Search */}
      <div className="flex flex-wrap items-center gap-3 p-4 bg-white rounded-xl border border-[#E5E7EB]">
        <div className="flex-1 min-w-[200px]">
          <input
            type="text"
            placeholder="Search leads by name, email, company, or ref ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-9 px-3 rounded border border-[#E5E7EB] text-xs text-[#111827] bg-[#F7F8FA] focus:outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase text-[#667085]">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="h-9 px-2.5 rounded border border-[#E5E7EB] text-xs font-medium text-[#111827] bg-[#F7F8FA] focus:outline-none"
          >
            <option value="All">All Inquiries</option>
            <option value="new">New</option>
            <option value="in_progress">In Progress</option>
            <option value="replied">Replied</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        <div className="text-xs text-[#667085] font-mono">
          Showing {filteredInquiries.length} of {inquiries.length} leads
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-xl border border-[#E5E7EB] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#F7F8FA] border-b border-[#E5E7EB] text-[#667085] font-bold uppercase tracking-wider text-[10px]">
              <tr>
                <th className="py-3 px-4">Sender & Reference</th>
                <th className="py-3 px-4">Topic</th>
                <th className="py-3 px-4">Organization</th>
                <th className="py-3 px-4">Snippet</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E5E7EB]">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#667085]">
                    No inquiries found matching the active filters.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr key={inq.id} className="hover:bg-[#F7F8FA]/60 transition-colors">
                    <td className="py-3.5 px-4">
                      <span className="font-bold text-sm text-[#111827] block">{inq.name}</span>
                      <span className="text-[#667085] text-xs block">{inq.email}</span>
                      <span className="font-mono text-[10px] text-[#F51F3D]">
                        {inq.referenceId}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-[#FFF1F3] text-[#D91432] font-semibold text-[10px] whitespace-nowrap">
                        {inq.topic}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-[#111827]">
                      {inq.organization || "—"}
                    </td>
                    <td className="py-3.5 px-4 text-[#667085] max-w-xs truncate">
                      {inq.message}
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          inq.status === "new"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : inq.status === "in_progress"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : inq.status === "replied"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-gray-100 text-gray-700 border border-gray-200"
                        }`}
                      >
                        {inq.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[#667085] text-[11px]">
                      {inq.createdAt.slice(0, 10)}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => openDetail(inq)}
                        className="px-2.5 py-1 rounded bg-[#F7F8FA] border border-[#E5E7EB] font-semibold text-[#111827] hover:text-[#F51F3D] hover:bg-white cursor-pointer"
                      >
                        View & Reply
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl border border-[#E5E7EB] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 md:p-8 animate-in fade-in zoom-in-95 duration-150 space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB]">
              <div>
                <span className="text-[10px] font-mono font-bold text-[#F51F3D] uppercase tracking-wider block">
                  Reference: {selectedInquiry.referenceId}
                </span>
                <h2 className="text-xl font-extrabold text-[#111827] mt-0.5">
                  {selectedInquiry.name}
                </h2>
                <p className="text-xs text-[#667085]">
                  Classification: <strong>{selectedInquiry.topic}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInquiry(null)}
                className="text-gray-400 hover:text-gray-600 text-lg font-bold p-1 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* Profile Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs bg-[#F7F8FA] p-4 rounded-xl border border-[#E5E7EB]">
              <div>
                <span className="text-[#667085] block">Sender Email:</span>
                <a href={`mailto:${selectedInquiry.email}`} className="font-semibold text-[#F51F3D] hover:underline">
                  {selectedInquiry.email}
                </a>
              </div>
              <div>
                <span className="text-[#667085] block">Phone:</span>
                <span className="font-semibold text-[#111827]">
                  {selectedInquiry.phone || "Not provided"}
                </span>
              </div>
              <div>
                <span className="text-[#667085] block">Organization:</span>
                <span className="font-semibold text-[#111827]">
                  {selectedInquiry.organization || "Individual / Not specified"}
                </span>
              </div>
            </div>

            {/* Full Message */}
            <div>
              <h4 className="font-bold text-xs uppercase tracking-wider text-[#667085] mb-2">
                Message Content
              </h4>
              <div className="p-4 rounded-lg border border-[#E5E7EB] bg-white text-xs text-[#111827] leading-relaxed whitespace-pre-wrap">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Action Bar & Reply */}
            <div className="pt-4 border-t border-[#E5E7EB] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs font-bold uppercase tracking-wider text-[#111827]">
                  Status:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {(["new", "in_progress", "replied", "archived"] as const).map((stage) => (
                    <button
                      key={stage}
                      type="button"
                      onClick={() => handleStatusChange(selectedInquiry.id, stage)}
                      disabled={isUpdating}
                      className={`px-2.5 py-1 rounded text-[11px] font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                        selectedInquiry.status === stage
                          ? "bg-[#111827] text-white"
                          : "bg-[#F7F8FA] text-[#667085] border border-[#E5E7EB] hover:bg-gray-200"
                      }`}
                    >
                      {stage}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-[#111827] block mb-1">
                  Internal Operations Notes
                </label>
                <textarea
                  rows={2}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Record internal team routing or follow-up notes..."
                  className="w-full p-2.5 rounded border border-[#E5E7EB] text-xs text-[#111827] focus:border-[#F51F3D] focus:outline-none"
                />
              </div>

              <div className="flex items-center justify-between pt-2">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=Re:%20Inquiry%20to%20Elifsi%20Technologies%20[${selectedInquiry.referenceId}]`}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F51F3D] hover:bg-[#D91432] text-white text-xs font-semibold shadow-xs"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>Reply via Email</span>
                </a>

                <button
                  type="button"
                  onClick={() =>
                    handleStatusChange(selectedInquiry.id, selectedInquiry.status, editNotes)
                  }
                  disabled={isUpdating}
                  className="px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-[#111827] text-xs font-semibold cursor-pointer"
                >
                  {isUpdating ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
