"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="mx-auto flex min-h-[50vh] max-w-lg flex-col items-center justify-center px-4 py-16 text-center">
      <p className="text-sm font-medium text-primary">页面加载失败</p>
      <h1 className="mt-3 text-2xl font-bold text-foreground">暂时无法显示内容</h1>
      <p className="mt-3 text-sm leading-6 text-muted-foreground">
        可能是广告脚本或浏览器扩展改动了页面。请刷新重试。
      </p>
      <button
        type="button"
        onClick={() => reset()}
        className="mt-6 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
      >
        重新加载
      </button>
    </div>
  );
}
