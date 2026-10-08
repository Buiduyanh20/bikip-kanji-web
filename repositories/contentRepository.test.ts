import { describe, expect, it } from "vitest";
import { countByLevel, getAvailableMethods } from "./contentRepository";

describe("contentRepository", () => {
  it("counts content by level", () => {
    expect(countByLevel("kanji", "N4")).toBe(10);
    expect(countByLevel("vocabulary", "N4")).toBe(5);
    expect(countByLevel("kanji", "N5")).toBe(103);
  });

  it("keeps reading available when the level has readings", () => {
    expect(getAvailableMethods("kanji", "N4")).toContain("reading");
    expect(getAvailableMethods("kanji", "N5")).toEqual(["hanviet", "meaning", "reading"]);
  });
});
