import { notFound } from "next/navigation";
import { QuizScreen } from "@/components/quiz/QuizScreen";
import { fromUrlLevel } from "@/utils/constants";
import { countByLevel } from "@/repositories/contentRepository";

export const instant = false;

export default async function KanjiQuizPage({ params }: { params: Promise<{ level: string }> }) {
  const level = fromUrlLevel((await params).level);
  if (!level || countByLevel("kanji", level) === 0) notFound();
  return <QuizScreen contentType="kanji" level={level} />;
}
