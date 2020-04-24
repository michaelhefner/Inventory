import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './auth/signIn/sign-in.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './auth/auth-guard.service';
import {CreateItemComponent} from './item/create-item/create-item.component';
import {ShowItemsComponent} from './item/show-items/show-items.component';


const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: HomeComponent
}, {
  path: 'sign_in',
  component: SignInComponent
}, {
  path: 'register',
  component: RegisterComponent
}, {
  path: 'show_items',
  canActivate: [AuthGuard],
  component: ShowItemsComponent
}, {
  path: 'create_item',
  canActivate: [AuthGuard],
  component: CreateItemComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
