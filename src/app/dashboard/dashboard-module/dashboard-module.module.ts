import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { DashboardModuleRoutingModule , DashboardRoutingComponenets} from './dashboard-module-routing.module';

@NgModule({
  declarations: [
    DashboardRoutingComponenets
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
    NgbModule
  ]
})
export class DashboardModuleModule { }
