import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SigninComponent} from './auth/signin/signin.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [{
  path: '',
  component: HomeComponent
}, {
  path: 'signin',
  component: SigninComponent
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
