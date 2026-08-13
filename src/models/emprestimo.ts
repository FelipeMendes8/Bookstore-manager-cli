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
