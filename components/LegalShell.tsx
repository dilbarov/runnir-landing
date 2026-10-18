import type { ReactNode } from "react";
import { getLatestRelease } from "@/lib/release";
import { Nav } from "./Nav";
import { Footer } from "./Sections";

export async function LegalShell({ children }: { children: ReactNode }) {
  const release = await getLatestRelease();
  return (
    <>
      <Nav release={release} solid />
      <main>{children}</main>
      <Footer />
    </>
  );
}
