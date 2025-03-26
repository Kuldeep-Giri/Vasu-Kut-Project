import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const AdminGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const toastr = inject(ToastrService);
  
    const token = localStorage.getItem('token');
  
    if (!token) {
      router.navigate(['/auth/login']);
      return false;
    }
  
    if (!authService.isLoggedIn()) {
      router.navigate(['/auth/login']);
      return false;
    }
  
    const role = authService.getUserRole(token);
  
    if (role === 'admin') {
      return true;
    } else {
      toastr.error("You don't have permission❌");
       router.navigate(['/Unauthorized']);
      return false;
    }
  };
