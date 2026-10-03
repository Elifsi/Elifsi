import { Button } from "@/components/ui/Button";

interface CTASectionProps {
  eyebrow?: string;
  heading: string;
  description: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
}

export function CTASection({
  eyebrow = "Corporate Engagement",
  heading,
  description,
  primaryCtaLabel = "Contact Elifsi",
  primaryCtaHref = "/contact",
  secondaryCtaLabel = "Explore Careers",
  secondaryCtaHref = "/careers",
}: CTASectionProps) {
  return (
    <section className="relative overflow-hidden bg-[#111827] text-white py-20 lg:py-24">
      {/* Background architectural pattern */}
      <div className="absolute inset-0 opacity-10 bg-grid-subtle pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-[#F51F3D] opacity-15 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 mb-3">
            <span className="w-1.5 h-1.5 rounded-full bg-[#F51F3D]" />
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#F51F3D]">
              {eyebrow}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
            {heading}
          </h2>

          <p className="mt-5 text-base sm:text-lg text-gray-300 leading-relaxed max-w-2xl">
            {description}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            {primaryCtaLabel && primaryCtaHref && (
              <Button href={primaryCtaHref} variant="primary" size="lg">
                {primaryCtaLabel}
              </Button>
            )}
            {secondaryCtaLabel && secondaryCtaHref && (
              <Button href={secondaryCtaHref} variant="secondary" size="lg">
                {secondaryCtaLabel}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
