"use client";

import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="回到顶部"
      className={cn(
        "group fixed bottom-8 left-1/2 z-50 -translate-x-1/2 cursor-pointer rounded-lg border border-border bg-card/95 px-4 py-2 text-sm text-foreground shadow-lg backdrop-blur-sm transition-all duration-300 hover:border-primary/50",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-16 opacity-0"
      )}
    >
      <span className="flex items-center gap-2">
        <ArrowUp
          className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5"
          aria-hidden
        />
        <span className="text-primary">回到顶部</span>
      </span>
    </button>
  );
}
