import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { CommonModule } from '@angular/common';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { ProductService } from '../services/product.service';
import { environment } from '../../environments/environments';
import { IProductResponse } from '../../Models/product.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-grid',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
  ],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.css'],
})
export class ProductGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'images', 'video', 'minPricePerUnit', 'maxPricePerUnit', 'actions'];
  products: IProductResponse[] = [];
  loading: boolean =false;
  baseUrl=environment.apiBaseUrl.replace('/api','');
  constructor(public dialog: MatDialog,private productService: ProductService,
    private toastr: ToastrService,private route: Router) {}

  ngOnInit() {
    this.loadProducts();
  }
  navigateToUpdate(productId: number) {
    this.route.navigate(['/seller/home/add-product', productId]);
  }
  loadProducts() {
    this.productService.GetAllProductList().subscribe(
      (response) => {
        this.products = response;
        console.log(response);
        console.log(response)
       this.loading = false; // Hide the loading spinner once data is fetched
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    );
  }

  toggleProductStatus(productId: number, currentStatus: boolean) {
  var isScusse=this.productService.ToggaleProductShowHide(productId);
  if(isScusse){
    const product = this.products.find(p => p.id === productId);
      if (product) {
        product.showcaseStatus = !product.showcaseStatus;
      }
  }  
  
  }
  async onDeleteProduct(productId: number) {
    try {
      const result = await this.productService.deleteProductById(productId);
      if (result) {
        this.products = this.products.filter((p) => p.id !== productId);
        this.toastr.success('Product has bee deleted', 'Success ✅');
 
        this.loadProducts();
      } else {
        this.toastr.error('Deletion failed. Please try again.', 'Error ❌');
   
      }
    } catch (error) {
      this.toastr.error('error.', 'Error ❌');
   
    }
  }
  

  openPopup(content: any, type: string) {
    if (type === 'images') {
      // Ensure `content` is always an array
      content = Array.isArray(content) ? content : [content];
  
      // Add base URL to each image
      content = content.map((img: string) => this.baseUrl+img);
    }
  
    this.dialog.open(PopupDialogComponent, {
      width: '500px',
      data: { content, type },
    });
  }
}