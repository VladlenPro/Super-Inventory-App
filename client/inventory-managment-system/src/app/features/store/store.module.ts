import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { StoreListComponent } from './pages/store-list.component';
import { StoreDetailsComponent } from './pages/store-details.component';

import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { SharedModule } from "../../shared/shared.module";
import { NzFormModule } from 'ng-zorro-antd/form';



@NgModule({
  declarations: [
    StoreListComponent,
    StoreDetailsComponent
  ],
  imports: [
    CommonModule,
    StoreRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzSwitchModule,
    NzButtonModule,
    NzFormModule,
    SharedModule
]
})
export class StoreModule { }
