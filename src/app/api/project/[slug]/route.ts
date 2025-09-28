// 2) API 라우트: 단수 "project" 경로로 고정
// src/app/api/project/[slug]/route.ts
import { NextResponse } from "next/server";
import { client } from "@/app/lib/sanity";

const QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    "currentSlug": slug.current,
    title,
    body,
    titleImage
  }
`;

export async function GET(
  _req: Request,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;
  console.log("[API] /api/project/[slug] ->", slug); // 배포 로그 확인용

  try {
    const data = await client.fetch(QUERY, { slug });
    if (!data) {
      console.log("[API] NOT_FOUND for:", slug);
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }
    return NextResponse.json(data, {
      headers: { "Cache-Control": "s-maxage=30, stale-while-revalidate=60" },
    });
  } catch (e) {
    console.error("[API] SERVER_ERROR:", e);
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}