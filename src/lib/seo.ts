import type { Metadata } from "next";
import { siteConfig } from "./site-config";

export interface MetadataOptions {
  title?: string;
  description?: string;
  path?: string;
  ogImage?: string;
  noIndex?: boolean;
}

export function buildMetadata({
  title,
  description = siteConfig.brandDescription,
  path = "",
  noIndex = false,
}: MetadataOptions = {}): Metadata {
  const pageTitle = title
    ? `${title} | ${siteConfig.companyName}`
    : `${siteConfig.companyName} | ${siteConfig.brandHeadline}`;

  const canonicalUrl = `${siteConfig.url}${path}`;

  return {
    title: pageTitle,
    description,
    metadataBase: new URL(siteConfig.url),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: pageTitle,
      description,
      url: canonicalUrl,
      siteName: siteConfig.companyName,
      type: "website",
      locale: "en_US",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
  };
}

export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.companyName,
    legalName: siteConfig.legalName,
    alternateName: siteConfig.shortName,
    url: siteConfig.url,
    description: siteConfig.brandDescription,
    email: siteConfig.contactEmail,
    sameAs: [],
    knowsAbout: [
      "Software Development",
      "Artificial Intelligence",
      "Consumer Super Applications",
      "Distributed Cloud Systems",
    ],
  };
}

export function buildProductSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Evrry",
    operatingSystem: "iOS, Android, Web",
    applicationCategory: "ConsumerApplication, SuperApp",
    description: siteConfig.flagship.description,
    creator: {
      "@type": "Organization",
      name: siteConfig.companyName,
    },
  };
}
