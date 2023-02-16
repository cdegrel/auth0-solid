import { useAuth0 } from 'auth0-solid'
import { Match, Switch } from 'solid-js'

export default () => {
  const { state: auth, loginWithRedirect, logout } = useAuth0()

  return (
    <Switch
      fallback={
        <div>
          <button onClick={() => loginWithRedirect()}>Login</button>
        </div>
      }
    >
      <Match when={auth.isLoading}>Loading...</Match>
      <Match when={auth.isAuthenticated}>
        <div>
          <h1>Hello {auth.user?.name}</h1>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </Match>
    </Switch>
  )
}
