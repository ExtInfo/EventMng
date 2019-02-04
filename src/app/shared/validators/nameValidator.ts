import { AbstractControl } from '@angular/forms';

export function NameValidator (control: AbstractControl) : {[key: string]: any} | null {
    const name = control.value;
    const validName = /^[a-zA-Z]*$/.test(name);
    if (validName)
        return null;
    else    
        return {'characterError' : true};
}