// src/app/api/project/[slug]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { client } from "@/app/lib/sanity";

// GROQ Query
const QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    "currentSlug": slug.current,
    title,
    body,
    titleImage
  }
`;

interface Params {
  slug: string;
}

// ✅ Next.js 15 맞는 함수 시그니처
export async function GET(
  _req: NextRequest,
  { params }: { params: Params }
) {
  const { slug } = params;

  if (!slug) {
    return NextResponse.json({ error: "BAD_REQUEST" }, { status: 400 });
  }

  try {
    const data = await client.fetch(QUERY, { slug });

    if (!data) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
    });
  } catch {
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}
