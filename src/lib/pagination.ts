import { z } from 'zod'

/** Shared `?page=` search schema for paginated list routes. */
export const pageSearchSchema = z.object({
  page: z.number().int().min(1).catch(1).optional(),
})

export type PageSearch = z.infer<typeof pageSearchSchema>

export function paginate<T>(
  items: readonly T[],
  page: number,
  pageSize: number,
) {
  const totalPages = Math.max(1, Math.ceil(items.length / pageSize))
  const current = Math.min(Math.max(1, page), totalPages)
  const start = (current - 1) * pageSize
  return {
    items: items.slice(start, start + pageSize),
    page: current,
    totalPages,
    offset: start,
  }
}
