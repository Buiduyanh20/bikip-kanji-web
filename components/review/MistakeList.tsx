import type { Kanji, Vocabulary } from "@/types/content";
import { MistakeItem } from "./MistakeItem";

export function MistakeList({ mistakes }: { mistakes: { itemId: string; type: "kanji" | "vocabulary"; method: "hanviet" | "meaning" | "reading"; wrong: number; item?: Kanji | Vocabulary }[] }) {
  return <ul className="space-y-3">{mistakes.map((mistake) => mistake.item ? <MistakeItem key={`${mistake.itemId}:${mistake.method}`} item={mistake.item} method={mistake.method} wrong={mistake.wrong} type={mistake.type} /> : null)}</ul>;
}
