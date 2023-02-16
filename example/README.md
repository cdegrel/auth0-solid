# Solid App example

This is an example of using `auth0-solid` with Solid App

Add the file `./exemple/.env` with the `domain` and `clientId` of the application and `audience` (your API identifier)

```dotenv
VITE_APP_DOMAIN=your_domain
VITE_APP_CLIENT_ID=your_client_id
VITE_APP_AUDIENCE=your_audience
```

Run `pnpm dev` to start the application at http://localhost:3000