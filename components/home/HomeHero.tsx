import type { ReactNode } from "react";

export function HomeHero({ children }: { children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border bg-card px-6 py-8 shadow-sm sm:px-10 sm:py-10">
      <div className="relative z-10 max-w-xl">
        <p className="text-lg font-bold text-primary">🈶 Bí Kíp Kanji</p>
        {children}
      </div>
      <div aria-hidden className="pointer-events-none absolute -right-4 -bottom-8 font-kanji text-[12rem] leading-none text-primary/10">
        漢
      </div>
    </section>
  );
}
