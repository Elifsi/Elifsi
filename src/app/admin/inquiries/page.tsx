import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { getInquiries, getSystemMetrics } from "@/lib/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { InquiriesInboxConsole } from "@/components/admin/InquiriesInboxConsole";

export const dynamic = "force-dynamic";

export default async function AdminInquiriesPage() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const [inquiries, metrics] = await Promise.all([
    getInquiries(),
    getSystemMetrics(),
  ]);

  return (
    <AdminLayout
      supabaseConnected={metrics.supabaseConnected}
      resendConfigured={metrics.resendConfigured}
    >
      <InquiriesInboxConsole initialInquiries={inquiries} />
    </AdminLayout>
  );
}
