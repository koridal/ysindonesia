import { createClient } from "next-sanity";
import imageUrlBuilder from '@sanity/image-url'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;

export const client = createClient({
  apiVersion: '2025-09-02',
  dataset,
  projectId,
  useCdn: false,
});

const builder = imageUrlBuilder(client)

export function urlFor(source:string) {
  return builder.image(source);
}