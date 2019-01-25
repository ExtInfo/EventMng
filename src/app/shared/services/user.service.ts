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
  registerUser (user: User): Observable<any> {
    const body: User = {
      Email: user.Email,
      FirstName: user.FirstName,
      LastName: user.LastName,
      Country: user.Country,
      DOB: user.DOB
    };
    const reqHeader = new HttpHeaders({'No-Auth': 'True'});
    return this.http.post(this.rootUrl + '/api/', body, {headers : reqHeader});
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
