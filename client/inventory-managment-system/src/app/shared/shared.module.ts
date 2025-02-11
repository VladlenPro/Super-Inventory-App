import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FiltersComponent } from './components/filters/filters.component';
import { FormsModule } from '@angular/forms';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { TextFilterComponent } from './components/filters/text-filter/text-filter.component';
import { CheckboxFilterComponent } from './components/filters/checkbox-filter/checkbox-filter.component';
import { SearchOutline } from '@ant-design/icons-angular/icons';
import { NzIconModule } from 'ng-zorro-antd/icon';

const icons = [SearchOutline];

@NgModule({
  declarations: [
    FiltersComponent,
    TextFilterComponent,
    CheckboxFilterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NzCheckboxModule,
    NzInputModule,
    NzButtonModule,
    NzIconModule.forRoot(icons)
  ],
  exports: [
    FiltersComponent
  ]
})
export class SharedModule { }
