import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../guards/auth.guard';
import { ProductDetailsComponent } from './product-details/product-details.component';
const routes: Routes = [

  { path: '', component: HomeComponent  },
  { path: 'productdetails/:id', component: ProductDetailsComponent  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BuyerRoutingModule { }
