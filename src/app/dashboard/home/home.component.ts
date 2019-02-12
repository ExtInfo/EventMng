import { Component, OnInit } from '@angular/core';
import { BaseService } from '../home/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit {
  draftCount;
  testArray = [1, 2, 3];
  showNavigationArrows = false;
  showNavigationIndicators = false;
  constructor(public baseService: BaseService, config: NgbCarouselConfig) {
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
   }

  ngOnInit() {
    this.getAllEventsData();
  }

  getAllEventsData(): void {
    console.log('userData is here' + JSON.stringify(JSON.parse(localStorage.userData)));
    const uData = JSON.parse(localStorage.userData);
    this.baseService.loadDashboard(uData.userId, uData.userToken).subscribe((eventRes: any) => {
        console.log('event resss' + JSON.stringify(eventRes));
       this.draftCount = eventRes.length;
    }, (err: HttpErrorResponse) => {
      alert(err);
    }
    );
  }

}
