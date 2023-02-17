import {
  GetTokenSilentlyOptions,
  GetTokenSilentlyVerboseResponse,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupConfigOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
  RedirectLoginResult,
} from '@auth0/auth0-spa-js'
import { createContext } from 'solid-js'

import { AppState } from './auth0-provider'
import { AuthState, initialAuthState } from './auth-state'

export type Auth0ContextValue = {
  state: AuthState
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
  handleRedirectCallback: (
    url?: string,
  ) => Promise<RedirectLoginResult | undefined>
}

const stub = (): never => {
  throw new Error('You forgot to wrap your component in <Auth0Provider>.')
}

export default createContext<Auth0ContextValue>({
  state: initialAuthState,
  loginWithRedirect: stub,
  loginWithPopup: stub,
  logout: stub,
  getAccessTokenSilently: stub,
  getAccessTokenWithPopup: stub,
  getIdTokenClaims: stub,
  handleRedirectCallback: stub,
})
