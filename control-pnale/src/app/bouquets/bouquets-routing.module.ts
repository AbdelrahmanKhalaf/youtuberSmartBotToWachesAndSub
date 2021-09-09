import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BouquetComponent } from './bouquet/bouquet.component';
import { AddBouquetComponent } from './bouquet/add-bouquet/add-bouquet.component';
import { DetailsBouquetComponent } from './bouquet/details-bouquet/details-bouquet.component';
import { UpdateBouquetComponent } from './bouquet/update-bouquet/update-bouquet.component';
import { AllAccseptComponent } from './all-accsept/all-accsept.component';
import { AllTryItComponent } from './all-try-it/all-try-it.component';
import { AllNotAccseptComponent } from './all-not-accsept/all-not-accsept.component';
import { AllBouquteFreeComponent } from './all-bouqute-free/all-bouqute-free.component';
import { AllBouqutePiadComponent } from './all-bouqute-piad/all-bouqute-piad.component';
import { DetailsBouquteRaComponent } from './details-bouqute-ra/details-bouqute-ra.component';
import { UpdateBouquteRaComponent } from './update-bouqute-ra/update-bouqute-ra.component';
import { GurdAuthService } from '../shard/middlwar/gurd-auth.service';
import { GurdAuthAdmin } from '../shard/middlwar/gurd-auth-admin.service';

const routes: Routes = [
  {
    path: '',
    component: BouquetComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'add',
    component: AddBouquetComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'details-bouquet/:id',
    component: DetailsBouquetComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'update/:id',
    component: UpdateBouquetComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'allAccsept',
    component: AllAccseptComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'allTryIt',
    component: AllTryItComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'allNotAccsept',
    component: AllNotAccseptComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'allBouquteFree',
    component: AllBouquteFreeComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'allBouqutePiad',
    component: AllBouqutePiadComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'reantalDetails/:id',
    component: DetailsBouquteRaComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
  {
    path: 'reantalupdate/:id',
    component: UpdateBouquteRaComponent,
    canActivate: [GurdAuthService, GurdAuthAdmin],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BouquetsRoutingModule {}
