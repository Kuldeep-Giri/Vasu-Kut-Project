import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-seller-complete-profile',
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  templateUrl: './seller-complete-profile.component.html',
  styleUrl: '../add-product/add-product.component.scss'
})
export class SellerCompleteProfileComponent {
  attributes = [{ label: '', value: '' }];
  priceRanges = [{ minQuantity: '', maxQuantity: '', price: '' }];

  addAttribute() {
    this.attributes.push({ label: '', value: '' });
  }

  addPriceRange() {
    this.priceRanges.push({ minQuantity: '', maxQuantity: '', price: '' });
  }
}
