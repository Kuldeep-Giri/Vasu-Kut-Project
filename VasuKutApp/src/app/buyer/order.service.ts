import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environments';

export interface OrderItem {
  productId: number;
  quantity: number;
}

export interface OrderRequest {
  userId: string;
  selectedAddressId: number;
  items: OrderItem[];
}

@Injectable({ providedIn: 'root' })
export class OrderService {
  private apiUrl = `${environment.apiBaseUrl}/order/create`;

  constructor(private http: HttpClient) {}

  placeOrder(order: OrderRequest): Observable<any> {
    return this.http.post<any>(this.apiUrl, order);
  }
}
