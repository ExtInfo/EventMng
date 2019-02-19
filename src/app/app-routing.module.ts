import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', redirectTo: '/user/signin', pathMatch: 'full'},
  {path: 'dashboard', loadChildren: './dashboard/dashboard-module/dashboard-module.module#DashboardModuleModule', data: {animation: '2'}},
  { path: 'user', loadChildren: './user/user/user.module#UserModule'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false } )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
