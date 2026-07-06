import { NextResponse } from "next/server";
import { fetchVibecodingItems } from "@/lib/vibecoding-api";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") ?? undefined;
  const source = searchParams.get("source") ?? undefined;
  const page = Number(searchParams.get("page") ?? "1");
  const limit = Number(searchParams.get("limit") ?? "20");
  const sort = searchParams.get("sort") === "recent" ? "recent" : "score";

  try {
    const data = await fetchVibecodingItems({ type, source, page, limit, sort });
    return NextResponse.json({ success: true, ...data, fromApi: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "获取失败";
    return NextResponse.json(
      {
        success: false,
        items: [],
        total: 0,
        page: 1,
        limit: 20,
        hasNext: false,
        fromApi: false,
        message,
      },
      { status: 502 }
    );
  }
}
