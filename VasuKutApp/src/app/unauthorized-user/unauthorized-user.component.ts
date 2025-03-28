import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-unauthorized-user',
  imports: [RouterLink],
  templateUrl: './unauthorized-user.component.html',
  styleUrl: './unauthorized-user.component.scss'
})
export class UnauthorizedUserComponent {
constructor(private authService:AuthService,private toast:ToastrService,private router:Router){}

logOut(){
  this.authService.logout();
  this.toast.success("Logout Successfully")
  this.router.navigate(['/'])
}
}
