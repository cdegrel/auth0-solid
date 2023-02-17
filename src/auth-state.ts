import { User } from '@auth0/auth0-spa-js'

export type AuthState = {
  isLoading: boolean
  isAuthenticated: boolean
  user?: User
  error?: Error
}

export const initialAuthState: AuthState = {
  isLoading: true,
  isAuthenticated: false,
}
