import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from '../admin.service';

@Component({
  selector: 'app-admin-sidebar',
  imports: [CommonModule,RouterLink],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.scss'
})
export class AdminSidebarComponent {
  isSidebarOpen = false;
  screenWidth = window.innerWidth;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }
  isMobileScreen(): boolean {
    return window.innerWidth < 768;
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = event.target.innerWidth;
   }
    constructor(private authService:AuthService,private router:Router,   private fb: FormBuilder,
           private toastr: ToastrService,private adminService:AdminService
           ){}
     currentOpenMenu: string | null = null;
     UserName:string='';
     showPopup: boolean = false;
     userId:any;
     user:any={};
     openPopup() {
       this.showPopup = !this.showPopup;
     }
     
     ngOnInit(){
       const token = localStorage.getItem('token');
       if(token){
         this.UserName = this.authService.getUserName(token)
         console.log(this.UserName)
       } 
     }
     logOut(){
       this.authService.logout();
       this.toastr.success("LogOut Successfully");
       this.router.navigate(['/']);
     }
     clickCross(){
       this.showPopup = false;
     }
}
