import { Component, OnInit } from '@angular/core';
import { BaseService } from '../home/base.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public baseService: BaseService) { }

  ngOnInit() {
    this.getAllEventsData();
  }

  getAllEventsData(): void {
    console.log('userData is here' + JSON.stringify(JSON.parse(localStorage.userData)));
    const uData = JSON.parse(localStorage.userData);
    this.baseService.loadDashboard(uData.userId, uData.userToken).subscribe((eventRes: any) => {
        console.log('event resss' + JSON.stringify(eventRes));
    }, (err: HttpErrorResponse) => {
      alert(err);
    }
    );
  }

}
