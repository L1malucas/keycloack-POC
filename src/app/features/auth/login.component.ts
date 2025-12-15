import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html'
})
export class LoginComponent {
  constructor(private authService: AuthService) {}

  login(): void {
    this.authService.login();
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle();
  }
}
