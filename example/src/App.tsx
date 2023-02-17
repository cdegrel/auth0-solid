import { RouteDefinition, useRoutes } from '@solidjs/router'
import { useAuth0, withAuthRequired } from 'auth0-solid'
import { Match, Switch } from 'solid-js'

import { Topbar } from './Topbar'
import Users from './Users'

const routes: RouteDefinition[] = [
  {
    path: '/',
  },
  {
    path: '/users',
    component: withAuthRequired(Users),
  },
]

export default () => {
  const { state: auth } = useAuth0()

  const Routes = useRoutes(routes)

  return (
    <div>
      <Topbar />
      <main>
        <Switch fallback="Loading...">
          <Match when={auth.error}>Oops... {auth.error?.message}</Match>
          <Match when={!auth.isLoading}>
            <Routes />
          </Match>
        </Switch>
      </main>
    </div>
  )
}
