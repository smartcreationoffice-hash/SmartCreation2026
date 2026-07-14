import type { Metadata } from "next";
import { getInsightsList } from "@/lib/insights";
import { InsightsHero } from "@/components/insights-hero";
import { InsightsGrid } from "@/components/insights-grid";

// Regenerate at most once a minute so newly published posts appear on the
// live site without a redeploy (the page is otherwise statically rendered).
export const revalidate = 60;

export const metadata: Metadata = {
  title: "Blogs · Dubai business setup, tax & compliance",
  description:
    "Long-form guides from the Smart Creation team: business setup playbooks, free-zone vs mainland breakdowns, and the UAE Corporate Tax & VAT survival guides.",
  alternates: { canonical: "/blogs" },
};

const fmt = (iso: string) =>
  new Date(iso + "T00:00:00Z").toLocaleDateString("en-GB", {
    year: "numeric",
    month: "short",
    day: "2-digit",
    timeZone: "UTC",
  });

export default async function InsightsPage() {
  const posts = await getInsightsList();

  return (
    <>
      <InsightsHero liveCount={posts.length} />

      {/* All posts in one grid — 3 columns × 2 rows = 6 per page, paginated.
          The most-recent post takes the first cell instead of a separate hero. */}
      <section className="py-16 md:py-24 bg-paper">
        <div className="container-edit">
          <InsightsGrid
            posts={posts.map((p) => ({
              slug: p.slug,
              title: p.title,
              excerpt: p.excerpt,
              category: p.category,
              cover: p.cover,
              date: fmt(p.date),
              readMinutes: p.readMinutes,
            }))}
          />
        </div>
      </section>
    </>
  );
}
