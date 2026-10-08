import { describe, expect, it } from "vitest";
import type { Kanji, Vocabulary } from "@/types/content";
import type { QuizQuestion } from "@/types/quiz";
import { checkAnswer } from "./index";
import { validateKanjiAnswer } from "./validateAnswer";

const mother: Kanji = {
  id: "mother", char: "母", level: "N4", hanViet: ["Mẫu"], meanings: ["Mẹ"],
  kunyomi: ["はは"], onyomi: [], hint: "", story: "", examples: [],
};
const readingQuestion: QuizQuestion = { key: "mother:reading", itemId: "mother", contentType: "kanji", method: "reading" };
const hanvietQuestion: QuizQuestion = { key: "mother:hanviet", itemId: "mother", contentType: "kanji", method: "hanviet" };

describe("answer checker", () => {
  it.each(["mau", "Mẫu", "  MẪU  "])("accepts Vietnamese input: %s", (input) => {
    expect(checkAnswer(hanvietQuestion, input, mother).correct).toBe(true);
  });

  it("accepts readings in romaji, hiragana, and katakana", () => {
    expect(checkAnswer(readingQuestion, "haha", mother).correct).toBe(true);
    expect(checkAnswer(readingQuestion, "はは", mother).correct).toBe(true);
    expect(checkAnswer(readingQuestion, "ハハ", mother).correct).toBe(true);
  });

  it("ignores reading order and accepts Japanese or English separators", () => {
    expect(validateKanjiAnswer("て、しゅ、ず", ["しゅ", "ず", "て"], "reading")).toEqual({
      correct: true,
      status: "exact",
    });
    expect(validateKanjiAnswer("しゅ,て", ["しゅ", "ず", "て"], "reading")).toEqual({
      correct: true,
      status: "near",
    });
  });

  it("accepts kun-yomi roots and meaning fragments", () => {
    const picture: Kanji = { ...mother, id: "picture", char: "画", hanViet: ["Họa", "Hoạch"], meanings: ["Vẽ", "Kế hoạch"], kunyomi: ["えが.く"] };
    const meaning: Kanji = { ...mother, id: "direction", char: "方", meanings: ["Ngài", "Vị", "Phương hướng"] };
    expect(checkAnswer({ ...hanvietQuestion, itemId: "picture" }, "hoach", picture).correct).toBe(true);
    expect(checkAnswer({ ...readingQuestion, itemId: "picture" }, "えが", picture).correct).toBe(true);
    expect(checkAnswer({ ...hanvietQuestion, method: "meaning", itemId: "direction" }, "Phương hướng", meaning).correct).toBe(true);
  });

  it("supports vocabulary answers and rejects invalid input", () => {
    const vocabulary: Vocabulary = { id: "v", word: "母", reading: "はは", meanings: ["Mẹ"], level: "N4", kanjiIds: [] };
    expect(checkAnswer({ key: "v:reading", itemId: "v", contentType: "vocabulary", method: "reading" }, "ba", vocabulary).correct).toBe(false);
    expect(checkAnswer(hanvietQuestion, "", mother).correct).toBe(false);
  });

  it("accepts meaning keywords and strips trailing punctuation", () => {
    expect(validateKanjiAnswer("hoa\\", "Bông hoa", "meaning")).toEqual({
      correct: true,
      status: "near",
    });
    expect(validateKanjiAnswer("hướng bắc!", "Phía bắc", "meaning")).toEqual({
      correct: true,
      status: "near",
    });
    expect(validateKanjiAnswer("ô tô", "Bông hoa", "meaning").correct).toBe(false);
  });
});
