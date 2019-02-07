import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_IMPORTS } from '../../app.imports';

import { UserRoutingModule } from './user-routing.module';

import { UserComponent } from '../user.component';
import { SigninComponent } from '../signin/signin.component';
import { SignupComponent } from '../signup/signup.component';
import { ConfirmEqualValidatorDirective } from '../../shared/validators/confirm-equal-validator.directive';


@NgModule({
  declarations: [
    UserComponent,
    SigninComponent,
    SignupComponent,
    ConfirmEqualValidatorDirective],
  imports: [
    CommonModule,
    UserRoutingModule,
    ...APP_IMPORTS
  ]
})
export class UserModule { }
