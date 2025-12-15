import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html'
})
export class ProfileComponent implements OnInit {
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
