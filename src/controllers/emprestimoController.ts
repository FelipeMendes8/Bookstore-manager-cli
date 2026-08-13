import { EmprestimoService } from '../services/emprestimoService';

export async function realizarEmprestimoController(livroId: number, clienteId: number) {
  const emprestimoService = new EmprestimoService();
  return await emprestimoService.realizarEmprestimo(livroId, clienteId);
}
