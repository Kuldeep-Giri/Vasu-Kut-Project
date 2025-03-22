import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerGuard } from '../guards/seller.guard';
import { AddProductComponent } from './add-product/add-product.component';
import { SellerInfoComponent } from './seller-info/seller-info.component';
import { SellerCompleteProfileComponent } from './seller-complete-profile/seller-complete-profile.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductGridComponent } from './product-grid/product-grid.component';
// const routes: Routes = [

//   { path: 'home', component: HomeComponent, canActivate: [SellerGuard]  },
  
// ];
const routes: Routes = [
  {
      path: 'home', component: HomeComponent , children: [
          { path: '', component: SellerInfoComponent  },
          { path: 'add-product', component: AddProductComponent },
          { path: 'product-list', component: ProductListComponent },
          { path: 'product-grid', component: ProductGridComponent },
          { path: 'profile', component: SellerCompleteProfileComponent },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
