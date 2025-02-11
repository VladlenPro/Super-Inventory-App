import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './pages/user-list.component';
import { UserDetailsComponent } from './pages/user-details.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzSwitchModule } from 'ng-zorro-antd/switch';


import { FormsModule } from '@angular/forms';
import { UserEditComponent } from './pages/user-edit.component';
import { SharedModule } from '../../shared/shared.module';



@NgModule({
  declarations: [
    UserListComponent,
    UserDetailsComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NzTableModule,
    NzSwitchModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzSelectModule,
    SharedModule  
  ]
})
export class UsersModule { }
