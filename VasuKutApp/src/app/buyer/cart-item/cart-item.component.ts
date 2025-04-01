import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../environments/environments';
import { NavbarComponent } from "../navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, NavbarComponent],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  cartItems: any[] = [];
  userId: string | null = null; // Initialize userId as null
  imageUrl = environment.imageUrl;
  constructor(private cartService: CartService,private authService:AuthService,private toast:ToastrService,private router:Router) {}

  
  ngOnInit() {
    this.loadCart();
  }

  loadCart() {
    if (this.cartService.isUserLoggedIn()) {
      this.cartService.getCart().subscribe((data: any) => {
        this.cartItems = data;
      });
    } else {
     console.log("found error")
    }
  }

  removeItem(cartId: number) {
    this.cartService.removeCartItem(cartId).subscribe({
      next: () => {
        this.toast.success('removed from cart successfully');
        this.loadCart();
      },
      error: (error:any) => {
        this.toast.error('Failed to delete item');
      }
    });
  }

  placeOrder() {
    this.toast.success('Order placed successfully!');
    this.cartService.clearCart();
  this.router.navigate(['/']);
  }
}
