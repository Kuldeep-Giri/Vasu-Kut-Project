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
  private sellerprofileUrl = `${environment.apiBaseUrl}/Seller/upload-profile`;
  private GetProductListForAdminUrl =`${environment.apiBaseUrl}/Product/ProductForAdmin`;  // Replace with your actual API endpoint
  private IsProductApprovalUrl =`${environment.apiBaseUrl}/Product/Approval`;  // Replace with your actual API endpoint

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
  GetAllProductListForAdmin(searchTerm?: string, isApproved?: string): Observable<any> {
    let params: any = {};
  
    if (searchTerm) {
      params.search = searchTerm;
    }
  
    if (isApproved !== undefined && isApproved !== 'all') {
      params.isApproved = isApproved; // should be "1" or "0" as string
    }
  
    return this.http.get<any>(this.GetProductListForAdminUrl, { params });
  }
  IsApproved(id: string) {
    return this.http.patch(`${this.IsProductApprovalUrl}/${id}`, {});
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
  uploadProfile(formData: FormData): Observable<any> {
    return this.http.post(this.sellerprofileUrl, formData);
  }
}