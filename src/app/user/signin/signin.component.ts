import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../shared/component/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  signInForm: FormGroup;
  constructor(public fb: FormBuilder,
    public router: Router,
    public userService: UserService,
    public alertService: AlertService,
    public spinner: NgxSpinnerService) {
    this.signInForm = fb.group({
      userName: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login (): void {
    this.spinner.show();

    this.userService.userAuthentication(
      this.signInForm.value.userName,
      this.signInForm.value.password).subscribe((data: any) => {
      console.log(data);
      this.spinner.hide();
      if (data.auth) {
        const uData = {
          userId: data.userId,
          userToken: data.token
        };
        localStorage.setItem('userData', JSON.stringify(uData));
        this.router.navigate(['/dashboard']);
      } else {
        this.alertService.confirm('Event Manager', data.message).then((confirmed) => console.log('User confirmed:', confirmed))
        .catch(() => console.log('error added '));
      }
    },
    (err: HttpErrorResponse) => {
      this.spinner.hide();
      if (err.error && err.error.message) {
        this.alertService.confirm('Event Manager', err.error.message).then((confirmed) => console.log('User confirmed:', confirmed))
        .catch(() => console.log('error added '))
      } else {
        this.alertService.confirm('Event Manager', err.message).then((confirmed) => console.log('User confirmed:', confirmed))
        .catch(() => console.log('error added '));
      }
    });

  }

  forgotPasswordHandler(): void {
    this.alertService.confirm('Event Manager', 'Work In Progress...')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }
}
