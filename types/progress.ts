import type { ContentType } from "./content";
import type { Method } from "./quiz";

export type MasteryStatus = "new" | "learning" | "mastered";
export type LearningMethod = Method;
export type LearningStatus = "NEW" | "LEARNING" | "MASTERED";

export interface MethodProgress {
  correct: number;
  wrong: number;
  streak: number;
  status: MasteryStatus;
  lastAnsweredAt: number;
}

export interface ProgressMethodState {
  correctCount: number;
  wrongCount: number;
  streak: number;
  status: LearningStatus;
  lastStudiedAt?: string;
}

export interface ItemProgress {
  itemId: string;
  type: ContentType;
  level?: import("./content").Level;
  methods: Partial<Record<Method, MethodProgress>>;
}
