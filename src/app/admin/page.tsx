import { redirect } from "next/navigation";
import Link from "next/link";
import { isAuthenticatedAdmin } from "@/lib/admin-auth";
import { getSystemMetrics, getApplications, getInquiries, getJobs } from "@/lib/db";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const isAuth = await isAuthenticatedAdmin();
  if (!isAuth) {
    redirect("/admin/login");
  }

  const [metrics, applications, inquiries, jobs] = await Promise.all([
    getSystemMetrics(),
    getApplications(),
    getInquiries(),
    getJobs(),
  ]);

  const recentApps = applications.slice(0, 5);
  const recentInqs = inquiries.slice(0, 5);

  return (
    <AdminLayout
      supabaseConnected={metrics.supabaseConnected}
      resendConfigured={metrics.resendConfigured}
    >
      <div className="space-y-8">
        {/* 1. Page Title & Overview */}
        <div>
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Executive Operations Dashboard
          </h1>
          <p className="text-xs text-[#667085] mt-1">
            Real-time hiring metrics, corporate inquiry dispatch, and platform connectivity.
          </p>
        </div>

        {/* 2. Key Metrics Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Card 1: Active Jobs */}
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#667085]">
              <span className="font-semibold uppercase tracking-wider">Open Positions</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#111827]">
                {metrics.activeJobsCount}
              </span>
              <span className="text-xs text-[#667085]">of {metrics.jobsCount} total listed</span>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <Link href="/admin/jobs" className="text-[#F51F3D] font-semibold hover:underline">
                Manage Job Postings →
              </Link>
            </div>
          </div>

          {/* Card 2: Candidate Applications */}
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#667085]">
              <span className="font-semibold uppercase tracking-wider">Candidate Applications</span>
              {metrics.newApplicationsCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-[#FFF1F3] text-[#F51F3D] font-bold text-[10px]">
                  {metrics.newApplicationsCount} New
                </span>
              )}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#111827]">
                {metrics.applicationsCount}
              </span>
              <span className="text-xs text-[#667085]">received profiles</span>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <Link href="/admin/applications" className="text-[#F51F3D] font-semibold hover:underline">
                Open Candidate ATS →
              </Link>
            </div>
          </div>

          {/* Card 3: Contact Leads */}
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#667085]">
              <span className="font-semibold uppercase tracking-wider">Inquiries & Leads</span>
              {metrics.newInquiriesCount > 0 && (
                <span className="px-1.5 py-0.5 rounded bg-[#FFF1F3] text-[#F51F3D] font-bold text-[10px]">
                  {metrics.newInquiriesCount} New
                </span>
              )}
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl font-extrabold text-[#111827]">
                {metrics.inquiriesCount}
              </span>
              <span className="text-xs text-[#667085]">dispatched messages</span>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] flex items-center justify-between text-xs">
              <Link href="/admin/inquiries" className="text-[#F51F3D] font-semibold hover:underline">
                View Lead Inbox →
              </Link>
            </div>
          </div>

          {/* Card 4: Platform Infrastructure */}
          <div className="p-5 rounded-xl border border-[#E5E7EB] bg-white shadow-xs flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#667085]">
              <span className="font-semibold uppercase tracking-wider">Platform Connectivity</span>
              <span className="text-[10px] font-mono text-emerald-600 font-bold">LIVE</span>
            </div>
            <div className="mt-3 space-y-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#667085]">Supabase:</span>
                <span
                  className={`font-semibold ${
                    metrics.supabaseConnected ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {metrics.supabaseConnected ? "Postgres Sync" : "Memory Mode"}
                </span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#667085]">Resend Email:</span>
                <span
                  className={`font-semibold ${
                    metrics.resendConfigured ? "text-emerald-600" : "text-amber-600"
                  }`}
                >
                  {metrics.resendConfigured ? "Verified" : "Sandbox Outbox"}
                </span>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-[#E5E7EB] text-[11px] text-[#9CA3AF] font-mono">
              HQ: Janakpur, Nepal
            </div>
          </div>
        </div>

        {/* 3. Detailed Panels: Recent Applications & Recent Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Recent Applications */}
          <div className="lg:col-span-7 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-4">
              <div>
                <h3 className="font-bold text-base text-[#111827]">Recent Job Applications</h3>
                <p className="text-xs text-[#667085]">Direct candidates applying through corporate portal</p>
              </div>
              <Link
                href="/admin/applications"
                className="text-xs font-semibold text-[#F51F3D] hover:underline"
              >
                View All ({applications.length}) →
              </Link>
            </div>

            {recentApps.length === 0 ? (
              <p className="text-xs text-[#667085] py-8 text-center">No applications received yet.</p>
            ) : (
              <div className="divide-y divide-[#E5E7EB]">
                {recentApps.map((app) => (
                  <div key={app.id} className="py-3.5 flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#111827] truncate">
                          {app.fullName}
                        </span>
                        <span className="text-[10px] font-mono text-[#667085] hidden sm:inline">
                          [{app.referenceId}]
                        </span>
                      </div>
                      <div className="text-xs text-[#667085] mt-0.5 truncate">
                        <span>{app.jobTitle}</span> · <span>{app.location}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <span
                        className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                          app.status === "new"
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : app.status === "reviewing"
                            ? "bg-amber-50 text-amber-700 border border-amber-200"
                            : "bg-emerald-50 text-emerald-700 border border-emerald-200"
                        }`}
                      >
                        {app.status}
                      </span>
                      <Link
                        href={`/admin/applications?id=${app.id}`}
                        className="text-xs text-[#111827] hover:text-[#F51F3D] font-semibold px-2 py-1 rounded bg-[#F7F8FA] border border-[#E5E7EB]"
                      >
                        Inspect
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Recent Inquiries */}
          <div className="lg:col-span-5 bg-white rounded-xl border border-[#E5E7EB] p-6 shadow-xs">
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] mb-4">
              <div>
                <h3 className="font-bold text-base text-[#111827]">Corporate Leads & Inquiries</h3>
                <p className="text-xs text-[#667085]">Incoming business proposals & communications</p>
              </div>
              <Link
                href="/admin/inquiries"
                className="text-xs font-semibold text-[#F51F3D] hover:underline"
              >
                View Inbox →
              </Link>
            </div>

            {recentInqs.length === 0 ? (
              <p className="text-xs text-[#667085] py-8 text-center">No inquiries received yet.</p>
            ) : (
              <div className="divide-y divide-[#E5E7EB]">
                {recentInqs.map((inq) => (
                  <div key={inq.id} className="py-3.5 space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-[#111827] truncate">{inq.name}</span>
                      <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-[#FFF1F3] text-[#F51F3D]">
                        {inq.topic}
                      </span>
                    </div>
                    <p className="text-xs text-[#667085] line-clamp-2 leading-relaxed">
                      {inq.message}
                    </p>
                    <div className="flex items-center justify-between pt-1 text-[11px] text-[#9CA3AF]">
                      <span>{inq.organization || "Individual"}</span>
                      <a
                        href={`mailto:${inq.email}?subject=Re:%20Inquiry%20to%20Elifsi%20Technologies%20[${inq.referenceId}]`}
                        className="text-[#F51F3D] font-semibold hover:underline"
                      >
                        Quick Reply →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
