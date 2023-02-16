/* @refresh reload */
import { Auth0Provider } from 'auth0-solid'
import { render } from 'solid-js/web'

import './index.css'
import App from './App'

const root = document.getElementById('root')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  )
}

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
  root!,
)
