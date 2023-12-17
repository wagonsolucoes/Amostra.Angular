import { ClienteViewModel } from "./ClienteViewModel";
import { LivroViewModel } from "./LivroViewModel";
export interface EmprestadoViewModel {
  id: string;
  idCliente: string;
  idLivro: string;
  dh: Date;
  dhDevolucao: Date;
  diasEmprestado: any;
  ativo:boolean;
  cliente: ClienteViewModel;
  livro: LivroViewModel;
}
