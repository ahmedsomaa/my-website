import { useMode } from "@/context/mode-context";

const SOCIALS = [
  { title: "email", href: "mailto:abokahfa@gmail.com" },
  { title: "x.com", href: "https://x.com/som3aware" },
  { title: "github", href: "https://github.com/ahmedsomaa" },
  { title: "linkedin", href: "https://linkedin.com/in/som3aware" },
  { title: "hashnode", href: "https://som3aware.hashnode.dev/" },
  {
    title: "front-end mentor",
    href: "https://www.frontendmentor.io/profile/ahmedsomaa",
  },
] as const;

export default function SiteFooter() {
  const { mode } = useMode();
  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-8 flex flex-col md:flex-row gap-4 items-start md:items-center justify-between text-xs font-mono-pair text-muted-foreground">
        <p className="uppercase tracking-[0.2em]">
          Crafting elegant software <span className="mx-2 text-foreground/30">|</span> som3aware — 2026
        </p>
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 uppercase tracking-[0.2em]">
          {SOCIALS.map((social, i) => (
            <span key={social.title} className="inline-flex items-center">
              {i > 0 ? <span className="mr-3 text-foreground/30">·</span> : null}
              <a
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel={social.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                className="hover:text-foreground transition-colors"
              >
                {social.title}
              </a>
            </span>
          ))}
        </div>
        {mode === "raw" && (
          <p className="uppercase tracking-[0.2em] text-foreground/50">
            mode: raw / hex: #141414 / grid: 24px
          </p>
        )}
      </div>
    </footer>
  );
}