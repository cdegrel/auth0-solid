import {
  GetTokenSilentlyOptions,
  GetTokenSilentlyVerboseResponse,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupConfigOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
} from '@auth0/auth0-spa-js'
import { createContext } from 'solid-js'

import { AppState } from './auth0-provider'
import { Auth0State, initialAuth0State } from './state'

export type Auth0ContextValue = {
  state: Auth0State
  loginWithRedirect: (options?: RedirectLoginOptions<AppState>) => Promise<void>
  loginWithPopup: (
    options?: PopupLoginOptions,
    config?: PopupConfigOptions,
  ) => Promise<void>
  logout: (opts?: LogoutOptions) => void
  getAccessTokenSilently: {
    (
      options: GetTokenSilentlyOptions & { detailedResponse: true },
    ): Promise<GetTokenSilentlyVerboseResponse>
    (options?: GetTokenSilentlyOptions): Promise<string>
    (options: GetTokenSilentlyOptions): Promise<
      GetTokenSilentlyVerboseResponse | string
    >
  }
  getAccessTokenWithPopup: (
    options?: GetTokenWithPopupOptions,
    config?: PopupConfigOptions,
  ) => Promise<string | undefined>
  getIdTokenClaims: () => Promise<IdToken | undefined>
}

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <Auth0Provider>.')
}

export default createContext<Auth0ContextValue>({
  state: initialAuth0State,
  loginWithRedirect: stub,
  loginWithPopup: stub,
  logout: stub,
  getAccessTokenSilently: stub,
  getAccessTokenWithPopup: stub,
  getIdTokenClaims: stub,
})
