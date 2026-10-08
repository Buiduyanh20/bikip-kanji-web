import type { ReactNode } from "react";

export function HomeHero({ children }: { children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-10">
      <div className="relative z-10 max-w-xl">
        <p className="text-lg font-bold text-primary">🈶 Bí Kíp Kanji</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Học Kanji nhẹ nhàng hơn mỗi ngày
        </h1>
        <p className="mt-3 max-w-lg text-base leading-7 text-muted-foreground">
          Người Việt học Kanji dễ hơn bằng âm Hán Việt và mẹo ghi nhớ
        </p>
        {children}
      </div>
      <div aria-hidden className="pointer-events-none absolute -right-4 -bottom-8 font-kanji text-[12rem] leading-none text-primary/10">
        漢
      </div>
    </section>
  );
}
