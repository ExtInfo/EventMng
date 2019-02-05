import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  isHidden: boolean;

  constructor() { 
    this.isHidden = true;
  }

  ngOnInit() {
  }

  menuToggleHandler(){
    this.isHidden = !this.isHidden
  }
  getClasses (value:boolean) {
    let newClasses;
    if (value) {
      newClasses = {
        'sidenavOpen' : true,
        'sidenavClose' : false,
      } 
    } else {
      newClasses = {
        'sidenavOpen' : false,
        'sidenavClose' : true,
      } 
    }
    return newClasses;
  }

  getClass (value:boolean) {
    let getClass;
    if (value) {
      getClass = {
        'menutoggleOpen' : true,
        'menutoggleClose' : false,
      } 
    } else {
      getClass = {
        'menutoggleOpen' : false,
        'menutoggleClose' : true,
      } 
    }
    return getClass;
  }
}
