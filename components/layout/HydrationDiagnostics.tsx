"use client";

import { useEffect } from "react";

export function HydrationDiagnostics({ serverClassName }: { serverClassName: string }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[Bí Kíp Kanji] html className server:", serverClassName);
      console.info("[Bí Kíp Kanji] html className client:", document.documentElement.className);
    }
  }, [serverClassName]);

  return null;
}
