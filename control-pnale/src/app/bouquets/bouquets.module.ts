import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BouquetsRoutingModule } from './bouquets-routing.module';
import { DetailsBouquetComponent } from './bouquet/details-bouquet/details-bouquet.component';
import { AddBouquetComponent } from './bouquet/add-bouquet/add-bouquet.component';
import { UpdateBouquetComponent } from './bouquet/update-bouquet/update-bouquet.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AllAccseptComponent } from './all-accsept/all-accsept.component';
import { AllTryItComponent } from './all-try-it/all-try-it.component';
import { AllNotAccseptComponent } from './all-not-accsept/all-not-accsept.component';
import { AllBouquteFreeComponent } from './all-bouqute-free/all-bouqute-free.component';
import { AllBouqutePiadComponent } from './all-bouqute-piad/all-bouqute-piad.component';
import { DetailsBouquteRaComponent } from './details-bouqute-ra/details-bouqute-ra.component';
import { UpdateBouquteRaComponent } from './update-bouqute-ra/update-bouqute-ra.component';
import { DataTablesModule } from 'angular-datatables';

@NgModule({
  declarations: [
    DetailsBouquetComponent,
    AddBouquetComponent,
    UpdateBouquetComponent,
    AllAccseptComponent,
    AllTryItComponent,
    AllNotAccseptComponent,
    AllBouquteFreeComponent,
    AllBouqutePiadComponent,
    DetailsBouquteRaComponent,
    UpdateBouquteRaComponent,
  ],
  imports: [
    CommonModule,
    BouquetsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
  ],
})
export class BouquetsModule {}
