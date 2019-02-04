import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse} from '@angular/common/http';
import { NameValidator } from '../../shared/validators/nameValidator';
import { EmailValidator } from '../../shared/validators/emailValidator';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;

  constructor(public fb: FormBuilder, public router: Router, public userService: UserService) {
    this.signUpForm = fb.group({
      firstName: ['', Validators.compose([Validators.required, NameValidator])],
      lastName: ['', Validators.compose([Validators.required, NameValidator])],
      email: ['', Validators.compose([Validators.required, EmailValidator])],
      dob: ['', Validators.required],
      country: ['', Validators.required]
    });
  }
  ngOnInit() {
  }

  registerUserHandler(): void {
    this.userService.registerUser(this.signUpForm.value).subscribe((data: any) => {
      console.log('data-----' + JSON.stringify(data));
        }, (err: HttpErrorResponse) => {
           console.log('error' + err );
    });
  }

  get sf() {
    return this.signUpForm.controls;
  }

  cancelSignupHandler (): void {
    this.router.navigate(['/user/signin']);
  }

}
