import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AuthService} from './auth/auth.service';
import {SignInComponent} from './auth/signIn/sign-in.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './nav/navbar/navbar.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './auth/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    Location, {provide: LocationStrategy, useClass: HashLocationStrategy},
    AuthService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
