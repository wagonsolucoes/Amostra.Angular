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

import * as moment from 'moment';
import { RequestListInterface } from '../interfaces/RequestListInterface';
import { Util } from '../interceptor/Util';
import { JwtResponse } from '../interfaces/jwtResponse';
import { ClienteViewModel } from '../interfaces/ClienteViewModel';

let domain : string = "http://localhost:5062";
@Injectable({providedIn: 'root'})
export class ClienteService {
    constructor(
        protected http: HttpClient,
        private u: Util
    ) {}

    Lista(req: RequestListInterface): Observable<any> {
        debugger
        return this.http
        .get<any>(
            domain + '/api/Clientes/' + req.Page + '/' + req.Rows + '/' + (req.ValFilter == "" ? " " : req.ValFilter) + '/' + req.ColOrder + '/' + req.ColDirectrion,       
            this.u.GetHeaderBearer()
        )
        .pipe(retry(1), catchError(this.u.handleError));
    }   

    Insert(req: ClienteViewModel): Observable<any> {
        return this.http
        .post<any>(
            domain + '/api/Clientes',
            JSON.stringify(req),        
            this.u.GetHeaderBearer()
        )
        .pipe(retry(1), catchError(this.u.handleError));
    }   

    Update(req: ClienteViewModel): Observable<any> {
        return this.http
        .put<any>(
            domain + '/api/Clientes',
            JSON.stringify(req),        
            this.u.GetHeaderBearer()
        )
        .pipe(retry(1), catchError(this.u.handleError));
    }

    Delete(req: ClienteViewModel): Observable<any> {
        return this.http
        .delete<any>(
            domain + '/api/Clientes/' + req.cpfCnpj
        )
        .pipe(retry(1), catchError(this.u.handleError));
    }    
    
}