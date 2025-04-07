import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { OrderService } from '../order.service';
import { AuthService } from '../../auth/services/auth.service';
import { environment } from '../../environments/environments';
import { SpinnerComponent } from "../spinner/spinner.component";
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-my-orders',
  imports: [CommonModule, SpinnerComponent, NavbarComponent],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.scss'
})
export class MyOrdersComponent {
  myOrders: any[] = [];
  UserId: string = ''; // Initialize userId as null 
  loading: boolean = false;
  imageUrl = environment.imageUrl;
  constructor(private  orderService: OrderService,private authService : AuthService) {}
  ngOnInit(){
    const token = localStorage.getItem('token')
    if(token){
     this.UserId = this.authService.getLoggedInUserId(token)
    }
    this.getMyOrders();
  }
  getMyOrders() {
    this.loading = true; // Set loading state to true
    this.orderService.myOrders(this.UserId).subscribe({
      next: (response) => {
        const nestedOrders = response?.orders?.orders;
        
        if (nestedOrders && Array.isArray(nestedOrders) && nestedOrders.length > 0) {
          this.myOrders = nestedOrders;
          console.log('My Orders:', this.myOrders);
          this.loading = false; // Reset loading state after fetching
        } else {
          this.myOrders = [];
          console.log('No orders found or empty.');
          this.loading = false; // Reset loading state if no orders found
        }
      },
      error: (err) => {
        console.error('Error fetching orders:', err);
        this.myOrders = [];
        this.loading = false; // Reset loading state on error
      }
    });
  }
  
  
  
  getTotalAmount(item: any) {
    return item.quantity * item.product.unitPrice;
  }
}
