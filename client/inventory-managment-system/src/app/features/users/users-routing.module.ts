import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserListComponent } from './pages/user-list.component';
import { UserDetailsComponent } from './pages/user-details.component';
import { UserEditComponent } from './pages/user-edit.component';

const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'details/:id', component: UserDetailsComponent },
  { path: 'add', component: UserEditComponent },
  { path: 'edit/:id', component: UserEditComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
