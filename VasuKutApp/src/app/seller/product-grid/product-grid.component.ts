import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { PopupDialogComponent } from '../popup-dialog/popup-dialog.component';
import { ProductService } from '../services/product.service';
import { environment } from '../../environments/environments';
import { IProductResponse, ProductCreateRequest } from '../../Models/product.model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { SpinnerComponent } from '../../buyer/spinner/spinner.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AuthService } from '../../auth/services/auth.service';
import { FormsModule } from '@angular/forms';


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
    MatMenuModule,
    SpinnerComponent,
    MatTooltipModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './product-grid.component.html',
  styleUrls: ['./product-grid.component.scss'],
})
export class ProductGridComponent implements OnInit {
  displayedColumns: string[] = ['id', 'name', 'description', 'images', 'video', 'minPricePerUnit', 'maxPricePerUnit', 'actions'];
  products: IProductResponse[] = [];
  loading: boolean =false;
  baseUrl=environment.apiBaseUrl.replace('/api','');
  constructor(public dialog: MatDialog,private productService: ProductService,
    private toastr: ToastrService,private route: Router,private authService:AuthService) {}

  ngOnInit() {
    this.loadProducts();
  }
  navigateToUpdate(productId: number) {
    this.route.navigate(['/seller/home/add-product', productId]);
  }
  filterProduct:IProductResponse[]=[];
  userId:any;
  filterStatus:any = "all";
  searchText: string = '';
  filterStatus1: string = 'all';
  loadProducts() {
    const token = localStorage.getItem('token');
    this.loading = true;
  
    this.productService.GetAllProductListForAdmin(this.searchText,this.filterStatus1,this.filterStatus).subscribe(
      (response) => {
        if (token) {
          this.userId = this.authService.getLoggedInUserId(token);
        }
        // Ensure the filter function returns a value
        this.filterProduct = response.filter((p: any) => p.sellerId === this.userId);
         console.log(this.filterProduct)
        // Assign filtered products
        this.products = this.filterProduct;
        console.log(this.products);
        this.loading = false; // Hide loading spinner
      },
      (error) => {
        console.error('Error fetching products:', error);
        this.loading = false;
      }
    );
  }
  onFilterChange() {
    this.loadProducts();
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