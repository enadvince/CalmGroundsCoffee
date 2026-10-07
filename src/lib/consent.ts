"use client";

import { useSyncExternalStore } from "react";

/**
 * Cookie/analytics consent. Nothing on the site currently tracks visitors;
 * `hasAnalyticsConsent()` is the gate any future analytics script must check.
 */
export type Consent = "all" | "essential";
const KEY = "cg-consent";
const listeners = new Set<() => void>();

function read(): Consent | null {
  try {
    const v = localStorage.getItem(KEY);
    return v === "all" || v === "essential" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Consent) {
  try {
    localStorage.setItem(KEY, value);
  } catch {
    /* storage blocked — banner will reappear next visit */
  }
  memo = value;
  listeners.forEach((l) => l());
}

let memo: Consent | null | undefined;
const snapshot = () => (memo === undefined ? (memo = read()) : memo);

export const hasAnalyticsConsent = () => snapshot() === "all";

/** `undefined` during SSR/hydration, then the stored choice (or null if none yet). */
export function useConsent(): Consent | null | undefined {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    snapshot,
    () => undefined,
  );
}
