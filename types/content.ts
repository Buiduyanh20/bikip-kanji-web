export type Level = "N5" | "N4" | "N3" | "N2" | "N1";

export type ContentType = "kanji" | "vocabulary";

export interface Kanji {
  id: string;
  char: string;
  level: Level;
  hanViet: string[];
  meanings: string[];
  onyomi?: string[];
  kunyomi?: string[];
  hint?: string;
  story?: string;
  examples?: string[];
}

export interface Vocabulary {
  id: string;
  word: string;
  reading: string;
  meanings: string[];
  level: Level;
  kanjiIds: string[];
}
