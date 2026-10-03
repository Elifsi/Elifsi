import Link from "next/link";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
  href?: string;
}

export function Logo({
  className = "",
  showText = true,
  size = "md",
  href = "/",
}: LogoProps) {
  const iconDimensions = {
    sm: { width: 28, height: 28 },
    md: { width: 34, height: 34 },
    lg: { width: 44, height: 44 },
  }[size];

  const content = (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Precision Geometric Monogram Symbol */}
      <svg
        width={iconDimensions.width}
        height={iconDimensions.height}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 transition-transform duration-200 hover:scale-105"
        aria-hidden="true"
      >
        {/* Dimensional isometric node facets for Elifsi */}
        <path
          d="M24 4L42 14.3923V35.177L24 45.5692L6 35.177V14.3923L24 4Z"
          fill="#FFF1F3"
          stroke="#F51F3D"
          strokeWidth="2.5"
          strokeLinejoin="round"
        />
        {/* Core dynamic crystal facets */}
        <path
          d="M24 4V24.5M24 24.5L42 14.5M24 24.5L6 14.5M24 24.5V45.5"
          stroke="#F51F3D"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* High-tech central focal diamond */}
        <polygon
          points="24,16 31,24.5 24,33 17,24.5"
          fill="#F51F3D"
        />
        <circle cx="24" cy="24.5" r="2.5" fill="#FFFFFF" />
      </svg>

      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-bold tracking-tight text-[#111827] text-base md:text-lg">
            ELIFSI
          </span>
          <span className="text-[10px] uppercase font-semibold tracking-[0.2em] text-[#667085] mt-0.5">
            TECHNOLOGIES
          </span>
        </div>
      )}
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
