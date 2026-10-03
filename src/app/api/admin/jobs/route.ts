import { NextResponse } from "next/server";
import { z } from "zod";
import { getJobs, upsertJob, deleteJob } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { Department, JobOpening } from "@/types/content";

const jobPayloadSchema = z.object({
  slug: z.string().trim().min(2).max(100),
  title: z.string().trim().min(3).max(150),
  department: z.enum([
    "Engineering",
    "AI & Systems",
    "Product & Design",
    "Operations & Strategy",
  ]),
  location: z.string().trim().min(2).max(100),
  employmentType: z.enum(["Full-time", "Part-time", "Contract", "Hybrid / Remote"]),
  status: z.enum(["open", "upcoming", "archived"]),
  summary: z.string().trim().min(10).max(2000),
  responsibilities: z.array(z.string().trim().min(3)),
  requirements: z.array(z.string().trim().min(3)),
  niceToHave: z.array(z.string().trim()).default([]),
  benefits: z.array(z.string().trim()).default([]),
  publishedAt: z.string().optional(),
});

export async function GET() {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const jobs = await getJobs();
  return NextResponse.json({ ok: true, jobs });
}

export async function POST(request: Request) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = jobPayloadSchema.safeParse(body);

    if (!parsed.success) {
      const msg = parsed.error.issues[0]?.message || "Invalid job specification data.";
      return NextResponse.json({ error: msg }, { status: 400 });
    }

    const jobData: JobOpening = {
      ...parsed.data,
      publishedAt: parsed.data.publishedAt || new Date().toISOString().slice(0, 10),
    };

    const result = await upsertJob(jobData);
    return NextResponse.json({ ok: true, job: result.job });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json({ error: "Missing job slug." }, { status: 400 });
    }

    await deleteJob(slug);
    return NextResponse.json({ ok: true, message: `Job ${slug} deleted.` });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error." },
      { status: 500 }
    );
  }
}
