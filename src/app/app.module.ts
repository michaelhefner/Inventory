import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {AuthService} from './auth/auth.service';
import {SigninComponent} from './auth/signin/signin.component';
import {HomeComponent} from './home/home.component';
import {NavbarComponent} from './nav/navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
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
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
