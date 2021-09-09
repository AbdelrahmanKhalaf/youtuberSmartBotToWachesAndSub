import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BouqutsComponent } from './bouquts/bouquts.component';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { HomeComponent } from './home/home.component';
import { PagNotFounComponent } from './pag-not-foun/pag-not-foun.component';
import { ServicesComponent } from './services/services.component';
import { AuthGurde } from './shard/middlewares/auth-gurde.service';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // redirect to `first-component`
  {
    path: 'my-profile',
    loadChildren: './my-profile/my-profile.module#MyProfileModule',
    data: { title_ar: ' الصفحه الشخصيه | افضل شركة لتنجيح القنوات' },
  },

  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule',
    data: { title_ar: ' التسجيل |مع شركة يوتيوبر نجاحك اكيد' },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title_ar: ' الصفحه الرئسيه | نجاحك مهمتنا   ' },
  },
  {
    path: 'contact-us',
    component: ContactUsComponent,
    data: {
      title_ar: ' تواصل معانا | اسرع شركة بمشهدات حقيقه لتفعيل القنوات ',
    },
  },
  {
    path: 'services',
    component: ServicesComponent,
    data: { title_ar: '  خدمتنا |  يوتيوبر وجدت لنجاحك  ' },
  },
  {
    path: 'bouquts',
    component: BouqutsComponent,
    data: { title_ar: '  الباقات |  افضل شركه لنجاح القنوات ' },
  },
  {
    path: '**',
    component: PagNotFounComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
