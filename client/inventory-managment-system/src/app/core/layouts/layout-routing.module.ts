import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { NgModule } from "@angular/core";
import { AuthGuard } from "../guards/auth.guard";

const routes: Routes = [
    {
        path: '',
        component:AdminLayoutComponent,
        canActivate: [AuthGuard],
        children: [
            {path: '', loadChildren: () => import('../../features/admin/admin.module').then(m => m.AdminModule) },
            { path: 'users', loadChildren: () => import('../../features/users/users.module').then(m => m.UsersModule) },
            { path: 'stores', loadChildren: () => import('../../features/store/store.module').then(m => m.StoreModule) }

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule {}