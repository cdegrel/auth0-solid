import { renderHook } from '@solidjs/testing-library'
import { useAuth0 } from '../src'
import { describe, expect, it } from 'vitest'
import { createAuth0Wrapper } from './helpers'

describe('useAuth0', () => {
  it('should provide the auth0 context', () => {
    const wrapper = createAuth0Wrapper()
    const { owner } = renderHook(useAuth0, { wrapper })
    expect(owner?.context).toBeDefined()
  })
})
