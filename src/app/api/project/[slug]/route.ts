// app/api/project/[slug]/route.ts
import { NextResponse } from "next/server";
import { client } from "@/app/lib/sanity";

const QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    title,
    titleImage,
    body
  }
`;

export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const slug = params.slug;
    const data = await client.fetch(QUERY, { slug });
    if (!data) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}