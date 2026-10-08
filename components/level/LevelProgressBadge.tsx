"use client";

import type { ContentType, Level } from "@/types/content";
import { countByLevel, getAvailableMethods, getItemsByLevel } from "@/repositories/contentRepository";
import { useProgressStore } from "@/store/progressStore";
import { isItemMastered } from "@/utils/mastery";

export function LevelProgressBadge({ contentType, level }: { contentType: ContentType; level: Level }) {
  const items = useProgressStore((state) => state.items);
  const content = getItemsByLevel(contentType, level);
  const methods = getAvailableMethods(contentType, level);
  const mastered = content.filter((item) => isItemMastered(item, methods, items)).length;
  const learning = content.filter((item) => !isItemMastered(item, methods, items) && methods.some((method) => items[item.id]?.methods[method]?.status === "learning")).length;
  return <div className="mt-2 text-sm text-primary"><p className="font-semibold">{mastered + learning}/{countByLevel(contentType, level)} đã học</p><p className="text-xs text-muted-foreground">Đã nhớ: {mastered} · Đang học: {learning}</p></div>;
}
