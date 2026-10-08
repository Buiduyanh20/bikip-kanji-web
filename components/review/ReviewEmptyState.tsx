import Link from "next/link";

export function ReviewEmptyState() {
  return <div className="rounded-2xl border bg-card p-8 text-center"><p className="text-4xl">🌱</p><h2 className="mt-3 text-xl font-bold">Chưa có mục nào cần ôn</h2><p className="mt-2 text-sm text-muted-foreground">Hãy học một vài câu để bắt đầu theo dõi tiến độ.</p><Link href="/kanji" className="mt-5 inline-flex min-h-11 items-center rounded-lg bg-primary px-4 font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-primary">Học Kanji</Link></div>;
}
