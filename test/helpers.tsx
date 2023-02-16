import { JSX } from 'solid-js'
import Auth0Provider, { Auth0ProviderProps } from '../src/auth0-provider'

export const createAuth0Wrapper =
  ({
    clientId = '__test_client_id_',
    domain = '__test_domain__',
    ...opts
  }: Partial<Auth0ProviderProps> = {}) =>
  (props: { children: JSX.Element }): JSX.Element =>
    (
      <Auth0Provider clientId={clientId} domain={domain} {...opts}>
        {props.children}
      </Auth0Provider>
    )
