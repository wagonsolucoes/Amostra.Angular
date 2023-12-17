import { LivroViewModel } from "./LivroViewModel";

export interface ResponseLivro {
    StatusCode: any;
    Objeto: LivroViewModel;
    Msg: any;
    _ValidationResult: any;
    Expired:any;
  }
