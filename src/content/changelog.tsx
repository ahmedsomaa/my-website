/* The changelog page, rendered from CHANGELOG.md (the one source of truth). */
import { Fragment } from 'react'
import type { ReactNode } from 'react'
import md from '../../CHANGELOG.md?raw'
import { H, P, Sec, Ul } from '#/components/content'

/** `code` spans -> <code>; everything else stays text. */
function inline(s: string): ReactNode {
  return s.split(/(`[^`]+`)/).map((part, i) =>
    part.startsWith('`') && part.endsWith('`') ? (
      <code key={i} className="rounded-[2px] bg-surface px-1 text-fg">
        {part.slice(1, -1)}
      </code>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  )
}

/** Small Markdown subset used by CHANGELOG.md: #, ##, ###, "- " lists and paragraphs. */
export function Changelog() {
  const out: Array<ReactNode> = []
  let list: Array<ReactNode> = []
  const flush = () => {
    if (list.length) out.push(<Ul key={`ul${out.length}`} items={list} />)
    list = []
  }
  for (const raw of md.split('\n')) {
    const line = raw.trimEnd()
    if (line.startsWith('- ')) {
      list.push(inline(line.slice(2)))
      continue
    }
    flush()
    if (!line) continue
    if (line.startsWith('### '))
      out.push(
        <p
          key={out.length}
          className="mt-3 text-sm text-muted uppercase tracking-[.06em]"
        >
          {line.slice(4)}
        </p>,
      )
    else if (line.startsWith('## '))
      out.push(<Sec key={out.length}>{inline(line.slice(3))}</Sec>)
    else if (line.startsWith('# '))
      out.push(<H key={out.length}>{line.slice(2)}</H>)
    else out.push(<P key={out.length}>{inline(line)}</P>)
  }
  flush()
  return <>{out}</>
}
