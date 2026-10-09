import { describe, expect, it } from "vitest";
import { countByLevel, getAvailableMethods, searchKanji } from "./contentRepository";

describe("contentRepository", () => {
  it("counts content by level", () => {
    expect(countByLevel("kanji", "N4")).toBe(177);
    expect(countByLevel("vocabulary", "N4")).toBe(5);
    expect(countByLevel("kanji", "N5")).toBe(103);
  });

  it("keeps reading available when the level has readings", () => {
    expect(getAvailableMethods("kanji", "N4")).toContain("reading");
    expect(getAvailableMethods("kanji", "N5")).toEqual(["hanviet", "meaning", "reading"]);
  });

  it.each(["母", "mẫu", "mẹ"])("finds 母 by %s", (keyword) => {
    expect(searchKanji(keyword).map((item) => item.id)).toContain("kanji_n5_041");
  });

  it("normalizes punctuation and whitespace in search terms", () => {
    expect(searchKanji("  MẪU! ").map((item) => item.id)).toContain("kanji_n5_041");
  });
});
