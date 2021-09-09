import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddChannalsComponent } from './user/add-channals/add-channals.component';
import { DetailsUserComponent } from './user/details-user/details-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { UserComponent } from './user/user.component';

const routes: Routes = [
  { path: 'addChannalsToUsers', component: AddChannalsComponent },
  { path: '', component: UserComponent },
  { path: 'ditalsuser/:id', component: DetailsUserComponent },
  { path: 'update/:id', component: UpdateUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
