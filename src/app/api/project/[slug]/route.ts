// src/app/api/project/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
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

// ✅ Next.js 15 권장 방식
export async function GET(
  req: NextRequest,
  context: { params: Promise<{ slug: string }> } // 👈 params는 Promise 타입
) {
  const { slug } = await context.params; // 👈 반드시 await 필요

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
