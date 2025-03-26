import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AllProductsComponent } from './all-products/all-products.component';
import { AdminGuard } from '../guards/admin.guard';
// const routes: Routes = [

//   { path: 'home', component: HomeComponent, canActivate: [SellerGuard]  },
  
// ];
// const routes: Routes = [
  
//           { path: '', component: AdminHomeComponent},
//           { path: 'add-category', component: AddCategoryComponent  },
//           { path: 'user-management', component: UserManagmentComponent  }
  
// ];
const routes: Routes = [
  {
         path: '', component: AdminHomeComponent, canActivate: [AdminGuard],  canActivateChild: [AdminGuard], children: [
         { path: '', component: DashboardComponent},
         { path: 'add-category', component: AddCategoryComponent  },
         { path: 'user-management', component: UserManagmentComponent  },
         { path: 'product/display', component: AllProductsComponent  },
          { path: '', redirectTo: 'home', pathMatch: 'full' }
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
