import { ImageResponse } from "next/og";

export const alt = "Runnir — a faster way to run GitHub Actions on your Mac";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 80,
          background: "radial-gradient(circle at 80% 0%, #26345f 0%, #14161a 65%)",
          color: "#eceef1",
        }}
      >
        <div style={{ fontSize: 28, color: "#7c9cff", letterSpacing: 6, fontWeight: 700 }}>RUNNIR</div>
        <div style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, marginTop: 20 }}>A faster way to run GitHub Actions.</div>
        <div style={{ fontSize: 30, color: "#9aa3af", marginTop: 28 }}>Native macOS · Open source · GPLv3</div>
      </div>
    ),
    size,
  );
}
