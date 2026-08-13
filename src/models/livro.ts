export interface Livro {
  id: number;
  titulo: string;
  isbn: string;
  qtd_total: number;
  disponiveis: number;
  ativo: number;
  autores: string;
}

export interface LivroEmprestado {
  id: number;
  titulo: string;
  isbn: string;
  emprestados: number;
}
