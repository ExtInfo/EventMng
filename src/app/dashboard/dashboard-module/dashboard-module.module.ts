import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { jqxCalendarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';
import { CustomdatePipe } from '../../shared/utility/customdate.pipe';

import { DashboardModuleRoutingModule , DashboardRoutingComponenets} from './dashboard-module-routing.module';

@NgModule({
  declarations: [
    DashboardRoutingComponenets,
    jqxCalendarComponent,
    CustomdatePipe
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    NgbModule.forRoot()
  ]
})
export class DashboardModuleModule { }
