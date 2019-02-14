import { Component, OnInit, ViewEncapsulation, ViewChild, AfterViewInit, ElementRef} from '@angular/core';
import { BaseService } from '../home/base.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import { jqxCalendarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { Element } from '@angular/compiler/src/render3/r3_ast';

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
  myCalendarEvent (event: any)  {
    const date = event.args.date;
    const view = event.args.view;
    const viewFrom = view.from;
    const viewTo = view.to;
    console.log(date, view, viewFrom, viewTo);
    this.calenderPanel.nativeElement.innerHTML = date.toLocaleDateString();
  }
  ngAfterViewInit (){
    this.eventCalender.addSpecialDate(new Date('02/12/2019'), '' , 'Date 1');
    this.eventCalender.addSpecialDate(new Date('02/13/2019'), '' , 'Date 2');
    this.eventCalender.addSpecialDate(new Date('02/14/2019'), '' , 'Date 3');
  }

  getAllEventsData(): void {
    if(localStorage.userData){
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


}
