import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { APP_IMPORTS } from './app.imports';
import { NgxSpinnerModule } from 'ngx-spinner';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthInterceptor } from './shared/auth/auth.interceptors';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AlertComponent } from './shared/component/alert/alert.component';
import { AlertService } from './shared/component/alert/alert.service'

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    AlertComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgbModule.forRoot(),
    ...APP_IMPORTS
  ],
  providers: [
    AlertService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  entryComponents: [AlertComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
