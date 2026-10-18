import { REPO } from "./content";

export type Release = { tag: string; downloadUrl: string } | null;

type GhAsset = { name: string; browser_download_url: string };
type GhRelease = { tag_name: string; draft: boolean; assets: GhAsset[] };

export async function getLatestRelease(): Promise<Release> {
  try {
    const headers: Record<string, string> = {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2022-11-28",
    };
    if (process.env.GITHUB_TOKEN) headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    const res = await fetch(`https://api.github.com/repos/${REPO}/releases/latest`, {
      headers,
      next: { revalidate: 300 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GhRelease;
    if (data.draft) return null;
    const asset =
      data.assets.find((a) => a.name.toLowerCase().endsWith(".dmg")) ??
      data.assets.find((a) => a.name.toLowerCase().endsWith(".zip"));
    return asset ? { tag: data.tag_name, downloadUrl: asset.browser_download_url } : null;
  } catch {
    return null;
  }
}
