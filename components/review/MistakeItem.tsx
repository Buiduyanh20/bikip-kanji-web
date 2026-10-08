import type { Kanji, Vocabulary } from "@/types/content";
import type { Method } from "@/types/quiz";
import { getMethodLabel } from "@/utils/constants";

export function MistakeItem({ item, method, wrong, type }: { item: Kanji | Vocabulary; method: Method; wrong: number; type: "kanji" | "vocabulary" }) {
  return <li className="flex items-center gap-4 rounded-xl border bg-card p-4"><span className="kanji-display text-4xl">{("char" in item ? item.char : item.word)}</span><span className="min-w-0 flex-1"><strong className="block truncate">{getMethodLabel(type, method)}</strong><span className="text-sm text-muted-foreground">Sai {wrong} lần</span></span></li>;
}
