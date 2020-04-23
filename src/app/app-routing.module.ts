import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SignInComponent} from './auth/signIn/sign-in.component';
import {HomeComponent} from './home/home.component';
import {RegisterComponent} from './auth/register/register.component';
import {AuthGuard} from './auth/auth-guard.service';


const routes: Routes = [{
  path: '',
  canActivate: [AuthGuard],
  component: HomeComponent
}, {
  path: 'signin',
  component: SignInComponent
}, {
  path: 'register',
  component: RegisterComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
