import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models/user.model';
import { MermaidDiagramComponent } from '../../core/components/mermaid-diagram.component';
import { FlowExplanationComponent } from '../../core/components/flow-explanation.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink, MermaidDiagramComponent, FlowExplanationComponent],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
  refreshTokenDiagram = `
sequenceDiagram
    participant Angular
    participant Keycloak

    Note over Angular: Timer 60s
    Angular->>Angular: Token expira em 70s?
    Angular->>Keycloak: POST /token (refresh_token)
    Keycloak->>Keycloak: Valida refresh_token
    Keycloak->>Angular: Novo access_token
    Angular->>Angular: Atualiza em memoria

    Note over Angular: Se falhar
    Angular->>Angular: logout()
  `;

  userProfile: UserProfile | null = null;
  token: string | undefined;
  refreshToken: string | undefined;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
    });
    this.token = this.authService.getToken();
    this.refreshToken = this.authService.getRefreshToken();
  }

  async refreshTokenManual(): Promise<void> {
    const refreshed = await this.authService.updateToken(0);
    if (refreshed) {
      this.token = this.authService.getToken();
      this.refreshToken = this.authService.getRefreshToken();
      alert('Token atualizado com sucesso');
    } else {
      alert('Falha ao atualizar token');
    }
  }

  formatAttributeValue(value: unknown): string {
    if (Array.isArray(value)) {
      return value.join(', ');
    }
    return String(value);
  }
}
