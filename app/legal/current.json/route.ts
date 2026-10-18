import { SITE_URL } from "@/lib/content";
import { LEGAL, permalink, sha256 } from "@/lib/legal";

export const dynamic = "force-static";

/** Machine-readable list of the versions in force, for clients that need to prompt for re-acceptance. */
export function GET() {
  const body = Object.fromEntries(
    Object.entries(LEGAL).map(([slug, [d]]) => [
      slug,
      { version: d.version, url: `${SITE_URL}/${slug}`, permalink: `${SITE_URL}${permalink(d)}`, sha256: sha256(d) },
    ]),
  );
  return Response.json(body, { headers: { "Cache-Control": "public, max-age=300" } });
}
