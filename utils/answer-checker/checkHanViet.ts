import type { Kanji } from "@/types/content";
import { normalizeViet } from "./normalize";

export function checkHanViet(input: string, item: Kanji): boolean {
  const normalized = normalizeViet(input);
  return normalized.length > 0 && item.hanViet.some((answer) => normalizeViet(answer) === normalized);
}
