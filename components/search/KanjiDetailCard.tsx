import type { Kanji } from "@/types/content";

export function KanjiDetailCard({ item }: { item: Kanji }) {
  return (
    <article className="rounded-2xl border bg-card p-5 shadow-sm">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="flex size-24 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-6xl text-primary">
          <span className="kanji-display">{item.char}</span>
        </div>
        <div className="min-w-0 space-y-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Kanji {item.level}</p>
            <h2 className="text-2xl font-bold">{item.char}</h2>
          </div>
          <div className="grid gap-2 text-sm sm:grid-cols-2">
            <p><span className="font-semibold">Hán Việt:</span> {item.hanViet.join(", ")}</p>
            <p><span className="font-semibold">Nghĩa:</span> {item.meanings.join(", ")}</p>
            <p><span className="font-semibold">On:</span> {item.onyomi?.join(", ") || "—"}</p>
            <p><span className="font-semibold">Kun:</span> {item.kunyomi?.join(", ") || "—"}</p>
          </div>
          {item.hint ? <p className="rounded-lg bg-muted p-3 text-sm"><span className="font-semibold">Mẹo nhớ:</span> {item.hint}</p> : null}
        </div>
      </div>
    </article>
  );
}
