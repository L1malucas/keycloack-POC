import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { environment } from '../../../environments/environment';
import { UserProfile } from '../models/user.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private keycloak: Keycloak;
  private userProfileSubject = new BehaviorSubject<UserProfile | null>(null);
  public userProfile$: Observable<UserProfile | null> = this.userProfileSubject.asObservable();

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$: Observable<boolean> = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.keycloak = new Keycloak({
      url: environment.keycloak.url,
      realm: environment.keycloak.realm,
      clientId: environment.keycloak.clientId
    });
  }

  async init(): Promise<boolean> {
    try {
      const authenticated = await this.keycloak.init({
        onLoad: 'check-sso',
        checkLoginIframe: false,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
        pkceMethod: 'S256'
      });

      this.isAuthenticatedSubject.next(authenticated);

      if (authenticated) {
        await this.loadUserProfile();
        this.startTokenRefresh();
      }

      return authenticated;
    } catch (error) {
      console.error('Failed to initialize Keycloak', error);
      return false;
    }
  }

  async login(): Promise<void> {
    await this.keycloak.login({
      redirectUri: window.location.origin
    });
  }

  async loginWithGoogle(): Promise<void> {
    await this.keycloak.login({
      redirectUri: window.location.origin,
      idpHint: 'google'
    });
  }

  async logout(): Promise<void> {
    await this.keycloak.logout({
      redirectUri: window.location.origin
    });
    this.userProfileSubject.next(null);
    this.isAuthenticatedSubject.next(false);
  }

  async loadUserProfile(): Promise<void> {
    try {
      const profile = await this.keycloak.loadUserProfile();
      const tokenParsed = this.keycloak.tokenParsed;

      const userProfile: UserProfile = {
        id: profile.id,
        username: profile.username,
        email: profile.email,
        firstName: profile.firstName,
        lastName: profile.lastName,
        emailVerified: profile.emailVerified,
        attributes: profile.attributes,
        realmRoles: tokenParsed?.realm_access?.roles || [],
        clientRoles: tokenParsed?.resource_access || {}
      };

      this.userProfileSubject.next(userProfile);
    } catch (error) {
      console.error('Failed to load user profile', error);
    }
  }

  getToken(): string | undefined {
    return this.keycloak.token;
  }

  getRefreshToken(): string | undefined {
    return this.keycloak.refreshToken;
  }

  isLoggedIn(): boolean {
    return this.keycloak.authenticated || false;
  }

  hasRole(role: string): boolean {
    return this.keycloak.hasRealmRole(role);
  }

  hasClientRole(clientId: string, role: string): boolean {
    return this.keycloak.hasResourceRole(role, clientId);
  }

  getUserProfile(): UserProfile | null {
    return this.userProfileSubject.value;
  }

  async updateToken(minValidity: number = 30): Promise<boolean> {
    try {
      return await this.keycloak.updateToken(minValidity);
    } catch (error) {
      console.error('Failed to refresh token', error);
      return false;
    }
  }

  private startTokenRefresh(): void {
    setInterval(async () => {
      try {
        const refreshed = await this.keycloak.updateToken(70);
        if (refreshed) {
          console.log('Token refreshed');
        }
      } catch (error) {
        console.error('Failed to refresh token', error);
        await this.logout();
      }
    }, 60000);
  }

  getKeycloakInstance(): Keycloak {
    return this.keycloak;
  }
}
