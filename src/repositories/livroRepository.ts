import { Pool } from 'pg';

import { Livro } from '../models/livro';

export class LivroRepository {
  constructor(private readonly pool: Pool) {}

  async inserirLivro(titulo: string, isbn: string, qtdTotal: number, autores: number[]): Promise<Livro> {
    const poolConnection = await this.pool.connect();
    try {
      await poolConnection.query('BEGIN');

      const { rows } = await poolConnection.query<Livro>(
        `
        INSERT INTO livro
          (titulo, isbn, qtd_total, disponiveis, ativo)
        VALUES
          ($1, $2, $3, $3, 1)
        RETURNING *;
        `,
        [titulo, isbn, qtdTotal],
      );

      const livro = rows[0];

      for (const autorId of autores) {
        await poolConnection.query(
          `
          INSERT INTO livro_autor (livro_id, autor_id)
          VALUES ($1, $2)
          `,
          [livro.id, autorId],
        );
      }

      await poolConnection.query('COMMIT');

      return livro;
    } catch (error) {
      await poolConnection.query('ROLLBACK');
      throw error;
    } finally {
      poolConnection.release();
    }
  }

  async listarLivros(): Promise<Livro[]> {
    const { rows } = await this.pool.query<Livro>('SELECT * FROM livro WHERE ativo = 1 ORDER BY titulo ASC;');

    return rows;
  }

  async buscarLivro(id: number): Promise<Livro | null> {
    const result = await this.pool.query<Livro>('SELECT * FROM livro WHERE id = $1 AND ativo = 1;', [id]);

    return result.rows[0] ?? null;
  }

  async deletarLivro(id: number): Promise<boolean> {
    const livro = await this.buscarLivro(id);

    if (livro === null) {
      throw new Error('Livro não encontrado.');
    }
    const result = await this.pool.query('UPDATE livro SET ativo = 0 WHERE id = $1 RETURNING *;', [id]);
    return result.rowCount === 1;
  }
}
