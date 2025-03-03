import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SellerGuard } from '../guards/seller.guard';
const routes: Routes = [

  { path: 'home', component: HomeComponent, canActivate: [SellerGuard]  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SellerRoutingModule { }
