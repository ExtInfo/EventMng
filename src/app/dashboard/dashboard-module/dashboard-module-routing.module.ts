import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from '../home/home.component';
import {ProfileComponent} from '../profile/profile.component';
import {AboutComponent} from '../about/about.component';
import {LogoutComponent} from '../logout/logout.component';
import {DashboardComponent} from '../dashboard.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children : [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'about',
        component: AboutComponent
      },
      {
        path: 'logout',
        component: LogoutComponent
      }
    ]
}
  // { path: 'home', component: HomeComponent},
  // { path: 'profile', component: ProfileComponent}
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardModuleRoutingModule { }
export const DashboardRoutingComponenets = [DashboardComponent, HomeComponent, ProfileComponent, AboutComponent, LogoutComponent];
