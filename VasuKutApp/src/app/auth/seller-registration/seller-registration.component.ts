import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-registration',
  imports: [ReactiveFormsModule],
  templateUrl: './seller-registration.component.html',
  styleUrl: './seller-registration.component.scss',
  
})
export class SellerRegistrationComponent {
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService,private toastr: ToastrService,    private router: Router  ) {
    this.registerForm = this.fb.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: ["seller"]
    });
  }

  onRegister() {
    
    if (this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (res) => {
          this.toastr.success('Registration successful', 'Success ✅');
          this.registerForm.reset();
      //    this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          this.toastr.error('Registration failed. Please try again.', 'Error ❌');
        }
      });
    } else {
      this.toastr.warning('Please fill all fields correctly.', 'Warning ⚠️');
    }
  }
  }
