// import { CommonModule } from '@angular/common';
// import { Component } from '@angular/core';
// import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
// import { ProductService } from '../services/product.service';
// import { HttpClient } from '@angular/common/http';

// @Component({
//   selector: 'app-seller-complete-profile',
//   imports: [CommonModule,ReactiveFormsModule,FormsModule,ReactiveFormsModule],
//   templateUrl: './seller-complete-profile.component.html',
//   styleUrl: '../add-product/add-product.component.scss'
// })
// export class SellerCompleteProfileComponent {
//   // profile!: FormGroup;

//   // constructor(private fb: FormBuilder) {}

//   // ngOnInit(): void {
//   //   this.profile = this.fb.group({
//   //     companyName: ['', Validators.required],
//   //     businessType: ['', Validators.required],
//   //     logo: [''],
//   //     introduction: [''],
//   //     profileBanner: [''],
//   //     secondaryBanner: [''],
//   //     mainProduct: ['', Validators.required],
//   //     website: [''],
//   //     countryRegion: ['', Validators.required],
//   //     state: ['', Validators.required],
//   //     city: ['', Validators.required],
//   //     address: ['', Validators.required],
//   //     yearEstablished: ['', Validators.required],
//   //     numberOfEmployees: ['', Validators.required],
//   //     brochure: [''],
//   //     companyVideo: [''],
//   //     companyImages: this.fb.array([])
//   //   });
//   // }

//   // get companyImages(): FormArray {
//   //   return this.profile.get('companyImages') as FormArray;
//   // }

//   // addCompanyImage(): void {
//   //   this.companyImages.push(this.fb.control(''));
//   // }

//   // onSubmit(): void {
//   //   console.log(this.profile.value);
//   // }
//   profile!: FormGroup;

//   constructor(private fb: FormBuilder, private http: HttpClient) {}

//   ngOnInit(): void {
//     this.profile = this.fb.group({
//       companyName: [''],
//       businessType: [''],
//       logo: [null],
//       introduction: [''],
//       profileBanner: [null],
//       secondaryBanner: [null],
//       mainProduct: [''],
//       website: [''],
//       countryRegion: [''],
//       state: [''],
//       city: [''],
//       address: [''],
//       yearEstablished: [''],
//       numberOfEmployees: [''],
//       brochure: [null],
//       companyVideo: [null],
//       companyImages: this.fb.array([new FormControl(null)])
//     });
//   }

//   get companyImages() {
//     return this.profile.get('companyImages') as FormArray;
//   }

//   addCompanyImage() {
//     this.companyImages.push(new FormControl(null));
//   }

//   onSubmit() {
//     const formData = new FormData();

//     // Append regular fields
//     Object.entries(this.profile.value).forEach(([key, value]) => {
//       if (key !== 'companyImages' && value) {
//         formData.append(this.camelToPascal(key), value);
//       }
//     });

//     // Append files
//     const filesToAppend = ['logo', 'profileBanner', 'secondaryBanner', 'brochure', 'companyVideo'];
//     filesToAppend.forEach(fileKey => {
//       const file = this.profile.get(fileKey)?.value;
//       if (file instanceof File) {
//         formData.append(this.camelToPascal(fileKey), file);
//       }
//     });

//     // Append company images
//     this.companyImages.controls.forEach((control: FormControl) => {
//       if (control.value instanceof File) {
//         formData.append('CompanyImages', control.value);
//       }
//     });

//     this.http.post('https://localhost:7024/api/Seller/upload-profile', formData).subscribe({
//       next: (res:any) => console.log('Uploaded successfully:', res),
//       error: (err:any) => console.error('Upload error:', err)
//     });
//   }

//   onFileChange(event: any, controlName: string, index?: number) {
//     const file = event.target.files[0];
//     if (controlName === 'companyImages' && index !== undefined) {
//       this.companyImages.at(index).setValue(file);
//     } else {
//       this.profile.get(controlName)?.setValue(file);
//     }
//   }

//   private camelToPascal(str: string): string {
//     return str.charAt(0).toUpperCase() + str.slice(1);
//   }
// }

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-seller-complete-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './seller-complete-profile.component.html',
  styleUrl: '../add-product/add-product.component.scss'
})
export class SellerCompleteProfileComponent {
  profile!: FormGroup;
 
  constructor(private fb: FormBuilder, private http: HttpClient,private authservice:AuthService) {}
 sellerId = localStorage.getItem('LoggedInUserId');
  ngOnInit(): void {
    console.log(this.sellerId)
    this.profile = this.fb.group({
      sellerId: this.sellerId,
      companyName: [''],
      businessType: [''],
      logo: [null],
      introduction: [''],
      profileBanner: [null],
      secondaryBanner: [null],
      mainProduct: [''],
      website: [''],
      countryRegion: [''],
      state: [''],
      city: [''],
      address: [''],
      yearEstablished: [''],
      numberOfEmployees: [''],
      brochure: [null],
      companyVideo: [null],
      companyImages: this.fb.array([new FormControl(null)])
    });
  }

  get companyImages(): FormArray {
    return this.profile.get('companyImages') as FormArray;
  }

  addCompanyImage(): void {
    this.companyImages.push(new FormControl(null));
  }
  private isFile(value: any): boolean {
    return value instanceof File;
  }
  onSubmit(): void {
    const formData = new FormData();

    // Append regular non-file fields

    
    // Append individual file inputs
    Object.entries(this.profile.value).forEach(([key, value]) => {
      if (key !== 'companyImages' && !this.isFile(value)) {
        if (value !== null && value !== undefined) {
          formData.append(this.camelToPascal(key), String(value));
        }
      }
    });

    // Append company images
    this.companyImages.controls.forEach(control => {
      const file = control.value;
      if (file instanceof File) {
        formData.append('CompanyImages', file);
      }
    });
    this.http.post('https://localhost:7024/api/Seller/upload-profile', formData).subscribe({
      next: (res: any) => console.log('Uploaded successfully:', res),
      error: (err: any) => console.error('Upload error:', err)
    });
  }

  onFileChange(event: any, controlName: string, index?: number): void {
    const file = event.target.files[0];
    if (controlName === 'companyImages' && index !== undefined) {
      this.companyImages.at(index).setValue(file);
    } else {
      this.profile.get(controlName)?.setValue(file);
    }
  }

  private camelToPascal(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

