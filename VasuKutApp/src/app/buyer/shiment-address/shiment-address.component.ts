import { Component, OnInit } from '@angular/core';
import { AddressService } from '../address.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-shiment-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './shiment-address.component.html',
  styleUrls: ['./shiment-address.component.scss']
})
export class ShimentAddressComponent implements OnInit {
  locationForm!: FormGroup;
  countries: any[] = [];
  states: any[] = [];
  cities: any[] = [];
  UserId :string = '';
  address:any;
  constructor(private fb: FormBuilder, private addressService: AddressService,private authService:AuthService) {}

  ngOnInit() {
   
    const token = localStorage.getItem('token')
    if(token){
      this.UserId = this.authService.getLoggedInUserId(token)
    }
    // Define the form with validation
    this.locationForm = this.fb.group({
      name: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern(/^[6-9]\d{9}$/)]],
      streetAddress: ['', Validators.required],
      streetAddress2: [''],
      country: ['', Validators.required],
      state: ['', Validators.required],
      district: ['', Validators.required],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      UserId:[this.UserId]
    });

    // Load countries
    this.getCountries();

    // Watch for country change
    this.locationForm.get('country')?.valueChanges.subscribe(country => {
      if (country) {
        this.getStates(country);
        this.locationForm.get('state')?.setValue('');
        this.cities = [];
      }
    });

    // Watch for state change
    this.locationForm.get('state')?.valueChanges.subscribe(state => {
      const country = this.locationForm.get('country')?.value;
      if (state && country) {
        this.getCities(country, state);
        this.locationForm.get('district')?.setValue('');
      }
    });
    this.getAddressByUSerId()
  }

  getAddressByUSerId(){
    try {
     this.addressService.getAllAddressesByUserId(this.UserId).subscribe(res=>{
      if(res){
         this.address = res;
         console.log(this.address);
      }
     })
    } catch (error) {
      console.log(error)
    }
  }
  // Fetch Countries
  getCountries() {
    this.addressService.getCountries().subscribe(data => {
      this.countries = data.map((c: any) => ({ name: c.name.common, code: c.cca2 }));
    });
  }

  // Fetch States
  getStates(country: string) {
    this.addressService.getStates(country).subscribe(data => {
      this.states = data?.data?.states || [];
    });
  }

  // Fetch Districts
  getCities(country: string, state: string) {
    this.addressService.getCities(country, state).subscribe(data => {
      this.cities = data?.data || [];
    });
  }

  // Submit Form
  onSubmit() {
    if (this.locationForm.valid) {
      this.addressService.createAddress(this.locationForm.value).subscribe(res=>{
        if(res){
          alert("address added successfully")
        }
      })
      console.log("Submitted Data:", this.locationForm.value);
    } else {
      console.log("Form is invalid!");
    }
  }
}
