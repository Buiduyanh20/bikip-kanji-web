import { toHiragana } from "wanakana";
import { normalizeViet } from "./normalize";

export type AnswerValidationStatus = "exact" | "near" | "incorrect";

export type AnswerValidation = {
  correct: boolean;
  status: AnswerValidationStatus;
};

type AnswerType = "reading" | "meaning" | "hanviet";

function normalizeText(value: string): string {
  return normalizeViet(value).replace(/[\s\p{P}\p{S}]+$/gu, "").trim();
}

function parseReadingInput(value: string): string[] {
  return value
    .split(/[\s,，、;；/|]+/u)
    .map((part) => part.trim())
    .filter(Boolean);
}

function normalizeReading(value: string): string {
  return toHiragana(value).replace(/[.-]/g, "").replace(/\s+/g, "");
}

function validateReading(userAnswer: string, correctAnswers: string[]): AnswerValidation {
  const input = parseReadingInput(userAnswer).map(normalizeReading).filter(Boolean);
  const expected = correctAnswers
    .map(normalizeReading)
    .filter(Boolean)
    .filter((answer, index, answers) =>
      !answers.some((other, otherIndex) => otherIndex !== index && other.startsWith(answer)),
    );
  if (input.length === 0 || expected.length === 0) return { correct: false, status: "incorrect" };

  const exactMatches = new Set(input.filter((part) => expected.includes(part)));
  const nearMatches = new Set(input.filter((part) =>
    expected.some((answer) => answer.startsWith(part)),
  ));
  if (exactMatches.size === expected.length) return { correct: true, status: "exact" };
  if (nearMatches.size > 0) return { correct: true, status: "near" };
  return { correct: false, status: "incorrect" };
}

const NON_KEYWORD_WORDS = new Set(["bông", "phía", "hướng", "cái", "con", "mùa", "sức"]);

function getMeaningKeywords(answer: string): string[] {
  const normalized = normalizeText(answer);
  const words = normalized.split(" ").filter((word) => word.length > 1 && !NON_KEYWORD_WORDS.has(word));
  return words.length > 0 ? words : [normalized];
}

function validateMeaning(userAnswer: string, correctAnswers: string[]): AnswerValidation {
  const input = normalizeText(userAnswer);
  if (!input) return { correct: false, status: "incorrect" };

  const exact = correctAnswers.some((answer) => input === normalizeText(answer));
  if (exact) return { correct: true, status: "exact" };

  const hasKeyword = correctAnswers.some((answer) =>
    getMeaningKeywords(answer).some((keyword) => input.includes(keyword)),
  );
  return hasKeyword
    ? { correct: true, status: "near" }
    : { correct: false, status: "incorrect" };
}

export function validateKanjiAnswer(
  userAnswer: string,
  correctAnswer: string | string[],
  type: AnswerType,
): AnswerValidation {
  const answers = Array.isArray(correctAnswer) ? correctAnswer : [correctAnswer];
  if (type === "reading") return validateReading(userAnswer, answers);
  return validateMeaning(userAnswer, answers);
}
