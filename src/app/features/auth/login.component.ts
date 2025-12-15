import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { MermaidDiagramComponent } from '../../core/components/mermaid-diagram.component';
import { FlowExplanationComponent } from '../../core/components/flow-explanation.component';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, MermaidDiagramComponent, FlowExplanationComponent],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  loginFlowDiagram = `
sequenceDiagram
    actor Usuario
    participant Angular
    participant Keycloak

    Usuario->>Angular: Clica Login
    Angular->>Keycloak: Redireciona
    Usuario->>Keycloak: Insere credenciais
    Keycloak->>Keycloak: Valida
    Keycloak->>Angular: Redireciona com code
    Angular->>Keycloak: Troca code por token
    Keycloak->>Angular: access_token + refresh_token
    Angular->>Usuario: Dashboard
  `;

  googleFlowDiagram = `
sequenceDiagram
    actor Usuario
    participant Angular
    participant Keycloak
    participant Google

    Usuario->>Angular: Login com Google
    Angular->>Keycloak: idpHint=google
    Keycloak->>Google: OAuth redirect
    Usuario->>Google: Autentica
    Google->>Keycloak: Token Google
    Keycloak->>Keycloak: Cria/atualiza usuario
    Keycloak->>Angular: access_token
    Angular->>Usuario: Dashboard
  `;

  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login();
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }

  forgotPassword(): void {
    const keycloakUrl = environment.keycloak.url;
    const realm = environment.keycloak.realm;
    const clientId = environment.keycloak.clientId;
    const redirectUri = encodeURIComponent(window.location.origin + '/login');

    window.location.href = `${keycloakUrl}/realms/${realm}/login-actions/reset-credentials?client_id=${clientId}&redirect_uri=${redirectUri}`;
  }
}
