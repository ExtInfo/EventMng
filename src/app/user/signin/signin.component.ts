import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  constructor(public fb: FormBuilder, public router: Router, public userService: UserService) {
    this.signInForm = fb.group({
      userName: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login (): void {

    this.userService.userAuthentication(
      this.signInForm.value.userName,
      this.signInForm.value.password).subscribe((data: any) => {
      alert(data.token);
      localStorage.setItem('userToken', data.token);
      this.router.navigate(['/home']);
    },
    (err: HttpErrorResponse) => {
      alert(err);
    });

  }
  signUpHandler(): void {
    this.router.navigate(['/user/signup']);

  }
}
