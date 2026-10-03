"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";

interface AdminLayoutProps {
  children: ReactNode;
  supabaseConnected?: boolean;
  resendConfigured?: boolean;
}

export function AdminLayout({
  children,
  supabaseConnected = false,
  resendConfigured = false,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    try {
      await fetch("/api/admin/auth", { method: "DELETE" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      setIsLoggingOut(false);
    }
  }

  const navItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      ),
    },
    {
      label: "Job Openings",
      href: "/admin/jobs",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      label: "Candidate ATS",
      href: "/admin/applications",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
    {
      label: "Leads & Inquiries",
      href: "/admin/inquiries",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col md:flex-row text-[#111827]">
      {/* 1. Modern SaaS Dark Sidebar */}
      <aside className="w-full md:w-64 bg-[#111827] text-white flex flex-col shrink-0 border-r border-[#1F2937]">
        {/* Brand header */}
        <div className="p-6 border-b border-[#1F2937] flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-[#F51F3D] flex items-center justify-center font-bold text-white text-base">
              E
            </div>
            <div>
              <span className="font-bold tracking-tight text-white block text-sm">ELIFSI</span>
              <span className="text-[10px] font-mono text-[#F51F3D] tracking-widest block uppercase font-semibold">
                SaaS Console
              </span>
            </div>
          </Link>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-[#1F2937] text-gray-300">
            v2.4
          </span>
        </div>

        {/* Navigation list */}
        <nav className="p-4 space-y-1.5 flex-1" aria-label="Admin Navigation">
          <div className="text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
            Operations
          </div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-[#F51F3D] text-white shadow-xs"
                    : "text-gray-300 hover:bg-[#1F2937] hover:text-white"
                }`}
              >
                <span className={isActive ? "text-white" : "text-gray-400"}>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            );
          })}

          <div className="pt-6 text-[10px] font-bold uppercase tracking-wider text-gray-400 px-3 mb-2">
            System Connectivity
          </div>

          {/* Supabase Status Pill */}
          <div className="px-3 py-2 rounded-lg bg-[#1F2937]/50 border border-[#1F2937] text-xs space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[11px]">Database (Supabase)</span>
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  supabaseConnected ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
            </div>
            <div className="text-[10px] font-mono text-gray-300">
              {supabaseConnected ? "PostgreSQL Active" : "Local Sync Mode"}
            </div>
          </div>

          {/* Resend Status Pill */}
          <div className="px-3 py-2 rounded-lg bg-[#1F2937]/50 border border-[#1F2937] text-xs space-y-1.5 mt-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-400 text-[11px]">Email (Resend)</span>
              <span
                className={`inline-block w-2 h-2 rounded-full ${
                  resendConfigured ? "bg-emerald-400" : "bg-amber-400"
                }`}
              />
            </div>
            <div className="text-[10px] font-mono text-gray-300">
              {resendConfigured ? "API Ready" : "Simulated Outbox"}
            </div>
          </div>
        </nav>

        {/* User profile & footer */}
        <div className="p-4 border-t border-[#1F2937] space-y-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-md text-xs text-gray-300 hover:text-white hover:bg-[#1F2937] transition-colors"
          >
            <span>Live Website</span>
            <svg className="w-3.5 h-3.5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-[#1F2937] hover:bg-red-950/40 text-xs font-semibold text-gray-300 hover:text-red-400 border border-transparent hover:border-red-800/40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{isLoggingOut ? "Signing out..." : "Sign Out"}</span>
          </button>

          <div className="text-[10px] text-gray-400 text-center font-mono">
            HQ: Janakpur, Nepal · NPT
          </div>
        </div>
      </aside>

      {/* 2. Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-[#E5E7EB] px-6 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold uppercase tracking-wider text-[#667085]">
              Elifsi Technologies
            </span>
            <span className="text-[#E5E7EB]">/</span>
            <span className="text-xs font-semibold text-[#111827]">
              {pathname === "/admin"
                ? "Executive Dashboard"
                : pathname === "/admin/jobs"
                ? "Job Management"
                : pathname === "/admin/applications"
                ? "Candidate Pipeline"
                : "Inquiries Inbox"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 text-xs font-mono text-[#667085] bg-[#F7F8FA] px-3 py-1.5 rounded border border-[#E5E7EB]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Janakpur, Nepal · NPT (UTC+5:45)</span>
            </div>

            <Link
              href="/admin/jobs?action=new"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-[#F51F3D] hover:bg-[#D91432] text-white text-xs font-semibold shadow-xs transition-colors"
            >
              <span>+ Post New Job</span>
            </Link>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="p-6 md:p-8 flex-1">{children}</main>
      </div>
    </div>
  );
}
