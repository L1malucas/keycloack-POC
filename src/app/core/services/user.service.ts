import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { KeycloakUser, UserRole } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = `${environment.keycloak.url}/admin/realms/${environment.keycloak.realm}`;

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

  getUsers(): Observable<KeycloakUser[]> {
    return this.http.get<KeycloakUser[]>(
      `${this.baseUrl}/users`,
      { headers: this.getHeaders() }
    );
  }

  getUserById(userId: string): Observable<KeycloakUser> {
    return this.http.get<KeycloakUser>(
      `${this.baseUrl}/users/${userId}`,
      { headers: this.getHeaders() }
    );
  }

  getUserRoles(userId: string): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(
      `${this.baseUrl}/users/${userId}/role-mappings/realm`,
      { headers: this.getHeaders() }
    );
  }

  getAvailableRoles(): Observable<UserRole[]> {
    return this.http.get<UserRole[]>(
      `${this.baseUrl}/roles`,
      { headers: this.getHeaders() }
    );
  }

  assignRolesToUser(userId: string, roles: UserRole[]): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/users/${userId}/role-mappings/realm`,
      roles,
      { headers: this.getHeaders() }
    );
  }

  removeRolesFromUser(userId: string, roles: UserRole[]): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/users/${userId}/role-mappings/realm`,
      {
        headers: this.getHeaders(),
        body: roles
      }
    );
  }

  updateUser(userId: string, user: Partial<KeycloakUser>): Observable<void> {
    return this.http.put<void>(
      `${this.baseUrl}/users/${userId}`,
      user,
      { headers: this.getHeaders() }
    );
  }

  createUser(user: Partial<KeycloakUser>): Observable<void> {
    return this.http.post<void>(
      `${this.baseUrl}/users`,
      user,
      { headers: this.getHeaders() }
    );
  }

  deleteUser(userId: string): Observable<void> {
    return this.http.delete<void>(
      `${this.baseUrl}/users/${userId}`,
      { headers: this.getHeaders() }
    );
  }
}
