import type { Kanji, Vocabulary } from "@/types/content";
import type { QuizQuestion } from "@/types/quiz";
import { capitalizeFirst } from "./normalize";
import { getMeaningAnswers } from "./checkMeaning";
import { getReadingAnswers } from "./checkReading";
import { validateKanjiAnswer, type AnswerValidation, type AnswerValidationStatus } from "./validateAnswer";

export function checkAnswer(
  question: QuizQuestion,
  input: string,
  item: Kanji | Vocabulary,
): AnswerValidation & { expected: string[] } {
  const expected =
    question.method === "hanviet" && "hanViet" in item
      ? item.hanViet.map(capitalizeFirst)
      : question.method === "meaning"
        ? getMeaningAnswers(item).map(capitalizeFirst)
        : getReadingAnswers(item);

  const validation =
    question.method === "hanviet" && "hanViet" in item
      ? validateKanjiAnswer(input, item.hanViet, "hanviet")
      : question.method === "meaning"
        ? validateKanjiAnswer(input, getMeaningAnswers(item), "meaning")
        : question.method === "reading"
          ? validateKanjiAnswer(input, getReadingAnswers(item), "reading")
          : { correct: false, status: "incorrect" as AnswerValidationStatus };

  return { ...validation, expected };
}

export { checkHanViet } from "./checkHanViet";
export { checkMeaning } from "./checkMeaning";
export { checkReading } from "./checkReading";
export { capitalizeFirst, normalizeViet } from "./normalize";
export { validateKanjiAnswer } from "./validateAnswer";
export type { AnswerValidation, AnswerValidationStatus } from "./validateAnswer";
