import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getResend,
  fromAddress,
  notifyCareersAddress,
  generateReferenceId,
  buildJobApplicationNotificationHtml,
  buildJobApplicationConfirmationHtml,
} from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const applicationSchema = z.object({
  fullName: z.string().trim().min(2, "Full name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address").max(150),
  phone: z.string().trim().min(7, "Please provide a valid contact number").max(30),
  location: z.string().trim().min(2, "Please provide your current location / city").max(100),
  jobSlug: z.string().trim().min(1, "Job identifier missing"),
  jobTitle: z.string().trim().min(1, "Job title missing"),
  portfolioUrl: z.string().trim().url("Please provide a valid portfolio URL").optional().or(z.literal("")),
  githubUrl: z.string().trim().url("Please provide a valid GitHub URL").optional().or(z.literal("")),
  linkedinUrl: z.string().trim().url("Please provide a valid LinkedIn URL").optional().or(z.literal("")),
  coverLetter: z.string().trim().max(5000).optional().or(z.literal("")),
  additionalMessage: z.string().trim().max(3000).optional().or(z.literal("")),
  website_hp: z.string().optional(),
});

const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB
const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`careers:${clientIp}`, 3, 60 * 1000);

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        error: "Too many application attempts submitted from this network. Please wait a few minutes.",
      },
      { status: 429 }
    );
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json(
      { error: "Could not parse multipart form data." },
      { status: 400 }
    );
  }

  const rawFields: Record<string, string> = {};
  for (const [key, value] of formData.entries()) {
    if (typeof value === "string") {
      rawFields[key] = value;
    }
  }

  const parsed = applicationSchema.safeParse(rawFields);
  if (!parsed.success) {
    const errorMsg = parsed.error.issues[0]?.message || "Invalid application data.";
    return NextResponse.json({ error: errorMsg }, { status: 400 });
  }

  const data = parsed.data;

  // Bot honeypot check
  if (data.website_hp && data.website_hp.trim().length > 0) {
    console.warn(`[career-spam-drop] Honeypot triggered from ${clientIp}`);
    return NextResponse.json({ ok: true, referenceId: generateReferenceId("APP") });
  }

  // Handle uploaded CV / resume file
  const resumeFile = formData.get("resume");
  let resumeAttachment: { filename: string; content: Buffer } | null = null;
  let resumeFileName: string | undefined = undefined;

  if (resumeFile && typeof resumeFile === "object" && "size" in resumeFile && resumeFile.size > 0) {
    const file = resumeFile as File;

    if (file.size > MAX_FILE_SIZE_BYTES) {
      return NextResponse.json(
        { error: "Resume file exceeds the 5MB maximum limit. Please upload a smaller file." },
        { status: 400 }
      );
    }

    const fileNameLower = file.name.toLowerCase();
    const isValidExtension =
      fileNameLower.endsWith(".pdf") || fileNameLower.endsWith(".docx") || fileNameLower.endsWith(".doc");

    if (!ALLOWED_MIME_TYPES.includes(file.type) && !isValidExtension) {
      return NextResponse.json(
        { error: "Invalid resume format. Only PDF (.pdf) or Word (.docx, .doc) files are supported." },
        { status: 400 }
      );
    }

    try {
      const arrayBuffer = await file.arrayBuffer();
      resumeAttachment = {
        filename: file.name.replace(/[^a-zA-Z0-9._-]/g, "_"),
        content: Buffer.from(arrayBuffer),
      };
      resumeFileName = file.name;
    } catch (fileErr) {
      console.error("[resume-buffer-error]", fileErr);
      return NextResponse.json(
        { error: "Failed to read the uploaded resume. Please re-select the file and try again." },
        { status: 400 }
      );
    }
  }

  const refId = generateReferenceId("APP");
  const receivedAt = new Date().toISOString();

  console.log(`[careers-application] Received reference: ${refId}`, {
    candidate: data.fullName,
    email: data.email,
    jobTitle: data.jobTitle,
    location: data.location,
    hasResume: Boolean(resumeAttachment),
    receivedAt,
  });

  try {
    const resend = getResend();
    if (resend) {
      const from = fromAddress();
      const notifyTo = notifyCareersAddress();

      await Promise.allSettled([
        // 1. Send notification to hiring team with candidate details and CV attachment
        resend.emails.send({
          from,
          to: notifyTo,
          replyTo: data.email,
          subject: `[Job Application] ${data.fullName} — ${data.jobTitle} [${refId}]`,
          html: buildJobApplicationNotificationHtml({
            fullName: data.fullName,
            email: data.email,
            phone: data.phone,
            location: data.location,
            jobTitle: data.jobTitle,
            jobSlug: data.jobSlug,
            portfolioUrl: data.portfolioUrl || undefined,
            githubUrl: data.githubUrl || undefined,
            linkedinUrl: data.linkedinUrl || undefined,
            coverLetter: data.coverLetter || undefined,
            additionalMessage: data.additionalMessage || undefined,
            hasResumeAttachment: Boolean(resumeAttachment),
            resumeFileName,
            refId,
            receivedAt,
          }),
          ...(resumeAttachment ? { attachments: [resumeAttachment] } : {}),
        }),
        // 2. Send candidate confirmation email
        resend.emails.send({
          from,
          to: data.email,
          subject: `Application Received: ${data.jobTitle} — Elifsi Technologies [${refId}]`,
          html: buildJobApplicationConfirmationHtml(data.fullName, data.jobTitle, refId),
        }),
      ]);
    } else {
      console.log(
        "[careers] Resend API key not configured or in sandbox mode. Application logged to console."
      );
    }
  } catch (err) {
    console.error("[careers-email-error]", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({
    ok: true,
    referenceId: refId,
    message: "Application submitted successfully.",
  });
}
