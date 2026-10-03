"use client";

import { useState, useId, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { InquiryTopic } from "@/types/content";

type FormStatus = "idle" | "submitting" | "success" | "error";

const TOPICS: InquiryTopic[] = [
  "General Inquiry",
  "Evrry Product Inquiry",
  "Partnership & Ecosystem",
  "Business & Enterprise",
  "Careers & Talent",
  "Media & Press",
  "Other",
];

export function ContactForm({ prefilledTopic }: { prefilledTopic?: InquiryTopic }) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const formId = useId();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit inquiry. Please try again.");
      }

      setReferenceId(result.referenceId || "ELF-CNT-CONFIRMED");
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while transmitting your request."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-lg border border-[#F51F3D]/30 bg-[#FFF1F3] p-8 text-[#111827] shadow-sm animate-in fade-in duration-200"
      >
        <div className="w-10 h-10 rounded-full bg-[#F51F3D] text-white flex items-center justify-center mb-4">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-[#111827]">Inquiry Dispatched Successfully</h3>
        <p className="mt-2 text-sm text-[#667085] leading-relaxed">
          Thank you for contacting <strong>Elifsi Technologies Private Limited</strong>. Your inquiry has
          been securely registered in our system. A confirmation email has been dispatched to your address.
        </p>

        {referenceId && (
          <div className="mt-4 p-3 bg-white border border-[#E5E7EB] rounded-md inline-block">
            <span className="text-xs text-[#667085] block">Submission Reference:</span>
            <span className="font-mono text-sm font-bold text-[#F51F3D] tracking-wide select-all">
              {referenceId}
            </span>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-[#F51F3D]/20">
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="text-xs font-semibold text-[#D91432] hover:underline"
          >
            Submit another message →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Honeypot field (hidden from genuine users) */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-hp`}>Leave this empty</label>
        <input
          id={`${formId}-hp`}
          type="text"
          name="website_hp"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-name`}
            className="text-xs font-bold uppercase tracking-wider text-[#111827]"
          >
            Full Name <span className="text-[#F51F3D]">*</span>
          </label>
          <input
            id={`${formId}-name`}
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jane Doe"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-email`}
            className="text-xs font-bold uppercase tracking-wider text-[#111827]"
          >
            Work or Personal Email <span className="text-[#F51F3D]">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jane@company.com"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-organization`}
            className="text-xs font-bold uppercase tracking-wider text-[#111827]"
          >
            Organization / Company (Optional)
          </label>
          <input
            id={`${formId}-organization`}
            name="organization"
            type="text"
            autoComplete="organization"
            placeholder="Acme Corp"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor={`${formId}-phone`}
            className="text-xs font-bold uppercase tracking-wider text-[#111827]"
          >
            Phone Number (Optional)
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="+977 98000 00000"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${formId}-topic`}
          className="text-xs font-bold uppercase tracking-wider text-[#111827]"
        >
          Inquiry Classification <span className="text-[#F51F3D]">*</span>
        </label>
        <select
          id={`${formId}-topic`}
          name="topic"
          required
          defaultValue={prefilledTopic || "General Inquiry"}
          className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
        >
          {TOPICS.map((topic) => (
            <option key={topic} value={topic}>
              {topic}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={`${formId}-message`}
          className="text-xs font-bold uppercase tracking-wider text-[#111827]"
        >
          Inquiry Details <span className="text-[#F51F3D]">*</span>
        </label>
        <textarea
          id={`${formId}-message`}
          name="message"
          required
          rows={5}
          placeholder="Please outline the nature of your inquiry, proposal, or question..."
          className="rounded border border-[#E5E7EB] bg-white p-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
        />
      </div>

      {status === "error" && errorMessage && (
        <div
          role="alert"
          className="rounded border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700"
        >
          {errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-[#667085]">
          Direct routing to <strong>Elifsi Technologies</strong> corporate desk.
        </p>
        <Button type="submit" variant="primary" size="lg" isLoading={status === "submitting"}>
          {status === "submitting" ? "Transmitting..." : "Send Inquiry"}
        </Button>
      </div>
    </form>
  );
}
