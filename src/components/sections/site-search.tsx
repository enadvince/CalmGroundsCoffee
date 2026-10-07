"use client";

/**
 * Full-site search (pages, menu, pop-ups, regular spots, packages, FAQs).
 * Native <dialog> gives focus trapping, Escape-to-close, and inert background.
 * Open with the header button, Ctrl/⌘+K, "/", or `openSearch()` from anywhere.
 */

import { Search, X, CornerDownLeft } from "lucide-react";
import { useLenis } from "lenis/react";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { buildSearchIndex, searchIndex, type SearchEntry } from "@/lib/search-index";
import { usePageTransition } from "@/components/motion/page-transition";
import { cn } from "@/lib/cn";

const OPEN_EVENT = "cg:open-search";
export const openSearch = () => window.dispatchEvent(new Event(OPEN_EVENT));

const SUGGESTIONS = ["Latte", "Ayala", "Wedding", "Oat", "Delivery"];

export function SiteSearch() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const { navigate } = usePageTransition();
  const lenis = useLenis();
  const listId = useId();

  // Built on first open, not during hydration.
  const [index, setIndex] = useState<SearchEntry[] | null>(null);
  const results = useMemo(() => (index ? searchIndex(index, query) : []), [index, query]);

  const open = useCallback(() => {
    const d = dialogRef.current;
    if (!d || d.open) return;
    setIndex((current) => current ?? buildSearchIndex());
    d.showModal();
    lenis?.stop();
    inputRef.current?.focus();
  }, [lenis]);

  const close = useCallback(() => dialogRef.current?.close(), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = e.target instanceof HTMLElement && (e.target.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(e.target.tagName));
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !typing)) {
        e.preventDefault();
        open();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_EVENT, open);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_EVENT, open);
    };
  }, [open]);

  const go = (r: SearchEntry) => {
    close();
    if (r.href.split("#")[0] === window.location.pathname) {
      const hash = r.href.split("#")[1];
      const el = hash ? document.getElementById(hash) : null;
      if (el) {
        if (lenis) lenis.scrollTo(el, { offset: -140 });
        else el.scrollIntoView();
      } else window.scrollTo({ top: 0 });
      return;
    }
    navigate(r.href);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Search inputs swallow the first Escape to clear their text; close in one press instead.
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (!results.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % results.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + results.length) % results.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(results[Math.min(active, results.length - 1)]);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label="Search the site"
      onClose={() => {
        lenis?.start();
        setQuery("");
        setActive(0);
      }}
      onClick={(e) => {
        if (e.target === dialogRef.current) close(); // backdrop click
      }}
      data-theme="milk"
      className="m-0 mx-auto mt-[8vh] max-h-[80vh] w-[min(40rem,calc(100vw-2rem))] overflow-hidden rounded-card border-2 border-calm-blue bg-milk p-0 text-deep-ink shadow-lift backdrop:bg-deep-ink/60 print:hidden"
    >
      <div className="flex items-center gap-3 border-b-2 border-latte px-5">
        <Search className="size-5 shrink-0 text-calm-blue" aria-hidden="true" />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setActive(0);
          }}
          onKeyDown={onInputKey}
          placeholder="Search drinks, pop-ups, packages…"
          aria-label="Search"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls={listId}
          aria-activedescendant={results.length ? `${listId}-${active}` : undefined}
          aria-autocomplete="list"
          className="h-16 flex-1 bg-transparent text-lg outline-none placeholder:text-deep-ink/55 [&::-webkit-search-cancel-button]:hidden"
        />
        <button type="button" onClick={close} aria-label="Close search" className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-calm-blue hover:text-steam">
          <X className="size-5" aria-hidden="true" />
        </button>
      </div>

      <div className="max-h-[calc(80vh-4rem)] overflow-y-auto p-3" data-lenis-prevent>
        {query.trim() === "" ? (
          <div className="flex flex-col gap-3 p-3">
            <p className="text-sm opacity-80">Try:</p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setQuery(s);
                    inputRef.current?.focus();
                  }}
                  className="rounded-full border-2 border-calm-blue/40 px-3 py-1 text-sm font-medium text-calm-blue transition-colors hover:border-calm-blue hover:bg-calm-blue hover:text-steam"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        ) : results.length === 0 ? (
          <p className="p-4" role="status">
            Nothing matches &ldquo;{query}&rdquo;. Try a drink name, a mall, or &ldquo;wedding&rdquo;.
          </p>
        ) : (
          <>
            <p className="sr-only" role="status">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <ul id={listId} role="listbox" aria-label="Search results" className="flex flex-col gap-1">
              {results.map((r, i) => (
                <li
                  key={r.id}
                  id={`${listId}-${i}`}
                  role="option"
                  aria-selected={i === active}
                  onMouseEnter={() => setActive(i)}
                  onClick={() => go(r)}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-sm px-4 py-3 transition-colors",
                    i === active ? "bg-calm-blue text-steam" : "hover:bg-foam-cream",
                  )}
                >
                  <div className="min-w-0 flex-1">
                    <p className="text-eyebrow mb-1 opacity-80">{r.kind}</p>
                    <p className="font-medium">{r.title}</p>
                    <p className="truncate text-sm opacity-85">{r.snippet}</p>
                  </div>
                  {i === active && <CornerDownLeft className="size-4 shrink-0" aria-hidden="true" />}
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </dialog>
  );
}

export function SearchButton({ className }: { className?: string }) {
  return (
    <button
      type="button"
      onClick={openSearch}
      aria-label="Search the site (Ctrl+K)"
      className={cn("flex size-11 items-center justify-center rounded-full transition-colors hover:bg-foam-cream/15", className)}
    >
      <Search className="size-5" aria-hidden="true" />
    </button>
  );
}
