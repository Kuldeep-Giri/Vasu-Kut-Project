// src/app/product.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

interface Product {
  id: number;
  name: string;
  productImageUrls: string[];
}

interface ProductSearchResponse {
  products: Product[];
  availablePorts: string[];
  availableSpecificationNames: string[];
  availableCategories: number[];
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private apiUrl = 'http://localhost:5000/api/product/search'; // Replace with your API URL

  private productsSubject = new BehaviorSubject<Product[]>([]);
  products$ = this.productsSubject.asObservable();

  private availablePortsSubject = new BehaviorSubject<string[]>([]);
  availablePorts$ = this.availablePortsSubject.asObservable();

  private availableSpecificationsSubject = new BehaviorSubject<string[]>([]);
  availableSpecifications$ = this.availableSpecificationsSubject.asObservable();

  private availableCategoriesSubject = new BehaviorSubject<number[]>([]);
  availableCategories$ = this.availableCategoriesSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Fetch all available filter data (ports, categories, specifications)
  fetchFilters(): void {
    this.http.get<ProductSearchResponse>(this.apiUrl)
      .subscribe(response => {
        this.availablePortsSubject.next(response.availablePorts);
        this.availableSpecificationsSubject.next(response.availableSpecificationNames);
        this.availableCategoriesSubject.next(response.availableCategories);
      });
  }

  // Fetch products based on search criteria
  searchProducts(params: any): void {
    let requestParams = new HttpParams().set('term', params.searchTerm);

    if (params.specificationName) {
      requestParams = requestParams.set('specificationName', params.specificationName);
    }

    if (params.categoryId !== null) {
      requestParams = requestParams.set('categoryId', params.categoryId.toString());
    }

    if (params.nearestPort) {
      requestParams = requestParams.set('nearestPort', params.nearestPort);
    }

    this.http.get<ProductSearchResponse>(this.apiUrl, { params: requestParams })
      .subscribe(response => {
        this.productsSubject.next(response.products);
      });
  }
}
