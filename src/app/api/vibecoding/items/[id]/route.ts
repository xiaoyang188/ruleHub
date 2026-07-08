import { NextResponse } from "next/server";
import { fetchVibecodingItemById } from "@/lib/vibecoding-api";

export async function GET(
  _request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const numId = Number(id);

  if (!Number.isFinite(numId) || numId < 1) {
    return NextResponse.json({ success: false, message: "无效 ID" }, { status: 400 });
  }

  try {
    const item = await fetchVibecodingItemById(numId);
    return NextResponse.json({ success: true, item, fromApi: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "获取失败";
    return NextResponse.json({ success: false, message }, { status: 404 });
  }
}
