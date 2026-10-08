import { kanjiData, vocabularyData } from "@/data";
import type { ContentType, Kanji, Level, Vocabulary } from "@/types/content";
import type { Method } from "@/types/quiz";

const kanji = Object.values(kanjiData).flat() as Kanji[];
const vocabulary = Object.values(vocabularyData).flat() as Vocabulary[];
const kanjiById = new Map(kanji.map((item) => [item.id, item]));
const vocabularyById = new Map(vocabulary.map((item) => [item.id, item]));

export function getKanjiByLevel(level: Level): Kanji[] {
  return kanji.filter((item) => item.level === level);
}

export function getKanjiById(id: string): Kanji | undefined {
  return kanjiById.get(id);
}

export function getVocabularyByLevel(level: Level): Vocabulary[] {
  return vocabulary.filter((item) => item.level === level);
}

export function getVocabularyById(id: string): Vocabulary | undefined {
  return vocabularyById.get(id);
}

export function getItemsByLevel(contentType: ContentType, level: Level): (Kanji | Vocabulary)[] {
  return contentType === "kanji" ? getKanjiByLevel(level) : getVocabularyByLevel(level);
}

export function getItemById(contentType: "kanji", id: string): Kanji | undefined;
export function getItemById(contentType: "vocabulary", id: string): Vocabulary | undefined;
export function getItemById(contentType: ContentType, id: string): Kanji | Vocabulary | undefined;
export function getItemById(contentType: ContentType, id: string): Kanji | Vocabulary | undefined {
  return contentType === "kanji" ? getKanjiById(id) : getVocabularyById(id);
}

export function countByLevel(contentType: ContentType, level: Level): number {
  return contentType === "kanji" ? getKanjiByLevel(level).length : getVocabularyByLevel(level).length;
}

export function getAvailableMethods(contentType: "kanji", level: Level): Method[];
export function getAvailableMethods(contentType: "vocabulary", level: Level): Method[];
export function getAvailableMethods(contentType: ContentType, level: Level): Method[];
export function getAvailableMethods(contentType: ContentType, level: Level): Method[] {
  if (contentType === "vocabulary") {
    return getVocabularyByLevel(level).length > 0 ? ["reading", "meaning"] : [];
  }

  const items = getKanjiByLevel(level);
  if (items.length === 0) return [];

  const methods: Method[] = ["hanviet", "meaning"];
  if (items.some((item) => (item.onyomi?.length ?? 0) > 0 || (item.kunyomi?.length ?? 0) > 0)) {
    methods.push("reading");
  }
  return methods;
}

export function getLevelsWithContent(contentType: ContentType): Level[] {
  const levels: Level[] = ["N5", "N4", "N3", "N2", "N1"];
  return levels.filter((level) => countByLevel(contentType, level) > 0);
}

export function getContentForTest(): { kanji: Kanji[]; vocabulary: Vocabulary[] } {
  return { kanji: [...kanji], vocabulary: [...vocabulary] };
}
