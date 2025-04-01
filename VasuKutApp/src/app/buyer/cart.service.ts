// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { BehaviorSubject, map, Observable, of } from 'rxjs';
// import { environment } from '../environments/environments';
// import { AuthService } from '../auth/services/auth.service';

// @Injectable({
//   providedIn: 'root',
// })
// export class CartService {
//   private apiUrl = `${environment.apiBaseUrl}/cart`; // Adjust API URL if needed
//   private userId: string | null = null; // Initialize userId as null
//   private localCartKey = 'guestCart';

//   constructor(private http: HttpClient,private authService:AuthService) {}
  
//   public isUserLoggedIn(): boolean {
//     return !!localStorage.getItem('token');
//   }

//   private getUserId(): string {
//     const token = localStorage.getItem('token');
//     if (token) {
//       this.userId = this.authService.getLoggedInUserId(token); // Get UserId from token
//     }
//     return this.userId || '';
//   }
//   addToCart(productId: number, quantity: number): void {
//     const cartItem = { productId, quantity, userId: this.getUserId() };
  
//     if (!this.isUserLoggedIn()) {
//       let guestCart = JSON.parse(localStorage.getItem(this.localCartKey) || '[]');
//       guestCart.push(cartItem);
//       localStorage.setItem(this.localCartKey, JSON.stringify(guestCart));
//     } else {
//       this.http.post(`${this.apiUrl}/add`, cartItem).subscribe(
//         () => console.log('Product added to cart'),
//         (error) => console.error('Error adding to cart', error)
//       );
//     }
//   }
  

//   getCart() {
//     if (!this.isUserLoggedIn()) {
//       return JSON.parse(localStorage.getItem(this.localCartKey) || '[]');
//     } else {
//       return this.http.get(`${this.apiUrl}/get/${this.getUserId()}`);
//     }
//   }
 
//   mergeCart() {
//     if (this.isUserLoggedIn()) {
//       let guestCart = JSON.parse(localStorage.getItem(this.localCartKey) || '[]');
//       if (guestCart.length > 0) {
//         this.http.post(`${this.apiUrl}/merge?userId=${this.getUserId()}`, guestCart)
//           .subscribe(() => localStorage.removeItem(this.localCartKey));
//       }
//     }
//   }

//    removeCartItem(cartId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/remove/${cartId}`);
//   }

//   clearCart(): void {
//     const userId = this.getUserId();
  
//     if (this.isUserLoggedIn()) {
//       this.http.delete(`${this.apiUrl}/clear/${userId}`)
//         .subscribe(
//           () => {
//             console.log('Cart cleared successfully');
            
//           },
//           (error) => console.error('Error clearing cart', error)
//         );
//     } else {
//       localStorage.removeItem('guestCart');
//       console.log('Guest cart cleared successfully');
//     }
//   }
  
// }
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../environments/environments';
import { AuthService } from '../auth/services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private apiUrl = `${environment.apiBaseUrl}/cart`; // API URL
  private localCartKey = 'guestCart'; // Key for guest cart in localStorage
  private cartLengthSubject = new BehaviorSubject<number>(0); // Observable for cart length
  cartLength$ = this.cartLengthSubject.asObservable();

  constructor(private http: HttpClient, private authService: AuthService) {
    this.loadCartFromStorage(); // ✅ Load cart data when service initializes
  }

  // ✅ Load Cart Length from localStorage
  private loadCartFromStorage(): void {
    const storedCartLength = localStorage.getItem('cartLength');
    this.cartLengthSubject.next(storedCartLength ? parseInt(storedCartLength, 10) : 0);
  }

  // ✅ Check if User is Logged In
  public isUserLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  // ✅ Get User ID from AuthService
  private getUserId(): string {
    const token = localStorage.getItem('token');
    return token ? this.authService.getLoggedInUserId(token) : '';
  }

  // ✅ Add Product to Cart (Handles Both Guest & Logged-in Users)
  addToCart(productId: number, quantity: number): void {
    const cartItem = { productId, quantity, userId: this.getUserId() };

    if (!this.isUserLoggedIn()) {
      let guestCart = JSON.parse(localStorage.getItem(this.localCartKey) || '[]');

      const existingItem = guestCart.find((item: any) => item.productId === productId);
      if (existingItem) {
        existingItem.quantity += quantity; // Update quantity
      } else {
        guestCart.push(cartItem);
      }

      localStorage.setItem(this.localCartKey, JSON.stringify(guestCart));
      this.updateCartLength(guestCart.length);
    } else {
      this.http.post(`${this.apiUrl}/add`, cartItem).subscribe(
        () => this.getCartItemsLength(),
        (error) => console.error('Error adding to cart', error)
      );
    }
  }

  // ✅ Get Cart Items (Handles Both Guest & Logged-in Users)
  getCart(): Observable<any> {
    if (!this.isUserLoggedIn()) {
      return new Observable(observer => {
        observer.next(JSON.parse(localStorage.getItem(this.localCartKey) || '[]'));
        observer.complete();
      });
    } else {
      return this.http.get(`${this.apiUrl}/get/${this.getUserId()}`);
    }
  }

  // ✅ Update Cart Length Globally
  private updateCartLength(length: number): void {
    this.cartLengthSubject.next(length);
    localStorage.setItem('cartLength', length.toString());
  }

  // ✅ Get Cart Length (for Guest & Logged-in Users)
  getCartItemsLength(): void {
    if (this.isUserLoggedIn()) {
      this.http.get<any[]>(`${this.apiUrl}/get/${this.getUserId()}`).subscribe(
        (cartItems) => this.updateCartLength(cartItems.length),
        (error) => console.error('Error fetching cart length', error)
      );
    } else {
      const guestCart = JSON.parse(localStorage.getItem(this.localCartKey) || '[]');
      this.updateCartLength(guestCart.length);
    }
  }

  // ✅ Merge Guest Cart into User's Cart on Login
  mergeCart(): void {
    if (this.isUserLoggedIn()) {
      let guestCart = JSON.parse(localStorage.getItem(this.localCartKey) || '[]');
      if (guestCart.length > 0) {
        this.http.post(`${this.apiUrl}/merge?userId=${this.getUserId()}`, guestCart).subscribe(
          () => {
            localStorage.removeItem(this.localCartKey); // Clear guest cart
            this.getCartItemsLength();
          },
          (error) => console.error('Error merging guest cart', error)
        );
      }
    }
  }

  // ✅ Remove Cart Item
  removeCartItem(cartId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/remove/${cartId}`).pipe(
      tap(() => this.getCartItemsLength()) // Refresh cart length after removal
    );
  }

  // ✅ Clear Cart (Handles Both Guest & Logged-in Users)
  clearCart(): void {
    if (this.isUserLoggedIn()) {
      this.http.delete(`${this.apiUrl}/clear/${this.getUserId()}`).subscribe(
        () => this.updateCartLength(0),
        (error) => console.error('Error clearing cart', error)
      );
    } else {
      localStorage.removeItem(this.localCartKey);
      this.updateCartLength(0);
    }
  }
}
