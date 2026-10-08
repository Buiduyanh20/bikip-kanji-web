"use client";

import { useMemo, useState } from "react";
import type { ContentType } from "@/types/content";
import { PageContainer } from "@/components/layout/PageContainer";
import { PageHeader } from "@/components/layout/PageHeader";
import { Button } from "@/components/ui/button";
import { useMistakes } from "@/hooks/useMistakes";
import { useSessionStore } from "@/store/sessionStore";
import { buildReviewQuiz } from "@/utils/quiz-builder";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { MistakeList } from "./MistakeList";
import { ReviewEmptyState } from "./ReviewEmptyState";

export function ReviewClient() {
  const mistakes = useMistakes();
  const session = useSessionStore((state) => state.session);
  const start = useSessionStore((state) => state.start);
  const [filter, setFilter] = useState<ContentType | "all">("all");
  const filtered = useMemo(() => filter === "all" ? mistakes : mistakes.filter((mistake) => mistake.type === filter), [filter, mistakes]);
  if (session?.mode === "review" && session.phase !== "finished") return <QuizScreen contentType={session.contentType} level={session.level} />;
  if (mistakes.length === 0) return <PageContainer><PageHeader title="Ôn tập" backHref="/" /><ReviewEmptyState /></PageContainer>;
  function startReview() {
    const questions = buildReviewQuiz({ progress: Object.fromEntries(mistakes.map((mistake) => [mistake.itemId, { itemId: mistake.itemId, type: mistake.type, methods: { [mistake.method]: { correct: 0, wrong: mistake.wrong, streak: 0, status: "learning", lastAnsweredAt: 0 } } }])) });
    start({ mode: "review", contentType: questions[0]?.contentType ?? "kanji", questions, index: 0, phase: "answering", results: {} });
  }
  return <PageContainer><PageHeader title="Ôn tập" subtitle={`${mistakes.length} mục cần cải thiện`} backHref="/" /><div className="mb-5 flex gap-2"><Button variant={filter === "all" ? "default" : "outline"} className="min-h-11" onClick={() => setFilter("all")}>Tất cả</Button><Button variant={filter === "kanji" ? "default" : "outline"} className="min-h-11" onClick={() => setFilter("kanji")}>Kanji</Button><Button variant={filter === "vocabulary" ? "default" : "outline"} className="min-h-11" onClick={() => setFilter("vocabulary")}>Từ vựng</Button></div><MistakeList mistakes={filtered} /><Button className="mt-6 min-h-11 w-full" onClick={startReview}>Ôn tập</Button></PageContainer>;
}
