import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './auth/signIn/sign-in.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './auth/auth-guard.service';
import {CreateItemComponent} from './item/create-item/create-item.component';
import {WelcomeComponent} from './home/welcome/welcome.component';
import {SearchItemComponent} from './item/search-item/search-item.component';


const routes: Routes = [{
  path: 'home',
  component: HomeComponent
}, {
  path: 'sign_in',
  component: SignInComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'search_item',
  canActivate: [AuthGuard],
  component: SearchItemComponent
}, {
  path: 'create_item',
  canActivate: [AuthGuard],
  component: CreateItemComponent
}, {
  path: 'welcome',
  canActivate: [AuthGuard],
  component: WelcomeComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
