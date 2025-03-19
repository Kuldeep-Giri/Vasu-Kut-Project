import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
interface Product {
  id: number;
  name: string;
  description: string;
  keywords: string;
  packagingDetails: string;
  minimumOrderQuantity: number;
  totalProductQuantity: number;
  nearestPort: string;
  dispatchDays: number;
  minPricePerUnit: number;
  maxPricePerUnit: number;
  unit: string;
  productImageUrls: string[];
  specifications: { name: string; value: string }[];
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-list.component.html',
  styleUrl: './product-list.component.scss'
})

export class ProductListComponent implements OnInit {
  product: Product | null = null;
  selectedImage: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    const productId = Number(8);
    this.productService.getProductById(productId).subscribe((data: Product) => {
      this.product = data;
      this.selectedImage = data.productImageUrls[0]; // Set first image as default
    });
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }
}