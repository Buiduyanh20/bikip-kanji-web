import type { Kanji } from "@/types/content";
import { KanjiDetailCard } from "./KanjiDetailCard";

export function KanjiSearchResult({ keyword, results }: { keyword?: string; results: Kanji[] }) {
  if (!keyword) {
    return <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">Nhập từ khóa để tra Kanji.</div>;
  }

  if (results.length === 0) {
    return <div className="rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">Không tìm thấy Kanji phù hợp với “{keyword}”.</div>;
  }

  return (
    <section aria-live="polite" className="space-y-4">
      <h2 className="text-lg font-bold">Kết quả ({results.length})</h2>
      <div className="space-y-4">
        {results.map((item) => <KanjiDetailCard key={item.id} item={item} />)}
      </div>
    </section>
  );
}
