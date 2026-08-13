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
}
