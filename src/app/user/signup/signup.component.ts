import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse} from '@angular/common/http';
import { EmailValidator, NameValidator } from '../../shared/validators/formValidator';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  public signUpForm: FormGroup;
  public isVerifiedEmail: boolean = false;

  constructor(public fb: FormBuilder, public router: Router, public userService: UserService, public spinner: NgxSpinnerService ) {
    this.signUpForm = fb.group({
      firstName: ['', Validators.compose([Validators.required, NameValidator])],
      lastName: ['', Validators.compose([Validators.required, NameValidator])],
      email: ['', Validators.compose([Validators.required, EmailValidator])],
      dob: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      otpNum: ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  ngOnInit() {
    this.spinner.hide();
  }

  registerUserHandler(): void {
    this.userService.registerUser(this.signUpForm.value).subscribe((data: any) => {
        this.router.navigate(['/user/signin']);
      alert(data.message);
    }, (err: HttpErrorResponse) => {
        console.log('error' + err );
    });
  }
  passwordMatchValidator(frmGrp: FormGroup) {
    return frmGrp.controls.password.value === frmGrp.controls.confirmPassword.value ? null : { mismatch: true };
  }

  emailVerficationHandler(): void {
    alert(this.signUpForm.get('email').value);
    this.userService.verifyEmail(this.signUpForm.get('email').value).subscribe((data: any) => {
        console.log('data-----' + JSON.stringify(data));
        alert(data.message);
        this.isVerifiedEmail = true;
      }, (err: HttpErrorResponse) => {
        this.signUpForm.get('email').reset();
        this.isVerifiedEmail = false;
        alert('dddd');
    });
  }

  get sf() {
    return this.signUpForm.controls;
  }
  cancelSignupHandler (): void {
    this.router.navigate(['/user/signin']);
  }
}
