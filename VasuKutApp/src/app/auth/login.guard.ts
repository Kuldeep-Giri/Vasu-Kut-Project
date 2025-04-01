import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('token');

  if (token) {
    router.navigate(['/dashboard']); // Redirect logged-in users
    return false;
  }
  return true; // Allow access to login if not authenticated
};
