import { BrowserModule, Meta } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MyProfileModule } from './my-profile/my-profile.module';
import { AuthModule } from './auth/auth.module';
import { PagNotFounComponent } from './pag-not-foun/pag-not-foun.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { authInterceptor } from './shard/interceptors/auth.interceptor';
import { AdminModule } from './admin/admin.module';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ContactUsComponent } from './contact-us/contact-us.component';
import { ServicesComponent } from './services/services.component';
import { BouqutsComponent } from './bouquts/bouquts.component';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { Count } from './shard/pipe/countHours';
import { LoddingComponent } from './lodding/lodding.component';
import { LoadingScreenInterceptor } from './shard/interceptors/loading.interceptor';
const configS: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: { transports: ['polling'] },
};

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomeComponent,
    PagNotFounComponent,
    ContactUsComponent,
    ServicesComponent,
    BouqutsComponent,
    Count,
    LoddingComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    MyProfileModule,
    AuthModule,
    HttpClientModule,
    AdminModule,
    SocialLoginModule,
    FormsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(configS),
  ],
  providers: [
    Meta,

    {
      provide: HTTP_INTERCEPTORS,
      useClass: authInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingScreenInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
