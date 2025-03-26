import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { CategoryComponent } from '../category/category.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsComponent } from '../products/products.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { EnquiryComponent } from '../enquiry/enquiry.component';
import { AdminService, User } from '../../admin/admin.service';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,SliderComponent,CategoryComponent,ProductsComponent,EnquiryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Suppress errors for unknown properties
})
export class HomeComponent {
  showToggle : boolean = false;
 
  showHideToggle(){
    this.showToggle = !this.showToggle;
  }
  constructor(private adminService:AdminService){}

}
