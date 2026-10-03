import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "elifsi_admin_session";
const DEFAULT_PASSWORD = "elifsi-admin-2026";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD;
}

export async function isAuthenticatedAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get(ADMIN_COOKIE_NAME)?.value;

  if (!sessionToken) {
    return false;
  }

  // Token is valid if it matches our expected session signature
  const expectedToken = Buffer.from(`admin:${getAdminPassword()}`).toString("base64");
  return sessionToken === expectedToken;
}

export function createAdminSessionToken(): string {
  return Buffer.from(`admin:${getAdminPassword()}`).toString("base64");
}

export { ADMIN_COOKIE_NAME };
