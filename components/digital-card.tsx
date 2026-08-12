import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Download,
  ArrowUpRight,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { CONTACT } from "@/lib/data";
import { CardConsultation } from "@/components/card-consultation";

const MAPS_URL =
  "https://maps.google.com/?q=" +
  encodeURIComponent("Damac Executive Heights, Barsha Heights (Tecom), Dubai");

/** Where the "Visit our website" row goes, and the domain the cards live on. */
const WEBSITE_URL = "https://smartbusinesscreation.com";

const COMPANY_SOCIALS: SocialLink[] = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/smartbusinesscreation/", icon: "linkedin" },
  { label: "Instagram", href: "https://www.instagram.com/smartcreationuae", icon: "instagram" },
  { label: "Facebook", href: "https://www.facebook.com/smartbusinesscreationuae/", icon: "facebook" },
  { label: "YouTube", href: "https://www.youtube.com/@SmartBusinessCreation", icon: "youtube" },
  { label: "TikTok", href: "https://www.tiktok.com/@smartcreationuae", icon: "tiktok" },
  { label: "X", href: "https://x.com/smartcreationae", icon: "x" },
  { label: "Threads", href: "https://www.threads.com/@smartcreationuae", icon: "threads" },
];

const SOCIAL_ICONS = {
  linkedin: Linkedin,
  instagram: Instagram,
  facebook: Facebook,
  youtube: Youtube,
  tiktok: TikTokGlyph,
  x: XGlyph,
  threads: ThreadsGlyph,
} as const;

export type SocialKey = keyof typeof SOCIAL_ICONS;
export type SocialLink = { label: string; href: string; icon: SocialKey };

function TikTokGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5.8 20.1a6.34 6.34 0 0 0 10.86-4.43V8.62a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.84-.05Z" />
    </svg>
  );
}

function XGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.5 11.24h-6.66l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25h6.834l4.713 6.231L18.244 2.25Zm-1.161 17.52h1.833L7.084 4.126H5.117l11.966 15.644Z" />
    </svg>
  );
}

function ThreadsGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M12.18 22.5h-.06C8.5 22.48 5.71 21.34 4.04 19.16 2.56 17.22 1.8 14.55 1.78 11.24v-.49c.02-3.31.78-5.98 2.26-7.93C5.71 1.16 8.5.02 12.12 0h.06c2.78.02 5.1.7 6.9 2.03 1.7 1.25 2.9 3.04 3.55 5.31l-2.07.58c-1.1-3.95-3.92-5.95-8.4-5.97-2.95.02-5.19.93-6.65 2.7-1.37 1.66-2.07 4.05-2.1 7.1.02 3.05.73 5.45 2.1 7.1 1.46 1.77 3.7 2.69 6.65 2.7 2.65-.02 4.42-.65 5.88-2.08 1.66-1.63 1.64-3.62.96-4.83-.4-.7-1.13-1.29-2.1-1.7-.24 1.78-.81 3.22-1.71 4.3-1.2 1.45-2.91 2.24-5.1 2.36-1.65.09-3.25-.31-4.47-1.13-1.45-.97-2.3-2.46-2.39-4.18-.18-3.34 2.49-5.74 6.65-5.98 1.48-.08 2.86 0 4.13.24-.17-1.04-.51-1.86-1.02-2.45-.7-.81-1.79-1.23-3.23-1.24h-.04c-1.16 0-2.73.32-3.73 1.85L4.18 7.34c1.33-2.04 3.5-3.16 6.1-3.16h.05c4.36.03 6.96 2.7 7.22 7.36.15.06.3.12.44.2 2 .94 3.47 2.36 4.24 4.1 1.07 2.43.99 6.39-2.13 9.45-2.38 2.34-5.27 3.4-9.13 3.42h-.06l.05-.21Zm.59-12.62c-.34 0-.69 0-1.04.03-3.12.17-5.06 1.6-4.95 3.65.12 2.16 2.5 3.16 4.8 3.04 2.11-.11 4.86-.93 5.33-6.36-.91-.21-2.32-.36-4.14-.36Z" />
    </svg>
  );
}

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" fill="currentColor" className={className} aria-hidden xmlns="http://www.w3.org/2000/svg">
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 01-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 01-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.717.315-.601.662-.945 1.49-.945 2.39 0 .24.03.481.08.722.244 1.176.914 2.254 1.682 3.17 1.198 1.433 3.137 2.878 5.12 3.42.525.143 1.047.23 1.58.23.98 0 2.137-.343 2.752-1.047.315-.372.45-.78.45-1.236 0-.235-.057-.472-.145-.687-.172-.372-1.205-.93-1.576-1.006a3.205 3.205 0 00-.55-.086zM16.06 4.29c-6.53 0-11.82 5.29-11.82 11.82 0 2.088.544 4.125 1.593 5.92L4 29l7.13-1.82a11.768 11.768 0 004.93 1.073c6.53 0 11.82-5.29 11.82-11.82 0-6.53-5.29-11.82-11.82-11.82zm.018 21.8a9.96 9.96 0 01-5.09-1.392l-.36-.215-3.77.972 1.006-3.653-.243-.386a9.977 9.977 0 01-1.52-5.305c0-5.514 4.49-10.004 10.004-10.004 5.514 0 10.004 4.49 10.004 10.004 0 5.514-4.49 10.004-10.03 10.004z" />
    </svg>
  );
}

export type DigitalCardProps = {
  /** Display name (company or person). */
  name: string;
  /** Small mono sub-line under the name. */
  role: string;
  /** One-line description / tagline. */
  tagline: string;
  /** Avatar — cube (company mark) or round (person photo). */
  avatar: { src: string; alt: string; shape: "cube" | "round" };
  /** Path to the downloadable vCard. */
  vcf: string;
  /** Optional pill under the name, e.g. "Founder & C.E.O". */
  chip?: string;
  /** Direct dial number for this card (defaults to the main line). */
  phoneHref?: string;
  /** Display number shown in the contact rows (defaults to the main line). */
  phone?: string;
  /** Email address shown + linked (defaults to the company inbox). */
  email?: string;
  emailHref?: string;
  /** WhatsApp chat link (defaults to the company number). */
  whatsappHref?: string;
  /** Address lines (default to the head office). */
  address1?: string;
  address2?: string;
  /** Social links to show — icons only for links provided. */
  socials?: SocialLink[];
  /** Label used to tag consultation form submissions. */
  source?: string;
  /** Admin-managed card: routes form leads to this card's owner. */
  cardSlug?: string;
  /** First name of the card owner, used in the form's confirmation copy. */
  ownerName?: string;
  /** Owner's WhatsApp number, digits only — enables the WhatsApp hand-off. */
  ownerWhatsapp?: string;
};

export function DigitalCard({
  name,
  role,
  tagline,
  avatar,
  vcf,
  chip,
  phoneHref = CONTACT.phoneHref,
  phone = CONTACT.phone,
  email = CONTACT.email,
  emailHref = CONTACT.emailHref,
  whatsappHref = CONTACT.whatsappHref,
  address1 = CONTACT.address,
  address2 = CONTACT.addressLine2,
  socials = COMPANY_SOCIALS,
  source = "Digital card",
  cardSlug,
  ownerName,
  ownerWhatsapp,
}: DigitalCardProps) {
  return (
    <main className="min-h-[100svh] w-full bg-paper-deep flex items-start sm:items-center justify-center px-4 py-6 sm:py-10">
      <article className="relative w-full max-w-[26rem] overflow-hidden rounded-[28px] border border-ink/10 bg-paper shadow-[0_40px_100px_-30px_rgba(13,16,19,0.45)]">
        {/* Cover */}
        <div className="relative h-40">
          <Image
            src="/team-group.webp"
            alt=""
            fill
            priority
            sizes="420px"
            className="object-cover object-[center_25%]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/90" />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-10 -right-10 h-44 w-44 rounded-full"
            style={{
              background:
                "radial-gradient(closest-side, rgba(72,168,219,0.45), rgba(72,168,219,0) 70%)",
            }}
          />
        </div>

        {/* Avatar */}
        <div className="-mt-12 flex justify-center">
          {avatar.shape === "round" ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-full border-[3px] border-paper bg-paper shadow-[0_18px_40px_-18px_rgba(13,16,19,0.45)] ring-2 ring-brand/40">
              <Image src={avatar.src} alt={avatar.alt} fill sizes="96px" className="object-cover" />
            </div>
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-3xl border border-ink/10 bg-paper shadow-[0_18px_40px_-18px_rgba(13,16,19,0.4)]">
              <Image src={avatar.src} alt={avatar.alt} width={64} height={64} className="h-14 w-14 object-contain" />
            </div>
          )}
        </div>

        {/* Identity */}
        <div className="px-6 pt-4 text-center">
          {chip && (
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-brand-wash px-3 py-1 font-mono text-[0.56rem] uppercase tracking-[0.2em] text-brand-deep">
              {chip}
            </span>
          )}
          <h1 className="font-display text-[1.6rem] font-semibold tracking-[-0.02em] text-ink leading-tight">
            {name}
          </h1>
          <p className="mt-1.5 font-mono text-[0.62rem] uppercase tracking-[0.2em] text-stone">
            {role}
          </p>
          <p className="mt-3 text-[0.92rem] leading-relaxed text-ink-mute">{tagline}</p>
        </div>

        {/* Save contact */}
        <div className="px-6 pt-6">
          <a
            href={vcf}
            download
            className="flex w-full items-center justify-center gap-2 rounded-full bg-brand-night px-6 py-4 text-[0.95rem] font-medium text-paper transition-colors hover:bg-brand hover:text-ink shadow-[0_14px_30px_-12px_rgba(14,53,84,0.6)]"
          >
            <Download className="h-4 w-4" strokeWidth={2} />
            Save contact
          </a>
        </div>

        {/* Quick actions */}
        <div className="px-6 pt-3 grid grid-cols-4 gap-2.5">
          <QuickAction href={phoneHref} label="Call" tone="ink">
            <Phone className="h-5 w-5" strokeWidth={1.8} />
          </QuickAction>
          <QuickAction href={whatsappHref} label="WhatsApp" tone="whatsapp" external>
            <WhatsAppGlyph className="h-5 w-5" />
          </QuickAction>
          <QuickAction href={emailHref} label="Email" tone="ink">
            <Mail className="h-5 w-5" strokeWidth={1.8} />
          </QuickAction>
          <QuickAction href={MAPS_URL} label="Map" tone="ink" external>
            <MapPin className="h-5 w-5" strokeWidth={1.8} />
          </QuickAction>
        </div>

        {/* Primary CTAs */}
        <div className="px-6 pt-5 space-y-2.5">
          <CardConsultation
            source={source}
            cardSlug={cardSlug}
            ownerName={ownerName}
            ownerWhatsapp={ownerWhatsapp}
          />
          <a
            href={WEBSITE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex w-full items-center justify-between rounded-2xl border border-ink/10 bg-paper-soft px-5 py-3.5 transition-colors hover:border-ink/30"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-ink/[0.05] text-ink">
                <Globe className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="text-[0.95rem] font-medium text-ink">Visit our website</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-ink-mute transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
          </a>
        </div>

        {/* Contact details */}
        <div className="mx-6 mt-5 space-y-2">
          <a
            href={phoneHref}
            className="group flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper-soft px-5 py-3.5 transition-colors hover:border-brand/40"
          >
            <Phone className="h-4 w-4 shrink-0 text-brand-deep" strokeWidth={1.9} />
            <span className="min-w-0">
              <span className="block font-mono text-[0.56rem] uppercase tracking-[0.18em] text-stone">Phone</span>
              <span className="block text-[0.9rem] text-ink leading-snug">{phone}</span>
            </span>
          </a>
          <a
            href={emailHref}
            className="group flex items-center gap-3 rounded-2xl border border-ink/10 bg-paper-soft px-5 py-3.5 transition-colors hover:border-brand/40"
          >
            <Mail className="h-4 w-4 shrink-0 text-brand-deep" strokeWidth={1.9} />
            <span className="min-w-0">
              <span className="block font-mono text-[0.56rem] uppercase tracking-[0.18em] text-stone">Email</span>
              <span className="block truncate text-[0.9rem] text-ink leading-snug">{email}</span>
            </span>
          </a>
        </div>

        {/* Address */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-6 mt-2 flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper-soft px-5 py-4 transition-colors hover:border-brand/40"
        >
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" strokeWidth={1.9} />
          <span className="min-w-0">
            <span className="block text-[0.9rem] text-ink leading-snug">{address1}</span>
            <span className="block text-[0.82rem] text-ink-mute leading-snug">{address2}</span>
            <span className="mt-1 inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-deep">
              Get directions
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </span>
          </span>
        </a>

        {/* Socials */}
        <div className="px-6 pt-6 flex items-center justify-center gap-2.5">
          {socials.map((s) => {
            const Icon = SOCIAL_ICONS[s.icon];
            return (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-mute transition-colors hover:border-brand-night hover:bg-brand-night hover:text-paper"
              >
                <Icon className="h-4 w-4" strokeWidth={1.7} />
              </a>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 border-t border-ink/8 px-6 py-5 text-center font-mono text-[0.58rem] uppercase tracking-[0.22em] text-stone">
          Smart Creation Group · Est. 2020 · Dubai, U.A.E.
        </div>
      </article>
    </main>
  );
}

function QuickAction({
  href,
  label,
  tone,
  external,
  children,
}: {
  href: string;
  label: string;
  tone: "ink" | "whatsapp";
  external?: boolean;
  children: React.ReactNode;
}) {
  const tile =
    tone === "whatsapp"
      ? "bg-[#25D366] text-white hover:brightness-105"
      : "bg-paper-soft border border-ink/10 text-ink hover:border-brand-night hover:bg-brand-night hover:text-paper";
  return (
    <a
      href={href}
      aria-label={label}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group flex flex-col items-center gap-1.5"
    >
      <span className={`flex h-14 w-full items-center justify-center rounded-2xl transition-all ${tile}`}>
        {children}
      </span>
      <span className="font-mono text-[0.56rem] uppercase tracking-[0.16em] text-stone">{label}</span>
    </a>
  );
}
