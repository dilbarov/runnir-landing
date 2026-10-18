/** A paragraph (supports [text](url) links) or a bullet list. */
export type Block = string | { list: string[] };

export type Section = { h: string; blocks: Block[] };

export type LegalDoc = {
  slug: "privacy" | "terms";
  title: string;
  /** YYYY-MM-DD; also the archive URL segment. */
  version: string;
  intro: Block[];
  sections: Section[];
};
