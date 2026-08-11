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
}
