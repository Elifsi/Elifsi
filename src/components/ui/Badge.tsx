import { type ReactNode } from "react";

export type BadgeVariant = "brand" | "neutral" | "dark" | "outline" | "success";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

export function Badge({
  children,
  variant = "brand",
  className = "",
}: BadgeProps) {
  const variantClasses = {
    brand: "bg-[#FFF1F3] text-[#D91432] border border-[#F51F3D]/20",
    neutral: "bg-[#F7F8FA] text-[#667085] border border-[#E5E7EB]",
    dark: "bg-[#111827] text-white border border-[#111827]",
    outline: "bg-transparent text-[#111827] border border-[#E5E7EB]",
    success: "bg-emerald-50 text-emerald-700 border border-emerald-200",
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide uppercase ${variantClasses} ${className}`}
    >
      {children}
    </span>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return <hr className={`border-t border-[#E5E7EB] ${className}`} />;
}
