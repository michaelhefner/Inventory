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
import {CreateItemComponent} from './item/create-item/create-item.component';
import {ShowItemsComponent} from './item/show-items/show-items.component';
import {HttpClientModule} from '@angular/common/http';
import {WelcomeComponent} from './home/welcome/welcome.component';
import {SearchItemComponent} from './item/search-item/search-item.component';
import {SidebarComponent} from './nav/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
    SignInComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    CreateItemComponent,
    ShowItemsComponent,
    WelcomeComponent,
    SearchItemComponent,
    SidebarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
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
