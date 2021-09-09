import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { UpdatePlaylistComponent } from './update-playlist/update-playlist.component';
import { AuthGurde } from '../shard/middlewares/auth-gurde.service';
import { ActiveEmailComponent } from './active-email/active-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { DetilsEmailComponent } from './detils-email/detils-email.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { MyDitalsComponent } from './my-ditals/my-ditals.component';
import { MyMisionsComponent } from './my-misions/my-misions.component';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { UpdateImgComponent } from './update-img/update-img.component';
import { UpdateInfoComponent } from './update-info/update-info.component';

const routes: Routes = [
  {
    path: '',
    component: MyDitalsComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'myMision/:id',
    component: MyMisionsComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'updateIamage',
    component: UpdateImgComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'updateInfo/me',
    component: UpdateInfoComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'activeEmail/:token',
    component: ActiveEmailComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'activeEmail',
    component: ActiveEmailComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'detailsEmail/:id',
    component: DetilsEmailComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'update-playlist/:id',
    component: UpdatePlaylistComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'change-email',
    component: ChangeEmailComponent,
    canActivate: [AuthGurde],
  },
  {
    path: 'cahnge-password',
    component: ChangePasswordComponent,
    canActivate: [AuthGurde],
  },
  { path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'reset-password/:id', component: RestPasswordComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfileRoutingModule {}
