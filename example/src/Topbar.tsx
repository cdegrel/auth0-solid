import { A } from '@solidjs/router'
import { useAuth0 } from 'auth0-solid'
import { Show } from 'solid-js'

export const Topbar = () => {
  const { state: auth, loginWithRedirect, logout } = useAuth0()

  return (
    <header>
      <div>
        <span>auth0-solid</span>
        <div>
          <A href="/">Home</A>
          <A href="/users">Users</A>
        </div>
      </div>
      <div>
        <Show
          when={auth.isAuthenticated}
          fallback={() => (
            <button onClick={() => loginWithRedirect()}>Login</button>
          )}
        >
          <span>{auth.user?.name}</span>
          <button
            onClick={() =>
              logout({
                logoutParams: {
                  returnTo: window.location.origin,
                },
              })
            }
          >
            Logout
          </button>
        </Show>
      </div>
    </header>
  )
}
