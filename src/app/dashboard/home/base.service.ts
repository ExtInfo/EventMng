import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppConstant } from '../../shared/utility/constant';
import { Observable, pipe } from 'rxjs';
import { share } from 'rxjs/operators';


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
    return this.http.get(this.rootURL + '/events/getAllEvents', { headers: reqHeaders, params: {uid: userId} }).pipe(share());
  }


}
