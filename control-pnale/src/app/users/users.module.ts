import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserComponent } from './user/user.component';
import { DetailsUserComponent } from './user/details-user/details-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { UpdateUserComponent } from './user/update-user/update-user.component';
import { AddChannalsComponent } from './user/add-channals/add-channals.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    UserComponent,
    DetailsUserComponent,
    AddUserComponent,
    UpdateUserComponent,
    AddChannalsComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
  ],
})
export class UsersModule {}
