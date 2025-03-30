import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../seller/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProductResponse } from '../../Models/product.model';
import { SpinnerComponent } from "../spinner/spinner.component";
import { environment } from '../../environments/environments';

@Component({
  selector: 'app-product-display',
  templateUrl: './searchproduct-display.component.html',
  styleUrls: ['./searchproduct-display.component.scss'],
  standalone: true,
  imports: [FormsModule, CommonModule, SpinnerComponent]
})
export class SearchproductDisplayComponent implements OnInit {
  searchTerm: string = '';
  products: IProductResponse[] = [];
  pageNumber: number = 1;
  pageSize: number = 10;
  totalProducts: number = 0;
  loading: boolean = false;
 imageUrl = environment.imageUrl;

  constructor(private productService: ProductService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchTerm = params['searchTerm']?.trim() || ''; // Trim whitespace
      this.pageNumber = 1;
      this.products = [];
      this.totalProducts = 0;

      if (this.searchTerm) {
        this.fetchProducts();
      }
    });
  }

  fetchProducts(): void {
    if (this.loading) return; // Prevent multiple calls
    this.loading = true;

    this.productService.searchProducts(this.searchTerm, this.pageNumber, this.pageSize).subscribe({
      next: (response) => {
        this.products = [...this.products, ...response.products]; // Append new products
        this.totalProducts = response.totalCount; // Store total available products
        this.loading = false;
      },
      error: (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    });
  }

  loadMore(): void {
    if (this.products.length < this.totalProducts) {
      this.pageNumber++; // Increase page number
      this.fetchProducts();
    }
  }
}
