import { OAuthError } from './errors'

export const hasAuthParams = (
  searchParams = window.location.search,
): boolean => {
  const params = new URLSearchParams(searchParams)
  return params.has('code') || (params.has('error') && params.has('state'))
}

const normalizeErrorFn =
  (fallback: string) =>
  (
    error: Error | { error: string; description: string } | ProgressEvent,
  ): Error => {
    if ('error' in error) {
      return new OAuthError(error.error, error.description)
    }
    if (error instanceof Error) {
      return error
    }
    return new Error(fallback)
  }

export const loginError = normalizeErrorFn('Login failed')
