import {
  Auth0Client,
  Auth0ClientOptions,
  GetTokenSilentlyOptions,
  GetTokenWithPopupOptions,
  IdToken,
  LogoutOptions,
  PopupConfigOptions,
  PopupLoginOptions,
  RedirectLoginOptions,
  User,
} from '@auth0/auth0-spa-js'
import { JSX, createEffect, mergeProps, splitProps } from 'solid-js'

import Auth0Context from './auth0-context'
import { createAuth0Store } from './store'
import { hasAuthParams, loginError, tokenError } from './utils'
import pkg from '../package.json'

export type AppState = {
  returnTo?: string
  [key: string]: any
}

export type Auth0ProviderProps = Auth0ClientOptions & {
  children?: JSX.Element
  skipRedirectCallback?: boolean
  onRedirectCallback?: (appState?: AppState, user?: User) => void
}

const toAuth0ClientOptions = (
  opts: Auth0ProviderProps,
): Auth0ClientOptions => ({
  ...opts,
  auth0Client: {
    name: pkg.name,
    version: pkg.version,
  },
})

const defaultOnRedirectCallback = (appState?: AppState): void => {
  window.history.replaceState(
    {},
    document.title,
    appState?.returnTo || window.location.pathname,
  )
}

export default (props: Auth0ProviderProps): JSX.Element => {
  const merged = mergeProps(
    {
      onRedirectCallback: defaultOnRedirectCallback,
    },
    props,
  )
  const [local, clientOpts] = splitProps(merged, [
    'children',
    'skipRedirectCallback',
    'onRedirectCallback',
  ])

  const [state, dispatch] = createAuth0Store()

  const client = new Auth0Client(toAuth0ClientOptions(clientOpts))

  createEffect(async () => {
    try {
      if (hasAuthParams() && !local.skipRedirectCallback) {
        const { appState } = await client.handleRedirectCallback()
        local.onRedirectCallback(appState)
      }
      dispatch({ type: 'INITIALIZED', user: await client.getUser() })
    } catch (err) {
      dispatch({ type: 'ERROR', error: loginError(err as Error) })
    }
  })

  const loginWithRedirect = async (
    opts?: RedirectLoginOptions,
  ): Promise<void> => {
    await client.loginWithRedirect(opts)
  }

  const loginWithPopup = async (
    opts?: PopupLoginOptions,
    config?: PopupConfigOptions,
  ): Promise<void> => {
    dispatch({ type: 'LOGIN_POPUP_STARTED' })
    try {
      await client.loginWithPopup(opts, config)
    } catch (error) {
      return dispatch({ type: 'ERROR', error: loginError(error as Error) })
    }
    dispatch({ type: 'LOGIN_POPUP_COMPLETE', user: await client.getUser() })
  }

  const logout = async (opts: LogoutOptions = {}): Promise<void> => {
    await client.logout(opts)
    if (opts.openUrl || opts.openUrl === false) {
      dispatch({ type: 'LOGOUT' })
    }
  }

  const getAccessToken = async (
    getToken: () => Promise<string | undefined>,
  ): Promise<string | undefined> => {
    let token
    try {
      token = await getToken()
    } catch (error) {
      throw tokenError(error as Error)
    } finally {
      dispatch({
        type: 'GET_ACCESS_TOKEN_COMPLETE',
        user: await client.getUser(),
      })
    }
    return token
  }

  const getAccessTokenSilently = async (
    opts?: GetTokenSilentlyOptions,
  ): Promise<any> => getAccessToken(() => client.getTokenSilently(opts))

  const getAccessTokenWithPopup = async (
    opts?: GetTokenWithPopupOptions,
    config?: PopupConfigOptions,
  ): Promise<string | undefined> =>
    getAccessToken(() => client.getTokenWithPopup(opts, config))

  const getIdTokenClaims = async (): Promise<IdToken | undefined> =>
    await client.getIdTokenClaims()

  return (
    <Auth0Context.Provider
      value={{
        state,
        loginWithRedirect,
        loginWithPopup,
        logout,
        getAccessTokenSilently,
        getAccessTokenWithPopup,
        getIdTokenClaims,
      }}
    >
      {local.children}
    </Auth0Context.Provider>
  )
}
