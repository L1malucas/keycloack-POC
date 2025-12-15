import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    // Se está indo para /complete-profile, permite acesso
    if (state.url === '/complete-profile') {
      return true;
    }

    // Verifica se o perfil está completo
    const userProfile = authService.getUserProfile();
    const profileCompleted = userProfile?.attributes?.['profileCompleted'];
    const isCompleted = Array.isArray(profileCompleted)
      ? profileCompleted[0] === 'true'
      : profileCompleted === 'true';

    // Se perfil não está completo e não está indo para /complete-profile, redireciona
    if (!isCompleted && state.url !== '/complete-profile') {
      router.navigate(['/complete-profile']);
      return false;
    }

    return true;
  }

  await authService.login();
  return false;
};

export const adminGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    await authService.login();
    return false;
  }

  if (authService.hasRole('admin')) {
    return true;
  }

  router.navigate(['/']);
  return false;
};
