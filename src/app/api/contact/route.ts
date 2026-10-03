import { NextResponse } from "next/server";
import { z } from "zod";
import {
  getResend,
  fromAddress,
  notifyContactAddress,
  generateReferenceId,
  buildContactNotificationHtml,
  buildContactConfirmationHtml,
} from "@/lib/resend";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const contactSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100),
  email: z.string().trim().email("Please provide a valid email address").max(150),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  organization: z.string().trim().max(100).optional().or(z.literal("")),
  topic: z.enum([
    "General Inquiry",
    "Evrry Product Inquiry",
    "Partnership & Ecosystem",
    "Business & Enterprise",
    "Careers & Talent",
    "Media & Press",
    "Other",
  ]),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(4000),
  website_hp: z.string().optional(), // Honeypot
});

export async function POST(request: Request) {
  const clientIp = getClientIp(request);
  const rateLimit = checkRateLimit(`contact:${clientIp}`, 5, 60 * 1000);

  if (!rateLimit.success) {
    return NextResponse.json(
      {
        error: "Too many contact requests submitted. Please wait a few moments before trying again.",
      },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON request payload." }, { status: 400 });
  }

  const result = contactSchema.safeParse(body);
  if (!result.success) {
    const issue = result.error.issues[0]?.message || "Invalid input data.";
    return NextResponse.json({ error: issue }, { status: 400 });
  }

  const data = result.data;

  // Bot honeypot detection
  if (data.website_hp && data.website_hp.trim().length > 0) {
    console.warn(`[contact-spam-drop] Honeypot triggered from ${clientIp}`);
    // Return fake success to deceive spam bot
    return NextResponse.json({ ok: true, referenceId: generateReferenceId("CNT") });
  }

  const refId = generateReferenceId("CNT");
  const receivedAt = new Date().toISOString();

  console.log(`[contact-lead] Received reference: ${refId}`, {
    name: data.name,
    email: data.email,
    topic: data.topic,
    organization: data.organization || "N/A",
    receivedAt,
  });

  try {
    const resend = getResend();
    if (resend) {
      const from = fromAddress();
      const notifyTo = notifyContactAddress();

      await Promise.allSettled([
        // 1. Internal notification to Elifsi team
        resend.emails.send({
          from,
          to: notifyTo,
          replyTo: data.email,
          subject: `[${data.topic}] New inquiry from ${data.name} [${refId}]`,
          html: buildContactNotificationHtml({
            name: data.name,
            email: data.email,
            phone: data.phone || undefined,
            organization: data.organization || undefined,
            topic: data.topic,
            message: data.message,
            refId,
            receivedAt,
          }),
        }),
        // 2. Automated receipt acknowledgement to sender
        resend.emails.send({
          from,
          to: data.email,
          subject: `We've received your inquiry — Elifsi Technologies [${refId}]`,
          html: buildContactConfirmationHtml(data.name, refId),
        }),
      ]);
    } else {
      console.log(
        "[contact] Resend API key not configured or in sandbox mode. Notification logged to console."
      );
    }
  } catch (err) {
    console.error("[contact-email-error]", err instanceof Error ? err.message : err);
  }

  return NextResponse.json({
    ok: true,
    referenceId: refId,
    message: "Inquiry received successfully.",
  });
}
