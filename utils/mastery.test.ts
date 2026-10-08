import { describe, expect, it } from "vitest";
import { getMistakes, isNeedsReview } from "./mastery";
import type { ItemProgress } from "@/types/progress";

describe("mastery helpers", () => {
  it("identifies mistakes and mastered recovery", () => {
    const items: Record<string, ItemProgress> = {
      a: { itemId: "a", type: "kanji", methods: { hanviet: { correct: 2, wrong: 1, streak: 2, status: "mastered", lastAnsweredAt: 1 } } },
      b: { itemId: "b", type: "kanji", methods: { meaning: { correct: 0, wrong: 2, streak: 0, status: "learning", lastAnsweredAt: 1 } } },
    };
    expect(isNeedsReview(items.a.methods.hanviet)).toBe(false);
    expect(getMistakes(items)).toEqual([{ itemId: "b", type: "kanji", method: "meaning", wrong: 2 }]);
  });
});
