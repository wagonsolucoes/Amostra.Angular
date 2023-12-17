import { EmprestadoViewModel } from "./EmprestadoViewModel";

export interface ResponseEmprestado {
    StatusCode: any;
    Objeto: EmprestadoViewModel;
    Msg: any;
    _ValidationResult: any;
    Expired:any;
  }
