import { redirect } from "next/navigation";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { getJobs, getSystemMetrics } from "@/lib/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { JobManagementConsole } from "@/components/admin/JobManagementConsole";

export const dynamic = "force-dynamic";

export default async function AdminJobsPage() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const [jobs, metrics] = await Promise.all([getJobs(), getSystemMetrics()]);

  return (
    <AdminLayout
      supabaseConnected={metrics.supabaseConnected}
      resendConfigured={metrics.resendConfigured}
    >
      <JobManagementConsole initialJobs={jobs} />
    </AdminLayout>
  );
}
