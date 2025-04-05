import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../environments/environments';
import { NavbarComponent } from "../navbar/navbar.component";
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { Address, AddressService } from '../address.service';
import { OrderRequest, OrderService } from '../order.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-cart-item',
  imports: [CommonModule, NavbarComponent,RouterLink],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {
  cartItems: any[] = [];
  UserId: string = ''; // Initialize userId as null
  imageUrl = environment.imageUrl;
  address:any;
  selectedAddressId: any;
  showAll = false;
  isLoading = false;

  constructor(private cartService: CartService,private authService:AuthService,private toast:ToastrService,private router:Router,private addressService:AddressService,private orderService: OrderService
  ) {}

  
  ngOnInit() {
    this.loadCart();
    const token = localStorage.getItem('token')
    if(token){
      this.UserId = this.authService.getLoggedInUserId(token)
    }
    this.getAddressByUSerId()
  }
  getAddressByUSerId(){
    try {
     this.addressService.getAllAddressesByUserId(this.UserId).subscribe(res=>{
      if(res){
         this.address = res;
         console.log(this.address);
      }
     })
    } catch (error) {
      console.log(error)
    }
  }
  onAddressSelect(addressId: number): void {
    this.selectedAddressId = addressId;
    console.log('Selected Address ID:', this.selectedAddressId);
  }

  toggleShowAll(): void {
    this.showAll = !this.showAll;
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
    if (!this.selectedAddressId) {
      this.toast.error('Please select a delivery address.');
      return;
    }
    if (this.cartItems.length === 0) {
      this.toast.error('Your cart is empty.');
      return;
    }

    this.isLoading = true;
    const orderRequest: OrderRequest = {
      userId: this.UserId,
      selectedAddressId: this.selectedAddressId,
      items: this.cartItems.map(item => ({
        productId: item.id,
        quantity: item.quantity
      }))
    };

    this.orderService.placeOrder(orderRequest).subscribe({
      next: (response) => {
        this.toast.success(`Order placed successfully! Transaction ID: ${response.transactionId}`);
        this.cartService.clearCart();
        this.router.navigate(['/']);
      },
      error: (error) => {
        this.toast.error(error);
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
