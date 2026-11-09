import { Component, StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import type { ReactNode } from 'react'
import { Plain } from '#/components/Plain'
import { Tui } from '#/components/Tui'
import { ViewContext } from '#/lib/view'
import type { View } from '#/lib/view'
import './styles.css'

/** If the workspace breaks, fall back to the plain page instead of a blank screen. */
class Fallback extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  componentDidCatch(err: unknown) {
    console.error(err)
    document.documentElement.className = 'plain'
  }
  render() {
    return this.state.failed ? (
      <ViewContext value="plain">
        <Plain />
      </ViewContext>
    ) : (
      this.props.children
    )
  }
}

// the boot script in index.html picks the view before first paint
const view: View = document.documentElement.classList.contains('plain')
  ? 'plain'
  : 'tui'
const root = document.getElementById('root')
if (!root) throw new Error('missing #root')

createRoot(root).render(
  <StrictMode>
    <ViewContext value={view}>
      {view === 'plain' ? (
        <Plain />
      ) : (
        <Fallback>
          <Tui />
        </Fallback>
      )}
    </ViewContext>
  </StrictMode>,
)
