export type Department =
  | "Engineering"
  | "AI & Systems"
  | "Product & Design"
  | "Operations & Strategy";

export type JobStatus = "open" | "upcoming" | "filled";

export interface JobOpening {
  slug: string;
  title: string;
  department: Department;
  location: string;
  employmentType: "Full-time" | "Part-time" | "Contract" | "Hybrid / Remote";
  status: JobStatus;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  publishedAt: string;
}

export interface ProductInfo {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: string;
  status: "Active Flagship" | "Core Architecture" | "Future Ecosystem";
  summary: string;
  description: string;
  features: {
    title: string;
    description: string;
    icon?: string;
  }[];
  metricsOrBadges?: string[];
  href: string;
}

export type InquiryTopic =
  | "General Inquiry"
  | "Evrry Product Inquiry"
  | "Partnership & Ecosystem"
  | "Business & Enterprise"
  | "Careers & Talent"
  | "Media & Press"
  | "Other";

export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  topic: InquiryTopic;
  message: string;
  website_hp?: string; // honeypot
}

export interface JobApplicationFormData {
  jobSlug: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  location: string;
  portfolioUrl?: string;
  githubUrl?: string;
  linkedinUrl?: string;
  coverLetter?: string;
  additionalMessage?: string;
  website_hp?: string; // honeypot
}
