export class OAuthError extends Error {
  constructor(error: string, description?: string) {
    super(description || error)
    Object.setPrototypeOf(this, OAuthError.prototype)
  }
}
