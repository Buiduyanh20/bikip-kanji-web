import type { ContentType, Level, Kanji, Vocabulary } from "@/types/content";
import type { ItemProgress, MethodProgress } from "@/types/progress";
import type { Method } from "@/types/quiz";

export type Mistake = { itemId: string; type: ContentType; method: Method; wrong: number };

export function getMethodProgress(
  items: Record<string, ItemProgress>,
  itemId: string,
  method: Method,
): MethodProgress | undefined {
  return items[itemId]?.methods[method];
}

export function isNeedsReview(progress: MethodProgress | undefined): boolean {
  return Boolean(progress && progress.wrong > 0 && progress.status !== "mastered");
}

export function getMistakes(items: Record<string, ItemProgress>): Mistake[] {
  return Object.values(items).flatMap((item) =>
    Object.entries(item.methods)
      .filter((entry): entry is [Method, MethodProgress] => Boolean(entry[1]) && isNeedsReview(entry[1]))
      .map(([method, progress]) => ({ itemId: item.itemId, type: item.type, method, wrong: progress.wrong })),
  ).sort((a, b) => b.wrong - a.wrong);
}

export function isItemMastered(
  item: Kanji | Vocabulary,
  methods: readonly Method[],
  items: Record<string, ItemProgress>,
): boolean {
  const progress = items[item.id];
  return methods.length > 0 && methods.every((method) => progress?.methods[method]?.status === "mastered");
}

export type LevelSummary = {
  level: Level;
  contentType: ContentType;
  total: number;
  mastered: number;
  learning: number;
  newItems: number;
};

export function summarizeByLevel(
  content: readonly (Kanji | Vocabulary)[],
  contentType: ContentType,
  methods: readonly Method[],
  items: Record<string, ItemProgress>,
): LevelSummary[] {
  const levels = [...new Set(content.map((item) => item.level))];
  return levels.map((level) => {
    const levelItems = content.filter((item) => item.level === level);
    const mastered = levelItems.filter((item) => isItemMastered(item, methods, items)).length;
    const learning = levelItems.filter((item) => !isItemMastered(item, methods, items) && methods.some((method) => items[item.id]?.methods[method]?.status === "learning")).length;
    return { level, contentType, total: levelItems.length, mastered, learning, newItems: levelItems.length - mastered - learning };
  });
}
