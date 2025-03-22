import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CategoryResponseModel } from '../Models/category.model';
@Injectable({
    providedIn: 'root'
})
export class CategoryService {

    private apiUrl = 'https://localhost:7024/api/ProductCategory';  // Replace with your actual API URL
    private apiUrlForCategory = 'https://localhost:7024/api/ProductCategory/GetCategoryByChildId/';  // Replace with your actual API URL

    constructor(private http: HttpClient) { }

    GetAllCategory(): Observable<CategoryResponseModel[]> {
        return this.http.get<CategoryResponseModel[]>(this.apiUrl);
      }
    searchCategories(keyword: string): Observable<CategoryResponseModel[]> {
        if (!keyword.trim()) {
            return of([]);  // Return empty list if empty search
        }
        return this.http.get<CategoryResponseModel[]>(`${this.apiUrl}?keyword=${encodeURIComponent(keyword)}`);
    }

    getCategoriesById(categoryId: Number): Observable<CategoryResponseModel> {
        
        return this.http.get<CategoryResponseModel>(`${this.apiUrlForCategory}${categoryId}`);
    }
}
