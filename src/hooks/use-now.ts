"use client";

import { useSyncExternalStore } from "react";

/** Shared 1s clock. Returns null during SSR/hydration so markup never mismatches. */
let current = Math.floor(Date.now() / 1000) * 1000;
const listeners = new Set<() => void>();
let timer: ReturnType<typeof setInterval> | null = null;

function subscribe(cb: () => void) {
  listeners.add(cb);
  if (!timer) {
    current = Math.floor(Date.now() / 1000) * 1000;
    timer = setInterval(() => {
      current = Math.floor(Date.now() / 1000) * 1000;
      listeners.forEach((l) => l());
    }, 1000);
  }
  return () => {
    listeners.delete(cb);
    if (!listeners.size && timer) {
      clearInterval(timer);
      timer = null;
    }
  };
}

export function useNow(): number | null {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
