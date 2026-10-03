import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { siteConfig } from "@/lib/site-config";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-[#E5E7EB] bg-[#F7F8FA] text-[#111827]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="md" />
            <p className="text-sm text-[#667085] leading-relaxed max-w-sm mt-3">
              <strong>Elifsi Technologies Private Limited</strong> is a software and technology company
              focused on engineering modern digital products, intelligent AI platforms, and unified software
              ecosystems.
            </p>
            <div className="pt-2 text-xs text-[#667085]">
              <span className="font-semibold text-[#111827]">Flagship Consumer Product:</span>{" "}
              <Link href="/products/evrry" className="text-[#F51F3D] font-medium hover:underline">
                Evrry
              </Link>{" "}
              · Everyday services unified through Eli AI concierge.
            </div>
            <div className="pt-2 flex items-center gap-3 text-xs text-[#667085]">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span>Platform Systems Nominal · Direct Inquiries Active</span>
            </div>
          </div>

          {/* Column: Products */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#111827] mb-4">
              Products
            </h3>
            <ul className="space-y-2.5 text-sm text-[#667085]">
              <li>
                <Link href="/products" className="hover:text-[#F51F3D] transition-colors">
                  Product Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/products/evrry"
                  className="inline-flex items-center gap-1.5 hover:text-[#F51F3D] transition-colors font-medium text-[#111827]"
                >
                  <span>Evrry Super App</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#FFF1F3] text-[#F51F3D]">
                    Flagship
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/products/evrry#eli" className="hover:text-[#F51F3D] transition-colors">
                  Eli AI Concierge
                </Link>
              </li>
              <li>
                <Link href="/products#core-engine" className="hover:text-[#F51F3D] transition-colors">
                  Elifsi Core Engine
                </Link>
              </li>
              <li>
                <Link href="/products#future" className="hover:text-[#F51F3D] transition-colors">
                  Future Horizons
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Company & Careers */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#111827] mb-4">
              Company
            </h3>
            <ul className="space-y-2.5 text-sm text-[#667085]">
              <li>
                <Link href="/company" className="hover:text-[#F51F3D] transition-colors">
                  About Elifsi
                </Link>
              </li>
              <li>
                <Link href="/company#principles" className="hover:text-[#F51F3D] transition-colors">
                  Engineering Principles
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-1.5 hover:text-[#F51F3D] transition-colors"
                >
                  <span>Careers</span>
                  <span className="text-[9px] font-bold px-1.5 py-0.2 rounded bg-[#FFF1F3] text-[#D91432]">
                    Open Roles
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[#F51F3D] transition-colors">
                  Contact & Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Column: Legal & Corporate */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.16em] text-[#111827] mb-4">
              Legal & Trust
            </h3>
            <ul className="space-y-2.5 text-sm text-[#667085]">
              <li>
                <Link href="/privacy" className="hover:text-[#F51F3D] transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-[#F51F3D] transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-[#F51F3D] transition-colors text-xs font-semibold text-[#111827]">
                  Console & Hiring Admin →
                </Link>
              </li>
              <li>
                <Link href="/contact?topic=security" className="hover:text-[#F51F3D] transition-colors">
                  Security & Disclosure
                </Link>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.contactEmail}`}
                  className="text-xs font-mono text-[#F51F3D] hover:underline"
                >
                  {siteConfig.contactEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-[#E5E7EB] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#667085]">
          <p>© {currentYear} {siteConfig.companyName}. All rights reserved.</p>
          <p className="text-center sm:text-right">
            Independent software development company · Corporate headquarters: Janakpur, Nepal
          </p>
        </div>
      </div>
    </footer>
  );
}
