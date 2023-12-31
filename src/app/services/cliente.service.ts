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
      if(req.Page == 1){
        var IniciaEm = 0;
      }
      else{
        var IniciaEm = (req.Page * req.Rows) - req.Rows;
      }
      return this.http
      .get<any>(
          domain + '/api/Clientes/' + IniciaEm + '/' + req.Rows + '/' + (req.ValFilter == "" ? encodeURIComponent(" ") : req.ValFilter) + '/' + req.ColOrder + '/' + req.ColDirectrion,
          this.u.GetHeaderBearer()
      )
      .pipe(retry(1));
  }

  DdlCliente(): Observable<any> {
    return this.http
    .get<any>(
        domain + '/api/Clientes/DdlCliente',
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1));
  }

  Insert(req: ClienteViewModel): Observable<any> {
    return this.http
    .post<any>(
        domain + '/api/Clientes/Add',
        JSON.stringify(req),
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1), catchError(this.u.handleError));
  }

  Update(req: ClienteViewModel): Observable<any> {
    return this.http
    .put<any>(
        domain + '/api/Clientes/Update',
        JSON.stringify(req),
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1), catchError(this.u.handleError));
  }

  Delete(req: ClienteViewModel): Observable<any> {
      return this.http
      .delete<any>(
          domain + '/api/Clientes/Delete/' + req.documento,
          this.u.GetHeaderBearer()
      )
      .pipe(retry(1), catchError(this.u.handleError));
  }

  Viacep(cep: any): Observable<any> {
      return this.http
      .get<any>(
          domain + '/api/Clientes/Cliente/Viacep/' + cep
      )
      .pipe(retry(1), catchError(this.u.handleError));
  }
}
