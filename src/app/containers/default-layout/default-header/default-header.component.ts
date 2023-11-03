import { AfterViewInit, Component, HostBinding, Inject, Input, OnInit, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';

import { getStyle, rgbToHex } from '@coreui/utils/src';
import { FormControl, FormGroup } from '@angular/forms';

import { ClassToggleService, HeaderComponent } from '@coreui/angular';

import { LoginInterface } from '../../../interfaces/loginInterface'
import { LoginService } from '../../../services/login.service'
import { LoginResponse } from '../../../interfaces/loginResponse';

@Component({
  selector: 'app-default-header',
  templateUrl: './default-header.component.html',
})
export class DefaultHeaderComponent extends HeaderComponent {

  @Input() sidebarId: string = "sidebar";

  public newMessages = new Array(4)
  public newTasks = new Array(5)
  public newNotifications = new Array(5)

  constructor(
      private http: HttpClient,
      private classToggler: ClassToggleService,
      private srv: LoginService,
    ) {
    super();
  }

  req = {} as LoginInterface
  usr:string="rh@targetsoftware.com.br";
  pwd:string="Targetsoftware2023@";
  msgErro:string="";
  Logar(){    
    const headers = { 'content-type': 'application/json', 'Accept':'*/*'}  
    const body=JSON.stringify(this.req);
    this.http.post<any>('http://localhost:33755/Cliente/ListaClientes', body, {'headers':headers}).subscribe(data => {
      //debugger
      if(data.statusCode == 200){
      }
      else{
        this.msgErro = data.msg;
      }
    });
  }
}
