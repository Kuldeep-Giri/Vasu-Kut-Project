import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  NgxImageZoomModule } from 'ngx-image-zoom';
import { ProductService } from '../../seller/services/product.service';
import { ActivatedRoute } from '@angular/router';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../spinner/spinner.component';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-product-details',
  imports: [CommonModule, QuillModule, FormsModule, SpinnerComponent, NavbarComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.scss'
})
export class ProductDetailsComponent {
 constructor(private productService: ProductService, private route: ActivatedRoute,){}
 thumbnails: string[] = [
];
selectedImage: string = '';// Default main image
product:any;
isLoading:boolean = false;
  
ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.loadProductById(+id); // '+' converts string to number
  }
  console.log(this.selectedImage)
}
  loadProductById(id: number) {

    this.productService.getProductById(id).subscribe(
      (response) => {
        this.isLoading=true;
        this.product = response;
        response.productImageUrls.forEach(url=>this.thumbnails.push("https://localhost:7024"+url));
        this.selectedImage = this.thumbnails[0]  
        let updatedDescription = response.description.replace(/(https:\/\/[^"]+)/g, 'g.com$1');
        response.description = updatedDescription;
        this.isLoading=false;    
      },
      (error) => {
        this.isLoading=true;
        console.error('Error fetching product:', error);
      }
    );
  }
  changeMainImage(image: string) {
    this.selectedImage = image;
  }

}
