import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import {
  getAdminPassword,
  createAdminSessionToken,
  ADMIN_COOKIE_NAME,
} from "@/lib/admin-auth";

export async function POST(request: Request) {
  try {
    const { password } = await request.json();
    const correctPassword = getAdminPassword();

    if (!password || password !== correctPassword) {
      return NextResponse.json({ error: "Invalid admin passphrase." }, { status: 401 });
    }

    const token = createAdminSessionToken();
    const cookieStore = await cookies();

    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return NextResponse.json({ ok: true, message: "Authentication successful." });
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
  return NextResponse.json({ ok: true, message: "Logged out." });
}
