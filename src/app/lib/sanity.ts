// src/lib/sanity.image.ts
import imageUrlBuilder from "@sanity/image-url";
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01",
  useCdn: true,
});

export type MyImageSource =
  | string
  | { asset?: { _ref?: string; url?: string; _type?: string } }
  | Record<string, unknown>;

const projectId =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || process.env.SANITY_PROJECT_ID!;
const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || process.env.SANITY_DATASET!;

const builder = imageUrlBuilder({ projectId, dataset });

// 체이닝 타입 최소 정의
type Chain = {
  width(n: number): Chain;
  height(n: number): Chain;
  auto(s: string): Chain;
  url(): string;
};

export function urlFor(source: MyImageSource): Chain {
  // 함수 시그니처로 래핑해 타입 안정성 확보
  return (builder.image as (s: unknown) => Chain)(source);
}