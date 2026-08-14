import { pool } from '../database/connection';
import { RelatorioRepository } from '../repositories/relatorioRepository';

export class RelatorioService {
  async listarDisponiveis() {
    const livrosDB = new RelatorioRepository(pool);
    const livros = await livrosDB.livrosDisponiveis();
    if (livros.length === 0) {
      throw new Error('O sistema não encontrou nenhum livro disponível.');
    }

    return livros;
  }

  async listarEmprestados() {
    const livrosDB = new RelatorioRepository(pool);
    const livros = await livrosDB.livrosEmprestados();
    if (livros.length === 0) {
      throw new Error('O sistema não encontrou nenhum livro emprestado.');
    }

    return livros;
  }

  async livrosAutor(id: number) {
    const autorDB = new RelatorioRepository(pool);
    const livros = await autorDB.livrosPorAutor(id);

    return livros;
  }

  async livroEmprestimo(id: number) {
    const emprestimoDB = new RelatorioRepository(pool);
    const emprestimos = await emprestimoDB.quantidadeEmprestimosPorLivro(id);
    if (emprestimos === null) {
      throw new Error('Nenhum empréstimo encontrado.');
    }
    return emprestimos;
  }

  async clientesComEmprestimos() {
    const emprestimoDB = new RelatorioRepository(pool);
    const emprestimos = await emprestimoDB.clientesComEmprestimos();

    return emprestimos;
  }
}
