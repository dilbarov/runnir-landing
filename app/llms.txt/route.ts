import { llmsTxt } from "@/lib/markdown";

export const revalidate = 300;

export function GET() {
  return new Response(llmsTxt(), { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
