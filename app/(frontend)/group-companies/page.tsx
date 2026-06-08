import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, Calendar } from "lucide-react";
import { AffiliatedCompaniesHero } from "@/components/affiliated-companies-hero";
import {
  ServiceSection,
  type ServiceSectionData,
} from "@/components/service-section";

export const metadata: Metadata = {
  title: "Group Companies — Smart Creation Group",
  description:
    "Six specialist companies under Smart Creation Group across the UAE, Canada and Pakistan. Smart Business Creation, Next Journey Technology, Smart Holiday Homes, Intercity Bus, MM Contractor and Immersion Social.",
  alternates: { canonical: "/group-companies" },
};

const sections: ServiceSectionData[] = [
  {
    id: "smart-business-creation",
    index: "01",
    eyebrow: "Business Setup · UAE 🇦🇪",
    title: "Smart Business Creation LLC",
    icon: "building",
    logoSrc: "/group-logos/smart-business-creation.webp",
    mediaMode: "logo",
    logoTheme: "dark",
    lede:
      "The founding company of the Group. Smart Business Creation has licensed, banked and visa'd more than 10,000 businesses across every UAE jurisdiction since 2020. Mainland, free zone, offshore, holding structures and the day-to-day PRO file every founder lives inside.",
    image: {
      src: "/group-logos/smart-business-creation.webp",
      alt: "Smart Business Creation",
    },
    good: [
      "Founders setting up a Dubai or UAE company for the first time",
      "Multinationals opening a regional HQ or local entity",
      "Investors building a holding-company structure",
      "Existing companies migrating from another agent",
    ],
    included: [
      "End-to-end licensing — mainland, free zone, offshore",
      "Banking introductions with 10+ UAE banking partners",
      "Investor, employment and family-visa processing in-house",
      "Office space at any of the six owned business centers",
      "Annual renewals, audit and Corporate Tax filings",
    ],
    meta: [
      { label: "Founded", value: "2020" },
      { label: "Companies launched", value: "10,000+" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "HQ", value: "Damac Executive Heights, Tecom" },
    ],
    highlight: {
      eyebrow: "Why founders come back",
      title: "One accountable team, no broker chain.",
      body: "The same person who reads your brief gets your licence, opens the bank account, and stamps the visa. No agency hand-offs, no surprises.",
    },
    steps: [
      "Brief us on the activity, ownership and team size.",
      "Receive a costed, written setup plan within one business day.",
      "We file the licence, run banking, secure visas in parallel.",
      "Operate from one of our six centers or your own address.",
      "We renew, file and refile every year, on the calendar.",
    ],
  },
  {
    id: "smart-accounting-bookkeeping",
    index: "02",
    eyebrow: "Accounting · UAE 🇦🇪",
    title: "Smart Accounting & Bookkeeping",
    icon: "banknote",
    logoSrc: "/group-logos/smart-accounting-bookkeeping.webp",
    mediaMode: "logo",
    logoTheme: "dark",
    logoScale: "scale-150",
    lede:
      "Dedicated bookkeeping and accounting arm: monthly closes, payroll, VAT cycles, Corporate Tax preparation and audit-readiness — clean books on a calendar instead of a year-end scramble.",
    image: {
      src: "/group-logos/smart-accounting-bookkeeping.webp",
      alt: "Smart Accounting & Bookkeeping",
    },
    good: [
      "Founders who want clean books from day one",
      "SMEs preparing for VAT, Corporate Tax and statutory audit",
      "Companies migrating off an ad-hoc bookkeeper or spreadsheet",
      "Multinationals needing UAE-compliant monthly closes",
    ],
    included: [
      "Cloud-accounting setup (Zoho, Xero or QuickBooks)",
      "Monthly bookkeeping, bank reconciliation and reports",
      "Payroll, WPS and end-of-service calculations",
      "VAT registration, filings and refund support",
      "Corporate Tax registration, calculation and EmaraTax filing",
      "Statutory audit liaison",
    ],
    meta: [
      { label: "Sector", value: "Accounting · finance" },
      { label: "Cycle", value: "Monthly · quarterly · annual" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "HQ", value: "Damac Executive Heights, Tecom" },
    ],
    highlight: {
      eyebrow: "Why a dedicated bookkeeping arm",
      title: "Clean books, calendared. Not rebuilt under deadline.",
      body: "Companies don't get fined for being wrong, they get fined for being late. We keep your books closed monthly so VAT, Corporate Tax and audit are filings, not fire drills.",
    },
    steps: [
      "Onboarding: chart of accounts, prior-period clean-up, tool setup.",
      "Monthly close: bookkeeping, reconciliation, management report.",
      "Quarterly: VAT, payroll review, cash and runway view.",
      "Annual: Corporate Tax filing, audit pack, year-end review.",
    ],
  },
  {
    id: "smart-typing-center",
    index: "03",
    eyebrow: "Typing services · UAE 🇦🇪",
    title: "Smart Typing Center",
    icon: "file-text",
    logoSrc: "/group-logos/smart-typing-center.webp",
    mediaMode: "logo",
    logoTheme: "dark",
    logoScale: "scale-150",
    lede:
      "Our in-house government-relations typing centre: visa applications, Emirates ID renewals, Tas-heel labour services, MOI paperwork and Ministry of Foreign Affairs attestations submitted, tracked and chased without you ever queuing.",
    image: {
      src: "/group-logos/smart-typing-center.webp",
      alt: "Smart Typing Center",
    },
    good: [
      "Founders and HR teams running visa cycles for staff",
      "Investors and family-visa applicants needing fast processing",
      "Companies needing Tas-heel / MOL labour-portal filings",
      "Anyone tired of typing-centre queues and missed deadlines",
    ],
    included: [
      "GDRFA visa, entry-permit and status-change applications",
      "Emirates ID applications, renewals and biometric scheduling",
      "Tas-heel and MOL labour-card filings",
      "MOFA document attestation and notarisation",
      "Direct courier to ICA, MOI and labour offices",
    ],
    meta: [
      { label: "Sector", value: "Government services" },
      { label: "Authorities served", value: "ICA · GDRFA · MOL · MOFA" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "HQ", value: "Damac Executive Heights, Tecom" },
    ],
    highlight: {
      eyebrow: "Why have your own typing centre",
      title: "Submitted today, tracked daily, chased until it lands.",
      body: "Standalone typing centres process you and move on. Ours sits inside the same team that owns your file, so a stuck application gets followed up the same hour — not the next visit.",
    },
    steps: [
      "Send the brief and supporting docs.",
      "We type, validate and submit through the right authority.",
      "Tracking and chasing daily until issuance.",
      "Originals delivered or stored with your other corporate docs.",
    ],
  },
  {
    id: "next-journey",
    index: "04",
    eyebrow: "Technology · UAE 🇦🇪",
    title: "Next Journey Technology LLC",
    icon: "globe",
    logoSrc: "/group-logos/next-journey.webp",
    mediaMode: "logo",
    logoTheme: "dark",
    lede:
      "A specialized information technology firm dedicated to crafting intelligent and scalable digital solutions. Next Journey Technology builds and manages the core digital infrastructure for modern enterprises. Their team designs fast websites, responsive web apps, robust iOS and Android applications, and custom AI and Machine Learning models. By providing end-to-end cloud management, reliable IT infrastructure support, and strategic digital marketing, they ensure day-to-day business operations run seamlessly and efficiently.",
    image: {
      src: "/group-logos/next-journey.webp",
      alt: "Next Journey Technology",
    },
    good: [
      "Businesses wanting a powerful website, mobile app and custom software from day one",
      "Established companies modernising operations with cloud setups and custom AI tools",
      "Teams needing full IT support and infrastructure management without hiring full-time",
      "Brands looking to scale their online presence through data-driven digital marketing",
    ],
    included: [
      "Custom web and mobile application development with responsive UI design",
      "Smart automation, personalised customer portals and tailored software solutions",
      "Secure cloud infrastructure setup and continuous IT support",
      "Advanced AI and Machine Learning models integrated into your business workflow",
      "Data-driven digital marketing campaigns to scale your online traffic",
    ],
    meta: [
      { label: "Sector", value: "Technology & AI" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "Best for", value: "Scalable digital infrastructure" },
    ],
    highlight: {
      eyebrow: "Built for modern enterprises",
      title: "Intelligent, scalable digital infrastructure on tap.",
      body: "Websites, mobile apps, AI models, cloud and IT support, all under one accountable team so day-to-day operations run seamlessly.",
    },
    steps: [
      "Discovery: defining your digital roadmap, domain selection, brand strategy and launch goals.",
      "Design: creating custom user interfaces, full brand identity kits and targeted content frameworks.",
      "Build: rapid deployment of your website, mobile applications, custom software and integrated AI tools.",
      "Operate: continuous cloud management, daily IT infrastructure support and growth marketing.",
    ],
  },
  {
    id: "smart-holiday-homes",
    index: "05",
    eyebrow: "Hospitality · UAE 🇦🇪",
    title: "Smart Holiday Homes",
    icon: "star",
    logoSrc: "/group-logos/smart-holiday-homes.webp",
    mediaMode: "logo",
    logoTheme: "dark",
    lede:
      "A dedicated property management and vacation rental company specialising in flexible accommodations across prime Dubai locations. Smart Holiday Homes provides fully furnished short-term and long-term rentals tailored for modern travellers. For property owners, our expert team delivers complete management services including guest hosting, property care and optimised listings to turn homes into high-performing rental assets.",
    image: {
      src: "/group-logos/smart-holiday-homes.webp",
      alt: "Smart Holiday Homes",
    },
    good: [
      "Property owners wanting a hands-off way to earn passive income from short-term and long-term rentals",
      "Real-estate investors looking for complete listing management and optimised rental yields in Dubai",
      "Modern travellers and corporate professionals looking for fully furnished, flexible holiday-home stays",
      "Landlords wanting hassle-free DTCM compliance and professional property care without lifting a finger",
    ],
    included: [
      "Multi-platform marketing across Airbnb, Booking.com and premium corporate networks",
      "Complete DTCM licensing management, tourism-tax handling and regulatory compliance",
      "24/7 guest relations covering check-ins, key handovers and round-the-clock support",
      "Professional housekeeping, linen services and routine property maintenance",
      "Dynamic pricing management to maximise occupancy and revenue throughout the year",
    ],
    meta: [
      { label: "Sector", value: "Short-term rentals" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "Licence", value: "DTCM-registered operator" },
    ],
    highlight: {
      eyebrow: "Hands-off ownership",
      title: "Your unit, our operations. Your numbers, on a clean dashboard.",
      body: "We set the right price, keep the property hotel-clean and surface clear monthly statements. Owners stay in control without lifting a finger.",
    },
    steps: [
      "Property onboarding: conducting property assessments and setting up short-term or long-term rental strategies.",
      "DTCM registration: handling full government holiday-home licensing and legal compliance management.",
      "Listing management: professional staging, photography and optimisation across global booking platforms.",
      "Guest operations: managing bookings, guest screening, check-ins and 24/7 guest support.",
      "Property care: executing professional housekeeping, maintenance and detailed monthly financial reporting.",
    ],
  },
  {
    id: "intercity-bus",
    index: "06",
    eyebrow: "Transport · Canada 🇨🇦",
    title: "Intercity Bus Service",
    icon: "globe",
    logoSrc: "/group-logos/intercity-bus.webp",
    mediaMode: "logo",
    logoTheme: "dark",
    lede:
      "Premier intercity bus operator based in London, Ontario. Scheduled routes, private charters and a value-card programme — built for daily commuters, students and corporate transport across southern Ontario.",
    image: {
      src: "/group-logos/intercity-bus.webp",
      alt: "Intercity Bus Service",
    },
    good: [
      "Daily commuters across southern Ontario",
      "Universities and student associations",
      "Corporate groups, weddings and event transport",
      "Tour operators planning multi-day routes",
    ],
    included: [
      "Scheduled intercity routes from London, Ontario",
      "Private charter for groups, weddings and events",
      "Value-card programme for frequent travellers",
      "Modern, accessible fleet with on-board comfort",
      "Driver training, insurance and full safety compliance",
    ],
    meta: [
      { label: "Sector", value: "Transport & logistics" },
      { label: "Country", value: "Canada 🇨🇦" },
      { label: "Base", value: "London, Ontario" },
    ],
    highlight: {
      eyebrow: "Reliable transport, every route",
      title: "On-time intercity travel, run by an operator that answers the phone.",
      body: "From single-trip riders to weekly corporate contracts, Intercity Bus delivers the same standard of operations our UAE clients have trusted since 2020.",
    },
    steps: [
      "Pick a route or request a charter.",
      "Confirm pricing and schedule.",
      "Ride: comfortable, on-time, every day.",
      "Frequent rider? Save with the value-card programme.",
    ],
  },
  {
    id: "mm-contractor",
    index: "07",
    eyebrow: "Construction · Pakistan 🇵🇰",
    title: "MM Contractor & General Order Supplies",
    icon: "shield",
    logoSrc: "/group-logos/mm-contractor-square.webp",
    mediaMode: "logo",
    logoTheme: "dark",
    logoScale: "scale-[1.1]",
    lede:
      "Pakistan-based contracting arm of the Group. MM Contractor handles civil works, road development, infrastructure projects and general order supplies for public-sector and private-sector clients across Punjab.",
    image: {
      src: "/group-logos/mm-contractor-square.webp",
      alt: "MM Contractor & General Order Supplies",
    },
    good: [
      "Government infrastructure tenders in Pakistan",
      "Road development and civil works",
      "Industrial site preparation and excavation",
      "Bulk order supplies for public projects",
    ],
    included: [
      "Tender preparation, technical bid and pricing",
      "Project management and on-site supervision",
      "Civil works — roads, drainage, foundations",
      "General order supplies for public-sector contracts",
      "Compliance and reporting to procurement bodies",
    ],
    meta: [
      { label: "Sector", value: "Construction & infrastructure" },
      { label: "Country", value: "Pakistan 🇵🇰" },
      { label: "Operating since", value: "2021" },
    ],
    highlight: {
      eyebrow: "Built to spec, on the calendar",
      title: "Projects delivered on schedule, under public-sector standards.",
      body: "Our contracting arm follows the same discipline as our UAE operations — accountable project owners, transparent reporting, no surprises at handover.",
    },
    steps: [
      "Review tender or scope documents.",
      "Submit technical and commercial bid.",
      "Mobilise: site, equipment and crew.",
      "Execute with weekly progress reporting.",
      "Hand over, with compliance and warranty.",
    ],
  },
  {
    id: "immersion-social",
    index: "08",
    eyebrow: "Social Media · UAE 🇦🇪",
    title: "Immersion Social",
    icon: "star",
    logoSrc: "/group-logos/immersion.webp",
    mediaMode: "logo",
    logoTheme: "dark",
    lede:
      "A dynamic social media and digital marketing agency dedicated to scaling brands and building highly engaged online communities. Immersion Social designs high-impact content strategies, runs targeted ad campaigns and creates scroll-stopping social media assets that turn followers into customers. From creative content production and community management to data-driven growth marketing, they help modern businesses establish a powerful digital footprint across major social platforms.",
    image: {
      src: "/group-logos/immersion.webp",
      alt: "Immersion Social",
    },
    good: [
      "Brands launching in the UAE that need a powerful online presence and immediate social media traction",
      "Business owners wanting to scale their personal brand and build a trusted network in Dubai",
      "Companies looking to run highly targeted digital ad campaigns to generate quality leads",
      "Businesses seeking full-service creative content production without managing an internal team",
    ],
    included: [
      "Creative concept development, visual branding and strategic marketing direction",
      "Full grid planning, community management and interactive audience engagement",
      "Multi-platform content creation including professional video production and graphic design",
      "Targeted social-media advertising, campaign tracking and detailed ROI analytics",
      "Post-campaign performance reporting, audience insights and strategic follow-up growth planning",
    ],
    meta: [
      { label: "Sector", value: "Social Media & Marketing" },
      { label: "Country", value: "UAE 🇦🇪" },
      { label: "Best for", value: "Building digital footprint" },
    ],
    highlight: {
      eyebrow: "Turn followers into customers",
      title: "A powerful digital footprint, across every social platform.",
      body: "Content, ads, community and reporting under one accountable team so your brand grows in the feed and in the funnel.",
    },
    steps: [
      "Strategy: defining the core audience, campaign objectives and platform roadmap.",
      "Creative: developing unique concepts, visual direction and engaging content frameworks.",
      "Curation: identifying target demographics and building high-quality community-engagement plans.",
      "Execution: launching end-to-end digital campaigns and producing scroll-stopping media.",
      "Optimisation: tracking performance metrics, analysing content reach and planning next-step growth.",
    ],
  },
];

export default function AffiliatedCompaniesPage() {
  return (
    <>
      <AffiliatedCompaniesHero />

      {sections.map((s, idx) => (
        <ServiceSection key={s.id} section={s} idx={idx} />
      ))}

      {/* CTA */}
      <section className="py-20 md:py-28 bg-ink text-paper border-t border-paper/10">
        <div className="container-edit">
          <div className="grid grid-cols-12 gap-x-4 md:gap-x-10 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <div className="flex items-center gap-3 font-mono text-[0.66rem] uppercase tracking-[0.22em] text-mist mb-4">
                <span className="h-px w-8 bg-mist/40" />§ Work with the Group
              </div>
              <h2 className="font-display text-[clamp(1.75rem,3.4vw,2.5rem)] leading-[1.05] tracking-[-0.02em] text-paper text-balance max-w-3xl">
                One brief in.{" "}
                <span className="text-brand-soft">The right Group arm out.</span>
              </h2>
              <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-paper/75">
                Tell us what you need — business setup, technology, hospitality,
                transport, contracting or experiences — and we&apos;ll route it
                to the right team. Same standard, same accountability across
                every company.
              </p>
            </div>
            <div className="col-span-12 lg:col-span-5 lg:text-right">
              <div className="inline-flex flex-col gap-3 lg:items-end">
                <Link
                  href="/contact"
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3.5 text-[0.95rem] font-medium text-ink hover:bg-paper transition-colors"
                >
                  Book consultation
                  <ArrowUpRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.8}
                  />
                </Link>
                <Link
                  href="/business-centers"
                  className="group inline-flex items-center justify-center gap-2 rounded-full border border-paper/20 bg-paper/5 backdrop-blur px-5 py-3 text-[0.9rem] text-paper hover:bg-paper/10 transition-colors"
                >
                  <Calendar className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Tour our business centers
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
