import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { UserService } from '../../shared/services/user.service';
import {HttpErrorResponse} from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpForm: FormGroup;
  constructor(public fb: FormBuilder, public router: Router, public userService: UserService) {
    this.signUpForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
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
  cancelSignupHandler (): void {
    this.router.navigate(['/user/signin']);
  }

}
