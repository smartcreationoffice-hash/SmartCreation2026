import { buildVCard, getCard, slugifyCardName } from "@/lib/cards";

/**
 * The file the "Save contact" button downloads. Generated per request so it
 * always matches what the admin panel last saved.
 */
export async function GET(
  _req: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const card = await getCard(slug);
  if (!card) return new Response("Not found", { status: 404 });

  const filename = `${slugifyCardName(card.name) || card.slug}.vcf`;

  return new Response(buildVCard(card), {
    headers: {
      "Content-Type": "text/vcard; charset=utf-8",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
