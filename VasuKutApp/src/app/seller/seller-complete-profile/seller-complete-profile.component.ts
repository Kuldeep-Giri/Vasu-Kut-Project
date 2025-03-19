import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-complete-profile',
  imports: [CommonModule,ReactiveFormsModule,FormsModule,ReactiveFormsModule],
  templateUrl: './seller-complete-profile.component.html',
  styleUrl: '../add-product/add-product.component.scss'
})
export class SellerCompleteProfileComponent {
  profile!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profile = this.fb.group({
      companyName: ['', Validators.required],
      businessType: ['', Validators.required],
      logo: [''],
      introduction: [''],
      profileBanner: [''],
      secondaryBanner: [''],
      mainProduct: ['', Validators.required],
      website: [''],
      countryRegion: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      address: ['', Validators.required],
      yearEstablished: ['', Validators.required],
      numberOfEmployees: ['', Validators.required],
      brochure: [''],
      companyVideo: [''],
      companyImages: this.fb.array([])
    });
  }

  get companyImages(): FormArray {
    return this.profile.get('companyImages') as FormArray;
  }

  addCompanyImage(): void {
    this.companyImages.push(this.fb.control(''));
  }

  onSubmit(): void {
    console.log(this.profile.value);
  }
}
