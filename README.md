# auth0-solid

Auth0 SDK for Solid Application.

## Table of Contents

- [auth0-solid](#auth0-solid)
  - [Table of Contents](#table-of-contents)
  - [Installation](#installation)
  - [Getting Started](#getting-started)
  - [License](#license)

## Installation

```bash
pnpm install auth0-solid
```

## Getting Started

```tsx
// src/index.tsx
import { Auth0Provider } from 'auth0-solid'
import { render } from 'solid-js/web'

import App from './App'

render(
  () => (
    <Auth0Provider
      clientId={import.meta.env.VITE_APP_CLIENT_ID}
      domain={import.meta.env.VITE_APP_DOMAIN}
      authorizationParams={{
        audience: import.meta.env.VITE_APP_AUDIENCE,
        scope: 'profile email',
        redirect_uri: window.location.origin,
      }}
    >
      <App />
    </Auth0Provider>
  ),
  document.getElementById('root'),
)
```


```tsx
// src/App.tsx
import { useAuth0 } from 'auth0-solid'
import { createSignal, Match, Switch } from 'solid-js'

const App = () => {
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

export default App
```
## License

This project is licensed under the MIT license. See the [LICENSE](https://github.com/cdegrel/auth0-solid/blob/main/LICENSE) file for more info.