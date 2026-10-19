import { REPO } from "./content";

export type Release = { tag: string; downloadUrl: string } | null;

type GhAsset = { name: string; browser_download_url: string };
type GhRelease = { tag_name: string; draft: boolean; assets: GhAsset[] };

// During `next build` and `next dev` there is no previously generated page to fall back to
const CAN_THROW = process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== "phase-production-build";

/**
 * GitHub failed (rate limit, outage, network). In production this throws: ISR then keeps serving the
 * last page it generated, with the last known download link, and retries on the next revalidation.
 * Treating the error as "no release" would flip a published release back to "In development".
 */
function lookupFailed(reason: string): Release {
  if (CAN_THROW) throw new Error(`Latest release lookup failed: ${reason}`);
  console.warn(`Latest release lookup failed (${reason}); showing the download placeholder`);
  return null;
}

/** The latest published release with a macOS download; null when there is none. Cached for 30 minutes. */
export async function getLatestRelease(): Promise<Release> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  let res: Response;
  try {
    res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, { headers, next: { revalidate: 1800 } });
  } catch (e) {
    return lookupFailed(e instanceof Error ? e.message : String(e));
  }
  // 404 is GitHub's answer for "no published release yet"
  if (res.status === 404) return null;
  if (!res.ok) return lookupFailed(`GitHub responded ${res.status}`);

  let data: GhRelease;
  try {
    data = (await res.json()) as GhRelease;
  } catch {
    return lookupFailed("invalid JSON from GitHub");
  }
  if (data.draft) return null;
  const asset =
    data.assets.find((a) => a.name.toLowerCase().endsWith(".dmg")) ??
    data.assets.find((a) => a.name.toLowerCase().endsWith(".zip"));
  return asset ? { tag: data.tag_name, downloadUrl: asset.browser_download_url } : null;
}
