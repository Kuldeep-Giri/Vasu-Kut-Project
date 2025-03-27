import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../../Models/category.model';
import { environment } from '../../environments/environments';


@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    private apiUrl = `${environment.apiBaseUrl}`+'ProductCategory';

    constructor(private http: HttpClient) {}

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.apiUrl+"/"+"GetAllCategory");
    }

    createCategory(category: Category): Observable<Category> {
        return this.http.post<Category>(this.apiUrl+"/"+"CreateCategory", category);
    }
}
