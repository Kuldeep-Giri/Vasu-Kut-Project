import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

export const SellerGuard: CanActivateFn = (route, state) => {
    const router = inject(Router);
    const authService = inject(AuthService);   
    const toastr = inject(ToastrService);   

    const token = localStorage.getItem('token');
    console.log(token);

    if (token) {

        if (authService.isLoggedIn() && authService.getUserRole(token) === 'seller') {  
         console.log(authService.getUserRole(token));
            return true;
        } else {
            toastr.error("You don't have permission❌");
        
            router.navigate(['/auth/seller/login']);
            return false;
        }
    } else {
        router.navigate(['/auth/login']);
        return false;
    }
};
