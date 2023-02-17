import { User } from '@auth0/auth0-spa-js'
import { createStore, produce } from 'solid-js/store'

import { AuthState, initialAuthState } from './auth-state'

type AuthAction =
  | { type: 'LOGIN_POPUP_STARTED' }
  | {
      type:
        | 'INITIALIZED'
        | 'GET_ACCESS_TOKEN_COMPLETE'
        | 'LOGIN_POPUP_COMPLETE'
        | 'HANDLE_REDIRECT_COMPLETE'
      user?: User
    }
  | { type: 'LOGOUT' }
  | { type: 'ERROR'; error: Error }

export const createAuthStore = (): [
  AuthState,
  (action: AuthAction) => void,
] => {
  const [state, setState] = createStore(initialAuthState)

  const dispatch = (action: AuthAction) => {
    switch (action.type) {
      case 'LOGIN_POPUP_STARTED':
        setState(
          produce((store) => {
            store.isLoading = true
          }),
        )
        break
      case 'LOGIN_POPUP_COMPLETE':
      case 'INITIALIZED':
        setState(
          produce((store) => {
            store.isAuthenticated = !!action.user
            store.user = action.user
            store.isLoading = false
            store.error = undefined
          }),
        )
        break
      case 'HANDLE_REDIRECT_COMPLETE':
      case 'GET_ACCESS_TOKEN_COMPLETE':
        if (state.user === action.user) return
        setState(
          produce((store) => {
            store.isAuthenticated = !!action.user
            store.user = action.user
          }),
        )
        break
      case 'LOGOUT':
        setState(
          produce((store) => {
            store.isAuthenticated = false
            store.user = undefined
          }),
        )
        break
      case 'ERROR':
        setState(
          produce((store) => {
            store.isLoading = false
            store.error = action.error
          }),
        )
        break
    }
  }

  return [state, dispatch]
}
