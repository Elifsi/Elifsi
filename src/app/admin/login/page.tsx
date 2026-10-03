"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export default function AdminLoginPage() {
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed.");
      }

      router.push("/admin");
      router.refresh();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Authentication error.");
    }
  }

  return (
    <div className="min-h-screen bg-[#111827] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow and architectural grid */}
      <div className="absolute inset-0 bg-grid-subtle opacity-5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#F51F3D] opacity-10 blur-3xl pointer-events-none" />

      <div className="w-full max-w-md bg-white rounded-2xl border border-gray-200 p-8 shadow-2xl relative z-10">
        <div className="text-center mb-6">
          <Logo size="md" href="/" className="justify-center mb-4" />
          <h1 className="text-2xl font-extrabold text-[#111827] tracking-tight">
            Corporate Admin Console
          </h1>
          <p className="mt-1.5 text-xs text-[#667085]">
            Secure operations portal for Elifsi Technologies Private Limited.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="admin-pass"
              className="text-xs font-bold uppercase tracking-wider text-[#111827] block mb-1.5"
            >
              Console Passphrase
            </label>
            <input
              id="admin-pass"
              type="password"
              required
              autoFocus
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin passphrase"
              className="w-full h-11 px-3.5 rounded-lg border border-[#E5E7EB] bg-white text-sm text-[#111827] placeholder:text-[#9CA3AF] focus:border-[#F51F3D] focus:outline-none focus:ring-1 focus:ring-[#F51F3D] transition-colors"
            />
          </div>

          {status === "error" && errorMessage && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs font-semibold text-red-700">
              {errorMessage}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full"
            isLoading={status === "submitting"}
          >
            {status === "submitting" ? "Verifying..." : "Unlock Dashboard"}
          </Button>
        </form>

        <div className="mt-6 pt-5 border-t border-[#E5E7EB] text-center space-y-2">
          <div className="p-2.5 rounded-md bg-[#F7F8FA] border border-[#E5E7EB] text-xs text-[#667085]">
            <span className="font-semibold text-[#111827] block mb-0.5">Default Access Credentials</span>
            Passphrase: <code className="font-mono text-[#F51F3D] font-bold">elifsi-admin-2026</code>
          </div>
          <p className="text-[11px] text-[#9CA3AF]">
            Headquarters: Janakpur, Nepal · Secure Session Management
          </p>
        </div>
      </div>
    </div>
  );
}
