import type { Kanji, Vocabulary } from "@/types/content";

export function QuestionCard({ item }: { item: Kanji | Vocabulary }) {
  return <div className="rounded-2xl border bg-card px-6 py-8 text-center shadow-sm"><p className="kanji-display">{("char" in item ? item.char : item.word)}</p>{!("char" in item) ? <p className="mt-2 text-sm text-muted-foreground">Từ vựng</p> : null}</div>;
}
