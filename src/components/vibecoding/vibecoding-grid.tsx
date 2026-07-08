"use client";

import { useMemo } from "react";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import type { VibecodingItem } from "@/lib/vibecoding-utils";
import { splitIntoColumns } from "@/lib/split-columns";
import { VibecodingCard } from "@/components/vibecoding/vibecoding-card";
import { VibecodingNewsCard } from "@/components/vibecoding/vibecoding-news-card";

const COLUMN_COUNT = 3;

function VibecodingColumn({
  items,
  openAsArticle,
}: {
  items: VibecodingItem[];
  openAsArticle?: boolean;
}) {
  return (
    <div className="flex min-w-0 flex-1 flex-col gap-4">
      {items.map((item) => (
        <ScrollReveal key={item.id}>
          {openAsArticle ? (
            <VibecodingNewsCard item={item} />
          ) : (
            <VibecodingCard item={item} />
          )}
        </ScrollReveal>
      ))}
    </div>
  );
}

export function VibecodingGrid({
  items,
  openAsArticle = false,
}: {
  items: VibecodingItem[];
  openAsArticle?: boolean;
}) {
  const columns = useMemo(() => splitIntoColumns(items, COLUMN_COUNT), [items]);
  const twoColumns = useMemo(() => splitIntoColumns(items, 2), [items]);

  return (
    <>
      <div className="hidden gap-4 md:flex lg:hidden">
        {twoColumns.map((col, index) => (
          <VibecodingColumn key={index} items={col} openAsArticle={openAsArticle} />
        ))}
      </div>
      <div className="hidden gap-4 lg:flex">
        {columns.map((col, index) => (
          <VibecodingColumn key={index} items={col} openAsArticle={openAsArticle} />
        ))}
      </div>
      <div className="flex flex-col gap-4 md:hidden">
        {items.map((item) => (
          <ScrollReveal key={item.id}>
            {openAsArticle ? (
              <VibecodingNewsCard item={item} />
            ) : (
              <VibecodingCard item={item} />
            )}
          </ScrollReveal>
        ))}
      </div>
    </>
  );
}
