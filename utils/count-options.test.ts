import { describe, expect, it } from "vitest";
import { getCountOptions } from "./count-options";

describe("count options", () => {
  it("lists every count for a small level", () => {
    expect(getCountOptions(10).map((option) => option.value)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10, "all", "custom",
    ]);
  });

  it("uses milestones for a large level", () => {
    expect(getCountOptions(181).map((option) => option.value)).toEqual([
      5, 10, 15, 20, 30, 50, 100, "all", "custom",
    ]);
  });

  it("supports a one-item level", () => {
    expect(getCountOptions(1).map((option) => option.value)).toEqual([1, "all", "custom"]);
  });
});
