import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environments';
import { IProductResponse } from '../../Models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private AddProductApiUrl = `${environment.apiBaseUrl}/Product/add`;  // Replace with your actual API endpoint
  private GetProductListUrl =`${environment.apiBaseUrl}/Product/ProductList`;  // Replace with your actual API endpoint
  private ToggaleShowHideUrl =`${environment.apiBaseUrl}/Product/toggle/`;  // Replace with your actual API endpoint
  private GetProductByIdUrl =`${environment.apiBaseUrl}/Product/GetProductById`;  // Replace with your actual API endpoint
  private DeleteProductByIdUrl =`${environment.apiBaseUrl}/Product/Delete/`;  // Replace with your actual API endpoint
  private UpdateProductByIdUrl =`${environment.apiBaseUrl}/Product/UpdateProduct`;  // Replace with your actual API endpoint

  constructor(private http: HttpClient) {}

  addProduct(productData: FormData): Observable<any> {
    console.log(productData);
    return this.http.post(this.AddProductApiUrl, productData);
  }
  updateProduct(productId: string, productData: any): Observable<any> {
    return this.http.put(`${this.UpdateProductByIdUrl}/${productId}`, productData);
  }
  GetAllProductList(): Observable<any> {
    return this.http.get<any>(this.GetProductListUrl);
  }
  ToggaleProductShowHide(productId :number):boolean{
    this.http.put<any>(this.ToggaleShowHideUrl+productId,{}).subscribe(
      (response: any) => {
        console.log(response.message);
        return true;
      },
      error => console.error('Error toggling product status', error)
    );
  return false;
  }
  getProductById(id: number): Observable<IProductResponse> {
    return this.http.get<IProductResponse>(`${this.GetProductByIdUrl}/${id}`);
  }

  
  
  deleteProductById(productId: number): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.http.get<any>(this.DeleteProductByIdUrl + productId, {}).subscribe(
        (response: any) => {
          console.log(response.message);
          resolve(true);
        },
        error => {
          console.error('Error deleting product', error);
          reject(false);
        }
      );
    });
  }
}