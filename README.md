# Elifsi Technologies Private Limited — Official Corporate Website

Official corporate web application for **Elifsi Technologies Private Limited**, engineered with Next.js 16 (App Router), React 19, TypeScript, Three.js 3D WebGL, and Tailwind CSS v4.

---

## 1. Brand Hierarchy & Positioning

- **Company:** `Elifsi Technologies Private Limited` — A modern software and technology company that creates, owns, and operates software products, intelligent platforms, and consumer applications.
- **Flagship Product:** `Evrry` — The AI-first everyday consumer super app uniting dining, grocery, mobility, stays, and instant payments.
- **Embedded Intelligence:** `Eli` — The cross-domain AI concierge operating within Evrry.
- **Foundational Core:** `Elifsi Core Engine` — Distributed orchestration mesh and transactional ledger powering current and future Elifsi products.

---

## 2. Official Visual Identity & Brand Tokens

| Token | Role | HEX |
|---|---|---|
| `--color-primary` | Elifsi Red | `#F51F3D` |
| `--color-primary-dark` | Deep Red | `#D91432` |
| `--color-text-main` | Deep Charcoal | `#111827` |
| `--color-text-muted` | Neutral Gray | `#667085` |
| `--color-bg-white` | Pure White | `#FFFFFF` |
| `--color-surface` | Soft Gray Surface | `#F7F8FA` |
| `--color-brand-tint` | Soft Red Tint | `#FFF1F3` |
| `--color-border` | Light Gray Border | `#E5E7EB` |

---

## 3. Core Architecture & Routes

| Route | Purpose | Details |
|---|---|---|
| `/` | Corporate Homepage | Hero, 3D interactive System Canvas, Company intro, What we build, Evrry showcase, Philosophy, Careers preview, CTA |
| `/company` | About Elifsi | Company mission, independent IP ownership, four operational pillars, standards & ethics |
| `/products` | Products Overview | Active Flagship (Evrry), Platform Tier (Core Engine), Future Horizons |
| `/products/evrry` | Dedicated Evrry Page | Super app vision, Eli AI Concierge simulation, service verticals (Dining, Groceries, Rides, Rentals, Stays, Payments) |
| `/careers` | Careers Portal | Department filtering (Engineering, AI & Systems, Product & Design, Operations), culture benefits |
| `/careers/[slug]` | Job Details & Application | Complete spec, responsibilities, requirements, and direct application form with resume file upload |
| `/contact` | Corporate Inquiries | Categorized contact form with reference ID generation and routing |
| `/privacy` | Privacy Policy | Detailed corporate privacy policy and data protection standards |
| `/terms` | Terms of Service | Corporate governance and intellectual property terms |
| `/robots.txt` & `/sitemap.xml` | SEO Discovery | Search engine crawlers and dynamic sitemap indexing |

---

## 4. API Endpoints & Workflows

### `/api/contact` (POST)
- Rate limiting (5 requests / minute per IP)
- Bot protection via honeypot field
- Zod schema validation
- Resend transactional email to corporate inbox (`contact@elifsi.com`)
- Automated receipt email to user with unique reference code (`ELF-CNT-YYYYMMDD-XXXX`)
- Graceful console fallback when `RESEND_API_KEY` is not configured

### `/api/careers/apply` (POST)
- Rate limiting (3 requests / minute per IP)
- Multipart form parsing supporting CV / resume upload (PDF, DOC, DOCX up to 5MB)
- Bot protection via honeypot field
- Zod validation for candidate profile
- Resend transactional email with candidate summary and attached resume to `careers@elifsi.com`
- Auto-acknowledgement email to candidate with reference code (`ELF-APP-YYYYMMDD-XXXX`)

---

## 5. Development & Production Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run production build and type check
npm run build

# Start production server
npm run start
```

---

## 6. Environment Variables

Copy `.env.local.example` to `.env.local` to enable live Resend email delivery:

```env
RESEND_API_KEY=re_your_live_api_key
RESEND_FROM=Elifsi Technologies <noreply@elifsi.com>
RESEND_NOTIFY_EMAIL=contact@elifsi.com
RESEND_CAREERS_EMAIL=careers@elifsi.com
NEXT_PUBLIC_SITE_URL=https://www.elifsi.com
```

*Note: In local development without an API key, all submissions are safely logged to the server console with simulated success codes.*
