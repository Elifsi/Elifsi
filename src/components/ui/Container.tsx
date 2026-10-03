import { type ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  size?: "default" | "tight" | "wide";
}

export function Container({
  children,
  className = "",
  size = "default",
}: ContainerProps) {
  const sizeClasses = {
    tight: "max-w-4xl",
    default: "max-w-7xl",
    wide: "max-w-[1400px]",
  }[size];

  return (
    <div className={`mx-auto w-full px-4 sm:px-6 lg:px-8 ${sizeClasses} ${className}`}>
      {children}
    </div>
  );
}
