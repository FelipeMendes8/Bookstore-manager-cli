type StatusEmprestimo = 'pendente' | 'devolvido' | 'cancelado';

export interface Emprestimo {
  id: number;
  clienteId: number;
  livroId: number;
  funcionarioId: number;
  dataEmprestimo: Date;
  dataPrevista: Date;
  dataDevolucao: Date | null;
  status: StatusEmprestimo;
}
