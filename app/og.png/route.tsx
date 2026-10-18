import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const dynamic = "force-static";

const BG = "#0d0f13";

/** Link preview for social networks and messengers: wordmark and tagline on the left, the lit runestone on the right. */
export async function GET() {
  const dir = join(process.cwd(), "lib/og");
  const [stone, wordmark] = await Promise.all([readFile(join(dir, "stone.jpg")), readFile(join(dir, "wordmark.png"))]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", position: "relative", background: BG }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`data:image/jpeg;base64,${stone.toString("base64")}`}
          width={640}
          height={630}
          alt=""
          style={{ position: "absolute", right: 0, top: 0 }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            background: `linear-gradient(90deg, ${BG} 0%, ${BG} 46%, rgba(13,15,19,0.55) 62%, rgba(13,15,19,0) 82%)`,
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            width: 1200,
            height: 630,
            background: "radial-gradient(circle at 74% 45%, rgba(124,156,255,0.16) 0%, rgba(124,156,255,0) 45%)",
          }}
        />
        <div
          style={{
            position: "absolute",
            left: 84,
            top: 0,
            height: 630,
            width: 620,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`data:image/png;base64,${wordmark.toString("base64")}`} width={400} height={99} alt="Runnir" />
          <div style={{ marginTop: 44, display: "flex", flexDirection: "column", fontSize: 44, lineHeight: 1.18, color: "#eceef1" }}>
            <span>A faster way to run</span>
            <span>GitHub Actions.</span>
          </div>
          <div style={{ marginTop: 18, fontSize: 24, color: "#9aa3af" }}>Native macOS app · Open source · GPLv3</div>
        </div>
      </div>
    ),
    { width: 1200, height: 630, headers: { "Cache-Control": "public, max-age=86400" } },
  );
}
