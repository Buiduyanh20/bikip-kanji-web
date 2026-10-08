"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { QuizSession } from "@/types/quiz";
import type { AnswerValidationStatus } from "@/utils/answer-checker";
import { createSafeStorage } from "./storage";

type SessionState = {
  session: QuizSession | null;
  start: (session: QuizSession) => void;
  submit: (correct: boolean, input: string, status?: AnswerValidationStatus) => void;
  next: () => void;
  clear: () => void;
};

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      session: null,
      start: (session) => set({ session }),
      submit: (correct, input, status = correct ? "exact" : "incorrect") =>
        set((state) => {
          if (!state.session || state.session.phase !== "answering") return state;
          const question = state.session.questions[state.session.index];
          if (!question || question.key in state.session.results) return state;
          return {
            session: {
              ...state.session,
              phase: "result",
              lastInput: input,
              lastCorrect: correct,
              lastResultStatus: status,
              results: { ...state.session.results, [question.key]: correct },
            },
          };
        }),
      next: () =>
        set((state) => {
          if (!state.session || state.session.phase !== "result") return state;
          const nextIndex = state.session.index + 1;
          return {
            session:
              nextIndex >= state.session.questions.length
                ? { ...state.session, phase: "finished" }
                : { ...state.session, index: nextIndex, phase: "answering", lastInput: undefined, lastCorrect: undefined, lastResultStatus: undefined },
          };
        }),
      clear: () => set({ session: null }),
    }),
    { name: "bkk:session", version: 1, storage: createJSONStorage(() => createSafeStorage("session")) },
  ),
);
