import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { inject } from '@angular/core';

export const profileGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const username = authService.userObject.value?.username;

  if (username) {
    router.navigate(['/profile/' + username]);
    return false;
  }

  return true;
};
