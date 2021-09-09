import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { GurdAuthAdmin } from './shard/middlwar/gurd-auth-admin.service';
import { GurdAuthService } from './shard/middlwar/gurd-auth.service';

const routes: Routes = [
  {
    path: '',
    component: HomeAdminComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'bouquets',
    loadChildren: './bouquets/bouquets.module#BouquetsModule',
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'home',
    component: HomeAdminComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
