import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  elegantForm: FormGroup;
  constructor(public fb: FormBuilder) {
    this.elegantForm = fb.group({
      elegantFormEmailEx: ['', [ Validators.required, Validators.email]],
      elegantFormPasswordEx: ['', Validators.required],

    });
  }

  ngOnInit() {
  }

  login (): void {

  }
  signUpHandler(): void {

  }
}
