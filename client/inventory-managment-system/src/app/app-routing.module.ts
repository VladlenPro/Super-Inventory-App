import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './features/auth/pages/welcome/welcome.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'admin', loadChildren: () => import('./core/layouts/layouts.module').then(m => m.LayoutsModule)}
  //{path: 'login', loadChildren: () => import('./features/auth/auth.module').then(m => m.AuthModule)},
  //{ path: 'admin', loadChildren: () => import('./features/admin/admin.module').then(m => m.AdminModule) },
  //{path: 'products', loadChildren: () => import('./features/product/product.module').then(m => m.ProductModule) },
  //{path: '', redirectTo: '/products', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
