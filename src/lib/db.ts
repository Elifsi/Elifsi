import { createAdminClient } from "./supabase/admin";
import { jobOpenings as initialSeedJobs } from "./data/jobs";
import { JobOpening } from "@/types/content";

export interface StoredJobApplication {
  id: string;
  referenceId: string;
  jobSlug: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  coverLetter?: string;
  additionalMessage?: string;
  resumeFileName?: string;
  resumeData?: string; // Base64 preview
  status: "new" | "reviewing" | "interviewed" | "accepted" | "archived";
  notes?: string;
  resendStatus?: string;
  createdAt: string;
}

export interface StoredContactInquiry {
  id: string;
  referenceId: string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  topic: string;
  message: string;
  status: "new" | "in_progress" | "replied" | "archived";
  notes?: string;
  resendStatus?: string;
  createdAt: string;
}

// In-memory fallback stores
let memoryJobs: JobOpening[] = [...initialSeedJobs];
let memoryApplications: StoredJobApplication[] = [
  {
    id: "app-seed-1",
    referenceId: "ELF-APP-261003-SEEDA",
    jobSlug: "senior-full-stack-engineer",
    jobTitle: "Senior Full-Stack Engineer",
    fullName: "Aarav Sharma",
    email: "aarav.sharma@example.com",
    phone: "+977 98012 34567",
    location: "Janakpur, Nepal",
    portfolioUrl: "https://aarav.dev",
    githubUrl: "https://github.com/aarav-sharma",
    linkedinUrl: "https://linkedin.com/in/aaravsharma",
    coverLetter:
      "Deeply interested in Elifsi's multi-product trajectory and building real-time microservices in Janakpur.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 4).toISOString(),
    resendStatus: "dispatched",
  },
  {
    id: "app-seed-2",
    referenceId: "ELF-APP-261003-SEEDB",
    jobSlug: "ai-systems-engineer",
    jobTitle: "AI Systems & Inference Engineer",
    fullName: "Pooja Chaudhary",
    email: "pooja.c@example.com",
    phone: "+977 98450 11223",
    location: "Janakpur, Nepal / Remote",
    githubUrl: "https://github.com/pooja-ai",
    coverLetter:
      "Specialized in agentic reasoning loops and tool execution pipelines similar to the Eli AI concierge architecture.",
    status: "reviewing",
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
    resendStatus: "dispatched",
  },
];

let memoryInquiries: StoredContactInquiry[] = [
  {
    id: "inq-seed-1",
    referenceId: "ELF-INQ-261003-SEEDA",
    name: "Rohan Koirala",
    email: "rohan@himalayanventures.np",
    phone: "+977 98510 99887",
    organization: "Himalayan Tech Ventures",
    topic: "Partnership & Ecosystem",
    message:
      "Interested in exploring strategic partnership opportunities with Elifsi Technologies and merchant integration for Evrry in Janakpur and Kathmandu.",
    status: "new",
    createdAt: new Date(Date.now() - 3600000 * 6).toISOString(),
    resendStatus: "dispatched",
  },
  {
    id: "inq-seed-2",
    referenceId: "ELF-INQ-261003-SEEDB",
    name: "Sunita Mahato",
    email: "sunita.mahato@mit.edu.np",
    organization: "Mithila Innovation Hub",
    topic: "Research & Development",
    message:
      "Inquiring about potential AI research collaboration and hosting local engineering workshops at Janakpur tech community.",
    status: "replied",
    notes: "Followed up with introductory email; scheduling briefing call for next week.",
    createdAt: new Date(Date.now() - 3600000 * 48).toISOString(),
    resendStatus: "dispatched",
  },
];

import fs from "node:fs";
import path from "node:path";

const RUNTIME_DB_PATH = path.join(process.cwd(), "src/lib/data/runtime-db.json");

function loadFromDisk() {
  try {
    if (fs.existsSync(RUNTIME_DB_PATH)) {
      const raw = fs.readFileSync(RUNTIME_DB_PATH, "utf-8");
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed.jobs)) memoryJobs = parsed.jobs;
      if (Array.isArray(parsed.applications)) memoryApplications = parsed.applications;
      if (Array.isArray(parsed.inquiries)) memoryInquiries = parsed.inquiries;
    }
  } catch (err) {
    console.warn("[db] Failed to read runtime-db.json:", err);
  }
}

function saveToDisk() {
  try {
    const data = {
      jobs: memoryJobs,
      applications: memoryApplications,
      inquiries: memoryInquiries,
    };
    fs.writeFileSync(RUNTIME_DB_PATH, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.warn("[db] Failed to write runtime-db.json:", err);
  }
}

// Initial sync
loadFromDisk();

/* =========================================================================
   JOBS DATA ACCESS
   ========================================================================= */

export async function getJobs(): Promise<JobOpening[]> {
  const supabase = createAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          slug: row.slug,
          title: row.title,
          department: row.department,
          location: row.location,
          employmentType: row.employment_type,
          status: row.status,
          summary: row.summary,
          responsibilities: Array.isArray(row.responsibilities) ? row.responsibilities : [],
          requirements: Array.isArray(row.requirements) ? row.requirements : [],
          niceToHave: Array.isArray(row.nice_to_have) ? row.nice_to_have : [],
          benefits: Array.isArray(row.benefits) ? row.benefits : [],
          publishedAt: row.published_at || new Date().toISOString().slice(0, 10),
        }));
      }
    } catch (err) {
      console.warn("[db] Supabase query failed, falling back to memory store:", err);
    }
  }

  loadFromDisk();
  return memoryJobs;
}

export async function getJobBySlug(slug: string): Promise<JobOpening | null> {
  const allJobs = await getJobs();
  return allJobs.find((j) => j.slug === slug) || null;
}

export async function upsertJob(job: JobOpening): Promise<{ ok: boolean; job: JobOpening }> {
  const supabase = createAdminClient();
  if (supabase) {
    try {
      const payload = {
        slug: job.slug,
        title: job.title,
        department: job.department,
        location: job.location,
        employment_type: job.employmentType,
        status: job.status,
        summary: job.summary,
        responsibilities: job.responsibilities,
        requirements: job.requirements,
        nice_to_have: job.niceToHave,
        benefits: job.benefits,
        published_at: job.publishedAt || new Date().toISOString().slice(0, 10),
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from("jobs").upsert(payload, { onConflict: "slug" });
      if (error) {
        console.error("[db] Supabase upsert job error:", error);
      }
    } catch (err) {
      console.error("[db] Supabase upsert job exception:", err);
    }
  }

  // Update memory store as well
  loadFromDisk();
  const existingIdx = memoryJobs.findIndex((j) => j.slug === job.slug);
  if (existingIdx >= 0) {
    memoryJobs[existingIdx] = { ...job };
  } else {
    memoryJobs.unshift({ ...job });
  }
  saveToDisk();

  return { ok: true, job };
}

export async function deleteJob(slug: string): Promise<{ ok: boolean }> {
  const supabase = createAdminClient();
  if (supabase) {
    try {
      await supabase.from("jobs").delete().eq("slug", slug);
    } catch (err) {
      console.error("[db] Supabase delete job error:", err);
    }
  }

  loadFromDisk();
  memoryJobs = memoryJobs.filter((j) => j.slug !== slug);
  saveToDisk();
  return { ok: true };
}

/* =========================================================================
   JOB APPLICATIONS DATA ACCESS
   ========================================================================= */

export async function getApplications(): Promise<StoredJobApplication[]> {
  const supabase = createAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("job_applications")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          referenceId: row.reference_id,
          jobSlug: row.job_slug,
          jobTitle: row.job_title,
          fullName: row.full_name,
          email: row.email,
          phone: row.phone,
          location: row.location,
          portfolioUrl: row.portfolio_url || undefined,
          githubUrl: row.github_url || undefined,
          linkedinUrl: row.linkedin_url || undefined,
          coverLetter: row.cover_letter || undefined,
          additionalMessage: row.additional_message || undefined,
          resumeFileName: row.resume_filename || undefined,
          resumeData: row.resume_data || undefined,
          status: row.status,
          notes: row.notes || undefined,
          resendStatus: row.resend_status,
          createdAt: row.created_at,
        }));
      }
    } catch (err) {
      console.warn("[db] Supabase query applications failed:", err);
    }
  }

  loadFromDisk();
  return memoryApplications;
}

export async function saveApplication(
  app: Omit<StoredJobApplication, "id" | "createdAt" | "status">
): Promise<StoredJobApplication> {
  const id = `app-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const createdAt = new Date().toISOString();

  const record: StoredJobApplication = {
    ...app,
    id,
    status: "new",
    createdAt,
  };

  const supabase = createAdminClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("job_applications").insert({
        id,
        reference_id: record.referenceId,
        job_slug: record.jobSlug,
        job_title: record.jobTitle,
        full_name: record.fullName,
        email: record.email,
        phone: record.phone,
        location: record.location,
        portfolio_url: record.portfolioUrl || null,
        github_url: record.githubUrl || null,
        linkedin_url: record.linkedinUrl || null,
        cover_letter: record.coverLetter || null,
        additional_message: record.additionalMessage || null,
        resume_filename: record.resumeFileName || null,
        resume_data: record.resumeData || null,
        status: record.status,
        resend_status: record.resendStatus || "dispatched",
        created_at: createdAt,
      });

      if (error) {
        console.error("[db] Supabase insert application error:", error);
      }
    } catch (err) {
      console.error("[db] Supabase insert application exception:", err);
    }
  }

  loadFromDisk();
  memoryApplications.unshift(record);
  saveToDisk();
  return record;
}

export async function updateApplicationStatus(
  id: string,
  status: StoredJobApplication["status"],
  notes?: string
): Promise<{ ok: boolean }> {
  const supabase = createAdminClient();
  if (supabase) {
    try {
      const updatePayload: Record<string, unknown> = { status };
      if (notes !== undefined) updatePayload.notes = notes;
      await supabase.from("job_applications").update(updatePayload).eq("id", id);
    } catch (err) {
      console.error("[db] Supabase update application status error:", err);
    }
  }

  loadFromDisk();
  const found = memoryApplications.find((a) => a.id === id);
  if (found) {
    found.status = status;
    if (notes !== undefined) found.notes = notes;
  }
  saveToDisk();

  return { ok: true };
}

/* =========================================================================
   CONTACT INQUIRIES DATA ACCESS
   ========================================================================= */

export async function getInquiries(): Promise<StoredContactInquiry[]> {
  const supabase = createAdminClient();
  if (supabase) {
    try {
      const { data, error } = await supabase
        .from("contact_inquiries")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data && data.length > 0) {
        return data.map((row) => ({
          id: row.id,
          referenceId: row.reference_id,
          name: row.name,
          email: row.email,
          phone: row.phone || undefined,
          organization: row.organization || undefined,
          topic: row.topic,
          message: row.message,
          status: row.status,
          notes: row.notes || undefined,
          resendStatus: row.resend_status,
          createdAt: row.created_at,
        }));
      }
    } catch (err) {
      console.warn("[db] Supabase query inquiries failed:", err);
    }
  }

  loadFromDisk();
  return memoryInquiries;
}

export async function saveInquiry(
  inq: Omit<StoredContactInquiry, "id" | "createdAt" | "status">
): Promise<StoredContactInquiry> {
  const id = `inq-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
  const createdAt = new Date().toISOString();

  const record: StoredContactInquiry = {
    ...inq,
    id,
    status: "new",
    createdAt,
  };

  const supabase = createAdminClient();
  if (supabase) {
    try {
      const { error } = await supabase.from("contact_inquiries").insert({
        id,
        reference_id: record.referenceId,
        name: record.name,
        email: record.email,
        phone: record.phone || null,
        organization: record.organization || null,
        topic: record.topic,
        message: record.message,
        status: record.status,
        resend_status: record.resendStatus || "dispatched",
        created_at: createdAt,
      });

      if (error) {
        console.error("[db] Supabase insert inquiry error:", error);
      }
    } catch (err) {
      console.error("[db] Supabase insert inquiry exception:", err);
    }
  }

  loadFromDisk();
  memoryInquiries.unshift(record);
  saveToDisk();
  return record;
}

export async function updateInquiryStatus(
  id: string,
  status: StoredContactInquiry["status"],
  notes?: string
): Promise<{ ok: boolean }> {
  const supabase = createAdminClient();
  if (supabase) {
    try {
      const updatePayload: Record<string, unknown> = { status };
      if (notes !== undefined) updatePayload.notes = notes;
      await supabase.from("contact_inquiries").update(updatePayload).eq("id", id);
    } catch (err) {
      console.error("[db] Supabase update inquiry status error:", err);
    }
  }

  loadFromDisk();
  const found = memoryInquiries.find((i) => i.id === id);
  if (found) {
    found.status = status;
    if (notes !== undefined) found.notes = notes;
  }
  saveToDisk();

  return { ok: true };
}

/* =========================================================================
   SYSTEM TELEMETRY & METRICS
   ========================================================================= */

export async function getSystemMetrics() {
  const [jobs, apps, inqs] = await Promise.all([
    getJobs(),
    getApplications(),
    getInquiries(),
  ]);

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const isSupabaseConfigured =
    Boolean(supabaseUrl) && !supabaseUrl?.includes("your-project");

  const resendKey = process.env.RESEND_API_KEY;
  const isResendConfigured =
    Boolean(resendKey) && !resendKey?.startsWith("re_your_api_key");

  return {
    jobsCount: jobs.length,
    activeJobsCount: jobs.filter((j) => j.status === "open").length,
    applicationsCount: apps.length,
    newApplicationsCount: apps.filter((a) => a.status === "new").length,
    inquiriesCount: inqs.length,
    newInquiriesCount: inqs.filter((i) => i.status === "new").length,
    supabaseConnected: isSupabaseConfigured,
    resendConfigured: isResendConfigured,
    serverTime: new Date().toISOString(),
  };
}
