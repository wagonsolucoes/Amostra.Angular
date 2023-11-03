import { AfterViewInit, Component } from '@angular/core';

import { navItems } from './_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements  AfterViewInit {

  public bChange:any = false;
  public navItems = navItems;
  public navItems2 = navItems;

  public perfectScrollbarConfig = {
    suppressScrollX: true,
  };

  ngAfterViewInit() {   
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(2) > a")).style.display='';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(3) > a")).style.display='none';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(4) > a")).style.display='none';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(5) > a")).style.display='none';
    window.open("/#/theme/login","_parent");
  }

  constructor() {}
}