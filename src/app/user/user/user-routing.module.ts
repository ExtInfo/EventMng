import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../user.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

const routes: Routes = [{
  path: 'user', component: UserComponent,
  children: [
    { path: 'singin', component: SigninComponent},
    { path: 'signup', component: SignupComponent},
    { path: '', redirectTo: '/singin', pathMatch: 'full'}
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
