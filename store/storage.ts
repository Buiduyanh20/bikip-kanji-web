import type { StateStorage } from "zustand/middleware";

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

export function createSafeStorage(kind: "local" | "session"): StateStorage {
  return {
    getItem: (name) => {
      if (!isBrowser()) return null;
      try {
        return (kind === "local" ? window.localStorage : window.sessionStorage).getItem(name);
      } catch {
        return null;
      }
    },
    setItem: (name, value) => {
      if (!isBrowser()) return;
      try {
        (kind === "local" ? window.localStorage : window.sessionStorage).setItem(name, value);
      } catch {
        // Storage may be disabled or full; the in-memory store remains usable.
      }
    },
    removeItem: (name) => {
      if (!isBrowser()) return;
      try {
        (kind === "local" ? window.localStorage : window.sessionStorage).removeItem(name);
      } catch {
        // Storage may be disabled.
      }
    },
  };
}

export { isBrowser };
