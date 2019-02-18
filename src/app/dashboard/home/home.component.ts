import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { BaseService } from '../home/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbCarouselConfig, NgbCarousel } from '@ng-bootstrap/ng-bootstrap';
import { jqxCalendarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [ NgbCarouselConfig, NgbCarousel ]
})
export class HomeComponent implements OnInit, AfterViewInit{
  @ViewChild('eventCalender') eventCalender: jqxCalendarComponent;
  @ViewChild('calenderPanel') calenderPanel: ElementRef;
  draftCount: Array<any> = [];
  pendingCount: Array<any> = [];
  eventData: any;
  selectedDateEvents: any;
  testArray = [1, 2, 3];
  getDateArray: any;
  showNavigationArrows = false;
  showNavigationIndicators = false;
  constructor(public baseService: BaseService, public config: NgbCarouselConfig,
    private ngbCarousel: NgbCarousel, public spinner: NgxSpinnerService, private router: Router) {
      config.showNavigationArrows = true;
      config.showNavigationIndicators = true;
      config.interval = 3000;
    }

  ngOnInit() {
    this.spinner.show();
    this.getAllEventsData();
  }

  calenderEventHandler (event: any)  {
    const date = event.args.date;
    const view = event.args.view;
    const viewFrom = view.from;
    const viewTo = view.to;
    let t = this.eventData.filter((v) =>
    (new Date(v.StartDate).getFullYear() === date.getFullYear()
    && new Date(v.StartDate).getDay() === date.getDay()
    && new Date(v.StartDate).getMonth() === date.getMonth()));
    const compareFn = (a, b) => {
      if (a.StartTime < b.StartTime) {
        return -1;
      }
      if (a.StartTime > b.StartTime) {
        return 1;
      }
      return 0;
    };
    this.selectedDateEvents = t.sort(compareFn);
  }

  ngAfterViewInit () {
    setInterval( () => this.spinner.hide() , 3000);
  }

  getAllEventsData(): void {
    if (localStorage.userData) {
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

  createEventHandler(): void {
    this.router.navigate(['/dashboard/create']);
  }
  eventDashboardHandler (events: any): void {
   [this.draftCount, this.pendingCount, this.getDateArray] = events.reduce(([draft, pending, dateArray], v) => {
         if (v.Status === 'Draft') {
             draft.push(v);
         }
         if (v.Status === 'Pending') {
             pending.push(v);
          }
          if (dateArray.indexOf(v.StartDate)) {
            dateArray.push(v.StartDate);
            this.eventCalender.addSpecialDate(new Date(v.StartDate), '' , '');
          }
         return [draft, pending, dateArray];
     }, [[], [], []]);
  }
}
