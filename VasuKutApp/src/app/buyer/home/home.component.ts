import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { CategoryComponent } from '../category/category.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsComponent } from '../products/products.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { EnquiryComponent } from '../enquiry/enquiry.component';
import { AdminService, User } from '../../admin/admin.service';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,FooterComponent,SliderComponent,CategoryComponent,ProductsComponent,EnquiryComponent,RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Suppress errors for unknown properties
})
export class HomeComponent {
  showToggle : boolean = false;
 
  showHideToggle(){
    this.showToggle = !this.showToggle;
  }
 
}
