import { Pool } from 'pg';

import { Livro, LivroEmprestado, LivroRelatorio } from '../models/livro';
export class RelatorioRepository {
  constructor(private readonly pool: Pool) {}

  async livrosDisponiveis(): Promise<Livro[]> {
    const { rows } = await this.pool.query<Livro>('SELECT * FROM livro WHERE ativo = 1 AND disponiveis > 0 ORDER BY UPPER(titulo);');
    return rows;
  }

  async livrosEmprestados(): Promise<LivroEmprestado[]> {
    const { rows } = await this.pool.query<LivroEmprestado>(
      `SELECT
    l.id,
    l.titulo,
    l.isbn,
    COUNT(e.id) AS emprestados
    FROM livro l
    INNER JOIN emprestimo e
        ON e.livro_id = l.id
    WHERE e.status = 'pendente'
    AND l.ativo = 1
    GROUP BY l.id
    ORDER BY UPPER(l.titulo);`,
    );
    return rows;
  }

  async livrosPorAutor(id: number): Promise<LivroRelatorio[]> {
    const result = await this.pool.query<LivroRelatorio>(
      `SELECT
        l.id,
        l.titulo,
        l.isbn,
        a.nome AS nome_autor
    FROM livro l
    INNER JOIN livro_autor la
        ON la.livro_id = l.id
    INNER JOIN autor a
        ON a.id = la.autor_id
    WHERE a.id = $1
      AND a.ativo = 1
      AND l.ativo = 1
    ORDER BY UPPER(l.titulo);
    `,
      [id],
    );

    return result.rows;
  }

  async quantidadeEmprestimosPorLivro() {
    // SELECT ...
  }

  async clientesComEmprestimosAtivos() {
    // SELECT ...
  }
}
