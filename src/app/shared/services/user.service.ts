import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { HttpHeaderResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  rootUrl: String = 'http://192.168.32.153:3004';
  constructor(public http: HttpClient) { }

  registerUser (user: any): Observable<any> {

    const { firstName, lastName, email, dob, country, password } = user;
    const body: any = {
      firstName, lastName, email, dob, country, password
    };
    const reqHeader = new HttpHeaders({'Content-Type': 'application/json','access-opt':'95445'});
    return this.http.post(this.rootUrl + '/users/registerUser', body);
  }
  verifyEmail (email: string) {
    const body: any = {
      email: email
    };
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json'});
    return this.http.post(this.rootUrl + '/users/verify', body, { headers: reqHeader });
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
