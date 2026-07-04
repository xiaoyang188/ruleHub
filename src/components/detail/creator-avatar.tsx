"use client";

import { useState } from "react";

export function CreatorAvatar({
  author,
  size = "md",
}: {
  author: string;
  size?: "sm" | "md" | "lg";
}) {
  const [failed, setFailed] = useState(false);
  const initial = author.charAt(0).toUpperCase();
  const sizeClass =
    size === "lg" ? "h-16 w-16 text-xl" : size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  if (failed) {
    return (
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border border-border bg-muted/40 font-semibold ${sizeClass}`}
      >
        {initial}
      </span>
    );
  }

  const px = size === "lg" ? 128 : size === "sm" ? 64 : 80;

  return (
    <img
      src={`https://github.com/${author}.png?size=${px}`}
      alt=""
      className={`shrink-0 rounded-full border border-border bg-muted/40 object-cover ${sizeClass}`}
      onError={() => setFailed(true)}
    />
  );
}
