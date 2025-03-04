import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-product',
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss'
})
export class AddProductComponent {
  attributes = [{ label: '', value: '' }];
  priceRanges = [{ minQuantity: '', maxQuantity: '', price: '' }];

  addAttribute() {
    this.attributes.push({ label: '', value: '' });
  }

  addPriceRange() {
    this.priceRanges.push({ minQuantity: '', maxQuantity: '', price: '' });
  }
}
