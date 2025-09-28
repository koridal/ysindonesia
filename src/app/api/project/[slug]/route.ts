// src/app/api/project/[slug]/route.ts
import { NextResponse } from "next/server";
import { client } from "@/app/lib/sanity";

const QUERY = `
  *[_type == "post" && slug.current == $slug][0]{
    title,
    titleImage,
    body
  }
`;

// GET(req, context) 형태가 정석이야.
// context는 { params: { slug: string } }를 포함하지만,
// 함수 시그니처 두 번째 인자는 "컨텍스트" 전체여야 한다.
export async function GET(
  _req: Request,
  context: { params: { slug: string } }
) {
  const { slug } = context.params;

  try {
    const data = await client.fetch(QUERY, { slug });

    if (!data) {
      return NextResponse.json({ error: "NOT_FOUND" }, { status: 404 });
    }

    return NextResponse.json(data, {
      // 캐시 전략은 필요에 따라 조절
      headers: {
        "Cache-Control": "s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch {
    // 로깅 원하면 여기서 처리
    return NextResponse.json({ error: "SERVER_ERROR" }, { status: 500 });
  }
}