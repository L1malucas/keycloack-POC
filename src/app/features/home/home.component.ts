import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserProfile } from '../../core/models/user.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  userProfile: UserProfile | null = null;
  isAuthenticated = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe(isAuth => {
      this.isAuthenticated = isAuth;
    });

    this.authService.userProfile$.subscribe(profile => {
      this.userProfile = profile;
    });
  }

  logout(): void {
    this.authService.logout();
  }

  hasAdminRole(): boolean {
    return this.authService.hasRole('admin');
  }
}
