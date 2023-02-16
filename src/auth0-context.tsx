import { LogoutOptions, RedirectLoginOptions } from '@auth0/auth0-spa-js'
import { createContext } from 'solid-js'

import { AppState } from './auth0-provider'
import { Auth0State, initialAuth0State } from './state'

export type Auth0ContextValue = {
  state: Auth0State
  loginWithRedirect: (options?: RedirectLoginOptions<AppState>) => Promise<void>
  logout: (opts?: LogoutOptions) => void
}

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <Auth0Provider>.')
}

export default createContext<Auth0ContextValue>({
  state: initialAuth0State,
  loginWithRedirect: stub,
  logout: stub,
})
