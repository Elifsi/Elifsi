import { type ReactNode } from "react";
import { Container } from "./Container";

export type SectionTone = "white" | "surface" | "brand-tint" | "dark";

interface SectionProps {
  children: ReactNode;
  tone?: SectionTone;
  className?: string;
  containerClassName?: string;
  size?: "default" | "tight" | "wide";
  id?: string;
}

export function Section({
  children,
  tone = "white",
  className = "",
  containerClassName = "",
  size = "default",
  id,
}: SectionProps) {
  const toneClasses = {
    white: "bg-white text-[#111827]",
    surface: "bg-[#F7F8FA] text-[#111827] border-y border-[#E5E7EB]",
    "brand-tint": "bg-[#FFF1F3] text-[#111827] border-y border-[#F51F3D]/15",
    dark: "bg-[#111827] text-white",
  }[tone];

  return (
    <section id={id} className={`py-16 md:py-24 relative overflow-hidden ${toneClasses} ${className}`}>
      <Container size={size} className={containerClassName}>
        {children}
      </Container>
    </section>
  );
}

export function Eyebrow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`inline-flex items-center gap-2 mb-3 ${className}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-[#F51F3D]" />
      <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#F51F3D]">
        {children}
      </span>
    </div>
  );
}
