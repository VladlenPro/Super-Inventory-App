import { RouterModule, Routes } from "@angular/router";
import { AdminLayoutComponent } from "./admin-layout/admin-layout.component";
import { NgModule } from "@angular/core";

const routes: Routes = [
    {
        path: '',
        component:AdminLayoutComponent,
        children: [
            {path: '', loadChildren: () => import('../../features/admin/admin.module').then(m => m.AdminModule) },

        ]
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
  export class LayoutRoutingModule {}