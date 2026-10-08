"use client";

import type { ReactNode } from "react";
import { useHydrated } from "@/hooks/useHydrated";

export function HydrationGate({ children }: { children: ReactNode }) {
  const hydrated = useHydrated();
  if (!hydrated) return <div aria-label="Đang tải dữ liệu" className="min-h-32 animate-pulse rounded-xl bg-muted" />;
  return children;
}
