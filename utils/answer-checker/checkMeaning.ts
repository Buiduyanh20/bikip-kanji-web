import type { Kanji, Vocabulary } from "@/types/content";
import { normalizeViet } from "./normalize";

export function getMeaningAnswers(item: Kanji | Vocabulary): string[] {
  return item.meanings.flatMap((meaning) => meaning.split(",").map((part) => part.trim())).filter(Boolean);
}

export function checkMeaning(input: string, item: Kanji | Vocabulary): boolean {
  const normalized = normalizeViet(input);
  return normalized.length > 0 && getMeaningAnswers(item).some((answer) => normalizeViet(answer) === normalized);
}
