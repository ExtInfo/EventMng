import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../shared/utility/constant';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  rootURL: String = AppConstant.API_ENDPOINT;
  constructor(public http: HttpClient) { }

  loadDashboard (userId: string, token: string): Observable<any> {
    const reqHeaders = {
        'access-token': token
    };
    return this.http.get(this.rootURL + '/getAllEvents', { headers: reqHeaders, params: {uid: userId} });
  }


}
