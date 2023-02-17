import { RedirectLoginOptions } from '@auth0/auth0-spa-js'
import { Component, createEffect, JSX, Show } from 'solid-js'
import useAuth0 from './use-auth0'

type WithAuthRequiredOptions = {
  returnTo?: string | (() => string)
  loginOptions?: RedirectLoginOptions
  onRedirecting?: () => JSX.Element
}

const defaultOptions: WithAuthRequiredOptions = {
  returnTo: `${window.location.pathname}${window.location.search}`,
  onRedirecting: () => <></>,
}

export default <P extends Object>(
    WrappedComponent: Component<P>,
    options: WithAuthRequiredOptions = defaultOptions,
  ): Component<P> =>
  (props: P): JSX.Element => {
    const { returnTo, loginOptions, onRedirecting } = options

    const { state: auth, loginWithRedirect } = useAuth0()

    createEffect(async () => {
      if (auth.isLoading || auth.isAuthenticated) return
      await loginWithRedirect({
        appState: {
          ...loginOptions?.appState,
          returnTo: typeof returnTo === 'function' ? returnTo() : returnTo,
        },
      })
    })

    return (
      <Show when={auth.isAuthenticated} fallback={onRedirecting}>
        <WrappedComponent {...props} />
      </Show>
    )
  }
