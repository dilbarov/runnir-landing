import { pageMarkdown } from "@/lib/markdown";

export const revalidate = 300;

export async function GET() {
  return new Response(await pageMarkdown(), { headers: { "Content-Type": "text/markdown; charset=utf-8" } });
}
