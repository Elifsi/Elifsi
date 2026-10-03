import { NextResponse } from "next/server";
import { z } from "zod";
import { getInquiries, updateInquiryStatus } from "@/lib/db";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";

const patchSchema = z.object({
  id: z.string().min(1),
  status: z.enum(["new", "in_progress", "replied", "archived"]),
  notes: z.string().optional(),
});

export async function GET() {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  const inquiries = await getInquiries();
  return NextResponse.json({ ok: true, inquiries });
}

export async function PATCH(request: Request) {
  const isAdmin = await isAuthenticatedAdmin();
  if (!isAdmin) {
    return NextResponse.json({ error: "Unauthorized access." }, { status: 401 });
  }

  try {
    const body = await request.json();
    const parsed = patchSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid status update payload." }, { status: 400 });
    }

    await updateInquiryStatus(parsed.data.id, parsed.data.status, parsed.data.notes);
    return NextResponse.json({ ok: true, message: "Inquiry updated." });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error." },
      { status: 500 }
    );
  }
}
