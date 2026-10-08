"use client";

import { useRouter } from "next/navigation";
import * as React from "react";
import type { ContentType, Level } from "@/types/content";
import type { Method, QuizSession } from "@/types/quiz";
import { Button } from "@/components/ui/button";
import { useProgressStore } from "@/store/progressStore";
import { useSettingsStore } from "@/store/settingsStore";
import { useSessionStore } from "@/store/sessionStore";
import { buildLearnQuiz } from "@/utils/quiz-builder";
import { getAvailableMethods, countByLevel } from "@/repositories/contentRepository";
import { MethodSelector } from "./MethodSelector";
import { CountSelector, type CountSelection } from "./CountSelector";

export function SetupForm({ contentType, level }: { contentType: ContentType; level: Level }) {
  const router = useRouter();
  const total = countByLevel(contentType, level);
  const available = getAvailableMethods(contentType, level);
  const progress = useProgressStore((state) => state.items);
  const start = useSessionStore((state) => state.start);
  const settings = useSettingsStore();
  const [method, setMethod] = React.useState<Method | undefined>(available.includes(settings.lastMethod as Method) ? settings.lastMethod : available[0]);
  const initialSelection: CountSelection = settings.lastCount === "all"
    ? "all"
    : typeof settings.lastCount === "number" && settings.lastCount <= total
      ? settings.lastCount
      : "all";
  const [countSelection, setCountSelection] = React.useState<CountSelection>(initialSelection);
  const [customCount, setCustomCount] = React.useState("");
  const count = countSelection === "all"
    ? total
    : countSelection === "custom"
      ? Number(customCount)
      : countSelection;
  const countValid = Number.isInteger(count) && count >= 1 && count <= total;

  function handleStart() {
    if (!method || !countValid) return;
    const questions = buildLearnQuiz({ contentType, level, method, count, progress });
    const session: QuizSession = { mode: "learn", contentType, level, method, questions, index: 0, phase: "answering", results: {} };
    start(session);
    settings.setLastLearningOptions(method, countSelection === "all" ? "all" : count);
    router.push(`/${contentType}/${level.toLowerCase()}/quiz`);
  }

  return (
    <div className="space-y-8">
      <MethodSelector contentType={contentType} value={method} available={available} onChange={setMethod} />
      <CountSelector
        total={total}
        value={countSelection}
        onChange={setCountSelection}
        customCount={customCount}
        onCustomCountChange={setCustomCount}
      />
      <Button type="button" size="lg" className="min-h-11 w-full" disabled={!method || !countValid} onClick={handleStart}>Bắt đầu học</Button>
    </div>
  );
}
