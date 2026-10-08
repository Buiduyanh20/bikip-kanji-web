"use client";

import Link from "next/link";
import { HydrationGate } from "@/components/layout/HydrationGate";
import { getMistakes, isItemMastered } from "@/utils/mastery";
import { useProgressStore } from "@/store/progressStore";
import { useSettingsStore } from "@/store/settingsStore";
import { getAvailableMethods, getItemsByLevel } from "@/repositories/contentRepository";

export function HomeStatus() {
  return (
    <HydrationGate>
      <HomeStatusContent />
    </HydrationGate>
  );
}

function HomeStatusContent() {
  const name = useSettingsStore((state) => state.userName);
  const items = useProgressStore((state) => state.items);
  const content = getItemsByLevel("kanji", "N5");
  const methods = getAvailableMethods("kanji", "N5");
  const contentIds = new Set(content.map((item) => item.id));
  const studiedItems = content.filter((item) => Object.keys(items[item.id]?.methods ?? {}).length > 0);
  const hasStarted = studiedItems.length > 0;
  const mistakes = getMistakes(items).filter((mistake) => mistake.type === "kanji" && contentIds.has(mistake.itemId));
  const reviewCount = new Set(mistakes.map((mistake) => mistake.itemId)).size;
  const mastered = content.filter((item) => isItemMastered(item, methods, items)).length;
  const learning = studiedItems.filter((item) => !isItemMastered(item, methods, items)).length;
  const completed = studiedItems.length === content.length;
  return (
    <>
      {name ? <p className="mt-6 text-sm font-medium text-primary">Chào {name}</p> : null}
      {!hasStarted ? (
        <>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Học Kanji nhẹ nhàng hơn mỗi ngày</h1>
          <p className="mt-3 max-w-lg text-base leading-7 text-muted-foreground">Bắt đầu hành trình chinh phục Kanji Nhật Bản</p>
          <p className="mt-2 max-w-lg text-sm leading-6 text-muted-foreground">Từ N5 đến N1, học bằng âm Hán Việt, nghĩa và phương pháp ghi nhớ.</p>
        </>
      ) : completed ? (
        <>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">🎉 Chúc mừng!</h1>
          <p className="mt-3 text-lg font-semibold">Bạn đã hoàn thành N5 Kanji</p>
          <div className="mt-5 rounded-xl border bg-background/70 p-4 text-sm">
            <p className="text-2xl font-bold">{studiedItems.length} / {content.length}</p>
            <p className="mt-2 text-muted-foreground">Đã nhớ: {mastered} · Cần ôn: {reviewCount}</p>
          </div>
          <p className="mt-6 text-sm font-semibold">Tiếp tục chinh phục:</p>
          <Link href="/kanji/n4" className="mt-3 inline-flex min-h-11 items-center justify-center rounded-lg border px-5 text-sm font-semibold hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">Bắt đầu N4 Kanji</Link>
        </>
      ) : (
        <>
          <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">Tiếp tục hành trình của bạn</h1>
          <div className="mt-6 rounded-xl border bg-background/70 p-4 text-sm">
            <p className="font-semibold">N5 Kanji</p>
            <p className="mt-1 text-2xl font-bold">{studiedItems.length} / {content.length}</p>
            <div className="mt-3 grid gap-1 text-muted-foreground sm:grid-cols-3">
              <p>🟢 Đã nhớ: {mastered}</p>
              <p>🟡 Đang học: {learning}</p>
              <p>🔴 Cần ôn: {reviewCount}</p>
            </div>
          </div>
          <Link href="/kanji/n5" className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-primary px-5 text-sm font-semibold text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary">Học tiếp</Link>
          {reviewCount > 0 ? <Link href="/review" className="mt-3 ml-3 inline-flex min-h-11 items-center justify-center rounded-lg border px-5 text-sm font-semibold hover:bg-muted focus-visible:outline-2 focus-visible:outline-primary">Ôn các câu cần nhớ</Link> : null}
        </>
      )}
    </>
  );
}
