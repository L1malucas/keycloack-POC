import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login.component';
import { RegisterComponent } from './features/auth/register.component';
import { HomeComponent } from './features/home/home.component';
import { ProfileComponent } from './features/profile/profile.component';
import { AdminComponent } from './features/admin/admin.component';
import { CompleteProfileComponent } from './features/profile/complete-profile.component';
import { authGuard, adminGuard } from './core/guards/auth.guard';
import { profileCompleteGuard } from './core/guards/profile-complete.guard';

export const routes: Routes = [
  // Rotas públicas (sem guard)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // Rota de completar perfil (só precisa estar autenticado)
  { path: 'complete-profile', component: CompleteProfileComponent, canActivate: [authGuard] },

  // Rotas protegidas (precisa estar autenticado E ter perfil completo)
  { path: '', component: HomeComponent, canActivate: [authGuard, profileCompleteGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [authGuard, profileCompleteGuard] },
  { path: 'admin', component: AdminComponent, canActivate: [adminGuard, profileCompleteGuard] },

  { path: '**', redirectTo: '' }
];
