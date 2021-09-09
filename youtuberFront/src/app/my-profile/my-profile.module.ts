import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyProfileRoutingModule } from './my-profile-routing.module';
import { ActiveEmailComponent } from './active-email/active-email.component';
import { UpdateImgComponent } from './update-img/update-img.component';
import { UpdateInfoComponent } from './update-info/update-info.component';
import { MyMisionsComponent } from './my-misions/my-misions.component';
import { MyDitalsComponent } from './my-ditals/my-ditals.component';
import { DetilsEmailComponent } from './detils-email/detils-email.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ForgetPasswordComponent } from './forget-password/forget-password.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperModule } from 'ngx-image-cropper';
import { RestPasswordComponent } from './rest-password/rest-password.component';
import { CountProfile } from './my-ditals/count.pipe';
import { UpdatePlaylistComponent } from './update-playlist/update-playlist.component';
import { ChangeEmailComponent } from './change-email/change-email.component';

@NgModule({
  declarations: [
    ActiveEmailComponent,
    UpdateImgComponent,
    UpdateInfoComponent,
    MyMisionsComponent,
    MyDitalsComponent,
    DetilsEmailComponent,
    ChangePasswordComponent,
    ForgetPasswordComponent,
    RestPasswordComponent,
    CountProfile,
    UpdatePlaylistComponent,
    ChangeEmailComponent,
  ],
  imports: [
    CommonModule,
    MyProfileRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ImageCropperModule,
  ],
})
export class MyProfileModule {}
