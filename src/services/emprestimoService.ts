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

  async listarEmprestimos() {
    const emprestimoDB = new EmprestimoRepository(pool);
    const emprestimos = await emprestimoDB.listar();

    if (emprestimos.length === 0) {
      throw new Error('Nenhum livro encontrado.');
    }

    return emprestimos;
  }

  async buscarPorID(id: number) {
    const emprestimoDB = new EmprestimoRepository(pool);

    if (!Number.isInteger(id) || id <= 0) {
      throw new Error('ID do empréstimo inválido.');
    }
    const emprestimo = await emprestimoDB.buscarId(id);

    if (emprestimo === null) {
      throw new Error('Emprestimo não encontrado.');
    }

    return emprestimo;
  }

  async devolverEmprestimo(emprestimoId: number) {
    if (!Number.isInteger(emprestimoId) || emprestimoId <= 0) {
      throw new Error('ID do empréstimo inválido.');
    }
    const emprestimoDB = new EmprestimoRepository(pool);
    return await emprestimoDB.devolverEmprestimo(emprestimoId);
  }
}
