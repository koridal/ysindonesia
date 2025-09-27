// src/lib/sanity.image.ts
import createImageUrlBuilder from "@sanity/image-url";

export type MyImageSource =
  | string
  | { asset?: { _ref?: string; url?: string } }
  | Record<string, unknown>;

type Chain = {
  width(n: number): Chain;
  height(n: number): Chain;
  auto(s: string): Chain;
  url(): string;
};

const builder = createImageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET!,
});

export function urlFor(source: MyImageSource): Chain {
  return (builder.image as (s: unknown) => Chain)(source);
}