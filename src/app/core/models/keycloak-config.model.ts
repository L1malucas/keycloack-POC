export interface KeycloakConfig {
  url: string;
  realm: string;
  clientId: string;
}

export interface KeycloakInitOptions {
  onLoad?: 'login-required' | 'check-sso';
  checkLoginIframe?: boolean;
  checkLoginIframeInterval?: number;
  responseMode?: 'fragment' | 'query';
  redirectUri?: string;
  silentCheckSsoRedirectUri?: string;
  pkceMethod?: 'S256';
}
