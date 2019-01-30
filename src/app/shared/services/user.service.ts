import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpHeaderResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl: String = 'https://ext-login2.herokuapp.com';
  constructor(public http: HttpClient) { }

  registerUser (user: any): Observable<any> {
    const body: any = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      dob: user.dob,
      gender: user.gender
    };
    const  body2 = {
      'username': 'nsdeshmukh08',
      'email': 'nsdeshmukh08@gmail.com',
      'password': '123'
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True', 'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/register', body2);
  }

  userAuthentication (userName, passwordObj): Observable<any> {
    const body: any = {
      email: userName,
      password: passwordObj
    };
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    return this.http.post(this.rootUrl + '/login', body, { headers: reqHeader });
  }

}
