import type { Metadata } from "next";
import { ConsultationButton } from "@/components/consultation-button";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { FinancialHero } from "@/components/financial-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Financial Services · Banking, Accounting, Tax, AML & Trademark",
  description:
    "Corporate banking, monthly accounting, VAT filing, UAE Corporate Tax registration, AML / ESR / UBO frameworks and trademark filing. One accountable team for every number that touches your business.",
  alternates: { canonical: "/financial" },
};

const sections: ServiceSectionData[] = [
  {
    id: "banking",
    index: "01",
    eyebrow: "Bank account opening",
    title: "Corporate banking",
    icon: "banknote",
    lede:
      "Open a UAE corporate account that actually approves, and, if you need it, an international account too. We pre-screen your file against each bank's compliance bar, frame the documents the way they expect, and stay on the application until it's live.",
    image: {
      src: "/services/financial/banking.webp",
      alt: "UAE corporate banking",
    },
    good: [
      "New companies that need a working account in the first month",
      "Foreign shareholders without an existing UAE relationship",
      "Trading or holding structures with multi-currency needs",
      "Founders who've been declined elsewhere and need a fresh route",
    ],
    included: [
      "Eligibility audit: activity, jurisdiction, beneficial-owner profile",
      "Bank shortlist with realistic approval probability per bank",
      "KYC pack assembly: corporate docs, references, business plan",
      "Application submission and bank-meeting accompaniment",
      "Account activation, online banking and card issuance",
    ],
    meta: [
      { label: "Banks covered", value: "ENBD · Mashreq · ADIB · ADCB · FAB · WIO · RAK · HSBC" },
      { label: "Setup time", value: "2–6 weeks" },
      { label: "Currencies", value: "AED · USD · EUR · GBP · multi-CCY" },
      { label: "International", value: "Available · case by case" },
    ],
    highlight: {
      eyebrow: "Why we get more accounts approved",
      title: "We frame the file the way the bank wants to read it.",
      body: "Most rejections aren't about the business; they're about how the file is presented. We package activity, ownership and source of funds so compliance has the answer before they ask the question.",
    },
    steps: [
      "Profile review: activity, ownership, expected turnover.",
      "Shortlist banks with realistic approval odds for your file.",
      "Assemble KYC pack and walk into the bank meeting prepared.",
      "Account live: online banking, card and cheque book ready.",
    ],
  },
  {
    id: "accounting",
    index: "02",
    eyebrow: "Bookkeeping & VAT compliance",
    title: "Accounting & Bookkeeping",
    icon: "calculator",
    lede:
      "Monthly bookkeeping, financial statements and VAT registration plus quarterly returns. Clean books from day one, so when an audit, an investor or a Corporate Tax return shows up, you don't scramble for six months of receipts.",
    image: {
      src: "/services/financial/accounting.webp",
      alt: "Accounting & Bookkeeping filings",
    },
    good: [
      "Companies invoicing regularly, local or cross-border",
      "Businesses approaching or above the AED 375k VAT threshold",
      "Founders who want investor-grade books from month one",
      "Owners tired of doing it themselves on a spreadsheet",
    ],
    included: [
      "Chart-of-accounts setup, software onboarding (Zoho / Xero)",
      "Monthly transaction capture and bank reconciliations",
      "Monthly P&L, balance sheet and cash-flow statements",
      "VAT registration, invoice review and quarterly VAT returns",
      "Year-end financial statements ready for audit and Corporate Tax",
    ],
    meta: [
      { label: "VAT threshold", value: "AED 375k turnover" },
      { label: "Filing cadence", value: "Quarterly (or monthly)" },
      { label: "Software", value: "Zoho · Xero · QuickBooks" },
      { label: "Reporting", value: "Monthly P&L + balance sheet" },
    ],
    highlight: {
      eyebrow: "Books your CFO will thank you for",
      title: "We don't catch up. We keep up.",
      body: "Monthly close, monthly review, monthly numbers. Not a 6-month panic before tax season. When you need to share financials with a bank, an investor or the FTA, they're already there.",
    },
    steps: [
      "Set up the chart of accounts and onboard the software.",
      "Capture and reconcile every month, closed by day 10.",
      "Register for VAT and file quarterly returns on time.",
      "Year-end statements compiled for audit and tax filing.",
    ],
  },
  {
    id: "corporate-tax",
    index: "03",
    eyebrow: "UAE Corporate Tax",
    title: "Corporate tax",
    icon: "file-text",
    lede:
      "UAE Corporate Tax is here at 9% above AED 375,000, with special rules for free zones, holding structures and small business relief. We register, file and structure so you pay what you owe and not a dirham more.",
    image: {
      src: "/services/financial/corporate-tax.webp",
      alt: "UAE Corporate Tax",
    },
    good: [
      "Mainland companies above the AED 375k profit threshold",
      "Free-zone companies wanting to keep the 0% qualifying-income status",
      "Holding companies with subsidiaries, IP or real estate",
      "Groups eligible to consolidate as a UAE Tax Group",
    ],
    included: [
      "FTA registration and Tax Registration Number (TRN) issuance",
      "Free-zone qualifying-income analysis and documentation",
      "Annual taxable-income computation from your audited books",
      "Corporate Tax return preparation and filing",
      "Transfer-pricing documentation for related-party transactions",
    ],
    meta: [
      { label: "Standard rate", value: "9% above AED 375k" },
      { label: "Small Business Relief", value: "Up to AED 3M revenue" },
      { label: "Free-zone status", value: "0% on qualifying income" },
      { label: "Filing", value: "Annual · within 9 months" },
    ],
    highlight: {
      eyebrow: "The free-zone trap most miss",
      title: "0% isn't automatic. It's documented.",
      body: "Free-zone entities that don't track \"qualifying income\" properly lose the 0% status and pay 9% on everything. We set up the books to evidence qualifying income from day one, so the 0% sticks under FTA review.",
    },
    steps: [
      "Assess your CT exposure: mainland vs free zone vs group.",
      "Register with the FTA and get your TRN.",
      "Maintain audit-ready books with qualifying-income tags.",
      "Compute, file and document within 9 months of year-end.",
    ],
  },
  {
    id: "aml-esr-ubo",
    index: "04",
    eyebrow: "Regulatory frameworks",
    title: "AML / ESR / UBO",
    icon: "badge-check",
    lede:
      "Anti-Money-Laundering frameworks, Economic Substance Regulations notifications and Ultimate Beneficial Owner filings. Each one carries fines if missed. We put the framework in place and file every cycle on time.",
    image: {
      src: "/services/compliance/aml-esr-ubo.webp",
      alt: "AML, ESR and UBO compliance",
    },
    good: [
      "DNFBPs (real estate, dealers in precious metals, accountants, advisors)",
      "Companies engaged in relevant ESR activities: IP, holding, banking, leasing",
      "Free-zone and mainland companies with multiple beneficial owners",
      "Boards needing a documented compliance framework, not just a filing",
    ],
    included: [
      "AML risk assessment, policies, KYC / EDD framework, MLRO support",
      "ESR notification and substance return filings",
      "UBO declaration filing and register maintenance",
      "Annual recertification and ongoing change reporting",
      "Investigation and audit-readiness preparation",
    ],
    meta: [
      { label: "Authorities", value: "FIU · MoE · DET · free-zone regulators" },
      { label: "Cadence", value: "Annual + change-driven filings" },
      { label: "Fines if missed", value: "AED 10k–1M per breach" },
      { label: "Coverage", value: "Mainland · free zone · offshore" },
    ],
    highlight: {
      eyebrow: "Why these get missed",
      title: "Three filings, three authorities, three deadlines.",
      body: "AML, ESR and UBO each go to a different regulator on a different schedule. We track all three on one calendar so the year-end never becomes a fire drill, and the policies behind them are real, not template-only.",
    },
    steps: [
      "Risk-assess the entity for AML, ESR and UBO obligations.",
      "Draft policies, registers and KYC frameworks.",
      "File the relevant notifications and returns.",
      "Recertify each cycle. No missed deadlines.",
    ],
  },
  {
    id: "trademark",
    index: "05",
    eyebrow: "Brand protection",
    title: "Trademark",
    icon: "copyright",
    lede:
      "Register your brand name, logo and word-marks in the UAE, and, when you're ready, internationally through the Madrid System. Most disputes start because the trademark wasn't filed early enough; we make sure yours is.",
    image: {
      src: "/services/compliance/trademark.webp",
      alt: "Trademark filing",
    },
    good: [
      "Founders launching a new brand or product line",
      "Companies expanding into a new emirate or international market",
      "Businesses that just received a copy-cat warning or threat",
      "Anyone whose name is on a contract; protect it before someone else files it",
    ],
    included: [
      "Pre-filing similarity search across UAE, GCC and key markets",
      "Class selection across the 45 Nice classification classes",
      "Application drafting, filing fee handling and Ministry follow-up",
      "Publication, opposition window and certificate issuance",
      "International filing via the Madrid Protocol (multiple countries in one file)",
    ],
    meta: [
      { label: "Authority", value: "MoE · Ministry of Economy" },
      { label: "Term", value: "10 years · renewable" },
      { label: "Filing time", value: "8–12 months to certificate" },
      { label: "International", value: "Madrid Protocol · single filing, many countries" },
    ],
    highlight: {
      eyebrow: "The classic mistake",
      title: "Trade licence is not a trademark.",
      body: "Your trade licence proves you can operate. Your trademark proves the brand belongs to you. We see disputes every quarter because owners assumed the licence was enough. File the trademark while the brand is still small.",
    },
    steps: [
      "Run a similarity search across UAE and target markets.",
      "Pick the right classes (the 45-class system).",
      "File with MoE and respond to any office action.",
      "Publish, clear opposition window, receive certificate.",
    ],
  },
];

export default function FinancialPage() {
  return (
    <>
      <FinancialHero />

      {sections.map((s, idx) => (
        <ServiceSection key={s.id} section={s} idx={idx} />
      ))}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Next step
              </div>
              <h2 className="font-display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                Send us last month's books.{" "}
                <span className="text-brand-soft">We'll tell you where the gaps are.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Banking, VAT, Corporate Tax, audit-readiness: assessed against the
                latest FTA rules and back to you within one business day. Free,
                30-minute consultation.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <ConsultationButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors" >
                  Book finance review
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </ConsultationButton>
                <Link
                  href="/business-setup"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Pair with company formation
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
