import type { Metadata } from "next";
import { ConsultationButton } from "@/components/consultation-button";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { CategoryHero } from "@/components/category-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Accounting & Bookkeeping Services in the UAE",
  description:
    "Monthly management accounting and day-to-day bookkeeping for UAE companies — clean, IFRS-aligned books kept on a calendar and ready for VAT, audit and Corporate Tax.",
  alternates: { canonical: "/financial/accounting" },
};

const sections: ServiceSectionData[] = [
  {
    id: "accounting-services",
    index: "01",
    eyebrow: "Management accounting",
    title: "Accounting Services",
    icon: "calculator",
    lede:
      "Monthly management accounts, financial statements and a clean ledger maintained on a calendar — so your numbers are always investor-, bank- and FTA-ready, never rebuilt under deadline.",
    image: {
      src: "/services/financial/accounting.webp",
      alt: "Accounting services in the UAE",
    },
    good: [
      "Companies that want monthly numbers, not a year-end scramble",
      "Founders preparing for investment, a loan or an audit",
      "Businesses moving off spreadsheets to proper cloud accounting",
      "Owners who want a clear monthly P&L and cash position",
    ],
    included: [
      "Chart-of-accounts setup and cloud-accounting onboarding (Zoho / Xero / QuickBooks)",
      "Monthly transaction recording and bank reconciliations",
      "Monthly P&L, balance sheet and cash-flow statements",
      "Management reports with the numbers that matter to you",
      "Year-end financial statements ready for audit and Corporate Tax",
    ],
    meta: [
      { label: "Cadence", value: "Monthly close" },
      { label: "Software", value: "Zoho · Xero · QuickBooks" },
      { label: "Reporting", value: "P&L · balance sheet · cash flow" },
      { label: "Standards", value: "IFRS-aligned" },
    ],
    highlight: {
      eyebrow: "Why monthly beats year-end",
      title: "We keep up, so you never catch up.",
      body: "Books closed every month mean no six-month panic before tax season — when a bank, investor or the FTA asks for figures, they're already there and reconciled.",
    },
    steps: [
      "Set up the chart of accounts and onboard your software.",
      "Record and reconcile every transaction, monthly.",
      "Issue management accounts by the 10th of each month.",
      "Compile year-end statements for audit and tax.",
    ],
  },
  {
    id: "bookkeeping-services",
    index: "02",
    eyebrow: "Day-to-day bookkeeping",
    title: "Bookkeeping Services",
    icon: "file-text",
    lede:
      "Accurate day-to-day recording of every invoice, bill, receipt and payment — the clean foundation that makes accounting, VAT and tax effortless instead of a reconstruction job.",
    image: {
      src: "/services/financial/banking.webp",
      alt: "Bookkeeping services in the UAE",
    },
    good: [
      "Businesses with steady invoice and expense volume",
      "Owners spending nights on spreadsheets instead of the business",
      "Companies that need VAT-ready records every quarter",
      "Teams wanting receipts and ledgers organised from day one",
    ],
    included: [
      "Sales and purchase invoice recording",
      "Expense capture and receipt management",
      "Bank, cash and card reconciliations",
      "Accounts payable and receivable tracking",
      "VAT-ready transaction tagging for quarterly returns",
    ],
    meta: [
      { label: "Cadence", value: "Weekly or monthly" },
      { label: "Software", value: "Cloud-based · you keep access" },
      { label: "Records", value: "Full audit trail" },
      { label: "Feeds into", value: "Accounting · VAT · CT" },
    ],
    highlight: {
      eyebrow: "The foundation everything sits on",
      title: "Clean books in, clean everything out.",
      body: "VAT returns, audits and Corporate Tax filings are only as good as the bookkeeping underneath. Get it right daily and the rest stops being a fire drill.",
    },
    steps: [
      "Connect bank feeds and set up the record-keeping system.",
      "Record invoices, bills and expenses as they happen.",
      "Reconcile every account on each cycle.",
      "Hand clean books to accounting, VAT and tax.",
    ],
  },
];

export default function AccountingPage() {
  return (
    <>
      <CategoryHero
        breadcrumb="Accounting"
        eyebrow="Accounting"
        title={
          <>
            <span className="block">Clean books,</span>
            <span className="block text-brand">kept on a calendar.</span>
          </>
        }
        lede="Management accounting and day-to-day bookkeeping for UAE companies — accurate every month, and always ready for VAT, audit and Corporate Tax."
        cta={{ label: "Book a finance review", href: "/contact" }}
        pillars={[
          {
            id: "accounting-services",
            index: "01",
            label: "Accounting Services",
            desc: "Monthly accounts & statements",
            icon: "calculator",
          },
          {
            id: "bookkeeping-services",
            index: "02",
            label: "Bookkeeping Services",
            desc: "Day-to-day record keeping",
            icon: "file-text",
          },
        ]}
      />

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
                Accounting, bookkeeping and VAT-readiness, reviewed against the
                latest FTA rules and back to you within one business day. Free,
                30-minute consultation.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <ConsultationButton className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors" >
                Book a finance review
                <ArrowUpRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.8}
                />
              </ConsultationButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
