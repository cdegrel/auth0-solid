import { Auth0ClientOptions, createAuth0Client } from '@auth0/auth0-spa-js'
import { JSX, splitProps } from 'solid-js'

import Auth0Context from './auth0-context'

export type Auth0ProviderProps = Auth0ClientOptions & {
  children?: JSX.Element
  skipRedirectCallback?: boolean
}

const toAuth0ClientOptions = (
  opts: Auth0ProviderProps,
): Auth0ClientOptions => ({
  ...opts,
})

export default (props: Auth0ProviderProps): JSX.Element => {
  const [local, clientOpts] = splitProps(props, [
    'children',
    'skipRedirectCallback',
  ])

  const client = createAuth0Client(toAuth0ClientOptions(clientOpts))

  return (
    <Auth0Context.Provider value={client}>
      {local.children}
    </Auth0Context.Provider>
  )
}
