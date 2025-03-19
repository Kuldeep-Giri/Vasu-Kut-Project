import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-products',
  imports: [CommonModule, CarouselModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
  products = [
    { id: 1, name: 'Product 1', price: 100, image: 'img1.jpg' },
    { id: 2, name: 'Product 2', price: 120, image: 'img1.jpg' },
    { id: 3, name: 'Product 3', price: 150, image: 'img1.jpg' },
    { id: 4, name: 'Product 4', price: 200, image: 'img1.jpg' },
    { id: 5, name: 'Product 1', price: 100, image: 'img1.jpg' },
    { id: 6, name: 'Product 2', price: 120, image: 'img1.jpg' },
    { id: 7, name: 'Product 3', price: 150, image: 'img1.jpg' },
    { id: 8, name: 'Product 4', price: 200, image: 'img1.jpg' }
  ];

  carouselOptions: OwlOptions = {
    loop: true,
    margin: 20,
    nav: true,
    dots: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    responsive: {
      0: { items: 1 },
      600: { items: 3 },
      1000: { items: 6 }
    }
  };
}
