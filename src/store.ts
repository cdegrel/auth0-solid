import { User } from '@auth0/auth0-spa-js'
import { createStore, produce } from 'solid-js/store'

import { Auth0State, initialAuth0State } from './state'

type Auth0Action =
  | {
      type: 'INITIALIZED' | 'GET_ACCESS_TOKEN_COMPLETE'
      user?: User
    }
  | { type: 'LOGOUT' }
  | { type: 'ERROR'; error: Error }

export const createAuth0Store = (): [
  Auth0State,
  (action: Auth0Action) => void,
] => {
  const [state, setState] = createStore(initialAuth0State)

  const dispatch = (action: Auth0Action) => {
    switch (action.type) {
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
