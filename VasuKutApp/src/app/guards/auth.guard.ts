import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    return true; // Allow access if token exists
  } else {
    router.navigate(['/auth/login']);
    return false; // Block if no token
  }
};

