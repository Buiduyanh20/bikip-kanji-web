"use client";

import { HydrationGate } from "@/components/layout/HydrationGate";
import { getAvailableMethods, getItemsByLevel } from "@/repositories/contentRepository";
import { useProgressStore } from "@/store/progressStore";
import { ProgressSummary } from "./ProgressSummary";

export function ProgressClient() {
  const items = useProgressStore((state) => state.items);
  const kanji = getItemsByLevel("kanji", "N4");
  const vocabulary = getItemsByLevel("vocabulary", "N4");
  return <HydrationGate><div className="space-y-6"><ProgressSummary content={kanji} contentType="kanji" methods={getAvailableMethods("kanji", "N4")} items={items} /><ProgressSummary content={vocabulary} contentType="vocabulary" methods={getAvailableMethods("vocabulary", "N4")} items={items} /></div></HydrationGate>;
}
