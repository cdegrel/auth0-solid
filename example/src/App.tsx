import { useAuth0 } from 'auth0-solid'
import { createSignal, Match, Switch } from 'solid-js'

export default () => {
  const {
    state: auth,
    loginWithRedirect,
    logout,
    getAccessTokenSilently,
  } = useAuth0()

  const [token, setToken] = createSignal('')

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
          <pre>{token()}</pre>
          <button
            onClick={async () => setToken(await getAccessTokenSilently())}
          >
            Get access token
          </button>
          <button onClick={() => logout()}>Logout</button>
        </div>
      </Match>
    </Switch>
  )
}
