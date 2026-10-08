"use client";

import Link from "next/link";
import { HydrationGate } from "@/components/layout/HydrationGate";
import { getMistakes } from "@/utils/mastery";
import { useProgressStore } from "@/store/progressStore";
import { useSettingsStore } from "@/store/settingsStore";

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
  const mistakes = getMistakes(items);
  return (
    <>
      {name ? <p className="mt-6 text-sm font-medium text-primary">Chào {name}</p> : null}
      {mistakes.length > 0 ? (
        <Link href="/review" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-secondary/15 px-4 text-sm font-semibold text-secondary-foreground focus-visible:outline-2 focus-visible:outline-primary">
          Có {mistakes.length} mục cần ôn
        </Link>
      ) : null}
    </>
  );
}
