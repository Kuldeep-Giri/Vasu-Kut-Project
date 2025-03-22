import { Component } from '@angular/core';
import { NavbarComponent } from '../navbar/navbar.component';
import { SliderComponent } from '../slider/slider.component';
import { CategoryComponent } from '../category/category.component';
import { FooterComponent } from '../footer/footer.component';
import { ProductsComponent } from '../products/products.component';
import { SpinnerComponent } from '../spinner/spinner.component';
import { EnquiryComponent } from '../enquiry/enquiry.component';

@Component({
  selector: 'app-home',
  imports: [NavbarComponent,SliderComponent,CategoryComponent,FooterComponent,ProductsComponent,SpinnerComponent,EnquiryComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
