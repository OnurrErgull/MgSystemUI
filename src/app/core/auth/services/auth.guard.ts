import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return true; // Kullanıcı giriş yapmış, sayfaya erişebilir
  }

  // Kullanıcı giriş yapmamış, login sayfasına yönlendir
  router.navigate(['/login']);
  return false;
};