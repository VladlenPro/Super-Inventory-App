import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './features/product/product.module';
import { provideNzI18n } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule } from '@angular/forms';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthModule } from './features/auth/auth.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { UserOutline, LockOutline, ShopOutline, LaptopOutline, NotificationOutline, BarChartOutline } from '@ant-design/icons-angular/icons';
import { LayoutsModule } from './core/layouts/layouts.module';
import { SearchOutline } from '@ant-design/icons-angular/icons';

const icons = [UserOutline, LockOutline, ShopOutline, LaptopOutline, NotificationOutline, BarChartOutline, SearchOutline];

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    AuthModule,
    FormsModule,
    LayoutsModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzGridModule,
    NzIconModule.forRoot(icons),

  ],
  providers: [
    provideNzI18n(en_US),
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
