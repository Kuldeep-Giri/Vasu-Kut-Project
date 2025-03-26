import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter, Routes } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideToastr } from 'ngx-toastr';
import { provideQuillConfig, QuillModule } from 'ngx-quill';
import { MatDialogModule } from '@angular/material/dialog';
import { SellerGuard } from './guards/seller.guard';
import { UnauthorizedUserComponent } from './unauthorized-user/unauthorized-user.component';
const routes: Routes = [
  { path: 'login', redirectTo: 'auth/login', pathMatch: 'full' },
   { path: 'Unauthorized', component:UnauthorizedUserComponent },
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
  { path: 'seller', loadChildren: () => import('./seller/seller.module').then(m => m.SellerModule)},
  { path: '', loadChildren: () => import('./buyer/buyer.module').then(m => m.BuyerModule) },
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

];



export const appConfig: ApplicationConfig = {
  providers:
   [provideZoneChangeDetection({ eventCoalescing: true })
    , provideRouter(routes),  provideAnimations(),MatDialogModule,    provideQuillConfig({}) , // ✅ Register Quill globally

    provideToastr({
      positionClass: 'toast-top-right',
      timeOut: 3000,
      preventDuplicates: true,
    }),   provideHttpClient()
,    provideAnimationsAsync('noop')]
};
