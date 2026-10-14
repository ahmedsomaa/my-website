import { Link } from '@tanstack/react-router'
import { useMode } from '@/context/mode-context'
import { Code2, Sparkles, Sun, Moon } from 'lucide-react'

const links = [
  { to: '/', label: '00 / index' },
  { to: '/about', label: '01 / about' },
  { to: '/work', label: '02 / work' },
] as const

const NAV_LINK_CLASS = 'relative transition-colors hover:text-foreground'

export default function SiteHeader() {
  const { mode, toggle, theme, toggleTheme } = useMode()
  return (
    <header className="sticky top-0 z-30 border-b hairline bg-background/80 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-10 h-14 flex items-center justify-between">
        <Link
          to="/"
          className="font-display text-sm md:text-base tracking-wider lowercase inline-flex items-center gap-2"
        >
          <span className="h-1.5 w-1.5 bg-accent-page" />
          som3aware
        </Link>
        <nav className="hidden md:flex items-center gap-8 text-xs uppercase tracking-[0.2em] font-mono-pair">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === '/' }}
              className={NAV_LINK_CLASS}
              activeProps={{ className: 'text-foreground' }}
              inactiveProps={{ className: 'text-muted-foreground' }}
            >
              {({ isActive }) => (
                <span className="inline-flex items-center gap-2">
                  {isActive && <span className="h-1 w-1 bg-foreground" />}
                  {l.label}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="inline-flex items-center justify-center border hairline h-8 w-8 hover:bg-foreground hover:text-background transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? (
              <Moon className="h-3.5 w-3.5" strokeWidth={1.25} />
            ) : (
              <Sun className="h-3.5 w-3.5" strokeWidth={1.25} />
            )}
          </button>
          <button
            onClick={toggle}
            className="group inline-flex items-center gap-2 border hairline px-3 h-8 text-xs md:text-xs uppercase tracking-[0.2em] font-mono-pair hover:bg-foreground hover:text-background transition-colors"
            aria-pressed={mode === 'raw'}
            title="Show the underlying grid"
          >
            {mode === 'polished' ? (
              <>
                <Code2 className="h-3.5 w-3.5" strokeWidth={1.25} />
                <span className="sr-only sm:not-sr-only">grid: off</span>
              </>
            ) : (
              <>
                <Sparkles className="h-3.5 w-3.5" strokeWidth={1.25} />
                <span className="sr-only sm:not-sr-only">grid: on</span>
              </>
            )}
          </button>
        </div>
      </div>
      <nav className="md:hidden border-t hairline">
        <div className="px-4 sm:px-6 py-2 flex items-center gap-4 overflow-x-auto whitespace-nowrap text-xs uppercase tracking-[0.2em] font-mono-pair">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: l.to === '/' }}
              className={NAV_LINK_CLASS}
              activeProps={{ className: 'text-foreground' }}
              inactiveProps={{ className: 'text-muted-foreground' }}
            >
              {({ isActive }) => (
                <span className="inline-flex items-center gap-2 py-1">
                  {isActive && <span className="h-1 w-1 bg-foreground" />}
                  {l.label}
                </span>
              )}
            </Link>
          ))}
        </div>
      </nav>
    </header>
  )
}
