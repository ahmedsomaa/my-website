import { Link, useRouter } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

export function ErrorView({ error, reset }: ErrorComponentProps) {
  const router = useRouter()

  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col justify-center px-6 md:px-10">
      <p className="mb-4 font-mono-pair text-xs uppercase tracking-[0.3em] text-muted-foreground">
        error — something broke
      </p>
      <h1 className="font-display text-3xl md:text-5xl leading-tight">
        that did not load.
      </h1>
      {import.meta.env.DEV ? (
        <pre className="mt-6 overflow-x-auto border hairline p-3 text-xs">
          {error instanceof Error ? error.message : String(error)}
        </pre>
      ) : null}
      <div className="mt-8 flex flex-wrap gap-3 font-mono-pair text-xs uppercase tracking-[0.2em]">
        <button
          type="button"
          onClick={() => {
            reset()
            void router.invalidate()
          }}
          className="border hairline px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
        >
          try again
        </button>
        <Link
          to="/"
          className="border hairline px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
        >
          back to index
        </Link>
      </div>
    </div>
  )
}
