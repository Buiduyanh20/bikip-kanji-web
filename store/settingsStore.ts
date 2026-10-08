"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { Method } from "@/types/quiz";
import { createSafeStorage } from "./storage";

type SettingsState = {
  userName: string;
  lastMethod?: Method;
  lastCount?: number | "all";
  setUserName: (userName: string) => void;
  setLastLearningOptions: (method: Method, count: number | "all") => void;
  resetSettings: () => void;
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      userName: "",
      setUserName: (userName) => set({ userName: userName.trim().slice(0, 30) }),
      setLastLearningOptions: (lastMethod, lastCount) => set({ lastMethod, lastCount }),
      resetSettings: () => set({ userName: "", lastMethod: undefined, lastCount: undefined }),
    }),
    { name: "bkk:settings", version: 1, storage: createJSONStorage(() => createSafeStorage("local")) },
  ),
);
