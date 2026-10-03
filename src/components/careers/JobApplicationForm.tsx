"use client";

import { useState, useId, useRef, type FormEvent, type ChangeEvent } from "react";
import { Button } from "@/components/ui/Button";

interface JobApplicationFormProps {
  jobSlug: string;
  jobTitle: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export function JobApplicationForm({ jobSlug, jobTitle }: JobApplicationFormProps) {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const formId = useId();

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    setErrorMessage(null);
    const files = e.target.files;
    if (!files || files.length === 0) {
      setSelectedFile(null);
      return;
    }

    const file = files[0];
    if (file.size > MAX_FILE_SIZE_BYTES) {
      setErrorMessage("Resume file exceeds 5MB limit. Please upload a smaller document.");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    const lowerName = file.name.toLowerCase();
    const isValid =
      lowerName.endsWith(".pdf") || lowerName.endsWith(".docx") || lowerName.endsWith(".doc");

    if (!isValid) {
      setErrorMessage("Invalid format. Please upload a PDF (.pdf) or Word document (.docx).");
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    setSelectedFile(file);
  }

  function handleRemoveFile() {
    setSelectedFile(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Append file if selected
    if (selectedFile) {
      formData.set("resume", selectedFile);
    }

    // Ensure job metadata is explicitly present
    formData.set("jobSlug", jobSlug);
    formData.set("jobTitle", jobTitle);

    try {
      const response = await fetch("/api/careers/apply", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to submit application. Please check your inputs.");
      }

      setReferenceId(result.referenceId || "ELF-APP-CONFIRMED");
      setStatus("success");
      form.reset();
      setSelectedFile(null);
    } catch (err) {
      setStatus("error");
      setErrorMessage(
        err instanceof Error ? err.message : "Network error. Please try submitting again."
      );
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="rounded-xl border border-[#F51F3D]/30 bg-[#FFF1F3] p-8 text-[#111827] shadow-sm animate-in fade-in duration-200"
      >
        <div className="w-12 h-12 rounded-full bg-[#F51F3D] text-white flex items-center justify-center mb-5">
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-[#111827]">Application Registered</h3>
        <p className="mt-2 text-sm text-[#667085] leading-relaxed">
          Your candidate profile for <strong>{jobTitle}</strong> has been securely submitted to the{" "}
          <strong>Elifsi Technologies</strong> recruitment desk. An automated receipt has been dispatched to your email address.
        </p>

        {referenceId && (
          <div className="mt-5 p-4 bg-white border border-[#E5E7EB] rounded-lg inline-block">
            <span className="text-xs text-[#667085] block font-medium">Candidate Reference Code:</span>
            <span className="font-mono text-base font-bold text-[#F51F3D] tracking-wide select-all">
              {referenceId}
            </span>
          </div>
        )}

        <div className="mt-6 pt-6 border-t border-[#F51F3D]/20 text-xs text-[#667085]">
          <p>
            Our founding engineering and product leadership reviews all candidate applications.
            Should your background match our active product cycle, we will reach out directly.
          </p>
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-4 block font-semibold text-[#D91432] hover:underline"
          >
            Submit another application or update →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
      {/* Honeypot field */}
      <div className="hidden" aria-hidden="true">
        <label htmlFor={`${formId}-hp`}>Anti-spam honeypot</label>
        <input id={`${formId}-hp`} type="text" name="website_hp" tabIndex={-1} autoComplete="off" />
      </div>

      <input type="hidden" name="jobSlug" value={jobSlug} />
      <input type="hidden" name="jobTitle" value={jobTitle} />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-fullName`} className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            Full Name <span className="text-[#F51F3D]">*</span>
          </label>
          <input
            id={`${formId}-fullName`}
            name="fullName"
            type="text"
            required
            autoComplete="name"
            placeholder="Alex Vance"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-email`} className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            Email Address <span className="text-[#F51F3D]">*</span>
          </label>
          <input
            id={`${formId}-email`}
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="alex@domain.com"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-phone`} className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            Phone Number <span className="text-[#F51F3D]">*</span>
          </label>
          <input
            id={`${formId}-phone`}
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            placeholder="+91 98765 43210"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-location`} className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            Current Location / Timezone <span className="text-[#F51F3D]">*</span>
          </label>
          <input
            id={`${formId}-location`}
            name="location"
            type="text"
            required
            placeholder="Bengaluru, India (UTC+5:30)"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-github`} className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            GitHub Profile
          </label>
          <input
            id={`${formId}-github`}
            name="githubUrl"
            type="url"
            placeholder="https://github.com/..."
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-linkedin`} className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            LinkedIn Profile
          </label>
          <input
            id={`${formId}-linkedin`}
            name="linkedinUrl"
            type="url"
            placeholder="https://linkedin.com/in/..."
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor={`${formId}-portfolio`} className="text-xs font-bold uppercase tracking-wider text-[#111827]">
            Portfolio / Web Link
          </label>
          <input
            id={`${formId}-portfolio`}
            name="portfolioUrl"
            type="url"
            placeholder="https://alex.dev"
            className="h-11 rounded border border-[#E5E7EB] bg-white px-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
          />
        </div>
      </div>

      {/* Resume / CV Upload Component */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-[#111827]">
          Resume / Curriculum Vitae (PDF, DOCX up to 5MB)
        </label>
        <div className="border-2 border-dashed border-[#E5E7EB] hover:border-[#F51F3D] rounded-lg p-5 bg-[#F7F8FA] transition-colors">
          <input
            ref={fileInputRef}
            id={`${formId}-resume`}
            type="file"
            name="resume"
            accept=".pdf,.docx,.doc,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            className="hidden"
          />

          {!selectedFile ? (
            <div className="flex flex-col items-center justify-center text-center">
              <svg className="w-8 h-8 text-[#9CA3AF] mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-semibold text-[#F51F3D] hover:underline"
              >
                Click to browse files
              </button>
              <p className="text-xs text-[#667085] mt-1">PDF or DOCX documents, maximum 5 MB</p>
            </div>
          ) : (
            <div className="flex items-center justify-between bg-white border border-[#E5E7EB] p-3 rounded-md">
              <div className="flex items-center gap-3 min-w-0">
                <span className="p-2 rounded bg-[#FFF1F3] text-[#F51F3D]">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </span>
                <div className="truncate">
                  <p className="text-xs font-semibold text-[#111827] truncate">{selectedFile.name}</p>
                  <p className="text-[11px] text-[#667085]">{(selectedFile.size / 1024).toFixed(1)} KB</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleRemoveFile}
                className="text-xs font-semibold text-red-600 hover:text-red-800 p-1"
                aria-label="Remove uploaded resume"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor={`${formId}-coverLetter`} className="text-xs font-bold uppercase tracking-wider text-[#111827]">
          Why Elifsi Technologies & What Drives You? (Optional)
        </label>
        <textarea
          id={`${formId}-coverLetter`}
          name="coverLetter"
          rows={4}
          placeholder="Briefly describe your technical accomplishments, engineering philosophy, or what interests you in Elifsi..."
          className="rounded border border-[#E5E7EB] bg-white p-3.5 text-sm text-[#111827] placeholder:text-[#9CA3AF] transition-colors focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D]"
        />
      </div>

      {status === "error" && errorMessage && (
        <div role="alert" className="rounded border border-red-200 bg-red-50 p-3.5 text-xs font-medium text-red-700">
          {errorMessage}
        </div>
      )}

      <div className="flex items-center justify-between pt-2">
        <p className="text-xs text-[#667085]">
          Secure direct transmission to <strong>Elifsi Technologies</strong> hiring desk.
        </p>
        <Button type="submit" variant="primary" size="lg" isLoading={status === "submitting"}>
          {status === "submitting" ? "Submitting Application..." : "Submit Application"}
        </Button>
      </div>
    </form>
  );
}
