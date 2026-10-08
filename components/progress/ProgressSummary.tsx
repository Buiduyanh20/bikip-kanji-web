import type { ContentType, Kanji, Vocabulary } from "@/types/content";
import type { Method } from "@/types/quiz";
import { isItemMastered } from "@/utils/mastery";
import { LevelProgressCard } from "./LevelProgressCard";

export function ProgressSummary({ content, contentType, methods, items }: { content: (Kanji | Vocabulary)[]; contentType: ContentType; methods: Method[]; items: Parameters<typeof isItemMastered>[2] }) {
  const levels = [...new Set(content.map((item) => item.level))];
  return <div className="space-y-4">{levels.map((level) => { const entries = content.filter((item) => item.level === level); const mastered = entries.filter((item) => isItemMastered(item, methods, items)).map((item) => "char" in item ? item.char : item.word); const learning = entries.filter((item) => !mastered.includes("char" in item ? item.char : item.word) && items[item.id]).map((item) => "char" in item ? item.char : item.word); const fresh = entries.filter((item) => !mastered.includes("char" in item ? item.char : item.word) && !items[item.id]).map((item) => "char" in item ? item.char : item.word); return <LevelProgressCard key={`${contentType}:${level}`} title={`${level} ${contentType === "kanji" ? "Kanji" : "Từ vựng"}`} total={entries.length} mastered={mastered} learning={learning} fresh={fresh} />; })}</div>;
}
