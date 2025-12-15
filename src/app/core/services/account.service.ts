import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface AccountProfile {
  id?: string;
  username?: string;
  email?: string;
  firstName?: string;
  lastName?: string;
  emailVerified?: boolean;
  attributes?: {
    phone?: string[];
    cpf?: string[];
    birthDate?: string[];
    street?: string[];
    number?: string[];
    city?: string[];
    state?: string[];
    zipCode?: string[];
    profileCompleted?: string[];
  };
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private userinfoUrl = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/protocol/openid-connect/userinfo`;
  private adminUrl = `${environment.keycloak.url}/admin/realms/${environment.keycloak.realm}/users`;

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  /**
   * Obtém o perfil do usuário logado via UserInfo endpoint (OpenID Connect)
   */
  getProfile(): Observable<AccountProfile> {
    return this.http.get<AccountProfile>(this.userinfoUrl, {
      headers: this.getHeaders()
    });
  }

  /**
   * Redireciona para o Keycloak Account Console onde o usuário pode atualizar seu perfil
   */
  redirectToAccountConsole(): void {
    const accountConsoleUrl = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/account`;
    window.location.href = accountConsoleUrl;
  }

  /**
   * Atualiza o perfil completo do usuário usando a Account REST API v1
   * Esta API permite que usuários atualizem seus próprios dados
   */
  updateProfile(profile: Partial<AccountProfile>): Observable<any> {
    const accountApiUrl = `${environment.keycloak.url}/realms/${environment.keycloak.realm}/account`;

    return this.http.post<any>(accountApiUrl, profile, {
      headers: this.getHeaders()
    });
  }

  /**
   * Atualiza atributos customizados do usuário
   * Usa a Admin API do Keycloak (usuário precisa ter permissão manage-users)
   */
  updateAttributes(attributes: Record<string, string[]>): Observable<void> {
    const userId = this.authService.getUserProfile()?.sub;
    const currentProfile = this.authService.getUserProfile();

    if (!userId || !currentProfile) {
      throw new Error('User profile not loaded');
    }

    const adminApiUrl = `${environment.keycloak.url}/admin/realms/${environment.keycloak.realm}/users/${userId}`;

    const payload = {
      firstName: currentProfile.given_name,
      lastName: currentProfile.family_name,
      email: currentProfile.email,
      attributes: {
        ...currentProfile.attributes,
        ...attributes
      }
    };

    console.log('📤 Atualizando usuário via Admin API:', adminApiUrl);

    return this.http.put<void>(adminApiUrl, payload, {
      headers: this.getHeaders()
    });
  }

  /**
   * Marca o perfil como completo
   */
  markProfileAsComplete(): Observable<void> {
    return this.updateAttributes({ profileCompleted: ['true'] });
  }

  /**
   * Verifica se o perfil está completo
   */
  isProfileComplete(): boolean {
    const userProfile = this.authService.getUserProfile();
    const profileCompleted = userProfile?.attributes?.['profileCompleted'];
    return Array.isArray(profileCompleted)
      ? profileCompleted[0] === 'true'
      : profileCompleted === 'true';
  }
}
