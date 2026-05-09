import { useEffect } from "react";

/**
 * Sets the --accent-page CSS variable for the current page.
 * Pass the HSL triplet (e.g. "193 95% 50%") matching one of the brand-* tokens.
 */
export function usePageAccent(hsl: string) {
  useEffect(() => {
    const root = document.documentElement;
    const prev = root.style.getPropertyValue("--accent-page");
    root.style.setProperty("--accent-page", hsl);
    return () => {
      if (prev) root.style.setProperty("--accent-page", prev);
      else root.style.removeProperty("--accent-page");
    };
  }, [hsl]);
}

export const PAGE_ACCENTS = {
  // React cyan
  home: "193 95% 50%",
  // Node green
  about: "120 41% 38%",
  // JavaScript yellow
  work: "53 93% 60%",
  // Tailwind teal (stack-derived palette)
  blog: "189 94% 55%",
} as const;