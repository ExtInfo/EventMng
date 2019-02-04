import { AbstractControl } from '@angular/forms';

export function EmailValidator(control: AbstractControl): {[key: string]: any} | null {
    const email: string = control.value;
    const email_regex = /^\w+[\w-\.]*\@\w+((-\w+)|(\w*))\.[a-z]{2,3}$/i;
    if (email == '' || email_regex.test(email)) {
      return null;
    } else
    return {'emailError' : true};
  }
  