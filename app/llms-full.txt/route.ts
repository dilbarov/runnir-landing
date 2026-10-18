import { pageMarkdown } from "@/lib/markdown";

export const revalidate = 300;

export async function GET() {
  return new Response(await pageMarkdown(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
