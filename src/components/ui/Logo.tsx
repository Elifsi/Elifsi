import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({
  className = "",
  size = "md",
  href = "/",
}: LogoProps) {
  const heightClass = {
    sm: "h-6",
    md: "h-8",
    lg: "h-10",
  }[size];

  const content = (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src="/images/elifsi-logo.png"
        alt={href ? "" : "Elifsi Technologies"}
        width={267}
        height={85}
        priority
        className={`${heightClass} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
      />
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="inline-flex items-center rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F51F3D] focus-visible:ring-offset-2"
        aria-label="Elifsi Technologies Private Limited Home"
      >
        {content}
      </Link>
    );
  }

  return content;
}
