import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { getStyle, rgbToHex } from '@coreui/utils/src';
import { HttpClient } from '@angular/common/http';
import { LoginInterface } from '../../interfaces/loginInterface'
import { LoginService } from '../../services/login.service'
import { LoginResponse } from '../../interfaces/loginResponse';

@Component({
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }
  bDanger:any = false;
  bDismissible:any = true;
  req = {} as LoginInterface

  msgErro:string="";
  ngOnInit(): void {
    this.req.Username="wagleandro@hotmail.com";
    this.req.Password="R3c31t4@";
    (<HTMLInputElement>document.querySelector("#aLogoff")).style.display='none';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(2) > a")).style.display='';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(3) > a")).style.display='none';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(4) > a")).style.display='none';
    (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(5) > a")).style.display='none';
  }

  Logar(){
    const headers = { 'content-type': 'application/json', 'Accept':'text/plain', 'Accept-Encoding':'gzip, deflate, br' }
    const body=JSON.stringify(this.req);
    this.http.post<any>('http://localhost:5062/api/Auth/login',body, {'headers':headers}).subscribe({
        next: data => {
          if(data.token != null){
            localStorage.setItem('AmostraData', JSON.stringify(data));
            (<HTMLInputElement>document.querySelector("#aLogoff")).style.display='';
            (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(2) > a")).style.display='none';
            (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(3) > a")).style.display='';
            (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(4) > a")).style.display='';
            (<HTMLInputElement>document.querySelector("#navId > c-sidebar-nav-link:nth-child(5) > a")).style.display='';
            window.open("/#/theme/cliente","_parent");
          }
          else{
            (<HTMLInputElement>document.querySelector("#aLogoff")).style.display='none';
            this.bDanger = true;
            this.msgErro = data.msg;
          }
        },
        error: error => {
          this.bDanger = true;
          this.msgErro = " API indisponível, tente mais tarde.";
        }
    })
  }

}
