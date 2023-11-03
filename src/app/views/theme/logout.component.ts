import { AfterViewInit, Component, ElementRef, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';

@Component({
  templateUrl: 'logout.component.html'
})
export class LogoutComponent implements AfterViewInit {

  constructor() {}

  msgErro:string="";
  ngAfterViewInit (): void {
    localStorage.removeItem("AmostraData");
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(2) > a")).style.display='';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(3) > a")).style.display='none';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(4) > a")).style.display='none';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(5) > a")).style.display='none';
    window.open("/#/theme/login","_parent");
  }

}
