import { describe, expect, it } from "vitest";
import { buildLearnQuiz, buildReviewQuiz } from "./quiz-builder";

describe("quiz builder", () => {
  it("prioritizes mistakes and caps the result", () => {
    const progress = {
      kanji_n4_001: { itemId: "kanji_n4_001", type: "kanji" as const, methods: { hanviet: { correct: 0, wrong: 3, streak: 0, status: "learning" as const, lastAnsweredAt: 0 } } },
    };
    const quiz = buildLearnQuiz({ contentType: "kanji", level: "N4", method: "hanviet", count: 2, progress, rng: () => 0 });
    expect(quiz).toHaveLength(2);
    expect(quiz.map((question) => question.itemId)).toContain("kanji_n4_001");
    expect(new Set(quiz.map((question) => question.key)).size).toBe(2);
  });

  it("builds review questions with the original method", () => {
    const progress = {
      a: { itemId: "a", type: "vocabulary" as const, methods: { reading: { correct: 0, wrong: 2, streak: 0, status: "learning" as const, lastAnsweredAt: 0 } } },
    };
    expect(buildReviewQuiz({ progress, rng: () => 0 })).toEqual([
      { key: "a:reading", itemId: "a", contentType: "vocabulary", method: "reading" },
    ]);
  });
});
