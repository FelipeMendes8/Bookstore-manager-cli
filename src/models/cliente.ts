export interface Cliente {
  id: number;
  nome: string;
  email: string;
  ativo: number;
}

export interface ClienteEmprestimosAtivos {
  id: number;
  nome: string;
  quantidade: string;
}
