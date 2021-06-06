export class Token {
  private static instance: Token;
  tokenKey: string = "botiga-customer-support-token";
  authToken: string | null = null;
  constructor() {
    if (!!Token.instance) {
      return Token.instance;
    }
    Token.instance = this;
    return this;
  }

  initAuthenticationToken(): void {
    const tokenValue: string | null = localStorage.getItem(this.tokenKey);
    this.authToken = tokenValue;
  }

  getAuthenticationToken(): string | null {
    return this.authToken;
  }

  async setAuthenticationToken(value: string): Promise<void> {
    localStorage.setItem(this.tokenKey, value);
    this.authToken = value;
  }
}
