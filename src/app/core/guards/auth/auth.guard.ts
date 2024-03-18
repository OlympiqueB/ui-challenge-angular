import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiresLogin = route.data['requiresLogin'] || false;
  const mustNotBeLoggedIn = route.data['mustNotBeLoggedIn'] || false;
  const isLoggedIn = authService.userObject.value;

  if (mustNotBeLoggedIn && isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  if (requiresLogin) {
    if (isLoggedIn) {
      return true;
    } else {
      router.navigate(['/']);
      return false;
    }
  }

  return true;
};
