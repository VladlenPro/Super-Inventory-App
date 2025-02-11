import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { RouterModule } from '@angular/router';

import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzButtonModule } from 'ng-zorro-antd/button';




@NgModule({
  declarations: [
    AdminLayoutComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    LayoutRoutingModule,
    NzBreadCrumbModule,
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
    NzButtonModule,
]
})
export class LayoutsModule { }
