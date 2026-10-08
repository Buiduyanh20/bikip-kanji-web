"use client";

import { useMemo } from "react";
import type { ContentType, Level } from "@/types/content";
import { PageContainer } from "@/components/layout/PageContainer";
import { getQuestionLabel } from "@/utils/constants";
import { checkAnswer } from "@/utils/answer-checker";
import { useQuiz } from "@/hooks/useQuiz";
import { AnswerInput } from "./AnswerInput";
import { QuestionCard } from "./QuestionCard";
import { QuizProgressBar } from "./QuizProgressBar";
import { QuizSummary } from "./QuizSummary";
import { ResultPanel } from "./ResultPanel";

export function QuizScreen({ contentType, level }: { contentType: ContentType; level?: Level }) {
  const quiz = useQuiz(contentType, level);
  const question = quiz.currentQuestion;
  const item = quiz.currentItem;
  const expected = useMemo(() => {
    if (!question || !item) return [];
    return checkAnswer(question, "", item).expected;
  }, [item, question]);
  if (!quiz.session || !question || !item) return <PageContainer><div className="animate-pulse rounded-2xl bg-muted p-8">Đang tải phiên học...</div></PageContainer>;
  if (quiz.phase === "finished") {
    const wrong = quiz.session.questions.filter((entry) => quiz.session?.results[entry.key] === false);
    const correct = Object.values(quiz.session.results).filter(Boolean).length;
    return <PageContainer size="narrow"><QuizSummary correct={correct} total={quiz.session.questions.length} mistakes={wrong} reviewMode={quiz.session.mode === "review"} onRestart={quiz.restart} onReview={quiz.reviewMistakes} /></PageContainer>;
  }
  const result = quiz.session.lastCorrect ?? false;
  return <PageContainer size="narrow"><div className="space-y-6"><QuizProgressBar label={quiz.progressLabel} value={quiz.session.index + 1} total={quiz.session.questions.length} /><p className="text-center text-lg font-semibold">{getQuestionLabel(contentType, question.method)}</p>{quiz.phase === "answering" ? <><QuestionCard item={item} /><AnswerInput onSubmit={quiz.submit} /></> : <><ResultPanel item={item} method={question.method} correct={result} status={quiz.session.lastResultStatus ?? (result ? "exact" : "incorrect")} input={quiz.session.lastInput ?? ""} expected={expected} onNext={quiz.next} last={quiz.session.index === quiz.session.questions.length - 1} /><p className="hidden text-center text-xs text-muted-foreground [@media(hover:hover)_and_(pointer:fine)]:block">Nhấn Enter để tiếp tục</p></>}</div></PageContainer>;
}
