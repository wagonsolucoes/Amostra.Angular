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
import { RequestListEmprestadoInterface } from '../interfaces/RequestListEmprestadoInterface';
import { Util } from '../interceptor/Util';
import { JwtResponse } from '../interfaces/jwtResponse';
import { EmprestadoViewModel } from '../interfaces/EmprestadoViewModel';

let domain : string = "http://localhost:5062";
@Injectable({providedIn: 'root'})
export class EmprestadoService {
  constructor(
      protected http: HttpClient,
      private u: Util
  ) {}

  Lista(req: RequestListEmprestadoInterface): Observable<any> {
      debugger
      if(req.Page == 1){
        var IniciaEm = 0;
      }
      else{
        var IniciaEm = (req.Page * req.Rows) - req.Rows;
      }
      if(req.IdLivro == undefined){
        req.IdLivro = " ";
      }
      if(req.IdCliente == undefined){
        req.IdCliente = " ";
      }
      let sUrl = domain + '/api/Emprestado/Filtro/' + IniciaEm + '/' + req.Rows + '/' + req.IdLivro + '/' + req.IdCliente + '/' + req.ColOrder + '/' + req.ColDirectrion;
      return this.http
      .get<any>(
          sUrl,
          this.u.GetHeaderBearer()
      )
      .pipe(retry(1));
  }

  Insert(req: EmprestadoViewModel): Observable<any> {
    return this.http
    .post<any>(
        domain + '/api/Emprestado/Add',
        JSON.stringify(req),
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1), catchError(this.u.handleError));
  }

  Update(req: EmprestadoViewModel): Observable<any> {
    return this.http
    .put<any>(
        domain + '/api/Emprestado/Update',
        JSON.stringify(req),
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1), catchError(this.u.handleError));
  }

  Delete(req: EmprestadoViewModel): Observable<any> {
      debugger
      return this.http
      .delete<any>(
          domain + '/api/Emprestado/Delete/' + req.id,
          this.u.GetHeaderBearer()
      )
      .pipe(retry(1), catchError(this.u.handleError));
  }
}
