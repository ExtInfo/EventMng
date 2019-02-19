import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../shared/component/alert/alert.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isHidden: boolean;
  isNavTabClick: string;

  constructor(
    public router: Router,
    private alertService: AlertService
    ) {
    this.isHidden = true;
    this.isNavTabClick = 'home';
  }

  ngOnInit() {
    //this.router.navigate(['/dashboard/home']);
  }

  OnNavTabClick(tabName: string) {
    switch (tabName) {
      case 'home' :
        this.router.navigate(['/dashboard/home']);
        this.isNavTabClick = 'home';
        break;
      case 'profile' :
        this.router.navigate(['/dashboard/profile']);
        this.isNavTabClick = 'profile';
        break;
      case 'about' :
        this.router.navigate(['/dashboard/about']);
        this.isNavTabClick = 'about';
        break;
      case 'logout' :

      this.alertService.confirm('Event Manager', 'Are you sure you want to log out ?').then((confirmed) => {
        console.log('User confirmed:', confirmed);
        if (confirmed) {
          localStorage.removeItem('userData');
          const backlen = history.length;
          history.go(-backlen);
          window.location.href = '/';
          this.isNavTabClick = 'logout';
        }
      }).catch(() => console.log('error added '));
       break;
    }

  }
  menuToggleHandler() {
    this.isHidden = !this.isHidden;
  }
  getClasses (value: boolean) {
    let newClasses;
    if (value) {
      newClasses = {
        'sidenavOpen' : true,
        'sidenavClose' : false
      };
    } else {
      newClasses = {
        'sidenavOpen' : false,
        'sidenavClose' : true
      };
    }
    return newClasses;
  }

  getClass (value: boolean) {
    let getClass;
    if (value) {
      getClass = {
        'menutoggleOpen' : true,
        'menutoggleClose' : false
      };
    } else {
      getClass = {
        'menutoggleOpen' : false,
        'menutoggleClose' : true
      };
    }
    return getClass;
  }
}
