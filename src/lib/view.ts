import { createContext } from 'react'

export type View = 'tui' | 'plain'

/** Content renders a little differently in the plain page and the workspace. */
export const ViewContext = createContext<View>('tui')

/** Current theme id, so dithered images repaint when it changes. */
export const ThemeContext = createContext<string>('')

export const CV = '/docs/Ahmed_Abu_Qahf___cv_latest.pdf'
export const EMAIL = 'abokahfa@gmail.com'
