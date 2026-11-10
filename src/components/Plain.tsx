import { TABS } from '#/content'
import { CV } from '#/lib/view'

/** ?plain: the same content as one readable page. */
export function Plain() {
  return (
    <>
      <header className="mx-auto flex max-w-[96ch] flex-wrap justify-between gap-x-6 gap-y-2 border-b border-line px-4 pt-6 pb-3">
        <h1 className="font-px font-normal text-success">
          <span className="sr-only">Ahmed Abu Qahf, </span>ahmed
          <b className="font-normal text-muted">@</b>som3aware
        </h1>
        <nav aria-label="Sections" className="flex flex-wrap gap-x-4 gap-y-1">
          {TABS.map((t) => (
            <a key={t.id} href={`#/${t.id}`} className="text-fg">
              {t.id}
            </a>
          ))}
          <a href={CV} target="_blank" rel="noopener" className="text-fg">
            cv ↗
          </a>
          <a href="./">tui view →</a>
        </nav>
      </header>

      <main className="mx-auto max-w-[96ch] px-4">
        {TABS.map((t) => (
          <section key={t.id} id={`/${t.id}`} className="pt-10 pb-2">
            <h2 className="text-base font-normal text-accent before:text-line before:content-['##_']">
              {t.id}
            </h2>
            {t.items.map((x) => (
              <article
                key={x.slug}
                id={`/${t.id}/${x.slug}`}
                className="scroll-mt-4 border-b border-dashed border-line py-6 target:bg-[color-mix(in_srgb,var(--accent)_10%,transparent)] target:outline-8 target:outline-[color-mix(in_srgb,var(--accent)_10%,transparent)]"
              >
                {x.body}
              </article>
            ))}
          </section>
        ))}
      </main>

      <footer className="mx-auto max-w-[96ch] px-4 pt-8 pb-12 text-muted">
        <p>
          © 2026 Ahmed Abu Qahf · <a href="./">tui view</a>
        </p>
      </footer>
    </>
  )
}
