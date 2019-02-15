import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
private token: string;
  constructor() { }

  getTokenDetails(): any {
    let payload;
    if (localStorage.getItem('userData')) {
      this.token = JSON.parse(localStorage.getItem('userData')).userToken;
    }
    if (this.token) {
      payload = this.token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
   isLoggedIn(): boolean {
     let tokenDetails;
     tokenDetails = this.getTokenDetails();
     if (tokenDetails) {
        return tokenDetails.exp > Date.now() / 1000;
     } else {
       return false;
     }
   }
}
