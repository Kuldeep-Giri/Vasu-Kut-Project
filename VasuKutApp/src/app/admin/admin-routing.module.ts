import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoryComponent } from './add-category/add-category.component';
import { UserManagmentComponent } from './user-managment/user-managment.component';
// const routes: Routes = [

//   { path: 'home', component: HomeComponent, canActivate: [SellerGuard]  },
  
// ];
const routes: Routes = [
  
          { path: 'category', component: AddCategoryComponent  },
          { path: 'user-management', component: UserManagmentComponent  }
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
