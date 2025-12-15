import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  register(): void {
    const keycloakUrl = environment.keycloak.url;
    const realm = environment.keycloak.realm;
    const clientId = environment.keycloak.clientId;
    const redirectUri = encodeURIComponent(window.location.origin + '/login');

    // Redireciona para a página de registro do Keycloak
    window.location.href = `${keycloakUrl}/realms/${realm}/protocol/openid-connect/registrations?client_id=${clientId}&response_type=code&scope=openid&redirect_uri=${redirectUri}`;
  }
}
