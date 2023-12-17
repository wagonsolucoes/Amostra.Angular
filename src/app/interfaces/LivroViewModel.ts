export interface LivroViewModel {
  id: string;
  dhCompra: Date;
  dhDevolucao: Date;
  titulo: string;
  prefacio: string;
  autor: string;
  editora: string;
  dhExtravio: Date;
  extraviado:boolean;
  emprestado:boolean;
  ativo:boolean;
}
