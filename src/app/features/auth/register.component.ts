import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  constructor(private authService: AuthService) {}

  async register(): Promise<void> {
    // Usa o método register do Keycloak que já inclui PKCE automaticamente
    const keycloak = this.authService.getKeycloakInstance();

    try {
      await keycloak.register({
        redirectUri: window.location.origin
      });
    } catch (error) {
      console.error('Erro ao redirecionar para registro:', error);
      alert('Erro ao abrir página de registro. Tente novamente.');
    }
  }
}
