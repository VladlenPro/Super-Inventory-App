import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { NzIconModule } from 'ng-zorro-antd/icon';


@NgModule({
  declarations: [
    LoginComponent,
    WelcomeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
  ],
  exports: [LoginComponent]
})
export class AuthModule {}