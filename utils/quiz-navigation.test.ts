import { describe, expect, it } from "vitest";
import { shouldAdvanceOnResultEnter } from "./quiz-navigation";

const baseEvent = { key: "Enter", repeat: false, isComposing: false, targetIsButton: false, elapsedSinceSubmit: 400 };

describe("result Enter navigation", () => {
  it("advances after the submit guard window", () => {
    expect(shouldAdvanceOnResultEnter(baseEvent)).toBe(true);
  });

  it.each([
    { repeat: true },
    { isComposing: true },
    { targetIsButton: true },
    { elapsedSinceSubmit: 299 },
  ])("does not advance for guarded events", (change) => {
    expect(shouldAdvanceOnResultEnter({ ...baseEvent, ...change })).toBe(false);
  });
});
