import { createMiddleware, createStart } from '@tanstack/react-start'

/**
 * Baseline security headers on every document and API response.
 * No CSP on purpose: hydration and Framer Motion rely on inline scripts/styles,
 * so a safe policy needs nonces. Add that as a follow-up rather than ship `unsafe-inline`.
 */
const securityHeaders = createMiddleware().server(async ({ next }) => {
  const result = await next()
  const headers = result.response.headers
  headers.set('X-Content-Type-Options', 'nosniff')
  headers.set('X-Frame-Options', 'DENY')
  headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=(), interest-cohort=()',
  )
  headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains',
  )
  // Theme/mode come from a cookie, so any cache must key on it.
  headers.append('Vary', 'Cookie')
  return result
})

export const startInstance = createStart(() => ({
  requestMiddleware: [securityHeaders],
}))
