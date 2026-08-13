type StatusEmprestimo = 'pendente' | 'devolvido' | 'cancelado';

export interface Emprestimo {
  id: number;
  cliente_id: number;
  livro_id: number;
  funcionario_id: number;
  data_emprestimo: Date;
  data_devolucao: Date | null;
  status: StatusEmprestimo;
}

export interface EmprestimoDetalhado {
  id: number;
  livro_id: number;
  titulo_livro: string;
  cliente_id: number;
  nome_cliente: string;
  data_emprestimo: Date;
  data_devolucao: Date | null;
}
