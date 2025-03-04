import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreDetailsComponent } from './pages/store-details.component';
import { StoreListComponent } from './pages/store-list.component';

const routes: Routes = [
  { path: '', component: StoreListComponent },
  { path: 'add', component: StoreDetailsComponent },
  { path: 'details/:id', component: StoreDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreRoutingModule { }
