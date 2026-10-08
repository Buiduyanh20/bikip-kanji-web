import type { ContentType } from "./content";

export type KanjiMethod = "hanviet" | "meaning" | "reading";
export type VocabularyMethod = "reading" | "meaning";
export type Method = KanjiMethod | VocabularyMethod;

export interface QuizQuestion {
  key: string;
  itemId: string;
  contentType: ContentType;
  method: Method;
}

export type QuizPhase = "answering" | "result" | "finished";

export interface QuizSession {
  mode: "learn" | "review";
  contentType: ContentType;
  level?: import("./content").Level;
  method?: Method;
  questions: QuizQuestion[];
  index: number;
  phase: QuizPhase;
  lastInput?: string;
  lastCorrect?: boolean;
  lastResultStatus?: "exact" | "near" | "incorrect";
  results: Record<string, boolean>;
}
