import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-slider',
  imports: [CommonModule,CurrencyPipe],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss'
})
export class SliderComponent {
  products = [
    {
      name: 'Bigmuscles Nutrition Real Mass Gainer',
      image: 'assets/images/realmass.png',
      originalPrice: 45.00,
      discountedPrice: 39.99
    },
    {
      name: 'Optimum Nutrition Whey Protein',
      image: 'assets/images/whey.png',
      originalPrice: 59.99,
      discountedPrice: 49.99
    },
    {
      name: 'MuscleBlaze Creatine Monohydrate',
      image: 'assets/images/creatine.png',
      originalPrice: 20.00,
      discountedPrice: 14.50
    }
  ];

  currentIndex = 0;
  currentProduct = this.products[this.currentIndex];
  intervalId: any;

  ngOnInit(): void {
    this.intervalId = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.products.length;
      this.currentProduct = this.products[this.currentIndex];
    }, 3000); // 3 seconds
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId);
  }
}
