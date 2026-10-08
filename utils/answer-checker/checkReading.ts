import { toHiragana } from "wanakana";
import type { Kanji, Vocabulary } from "@/types/content";

function cleanReading(value: string): string {
  return toHiragana(value).replace(/[.-]/g, "").replace(/\s+/g, "");
}

function readingAnswers(item: Kanji | Vocabulary): string[] {
  if ("reading" in item) return [item.reading];
  return [...(item.onyomi ?? []), ...(item.kunyomi ?? [])].flatMap((reading) => {
    const cleaned = reading.replace(/[.-]/g, "");
    const root = reading.split(/[.-]/)[0];
    return root && root !== cleaned ? [cleaned, root] : [cleaned];
  });
}

export function getReadingAnswers(item: Kanji | Vocabulary): string[] {
  return [...new Set(readingAnswers(item).map(cleanReading).filter(Boolean))];
}

export function checkReading(input: string, item: Kanji | Vocabulary): boolean {
  const normalized = cleanReading(input);
  return normalized.length > 0 && getReadingAnswers(item).includes(normalized);
}
