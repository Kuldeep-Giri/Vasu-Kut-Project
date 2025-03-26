import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const BuyerGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);
    const toastr = inject(ToastrService);
  
    const token = localStorage.getItem('token');
  
    const role = token ? authService.getUserRole(token) : null;
  
    if (role === 'buyer' || role == null) {
      return true;
    } else {
      toastr.error("You don't have permission❌");
       router.navigate(['/Unauthorized']);
      return false;
    }
  };
