import type { ContentType } from "./content";
import type { Method } from "./quiz";

export type MasteryStatus = "new" | "learning" | "mastered";

export interface MethodProgress {
  correct: number;
  wrong: number;
  streak: number;
  status: MasteryStatus;
  lastAnsweredAt: number;
}

export interface ItemProgress {
  itemId: string;
  type: ContentType;
  methods: Partial<Record<Method, MethodProgress>>;
}
