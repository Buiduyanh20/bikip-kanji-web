import type { ContentType, Level } from "@/types/content";
import type { KanjiMethod, Method, VocabularyMethod } from "@/types/quiz";
import type { MasteryStatus } from "@/types/progress";

export const LEVELS = ["N5", "N4", "N3", "N2", "N1"] as const satisfies readonly Level[];

export const COUNT_OPTIONS = [10, 20, 50] as const;

export const MASTERY_STREAK = 2;

export const METHOD_LABELS: {
  kanji: Record<KanjiMethod, string>;
  vocabulary: Record<VocabularyMethod, string>;
} = {
  kanji: {
    hanviet: "Kanji → Hán Việt",
    meaning: "Kanji → Nghĩa",
    reading: "Kanji → Cách đọc",
  },
  vocabulary: {
    reading: "Từ → Cách đọc",
    meaning: "Từ → Nghĩa",
  },
};

export const QUESTION_LABELS: {
  kanji: Record<KanjiMethod, string>;
  vocabulary: Record<VocabularyMethod, string>;
} = {
  kanji: {
    hanviet: "Âm Hán Việt là gì?",
    meaning: "Nghĩa của chữ này là gì?",
    reading: "Cách đọc của chữ này là gì?",
  },
  vocabulary: {
    reading: "Từ này đọc thế nào?",
    meaning: "Từ này có nghĩa là gì?",
  },
};

export const METHODS_BY_CONTENT_TYPE: {
  kanji: readonly KanjiMethod[];
  vocabulary: readonly VocabularyMethod[];
} = {
  kanji: ["hanviet", "meaning", "reading"],
  vocabulary: ["reading", "meaning"],
};

export const MASTERY_STATUS_LABELS: Record<MasteryStatus, string> = {
  new: "Mới",
  learning: "Đang học",
  mastered: "Đã nhớ",
};

export const PRIORITY_SCORES = {
  new: 5,
  learningWithMistakes: 3,
  learningWithoutMistakes: 2,
  mastered: 0.5,
  maxWrongBonus: 5,
  maxRecencyBonus: 1,
  recencyIntervalDays: 7,
  recencyBonusPerInterval: 0.25,
  randomNoise: 2,
} as const;

export function toUrlLevel(level: Level): Lowercase<Level> {
  return level.toLowerCase() as Lowercase<Level>;
}

export function fromUrlLevel(value: string): Level | null {
  const normalized = value.toUpperCase();

  return LEVELS.includes(normalized as Level) ? (normalized as Level) : null;
}

export function getMethodLabel(contentType: ContentType, method: Method): string {
  if (contentType === "kanji") return METHOD_LABELS.kanji[method as KanjiMethod];
  return METHOD_LABELS.vocabulary[method as VocabularyMethod];
}

export function getQuestionLabel(contentType: ContentType, method: Method): string {
  if (contentType === "kanji") return QUESTION_LABELS.kanji[method as KanjiMethod];
  return QUESTION_LABELS.vocabulary[method as VocabularyMethod];
}

export function getContentTypeLabel(contentType: ContentType): string {
  return contentType === "kanji" ? "Kanji" : "Từ vựng";
}
