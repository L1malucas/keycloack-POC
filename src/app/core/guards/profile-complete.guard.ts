import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const profileCompleteGuard: CanActivateFn = async (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Primeiro verifica se está logado
  if (!authService.isLoggedIn()) {
    await authService.login();
    return false;
  }

  // Obter o perfil do usuário
  const userProfile = authService.getUserProfile();

  // Verificar se o perfil está completo
  const profileCompleted = userProfile?.attributes?.['profileCompleted'];
  const isCompleted = Array.isArray(profileCompleted)
    ? profileCompleted[0] === 'true'
    : profileCompleted === 'true';

  // Se o perfil não está completo, redireciona para /complete-profile
  if (!isCompleted) {
    router.navigate(['/complete-profile']);
    return false;
  }

  // Perfil está completo, permite acesso
  return true;
};
