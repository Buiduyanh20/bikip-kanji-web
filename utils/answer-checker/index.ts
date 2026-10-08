import type { Kanji, Vocabulary } from "@/types/content";
import type { QuizQuestion } from "@/types/quiz";
import { capitalizeFirst } from "./normalize";
import { checkHanViet } from "./checkHanViet";
import { checkMeaning, getMeaningAnswers } from "./checkMeaning";
import { checkReading, getReadingAnswers } from "./checkReading";

export function checkAnswer(
  question: QuizQuestion,
  input: string,
  item: Kanji | Vocabulary,
): { correct: boolean; expected: string[] } {
  const expected =
    question.method === "hanviet" && "hanViet" in item
      ? item.hanViet.map(capitalizeFirst)
      : question.method === "meaning"
        ? getMeaningAnswers(item).map(capitalizeFirst)
        : getReadingAnswers(item);

  const correct =
    question.method === "hanviet" && "hanViet" in item
      ? checkHanViet(input, item)
      : question.method === "meaning"
        ? checkMeaning(input, item)
        : question.method === "reading"
          ? checkReading(input, item)
          : false;

  return { correct, expected };
}

export { checkHanViet } from "./checkHanViet";
export { checkMeaning } from "./checkMeaning";
export { checkReading } from "./checkReading";
export { capitalizeFirst, normalizeViet } from "./normalize";
