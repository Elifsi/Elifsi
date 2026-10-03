import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="py-24 sm:py-32 flex items-center justify-center min-h-[60vh]">
      <Container size="tight" className="text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF1F3] text-[#D91432] text-xs font-semibold uppercase tracking-wider border border-[#F51F3D]/20 mb-6">
          <span>Error 404</span>
          <span>·</span>
          <span>Resource Not Found</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] tracking-tight">
          Page Not Located
        </h1>
        <p className="mt-4 text-base text-[#667085] max-w-lg mx-auto leading-relaxed">
          The requested route does not exist or has been restructured within the Elifsi Technologies
          ecosystem.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Button href="/" variant="primary" size="md">
            Return to Homepage
          </Button>
          <Button href="/products" variant="secondary" size="md">
            Explore Products
          </Button>
          <Button href="/contact" variant="outline" size="md">
            Contact Support
          </Button>
        </div>
      </Container>
    </div>
  );
}
