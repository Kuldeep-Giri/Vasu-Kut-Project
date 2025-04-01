import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../buyer/cart.service';
import { SpinnerComponent } from "../../buyer/spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
imports: [ReactiveFormsModule, RouterLink, SpinnerComponent,CommonModule],
  selector: 'app-buyer-login',
  templateUrl: './buyer-login.component.html',
  styleUrls: ['./buyer-login.component.scss']
})
export class BuyerLoginComponent {
  loginForm: FormGroup;
  role :any;
  loading: boolean = false;
  constructor(private fb: FormBuilder, private authService: AuthService,private router: Router, private toastr: ToastrService, private cartService:CartService 
     ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  onLogin() {
    this.loading = true; 
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(response => {
        const token=localStorage.getItem('token');

        this.role=this.authService.getUserRole(String(token));
        console.log(this.role);
        if(this.role === 'seller'){
        this.router.navigate(['/seller/home']);
        }else if(this.role == 'admin'){
          this.router.navigate(['/admin']);
        }else{
          this.router.navigate(['/']);
          this.cartService.mergeCart();
        }
        this.loading = false; 
      }, error => {
        this.toastr.error('Username or password is invalid');
        this.loading = false; 
      });
    }
  }
}
