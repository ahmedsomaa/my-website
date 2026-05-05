/** True when URL points at GitHub (treat as repository, not a “live product” site). */
export function isGithubUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    const host = new URL(url.trim()).hostname.toLowerCase().replace(/^www\./, "");
    return host === "github.com" || host.endsWith(".github.com");
  } catch {
    return false;
  }
}
