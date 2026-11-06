import { llmsTxt } from "@/lib/markdown";

export const revalidate = 1800;

export async function GET() {
  return new Response(await llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
