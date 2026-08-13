import { pool } from '../database/connection';
import { EmprestimoRepository } from '../repositories/emprestimoRepository';
import { CliSession } from '../utils/session';

export class EmprestimoService {
  async realizarEmprestimo(livroId: number, clienteId: number) {
    if (!Number.isInteger(livroId) || livroId <= 0) {
      throw new Error('ID do livro inválido.');
    }

    if (!Number.isInteger(clienteId) || clienteId <= 0) {
      throw new Error('ID do cliente inválido.');
    }

    const funcionario = CliSession.getUsuario();

    //return await this.emprestimoRepository.realizarEmprestimo(livroId, clienteId);
    const emprestimoDB = new EmprestimoRepository(pool);
    return await emprestimoDB.realizarEmprestimo(livroId, clienteId, funcionario.id);
  }

  async devolverEmprestimo(emprestimoId: number) {
    if (!Number.isInteger(emprestimoId) || emprestimoId <= 0) {
      throw new Error('ID do empréstimo inválido.');
    }
    const emprestimoDB = new EmprestimoRepository(pool);
    return await emprestimoDB.devolverEmprestimo(emprestimoId);
  }
}
