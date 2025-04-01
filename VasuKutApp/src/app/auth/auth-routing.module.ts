import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BuyerLoginComponent } from './buyer-login/buyer-login.component';
import { BuyerRegistrationComponent } from './buyer-registration/buyer-registration.component';
import { SellerRegistrationComponent } from './seller-registration/seller-registration.component';
import { SellerLoginComponent } from './seller-login/seller-login.component';
import { loginGuard } from './login.guard';

const routes: Routes = [

  { path: 'login', component: BuyerLoginComponent,canActivate: [loginGuard] },
  { path: 'buyer/register', component: BuyerRegistrationComponent },
  
  { path: 'register', component: SellerRegistrationComponent,canActivate: [loginGuard] },
  
  { path: 'seller/login', component: SellerLoginComponent }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }  
