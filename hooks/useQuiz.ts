"use client";

import { useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { ContentType, Level, Kanji, Vocabulary } from "@/types/content";
import type { QuizQuestion } from "@/types/quiz";
import { getItemById } from "@/repositories/contentRepository";
import { checkAnswer } from "@/utils/answer-checker";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import { buildLearnQuiz } from "@/utils/quiz-builder";

export function useQuiz(contentType: ContentType, level?: Level) {
  const router = useRouter();
  const session = useSessionStore((state) => state.session);
  const submitSession = useSessionStore((state) => state.submit);
  const nextSession = useSessionStore((state) => state.next);
  const startSession = useSessionStore((state) => state.start);
  const progress = useProgressStore((state) => state.items);
  const recordAnswer = useProgressStore((state) => state.recordAnswer);
  const currentQuestion: QuizQuestion | undefined = session?.questions[session.index];
  const currentItem = currentQuestion ? getItemById(currentQuestion.contentType, currentQuestion.itemId) : undefined;

  useEffect(() => {
    if (!session || session.contentType !== contentType || (level && session.level !== level)) {
      router.replace(`/${contentType}${level ? `/${level.toLowerCase()}` : ""}`);
    }
  }, [contentType, level, router, session]);

  const submit = useCallback((input: string) => {
    if (!session || !currentQuestion || !currentItem || session.phase !== "answering") return;
    if (currentQuestion.key in session.results) return;
    const result = checkAnswer(currentQuestion, input, currentItem);
    recordAnswer({ itemId: currentQuestion.itemId, type: currentQuestion.contentType, method: currentQuestion.method, correct: result.correct });
    submitSession(result.correct, input);
  }, [currentItem, currentQuestion, recordAnswer, session, submitSession]);

  const restart = useCallback(() => {
    if (!session || session.mode === "review" || !session.level || !session.method) return;
    const questions = buildLearnQuiz({ contentType: session.contentType, level: session.level, method: session.method, count: session.questions.length, progress });
    startSession({ ...session, questions, index: 0, phase: "answering", lastInput: undefined, lastCorrect: undefined, results: {} });
  }, [progress, session, startSession]);

  return {
    session,
    currentQuestion,
    currentItem: currentItem as Kanji | Vocabulary | undefined,
    progressLabel: session && session.questions.length > 0 ? `${Math.min(session.index + 1, session.questions.length)} / ${session.questions.length}` : "0 / 0",
    phase: session?.phase ?? "answering",
    submit,
    next: nextSession,
    restart,
  };
}
