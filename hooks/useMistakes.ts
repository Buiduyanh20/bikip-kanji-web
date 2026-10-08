"use client";

import { useMemo } from "react";
import { getItemById } from "@/repositories/contentRepository";
import { useProgressStore } from "@/store/progressStore";
import { getMistakes } from "@/utils/mastery";

export function useMistakes() {
  const items = useProgressStore((state) => state.items);
  return useMemo(() => getMistakes(items).map((mistake) => ({ ...mistake, item: getItemById(mistake.type, mistake.itemId) })).filter((mistake) => mistake.item), [items]);
}
