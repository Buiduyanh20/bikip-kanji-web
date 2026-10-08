"use client";

import { useEffect, useState } from "react";
import { useProgressStore } from "@/store/progressStore";
import { useSessionStore } from "@/store/sessionStore";
import { useSettingsStore } from "@/store/settingsStore";

export function useHydrated(): boolean {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stores = [useProgressStore, useSessionStore, useSettingsStore];
    if (stores.every((store) => store.persist.hasHydrated())) {
      const timer = window.setTimeout(() => setHydrated(true), 0);
      return () => window.clearTimeout(timer);
    }
    let remaining = stores.length;
    const unsubscribers = stores.map((store) =>
      store.persist.onFinishHydration(() => {
        remaining -= 1;
        if (remaining === 0) setHydrated(true);
      }),
    );
    return () => unsubscribers.forEach((unsubscribe) => unsubscribe());
  }, []);

  return hydrated;
}
