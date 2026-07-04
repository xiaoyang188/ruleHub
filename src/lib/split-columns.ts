/** Round-robin split for masonry-style flex columns (matches SkillsMP search layout). */
export function splitIntoColumns<T>(items: T[], columnCount = 3): T[][] {
  const columns = Array.from({ length: columnCount }, () => [] as T[]);
  items.forEach((item, index) => {
    columns[index % columnCount].push(item);
  });
  return columns;
}
