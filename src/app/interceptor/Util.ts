import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { LoginInterface } from "../interfaces/loginInterface";
import { JwtResponse } from "../interfaces/jwtResponse"

import {
  HttpRequest,
  HttpHandler,
  HttpEvent, 
  HttpInterceptor
} from '@angular/common/http';
import { RequestListInterface } from '../interfaces/RequestListInterface';
import * as moment from 'moment';

@Injectable({providedIn: 'root'})
export class Util {
  constructor(protected http: HttpClient) {
  }
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }  

  GetBearer(){
      var oJwt = "";
      var value = localStorage.getItem('AmostraData');
      if (value != '' && value != null && typeof value != "undefined") {
          let obj = JSON.parse(value);
          if(!this.IsExpired(obj.expiration))
          {
              oJwt = "Bearer " +  obj.token;
          }  
      }
      return oJwt;
  }

  GetHeaderBearer(){
      return {
          headers: new HttpHeaders({
              'content-type': 'application/json', 'Accept':'text/plain', 'Accept-Encoding':'gzip, deflate, br', 'Authorization': this.GetBearer()
          }),
      };
  }

  GetHttpHeaders(){
    return {
      headers: new HttpHeaders({
        'content-type': 'application/json', 'Accept':'text/plain', 'Accept-Encoding':'gzip, deflate, br'
      }),
    };
  }

  VerificaExpired(){    
    let b = false;
    var value = localStorage.getItem('token');
    if (value != '' && value != null && typeof value != "undefined") {
      let obj = JSON.parse(value);
      b = this.IsExpired(obj.objeto.validade)
    }
    
    return b;
  }

  IsExpired(date_time:any){
    var b = true;
    var d = moment(date_time);
    var now = new Date(),
        dnow = moment(now),
        snow = dnow.minute() % 15,
        diffnow = 15 - snow,
        tonow = moment(dnow).add('minute', diffnow);
    if (tonow < d) {
        b=false;
    }
    return b;
  }

  GetJwt(){
    var oJwt = {} as JwtResponse;
    var value = localStorage.getItem('AmostraData');
    if (value != '' && value != null && typeof value != "undefined") {
      let obj = JSON.parse(value);
      if(!this.IsExpired(obj.expiration))
      {
          oJwt.token = obj.token;
          oJwt.expiration = obj.expiration;
      }  
    }
    return oJwt;
  }
  
}