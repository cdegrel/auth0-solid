import { useContext } from 'solid-js'
import Auth0Context, { Auth0ContextValue } from './auth0-context'

export default (): Auth0ContextValue =>
  useContext(Auth0Context) as Auth0ContextValue
