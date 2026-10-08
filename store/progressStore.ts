"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ContentType } from "@/types/content";
import { countByLevel, getItemById } from "@/repositories/contentRepository";
import type { ItemProgress, MethodProgress } from "@/types/progress";
import type { Method } from "@/types/quiz";
import { MASTERY_STREAK } from "@/utils/constants";
import { createSafeStorage } from "./storage";

const emptyMethodProgress = (): MethodProgress => ({
  correct: 0,
  wrong: 0,
  streak: 0,
  status: "new",
  lastAnsweredAt: 0,
});

type RecordAnswerInput = {
  itemId: string;
  type: ContentType;
  method: Method;
  correct: boolean;
};

type ProgressState = {
  items: Record<string, ItemProgress>;
  getProgress: (itemId: string) => ItemProgress | undefined;
  updateAnswerResult: (input: { itemId: string; method: Method; isCorrect: boolean; type?: ContentType }) => void;
  getLevelProgress: (type: ContentType, level: import("@/types/content").Level) => { total: number; mastered: number; learning: number; new: number };
  recordAnswer: (input: RecordAnswerInput) => void;
  replaceProgress: (items: Record<string, ItemProgress>) => void;
  resetProgress: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set, get) => ({
      items: {},
      getProgress: (itemId) => get().items[itemId],
      updateAnswerResult: ({ itemId, method, isCorrect, type }) => {
        const item = type ? getItemById(type, itemId) : getItemById("kanji", itemId) ?? getItemById("vocabulary", itemId);
        if (!item) return;
        get().recordAnswer({ itemId, type: type ?? ("char" in item ? "kanji" : "vocabulary"), method, correct: isCorrect });
      },
      getLevelProgress: (type, level) => {
        const total = countByLevel(type, level);
        const levelItems = Object.values(get().items).filter((item) => item.type === type && item.level === level);
        const mastered = levelItems.filter((item) => Object.values(item.methods).some((method) => method?.status === "mastered")).length;
        const learning = levelItems.filter((item) => !Object.values(item.methods).some((method) => method?.status === "mastered") && Object.values(item.methods).some((method) => method?.status === "learning")).length;
        return { total, mastered, learning, new: Math.max(0, total - mastered - learning) };
      },
      recordAnswer: ({ itemId, type, method, correct }) =>
        set((state) => {
          const item = getItemById(type, itemId);
          const current = state.items[itemId] ?? { itemId, type, level: item?.level, methods: {} };
          const previous = current.methods[method] ?? emptyMethodProgress();
          const next: MethodProgress = correct
            ? {
                ...previous,
                correct: previous.correct + 1,
                streak: previous.streak + 1,
                status: previous.streak + 1 >= MASTERY_STREAK ? "mastered" : "learning",
                lastAnsweredAt: Date.now(),
              }
            : {
                ...previous,
                wrong: previous.wrong + 1,
                streak: 0,
                status: "learning",
                lastAnsweredAt: Date.now(),
              };

          return {
            items: {
              ...state.items,
              [itemId]: { ...current, type, level: current.level ?? item?.level, methods: { ...current.methods, [method]: next } },
            },
          };
        }),
      replaceProgress: (items) => set({ items }),
      resetProgress: () => set({ items: {} }),
    }),
    {
      name: "bikip-kanji-progress",
      version: 1,
      storage: createJSONStorage(() => createSafeStorage("local")),
      migrate: (persistedState) => {
        if (!persistedState || typeof persistedState !== "object") return { items: {} };
        const state = persistedState as Partial<ProgressState>;
        return { items: state.items ?? {} } as ProgressState;
      },
    },
  ),
);
