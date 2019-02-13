import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from '../user.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

const routes: Routes = [
    { path: '', redirectTo: 'signin', pathMatch: 'full'},
    { path: 'signin', component: SigninComponent, data: {animation: '1'}},
    { path: 'signup', component: SignupComponent, data: {animation: '2'}}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
