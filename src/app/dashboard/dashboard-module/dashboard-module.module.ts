import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { jqxCalendarComponent } from 'jqwidgets-scripts/jqwidgets-ts/angular_jqxcalendar';

import { DashboardModuleRoutingModule , DashboardRoutingComponenets} from './dashboard-module-routing.module';

@NgModule({
  declarations: [
    DashboardRoutingComponenets,
    jqxCalendarComponent
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    NgbModule
  ]
})
export class DashboardModuleModule { }
