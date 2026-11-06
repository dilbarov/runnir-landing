import { REPO } from "./content";

export type Release = { tag: string; downloadUrl: string; prerelease: boolean } | null;

type GhAsset = { name: string; browser_download_url: string };
type GhRelease = { tag_name: string; draft: boolean; prerelease: boolean; assets: GhAsset[] };

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

function macDownload(r: GhRelease) {
  return (
    r.assets.find((a) => a.name.toLowerCase().endsWith(".dmg")) ?? r.assets.find((a) => a.name.toLowerCase().endsWith(".zip"))
  );
}

/**
 * The build the site offers: the newest published release with a macOS download, or, while there is none,
 * the newest pre-release (alpha, beta) with one. Drafts never. GitHub lists the newest first.
 */
export function pickRelease(releases: GhRelease[]): Release {
  const published = releases.filter((r) => !r.draft && macDownload(r));
  const chosen = published.find((r) => !r.prerelease) ?? published.find((r) => r.prerelease);
  if (!chosen) return null;
  return { tag: chosen.tag_name, downloadUrl: macDownload(chosen)!.browser_download_url, prerelease: chosen.prerelease };
}

/** What the site offers to download; null when nothing is published yet. Cached for 30 minutes. */
export async function getLatestRelease(): Promise<Release> {
  const headers: Record<string, string> = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;

  let res: Response;
  try {
    // `releases/latest` leaves out pre-releases, and the first builds are alphas.
    res = await fetch(`https://api.github.com/repos/${REPO}/releases?per_page=30`, { headers, next: { revalidate: 1800 } });
  } catch (e) {
    return lookupFailed(e instanceof Error ? e.message : String(e));
  }
  if (!res.ok) return lookupFailed(`GitHub responded ${res.status}`);

  let data: GhRelease[];
  try {
    data = (await res.json()) as GhRelease[];
  } catch {
    return lookupFailed("invalid JSON from GitHub");
  }
  if (!Array.isArray(data)) return lookupFailed("GitHub did not answer with a list of releases");
  return pickRelease(data);
}
