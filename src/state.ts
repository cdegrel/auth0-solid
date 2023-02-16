import { User } from '@auth0/auth0-spa-js'

export type Auth0State = {
  isLoading: boolean
  isAuthenticated: boolean
  user?: User
  error?: Error
}

export const initialAuth0State: Auth0State = {
  isLoading: true,
  isAuthenticated: false,
}
