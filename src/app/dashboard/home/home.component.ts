import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { BaseService } from '../home/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { jqxCalendarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { Element } from '@angular/compiler/src/render3/r3_ast';
import { Observable, from, pipe, of} from 'rxjs';
import { filter} from 'rxjs/operators';


@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [NgbCarouselConfig]
})
export class HomeComponent implements OnInit, AfterViewInit {
  @ViewChild('eventCalender') eventCalender: jqxCalendarComponent;
  @ViewChild('calenderPanel') calenderPanel: ElementRef;
  draftCount: Number = 0;
  pendingCount: Number = 0;
  eventData: any;
  selectedDateEvents: Array<any> = [];
  testArray = [1, 2, 3];
  getDateArray: any;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  constructor(public baseService: BaseService, config: NgbCarouselConfig) {
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
   }

  ngOnInit() {

  }
  myCalendarEvent (event: any)  {
    const date = event.args.date;
    let filteredArray = [];
    const compareFn = (a, b) => {
      if (a.StartTime < b.StartTime) {
        return -1;
      }
      if (a.StartTime > b.StartTime) {
        return 1;
      }
      return 0;
    };
    if (this.eventData && this.eventData.length > 0) {
        filteredArray = this.eventData.filter((v) =>
        (new Date(v.StartDate).getFullYear() === date.getFullYear()
        && new Date(v.StartDate).getDate() === date.getDate()
        && new Date(v.StartDate).getMonth() === date.getMonth()));
    }
    this.selectedDateEvents = (filteredArray && filteredArray.length > 0) ? filteredArray.sort(compareFn) : [];
  }
  ngAfterViewInit () {
    this.getAllEventsData();
  }

  getAllEventsData(): void {
    if (localStorage.userData){
        console.log('userData is here' + JSON.stringify(JSON.parse(localStorage.userData)));
        const uData = JSON.parse(localStorage.userData);
        this.baseService.loadDashboard(uData.userId, uData.userToken).subscribe((eventRes: any) => {
          this.eventData = eventRes;
          this.eventDashboardHandler(eventRes);
        }, (err: HttpErrorResponse) => {
          alert(err);
        });
    }
  }
  eventDashboardHandler (events: any): void {
   [this.draftCount, this.pendingCount, this.getDateArray] = events.reduce(([draft, pending, dateArray], v) => {
         if (v.Status === 'Draft') {
             draft++;
         }
         if (v.Status === 'Pending') {
             pending++;
          }
          if (dateArray.indexOf(v.StartDate)) {
            dateArray.push(v.StartDate);
            let d1 = new Date(v.StartDate);
            this.eventCalender.addSpecialDate(d1, '' , 'Special Date1');
          }
         return [draft, pending, dateArray];
     }, [0, 0, []]);
  }
}
