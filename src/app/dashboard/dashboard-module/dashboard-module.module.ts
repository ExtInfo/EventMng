import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardModuleRoutingModule , DashboardRoutingComponenets} from './dashboard-module-routing.module';

@NgModule({
  declarations: [
    DashboardRoutingComponenets
  ],
  imports: [
    CommonModule,
    DashboardModuleRoutingModule,
  ]
})
export class DashboardModuleModule { }
