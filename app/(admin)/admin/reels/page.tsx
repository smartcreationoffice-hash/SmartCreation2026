import Link from "next/link";
import { requireAdmin } from "@/lib/admin-auth";
import { getAllReelsAdmin } from "@/lib/reels";
import { reelEmbedSrc } from "@/lib/reels-shared";
import { AdminShell } from "../_shell";

export const dynamic = "force-dynamic";

export default async function ReelsList() {
  await requireAdmin();
  const reels = await getAllReelsAdmin();

  return (
    <AdminShell active="reels">
      <div className="flex items-end justify-between mb-8 gap-4 flex-wrap">
        <div>
          <div className="font-mono text-[0.66rem] uppercase tracking-[0.22em] text-stone mb-2">
            Marketing
          </div>
          <h1 className="font-display text-[2rem] tracking-[-0.02em] text-ink">
            Instagram reels
          </h1>
          <p className="mt-2 text-[0.92rem] text-ink-mute max-w-xl">
            The reels featured in the &ldquo;On Instagram&rdquo; section on the
            About page. Add or swap them anytime &mdash; paste the reel link, set
            the order, and toggle active.
          </p>
        </div>
        <Link
          href="/admin/reels/new"
          className="rounded-full bg-brand-night text-paper px-4 py-2 text-[0.88rem] font-medium hover:bg-brand transition-colors"
        >
          + Add reel
        </Link>
      </div>

      {reels.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-ink/15 bg-paper p-10 text-center">
          <p className="text-ink-mute">
            No reels added yet — the site is showing the default three. Click{" "}
            <span className="font-medium text-ink">+ Add reel</span> to manage
            them here.
          </p>
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {reels.map((r) => (
            <li key={r.id}>
              <Link
                href={`/admin/reels/${r.id}`}
                className="group block rounded-3xl border border-ink/10 bg-paper overflow-hidden hover:border-ink/30 transition-colors"
              >
                <div className="relative aspect-[9/16] bg-paper-soft">
                  <iframe
                    src={reelEmbedSrc(r.url)}
                    title={r.caption || r.url}
                    scrolling="no"
                    className="pointer-events-none absolute inset-0 h-full w-full border-0"
                  />
                  <span
                    className={
                      "absolute top-3 left-3 z-10 rounded-full px-2.5 py-0.5 font-mono text-[0.6rem] uppercase tracking-[0.2em] " +
                      (r.active
                        ? "bg-emerald-500/90 text-paper"
                        : "bg-stone/80 text-paper")
                    }
                  >
                    {r.active ? "active" : "inactive"}
                  </span>
                </div>
                <div className="p-4">
                  <div className="font-mono text-[0.6rem] uppercase tracking-[0.22em] text-stone">
                    order {r.display_order}
                  </div>
                  <div className="mt-1 text-[0.82rem] text-ink line-clamp-1">
                    {r.caption || r.url}
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
