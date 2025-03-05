import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../Models/category.model';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = 'https://localhost:7024/api/category';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl);
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiUrl, category);
    }
}
