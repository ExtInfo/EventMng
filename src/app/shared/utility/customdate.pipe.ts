import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mdydateformat'
})
export class CustomdatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    const d = new Date(value);
    const dateString = '' + d.getMonth() + ' ' + d.getDay() + ' ' + d.getFullYear();
    return dateString;
  }


}
