"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { ContentType } from "@/types/content";
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
  recordAnswer: (input: RecordAnswerInput) => void;
  resetProgress: () => void;
};

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      items: {},
      recordAnswer: ({ itemId, type, method, correct }) =>
        set((state) => {
          const current = state.items[itemId] ?? { itemId, type, methods: {} };
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
              [itemId]: { ...current, type, methods: { ...current.methods, [method]: next } },
            },
          };
        }),
      resetProgress: () => set({ items: {} }),
    }),
    {
      name: "bkk:progress",
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
