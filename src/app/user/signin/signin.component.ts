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
  elegantForm: FormGroup;
  constructor(public fb: FormBuilder, public router: Router, public userService: UserService) {
    this.elegantForm = fb.group({
      elegantFormEmailEx: ['', [ Validators.required, Validators.email]],
      elegantFormPasswordEx: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

  login (): void {
    this.userService.userAuthentication(
      this.elegantForm.value.elegantFormEmailEx,
      this.elegantForm.value.elegantFormPasswordEx).subscribe((data : any) => {
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
