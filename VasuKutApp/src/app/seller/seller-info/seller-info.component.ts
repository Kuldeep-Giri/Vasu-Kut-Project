import { Component } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Router } from '@angular/router';
import { AdminService } from '../../admin/admin.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-seller-info',
  imports: [],
  templateUrl: './seller-info.component.html',
  styleUrl: './seller-info.component.scss'
})
export class SellerInfoComponent {
 constructor(private authService:AuthService,private router:Router,   
      private toastr: ToastrService,private adminService:AdminService
      ){}
 // Define the function input property // Replace with the full object structure
  userId:any;
  user:any={};

ngOnInit(){
  this.GetUser();
}
GetUser(){
  const userId = localStorage.getItem('LoggedInUserId')
  this.userId = userId;
  this.adminService.getUserById(this.userId).subscribe((res:any)=>{
  this.user=res;
  console.log(this.user)
    })
  }
}
