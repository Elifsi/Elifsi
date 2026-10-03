import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { getApplications, getSystemMetrics } from "@/lib/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { ApplicationTrackingConsole } from "@/components/admin/ApplicationTrackingConsole";

export const dynamic = "force-dynamic";

export default async function AdminApplicationsPage() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const [applications, metrics] = await Promise.all([
    getApplications(),
    getSystemMetrics(),
  ]);

  return (
    <AdminLayout
      supabaseConnected={metrics.supabaseConnected}
      resendConfigured={metrics.resendConfigured}
    >
      <ApplicationTrackingConsole initialApplications={applications} />
    </AdminLayout>
  );
}
