import type { ContentType, Level } from "@/types/content";
import type { ItemProgress } from "@/types/progress";
import type { Method, QuizQuestion } from "@/types/quiz";
import { getItemsByLevel } from "@/repositories/contentRepository";
import { getMistakes } from "./mastery";
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
  const groups: Record<"learning" | "new" | "mastered", string[]> = { learning: [], new: [], mastered: [] };
  items.forEach((itemId) => {
    const methodProgress = progress[itemId]?.methods[method];
    const status = methodProgress?.status ?? "new";
    groups[status].push(itemId);
  });
  const ordered = [...shuffle(groups.learning, rng), ...shuffle(groups.new, rng), ...shuffle(groups.mastered, rng)];
  return ordered.slice(0, count).map((itemId) => ({ key: `${itemId}:${method}`, itemId, contentType, method }));
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
