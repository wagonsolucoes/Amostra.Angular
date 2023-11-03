import { ClienteViewModel } from "./ClienteViewModel";

export interface ResponseCliente {
    StatusCode: any;
    Objeto: ClienteViewModel;
    Msg: any;
    _ValidationResult: any;
    Expired:any;
  }