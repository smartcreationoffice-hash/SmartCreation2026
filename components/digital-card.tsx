import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Globe,
  Calendar,
  Download,
  ArrowUpRight,
  Linkedin,
  Instagram,
  Facebook,
  Youtube,
} from "lucide-react";
import { CONTACT } from "@/lib/data";

const MAPS_URL =
  "https://maps.google.com/?q=" +
  encodeURIComponent("Damac Executive Heights, Barsha Heights (Tecom), Dubai");

const SOCIALS = [
  { label: "LinkedIn", href: "https://www.linkedin.com/company/smartbusinesscreation/", Icon: Linkedin },
  { label: "Instagram", href: "https://www.instagram.com/smartcreationuae", Icon: Instagram },
  { label: "Facebook", href: "https://www.facebook.com/smartbusinesscreationuae/", Icon: Facebook },
  { label: "YouTube", href: "https://www.youtube.com/@SmartBusinessCreation", Icon: Youtube },
];

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
};

export function DigitalCard({
  name,
  role,
  tagline,
  avatar,
  vcf,
  chip,
  phoneHref = CONTACT.phoneHref,
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
          <div className="absolute left-5 top-4 inline-flex items-center gap-2 rounded-full border border-paper/25 bg-ink/40 backdrop-blur-md px-3 py-1 font-mono text-[0.58rem] uppercase tracking-[0.2em] text-paper">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inset-0 inline-flex animate-ping rounded-full bg-brand opacity-70" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
            </span>
            Open · Barsha Heights
          </div>
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
          <QuickAction href={CONTACT.whatsappHref} label="WhatsApp" tone="whatsapp" external>
            <WhatsAppGlyph className="h-5 w-5" />
          </QuickAction>
          <QuickAction href={CONTACT.emailHref} label="Email" tone="ink">
            <Mail className="h-5 w-5" strokeWidth={1.8} />
          </QuickAction>
          <QuickAction href={MAPS_URL} label="Map" tone="ink" external>
            <MapPin className="h-5 w-5" strokeWidth={1.8} />
          </QuickAction>
        </div>

        {/* Primary CTAs */}
        <div className="px-6 pt-5 space-y-2.5">
          <a
            href="https://thesmartcreation.com/contact"
            className="group flex w-full items-center justify-between rounded-2xl border border-brand/40 bg-brand-wash px-5 py-3.5 transition-colors hover:border-brand hover:bg-brand/10"
          >
            <span className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand/15 text-brand-deep">
                <Calendar className="h-4 w-4" strokeWidth={1.9} />
              </span>
              <span className="text-[0.95rem] font-medium text-ink">Book a free consultation</span>
            </span>
            <ArrowUpRight className="h-4 w-4 text-brand-deep transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
          </a>
          <a
            href="https://thesmartcreation.com"
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

        {/* Address */}
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group mx-6 mt-5 flex items-start gap-3 rounded-2xl border border-ink/10 bg-paper-soft px-5 py-4 transition-colors hover:border-brand/40"
        >
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-brand-deep" strokeWidth={1.9} />
          <span className="min-w-0">
            <span className="block text-[0.9rem] text-ink leading-snug">{CONTACT.address}</span>
            <span className="block text-[0.82rem] text-ink-mute leading-snug">{CONTACT.addressLine2}</span>
            <span className="mt-1 inline-flex items-center gap-1 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-brand-deep">
              Get directions
              <ArrowUpRight className="h-3 w-3" strokeWidth={2} />
            </span>
          </span>
        </a>

        {/* Socials */}
        <div className="px-6 pt-6 flex items-center justify-center gap-2.5">
          {SOCIALS.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-ink/15 text-ink-mute transition-colors hover:border-brand-night hover:bg-brand-night hover:text-paper"
            >
              <s.Icon className="h-4 w-4" strokeWidth={1.7} />
            </a>
          ))}
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
