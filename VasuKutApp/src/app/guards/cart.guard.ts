import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CartGuard implements CanActivate {
    
  constructor(private router: Router) {}
 
  canActivate(): boolean {
    if (localStorage.getItem('token')) {
      return true; // User is logged in, allow access
    }
    this.router.navigate(['/login']); // Redirect to login
    return false;
  }
}
