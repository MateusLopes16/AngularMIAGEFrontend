import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  let authService = inject(AuthService);
  let router = inject(Router);

  return authService.isAdmin().then(authentifie => {
    if (authentifie) {
      console.log('Vous etes admin');
      return true;
    } else {
      console.log('Vous n\'etes pas admin');
      router.navigate(['/home']);
      return false;
    }
  });
};
