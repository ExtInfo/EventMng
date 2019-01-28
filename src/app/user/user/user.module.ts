import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_IMPORTS } from '../../app.imports';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from '../user.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';

@NgModule({
  declarations: [
    UserComponent,
    SigninComponent,
    SignupComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    ...APP_IMPORTS
  ]
})
export class UserModule { }
