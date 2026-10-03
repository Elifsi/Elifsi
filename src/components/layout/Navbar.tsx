"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setProductsOpen(false);
  }, [pathname]);

  const navLinks = [
    { label: "Company", href: "/company" },
    { label: "Careers", href: "/careers", badge: "Hiring" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-200 ${
        scrolled
          ? "bg-white/90 backdrop-blur-md border-b border-[#E5E7EB] shadow-xs"
          : "bg-white/80 backdrop-blur-sm border-b border-[#E5E7EB]/60"
      }`}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 sm:h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Logo href="/" size="md" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main Navigation">
            {/* Products Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button
                type="button"
                className={`flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded transition-colors ${
                  pathname.startsWith("/products")
                    ? "text-[#F51F3D] font-semibold"
                    : "text-[#111827] hover:text-[#F51F3D]"
                }`}
                aria-expanded={productsOpen}
                onClick={() => setProductsOpen((prev) => !prev)}
              >
                <span>Products</span>
                <svg
                  className={`w-3.5 h-3.5 text-[#667085] transition-transform duration-200 ${
                    productsOpen ? "rotate-180 text-[#F51F3D]" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {productsOpen && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="bg-white border border-[#E5E7EB] rounded-lg shadow-xl p-2">
                    <Link
                      href="/products/evrry"
                      className="group flex flex-col p-3 rounded-md hover:bg-[#FFF1F3] transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-sm text-[#111827] group-hover:text-[#D91432]">
                          Evrry
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#FFF1F3] text-[#F51F3D] border border-[#F51F3D]/25">
                          Flagship
                        </span>
                      </div>
                      <span className="text-xs text-[#667085] mt-1 leading-snug">
                        AI-First consumer super app powered by Eli concierge.
                      </span>
                    </Link>

                    <div className="my-1 border-t border-[#E5E7EB]" />

                    <Link
                      href="/products"
                      className="group flex flex-col p-3 rounded-md hover:bg-[#F7F8FA] transition-colors"
                    >
                      <span className="font-semibold text-xs text-[#111827] group-hover:text-[#F51F3D]">
                        Portfolio & Architecture Overview →
                      </span>
                      <span className="text-[11px] text-[#667085] mt-0.5">
                        Explore Elifsi&apos;s product ecosystem & core engine.
                      </span>
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`relative flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium rounded transition-colors ${
                    isActive
                      ? "text-[#F51F3D] font-semibold"
                      : "text-[#111827] hover:text-[#F51F3D]"
                  }`}
                >
                  <span>{link.label}</span>
                  {link.badge && (
                    <span className="text-[10px] font-bold tracking-wide uppercase px-1.5 py-0.2 rounded bg-[#FFF1F3] text-[#F51F3D] border border-[#F51F3D]/20">
                      {link.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <Button href="/products/evrry" variant="outline" size="sm">
              Discover Evrry
            </Button>
            <Button href="/contact" variant="primary" size="sm">
              Contact Company
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center">
            <button
              type="button"
              onClick={() => setMobileMenuOpen((prev) => !prev)}
              className="p-2 text-[#111827] hover:text-[#F51F3D] rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F51F3D]"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#E5E7EB] bg-white px-4 pt-3 pb-6 animate-in slide-in-from-top-2 duration-200">
          <div className="space-y-1">
            <div className="pb-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#667085] px-3">
                Products
              </span>
              <div className="mt-1 space-y-1">
                <Link
                  href="/products/evrry"
                  className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-semibold text-[#111827] hover:bg-[#FFF1F3] hover:text-[#D91432]"
                >
                  <span>Evrry (Consumer Super App)</span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#FFF1F3] text-[#F51F3D]">
                    Flagship
                  </span>
                </Link>
                <Link
                  href="/products"
                  className="block px-3 py-2 text-xs text-[#667085] hover:text-[#111827]"
                >
                  All Products & Core Engine Overview →
                </Link>
              </div>
            </div>

            <div className="border-t border-[#E5E7EB] pt-2" />

            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium text-[#111827] hover:bg-[#F7F8FA]"
              >
                <span>{link.label}</span>
                {link.badge && (
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#FFF1F3] text-[#F51F3D]">
                    {link.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="mt-5 pt-4 border-t border-[#E5E7EB] flex flex-col gap-2.5">
            <Button href="/products/evrry" variant="outline" size="md" className="w-full">
              Discover Evrry
            </Button>
            <Button href="/contact" variant="primary" size="md" className="w-full">
              Contact Company
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
