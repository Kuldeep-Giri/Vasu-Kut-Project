import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../guards/auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { BuyerGuard } from '../guards/buyer.guard';
import { SearchproductDisplayComponent } from './searchproduct-display/searchproduct-display.component';
const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [BuyerGuard], canActivateChild: [BuyerGuard] },
  { path: 'productdetails/:id', component: ProductDetailsComponent },
  { path: 'products', component: SearchproductDisplayComponent },
  { path: '', redirectTo: '', pathMatch: 'full' }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
