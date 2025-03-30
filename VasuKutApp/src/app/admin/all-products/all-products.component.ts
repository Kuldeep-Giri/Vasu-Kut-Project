
import { Component } from '@angular/core';
import { ProductService } from '../../seller/services/product.service';
import { PopupDialogComponent } from '../../seller/popup-dialog/popup-dialog.component';
import { IProductResponse } from '../../Models/product.model';
import { environment } from '../../environments/environments';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { SpinnerComponent } from '../../buyer/spinner/spinner.component';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-all-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    SpinnerComponent,MatTooltipModule
  ],
  templateUrl: './all-products.component.html',
  styleUrl: './all-products.component.scss'
})
export class AllProductsComponent {
  displayedColumns: string[] = ['id', 'name', 'description', 'images', 'IsApproved', 'video', 'minPricePerUnit', 'maxPricePerUnit', 'actions'];
  products: IProductResponse[] = [];
  loading: boolean = false;

  searchText: string = '';
  filterStatus: string = 'all'; // 'all', '1' (approved), '0' (pending)

  baseUrl = environment.apiBaseUrl.replace('/api','');

  constructor(
    public dialog: MatDialog,
    private productService: ProductService,
    private toastr: ToastrService,
    private route: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
  }

  navigateToUpdate(productId: number) {
    this.route.navigate(['/seller/home/add-product', productId]);
  }

  loadProducts() {
    this.loading = true;
    this.productService.GetAllProductListForAdmin(this.searchText, this.filterStatus).subscribe(
      (response) => {
        this.products = response.filter((p:any)=>p.showcaseStatus == true);
        this.loading = false;
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
  reject:any = 'Product Rejected'
  app:any='Product Approved Succesfully'

  IsApproved(id: any,msg:any) {
    this.productService.IsApproved(id).subscribe((res) =>{
        this.toastr.success(msg);
        this.loadProducts()
      
    } );
  }

  openPopup(content: any, type: string) {
    if (type === 'images') {
      content = Array.isArray(content) ? content : [content];
      content = content.map((img: string) => this.baseUrl + img);
    }

    this.dialog.open(PopupDialogComponent, {
      width: '500px',
      data: { content, type },
    });
  }
}
