import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpHeaderResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl: String = 'https://event-mng-server.herokuapp.com';
  constructor(public http: HttpClient) { }

  registerUser (user: any): Observable<any> {
    const { firstName, lastName, email, dob, country, password, otpNum } = user;
    const body: any = {
      firstName, lastName, email, dob, country, password, otpNum
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/users/registerUser', body, {headers: reqHeader});
  }
  verifyEmail (email: string): Observable <any> {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'access-token': 'test'});
    return this.http.get(this.rootUrl + '/users/verifyEmail', {headers: reqHeader, params: {email: email}});
  }
  userAuthentication (userName, passwordObj): Observable<any> {
    const body: any = {
      email: userName,
      password: passwordObj
    };
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/users/login', body, { headers: reqHeader });
  }

}
