"use client";

import { useEffect, useState } from "react";

/** SSR-safe media query hook. Returns `false` on the server and first paint. */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);
    const onChange = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);

  return matches;
}

/** True only for devices with an accurate pointer (mouse/trackpad) — gates cursor-driven effects off touch. */
export function useFinePointer(): boolean {
  return useMediaQuery("(pointer: fine)");
}
