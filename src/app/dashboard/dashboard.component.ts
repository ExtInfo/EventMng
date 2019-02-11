import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isHidden: boolean;
  isNavTabClick: string;

  constructor(public router: Router) {
    this.isHidden = true;
    this.isNavTabClick = 'home';
  }

  ngOnInit() {
    this.router.navigate(['/dashboard/home']);
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
        this.router.navigate(['/dashboard/logout']);
        this.isNavTabClick = 'logout';
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
