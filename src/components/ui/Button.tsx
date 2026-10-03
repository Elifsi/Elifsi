import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import Link from "next/link";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "dark";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className = "",
      variant = "primary",
      size = "md",
      href,
      isLoading = false,
      disabled,
      leftIcon,
      rightIcon,
      type = "button",
      ...props
    },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs font-medium gap-1.5",
      md: "px-5 py-2.5 text-sm font-semibold gap-2",
      lg: "px-7 py-3.5 text-base font-semibold gap-2.5",
    }[size];

    const variantClasses = {
      primary:
        "bg-[#F51F3D] text-white hover:bg-[#D91432] active:bg-[#B70E28] border border-[#F51F3D] shadow-sm",
      secondary:
        "bg-white text-[#111827] hover:bg-[#F7F8FA] active:bg-[#E5E7EB] border border-[#E5E7EB] shadow-sm",
      outline:
        "bg-transparent text-[#111827] hover:bg-[#FFF1F3] hover:text-[#D91432] border border-[#E5E7EB]",
      ghost:
        "bg-transparent text-[#111827] hover:bg-[#F7F8FA] hover:text-[#F51F3D] border border-transparent",
      dark:
        "bg-[#111827] text-white hover:bg-[#1F2937] active:bg-[#030712] border border-[#111827] shadow-sm",
    }[variant];

    const baseClasses =
      "inline-flex items-center justify-center rounded font-medium transition-all duration-150 select-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F51F3D] focus-visible:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const combinedClasses = `${baseClasses} ${sizeClasses} ${variantClasses} ${className}`;

    const content = (
      <>
        {isLoading && (
          <svg
            className="animate-spin -ml-0.5 h-4 w-4 shrink-0 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </>
    );

    if (href && !disabled && !isLoading) {
      return (
        <Link href={href} className={combinedClasses}>
          {content}
        </Link>
      );
    }

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={combinedClasses}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = "Button";
