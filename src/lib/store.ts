/** localStorage that never throws (private windows, blocked storage). */
export const store = {
  get(k: string): string | null {
    try {
      return localStorage.getItem(k)
    } catch {
      return null
    }
  },
  set(k: string, v: string) {
    try {
      localStorage.setItem(k, v)
    } catch {
      /* not saved */
    }
  },
  del(k: string) {
    try {
      localStorage.removeItem(k)
    } catch {
      /* nothing saved */
    }
  },
}
