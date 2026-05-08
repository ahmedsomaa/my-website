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
  const year = new Date().getFullYear();

  return (
    <footer className="border-t hairline mt-24">
      <div className="mx-auto max-w-7xl px-6 md:px-10 py-10 text-xs font-mono-pair text-muted-foreground">
        <div className="flex flex-col items-center gap-3 text-center">
          <p className="uppercase tracking-[0.2em] text-foreground">som3aware</p>
          <p className="uppercase tracking-[0.2em]">
            {year} all rights reserved
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 uppercase tracking-[0.2em]">
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
        </div>
      </div>
    </footer>
  );
}