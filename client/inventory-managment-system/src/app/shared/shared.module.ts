import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './components/filters/filters/filters.component';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';




@NgModule({
  declarations: [
    FiltersComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzInputModule,
    NzButtonModule
  ],
  exports: [
    FiltersComponent
  ]
})
export class SharedModule { }
