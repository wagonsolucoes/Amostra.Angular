import { retry, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';

import { LoginInterface } from "../interfaces/loginInterface";
import { Util } from '../interceptor/Util';

@Injectable({providedIn: 'root'})
export class LoginService {
  constructor(
    protected http: HttpClient,
    private u: Util
  ) {}
 
  ExecLogin(req: LoginInterface) {
    return this.http
      .post<any>(
        'http://localhost:5062/api/Auth/login',
        JSON.stringify(req),        
        this.u.GetHttpHeaders()
      )
      .pipe(retry(1), catchError(this.u.handleError));
  }
}