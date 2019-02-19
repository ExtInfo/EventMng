import { Component, OnInit, AfterViewInit, ChangeDetectionStrategy,Input } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../shared/services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AlertService } from '../../shared/component/alert/alert.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService, GoogleLoginProvider, FacebookLoginProvider } from 'angular-6-social-login';


@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})

export class SigninComponent implements OnInit, AfterViewInit {
  public signInForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService,
    private spinner: NgxSpinnerService,
    private socialAuthService: AuthService) {
    this.signInForm = fb.group({
      userName: ['', [ Validators.required, Validators.email]],
      password: ['', Validators.required],
      rememberMeFlag : ['', []]
    });
  }

  ngOnInit() {
  }

  login (): void {
    this.spinner.show();
    this.userService.userAuthentication(
      this.signInForm.value.userName,
      this.signInForm.value.password).subscribe((data: any) => {
        this.spinner.hide();
        if (data.auth) {
          const uData = {
            userId: data.userData.userId,
            userToken: data.token
          };
          localStorage.setItem('userData', JSON.stringify(uData));
          this.router.navigate(['/dashboard']);
        } else {
          this.alertService.confirm('Event Manager', data.message).then((confirmed) => console.log('User confirmed:', confirmed))
          .catch(() => console.log('error added '));
        }
    }, (err: HttpErrorResponse) => {
        this.spinner.hide();
        const errorMessage =  (err.error && err.error.message) ? err.error.message : (err.message) ? err.message : 'ERROR !! occured.';
        this.alertService.confirm('Event Manager', errorMessage).then((confirmed) => console.log('User confirmed:', confirmed))
          .catch(() => console.log('error added '));
    });
  }
  socialSignIn(socialPlatform: String): void {
    alert(socialPlatform);
    let socialPlatformProvider;
    if ( socialPlatform === 'facebook') {
      socialPlatformProvider = FacebookLoginProvider.PROVIDER_ID;
    } else if (socialPlatform === 'google') {
      socialPlatformProvider = GoogleLoginProvider.PROVIDER_ID;
    }
    this.socialAuthService.signIn(socialPlatformProvider).then(
      (userData) => {
        console.log(" sign in data : " , userData);
      }
    );
  }
  ngAfterViewInit () {
      if (sessionStorage.getItem('usernameData')) {
        const { username, password } = JSON.parse(sessionStorage.getItem('usernameData'));
        this.signInForm.controls['userName'].setValue(username);
        this.signInForm.controls['password'].setValue(password);
      }
  }

  rememberMeHandler(): void {
    if (this.signInForm.value.rememberMeFlag) {
      const userObj = JSON.stringify({ 'username': this.signInForm.value.userName, 'password': this.signInForm.value.password });
      sessionStorage.setItem('usernameData', userObj);
    } else {
      sessionStorage.removeItem('usernameData');
    }
  }

  forgotPasswordHandler(): void {
    this.alertService.confirm('Event Manager', 'Work In Progress...')
    .then((confirmed) => console.log('User confirmed:', confirmed))
    .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
  }

  onInputChangeHandler (): void {
    this.rememberMeHandler();
  }
}
