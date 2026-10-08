import type { ContentType, Level } from "@/types/content";
import type { ItemProgress } from "@/types/progress";
import type { Method, QuizQuestion } from "@/types/quiz";
import { getItemsByLevel } from "@/repositories/contentRepository";
import { getMistakes } from "./mastery";
import { PRIORITY_SCORES } from "./constants";

function score(progress: ItemProgress | undefined, rng: () => number): number {
  const methodProgress = progress ? Object.values(progress.methods)[0] : undefined;
  if (!methodProgress) return PRIORITY_SCORES.new + rng() * PRIORITY_SCORES.randomNoise;
  if (methodProgress.status === "learning") {
    const base = methodProgress.wrong > 0
      ? PRIORITY_SCORES.learningWithMistakes + Math.min(methodProgress.wrong, PRIORITY_SCORES.maxWrongBonus)
      : PRIORITY_SCORES.learningWithoutMistakes;
    return base + rng() * PRIORITY_SCORES.randomNoise;
  }
  const elapsedDays = methodProgress.lastAnsweredAt
    ? (Date.now() - methodProgress.lastAnsweredAt) / 86_400_000
    : 0;
  return PRIORITY_SCORES.mastered + Math.min(
    PRIORITY_SCORES.maxRecencyBonus,
    Math.floor(elapsedDays / PRIORITY_SCORES.recencyIntervalDays) * PRIORITY_SCORES.recencyBonusPerInterval,
  ) + rng() * PRIORITY_SCORES.randomNoise;
}

function shuffle<T>(items: T[], rng: () => number): T[] {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const target = Math.floor(rng() * (index + 1));
    [result[index], result[target]] = [result[target], result[index]];
  }
  return result;
}

export function buildLearnQuiz({
  contentType, level, method, count, progress, rng = Math.random,
}: {
  contentType: ContentType;
  level: Level;
  method: Method;
  count: number;
  progress: Record<string, ItemProgress>;
  rng?: () => number;
}): QuizQuestion[] {
  const items = getItemsByLevel(contentType, level).map((item) => item.id);
  const ranked = items
    .map((itemId) => ({ itemId, priority: score(progress[itemId] ? { ...progress[itemId], methods: { [method]: progress[itemId].methods[method] } } : undefined, rng) }))
    .sort((a, b) => b.priority - a.priority)
    .slice(0, count)
    .map(({ itemId }) => ({ key: `${itemId}:${method}`, itemId, contentType, method }));
  return shuffle(ranked, rng);
}

export function buildReviewQuiz({
  progress, contentType, count, rng = Math.random,
}: {
  progress: Record<string, ItemProgress>;
  contentType?: ContentType;
  count?: number;
  rng?: () => number;
}): QuizQuestion[] {
  const mistakes = getMistakes(progress)
    .filter((mistake) => !contentType || mistake.type === contentType)
    .sort((a, b) => b.wrong - a.wrong);
  const selected = typeof count === "number" ? mistakes.slice(0, count) : mistakes;
  return shuffle(selected.map(({ itemId, type, method }) => ({ key: `${itemId}:${method}`, itemId, contentType: type, method })), rng);
}
