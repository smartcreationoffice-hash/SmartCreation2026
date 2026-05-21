import Link from "next/link";
import Image from "next/image";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllPopupsAdmin } from "@/lib/popup";
import { AdminShell } from "../_shell";

export const dynamic = "force-dynamic";

export default async function PopupsList() {
  await requireAdmin();
  const popups = await getAllPopupsAdmin();

  return (
    <AdminShell active="popups">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
            Marketing
          </div>
          <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
            Popups
          </h1>
          <p className="mt-2 text-[0.92rem] text-ink-mute max-w-xl">
            Promotional modals that appear after a short delay. Each visitor
            sees a given popup once per browsing session. Lower-priority
            popups win when more than one is active for the same page.
          </p>
        </div>
        <Link
          href="/admin/popups/new"
          className="rounded-full bg-brand-night text-paper px-4 py-2 text-[0.88rem] font-medium hover:bg-brand transition-colors"
        >
          + Create popup
        </Link>
      </div>

      {popups.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 bg-paper p-10 text-center">
          <p className="text-ink-mute">
            No popups yet. Click <span className="font-medium text-ink">+ Create popup</span> to add your first one.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
          {popups.map((p) => (
            <li key={p.id}>
              <Link
                href={`/admin/popups/${p.id}`}
                className="group block rounded-3xl border border-ink/10 bg-paper overflow-hidden hover:border-ink/30 transition-colors"
              >
                <div className="relative aspect-[16/9] bg-paper-soft">
                  {p.image_url && (
                    <Image
                      src={p.image_url}
                      alt={p.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  )}
                  <div className="absolute top-3 left-3 flex gap-1.5">
                    <span
                      className={
                        "rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] " +
                        (p.active
                          ? "bg-emerald-500/90 text-paper"
                          : "bg-stone/80 text-paper")
                      }
                    >
                      {p.active ? "active" : "inactive"}
                    </span>
                    {p.eyebrow && (
                      <span className="rounded-full bg-ink/70 backdrop-blur-md px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] text-paper">
                        {p.eyebrow}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                    delay {p.delay_seconds}s · priority {p.display_order}
                  </div>
                  <h3 className="mt-1 font-display text-[1.05rem] tracking-[-0.01em] text-ink line-clamp-2 leading-snug">
                    {p.title}
                  </h3>
                  {p.subtitle && (
                    <p className="mt-2 text-[0.86rem] text-ink-mute line-clamp-2">
                      {p.subtitle}
                    </p>
                  )}
                  <div className="mt-3 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-stone truncate">
                    {p.target_pages || "*"}
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </AdminShell>
  );
}
