import { EmprestimoService } from '../services/emprestimoService';

export async function realizarEmprestimoController(livroId: number, clienteId: number) {
  const emprestimoService = new EmprestimoService();
  return await emprestimoService.realizarEmprestimo(livroId, clienteId);
}

export async function listarEmprestimoController() {
  const emprestimoService = new EmprestimoService();
  return await emprestimoService.listarEmprestimos();
}

export async function buscarEmprestimoController(id: number) {
  const emprestimoService = new EmprestimoService();
  return await emprestimoService.buscarPorID(id);
}

export async function devolverEmprestimoController(emprestimoId: number): Promise<boolean> {
  const emprestimoService = new EmprestimoService();
  return await emprestimoService.devolverEmprestimo(emprestimoId);
}
