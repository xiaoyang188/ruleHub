/** Stagger delay by grid row (matches SkillsMP delay-200/300/400 pattern). */
export function getRowStaggerDelay(index: number, columns: number): number {
  const row = Math.floor(index / columns);
  return 200 + row * 100;
}

/** Column stagger within a visible row. */
export function getGridStaggerDelay(index: number, columns: number): number {
  const row = Math.floor(index / columns);
  const col = index % columns;
  return row * 100 + col * 50;
}
