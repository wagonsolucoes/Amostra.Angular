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
import { LivroViewModel } from '../interfaces/LivroViewModel';

let domain : string = "http://localhost:5062";
@Injectable({providedIn: 'root'})
export class LivroService {
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
        domain + '/api/Livro/Filtro/' + IniciaEm + '/' + req.Rows + '/' + (req.ValFilter == "" ? encodeURIComponent(" ") : req.ValFilter) + '/' + req.ColOrder + '/' + req.ColDirectrion,
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1));
  }

  DdlLivro(): Observable<any> {
    return this.http
    .get<any>(
        domain + '/api/Livro/DdlLivro',
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1));
  }

  Insert(req: LivroViewModel): Observable<any> {
    return this.http
    .post<any>(
        domain + '/api/Livro/Add',
        JSON.stringify(req),
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1), catchError(this.u.handleError));
  }

  Update(req: LivroViewModel): Observable<any> {
    return this.http
    .put<any>(
        domain + '/api/Livro/Update',
        JSON.stringify(req),
        this.u.GetHeaderBearer()
    )
    .pipe(retry(1), catchError(this.u.handleError));
  }

  Delete(req: LivroViewModel): Observable<any> {
      return this.http
      .delete<any>(
          domain + '/api/Livro/Delete/' + req.id,
          this.u.GetHeaderBearer()
      )
      .pipe(retry(1), catchError(this.u.handleError));
  }
}
