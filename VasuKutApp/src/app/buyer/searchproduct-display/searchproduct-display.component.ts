import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../seller/services/product.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { IProductResponse } from '../../Models/product.model';

@Component({
  selector: 'app-product-display',
  templateUrl: './searchproduct-display.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./searchproduct-display.component.scss']
})
export class SearchproductDisplayComponent implements OnInit {
  products: IProductResponse[] = [];
  searchTerm: string = '';
  selectedPort: string = '';
  selectedSpecification: string = '';
  selectedCategory: number | null = null;
  availablePorts: string[] = [];
  availableSpecifications: string[] = [];
  availableCategories: number[] = [];

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getAvailableFilters().subscribe(filters => {
      this.availablePorts = filters.ports || [];
      this.availableSpecifications = filters.specifications || [];
      this.availableCategories = filters.categories || [];
    });

    this.searchProducts();
  }

  searchProducts(): void {
    this.productService.searchProducts(
      this.searchTerm,
      this.selectedPort,
      this.selectedSpecification,
      this.selectedCategory
    ).subscribe(
      (products) => {
        this.products = products;
      },
      (error) => {
        console.error('Error fetching products', error);
      }
    );
  }

  onFilterChange(): void {
    this.searchProducts();
  }
}
