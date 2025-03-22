import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule, CurrencyPipe, TitleCasePipe, UpperCasePipe } from '@angular/common';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ProductService } from '../../seller/services/product.service';
import { environment } from '../../environments/environments';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-products',
  imports: [CommonModule, CarouselModule,
    RouterLink,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
  CurrencyPipe,TitleCasePipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {
   products22 :any;
  constructor( private productService: ProductService){}
  productRows: any[] = [];
  itemsPerRow = 7;
  currentIndex = 0;
  showViewMoreButton = true;
  allProductsShown = false;
  dealOfTheDayProduct : any = []
  autoScrollInterval: any;
  imageUrl = environment.imageUrl

  ngOnInit(): void {
 //   this.loadMoreProducts();
    this.GetDeatOfTheDayProducts()
    console.log("product rows",this.productRows)
    this.updateItemsPerRow(window.innerWidth)

  }
  

  GetDeatOfTheDayProducts() {
    this.productService.GetAllProductList().subscribe(
      (response: any[]) => {
        // Get last 10 products (assuming newer ones are at the end)
        this.products22 = response
        this.dealOfTheDayProduct = response.slice(-14).reverse();
        console.log(this.dealOfTheDayProduct);
        this.loadMoreProducts()
      },
      (error) => {
        console.error('Error fetching products:', error);
      }
    );
  
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.updateItemsPerRow(event.target.innerWidth);
  }
  updateItemsPerRow(width: number): void {
    this.itemsPerRow = width < 768 ? 6 : 7;
  }
  loadMoreProducts() {
    const endIndex = this.currentIndex + this.itemsPerRow;
    const newProducts = this.dealOfTheDayProduct.slice(this.currentIndex, endIndex);
    this.productRows.push(newProducts);
    this.currentIndex = endIndex;
    if (this.currentIndex >= this.dealOfTheDayProduct.length) {
      this.showViewMoreButton = false;
      this.allProductsShown = true;
    }
  }
  @ViewChild('scrollContainer', { static: false })
  scrollContainer!: ElementRef;


  ngAfterViewInit() {
    this.startAutoScroll();
  }
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollLeft -= 220;
    this.restartAutoScroll();

  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollLeft += 220;
     this.restartAutoScroll();

  }
  startAutoScroll() {
    this.autoScrollInterval = setInterval(() => {
      this.scrollRight();
    }, 3000); // Auto scroll every 3 seconds
  }

  restartAutoScroll() {
    clearInterval(this.autoScrollInterval);
    this.startAutoScroll();
  }
  
}
