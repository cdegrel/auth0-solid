import {
  Auth0Client,
  Auth0ClientOptions,
  LogoutOptions,
  RedirectLoginOptions,
  User,
} from '@auth0/auth0-spa-js'
import { JSX, createEffect, mergeProps, splitProps } from 'solid-js'

import Auth0Context from './auth0-context'
import { createAuth0Store } from './store'
import { hasAuthParams, loginError } from './utils'

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

  const logout = async (opts: LogoutOptions = {}): Promise<void> => {
    await client.logout(opts)
    if (opts.openUrl || opts.openUrl === false) {
      dispatch({ type: 'LOGOUT' })
    }
  }

  return (
    <Auth0Context.Provider
      value={{
        state,
        loginWithRedirect,
        logout,
      }}
    >
      {local.children}
    </Auth0Context.Provider>
  )
}
