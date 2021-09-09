import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BouquetComponent } from './bouquets/bouquet/bouquet.component';
import { HomeComponent } from './home/home.component';
import { NavParComponent } from './layout/nav-par/nav-par.component';
import { SideParComponent } from './layout/side-par/side-par.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeAdminComponent } from './home-admin/home-admin.component';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BouquetsModule } from './bouquets/bouquets.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { authInterceptor } from './shard/interceptors/auth.interceptor';
import { DataTablesModule } from 'angular-datatables';
import { DetailsUserComponent } from './users/user/details-user/details-user.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const configS: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: { transports: ['polling'] },
};
@NgModule({
  declarations: [
    AppComponent,
    BouquetComponent,
    HomeComponent,
    NavParComponent,
    SideParComponent,
    FooterComponent,
    HomeAdminComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    UsersModule,
    AuthModule,
    BouquetsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    DataTablesModule,
    SocketIoModule.forRoot(configS),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
