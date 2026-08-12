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
    const { rows } = await this.pool.query<Livro>(
      `SELECT l.id, l.titulo, l.isbn,
      STRING_AGG(a.nome, ', ') AS autores
      FROM livro l
      INNER JOIN livro_autor la
        ON la.livro_id = l.id
      INNER JOIN autor a
        ON a.id = la.autor_id
      WHERE l.ativo = 1
        AND a.ativo = 1
      GROUP BY l.id
      ORDER BY UPPER(l.titulo);`,
    );

    return rows;
  }

  async buscarLivro(id: number): Promise<Livro | null> {
    //const result = await this.pool.query<Livro>('SELECT * FROM livro WHERE id = $1 AND ativo = 1;', [id]);

    const result = await this.pool.query<Livro>(
      `SELECT l.id,l.titulo, l.isbn, l.qtd_total, l.disponiveis, l.ativo,
        STRING_AGG(a.nome, ', ') AS autores
        FROM livro l
        LEFT JOIN livro_autor la
            ON la.livro_id = l.id
        LEFT JOIN autor a
            ON a.id = la.autor_id
            AND a.ativo = 1
        WHERE l.id = $1
          AND l.ativo = 1
        GROUP BY l.id;`,
      [id],
    );

    return result.rows[0] ?? null;
  }

  async atualizarLivro(id: number, titulo: string, isbn: string, autores: number[]): Promise<Livro> {
    const poolConnection = await this.pool.connect();
    try {
      await poolConnection.query('BEGIN');

      const { rows } = await poolConnection.query<Livro>(
        `
            UPDATE livro SET titulo = $1, isbn = $2 WHERE id = $3 AND ativo = 1 RETURNING *;
        `,
        [titulo, isbn, id],
      );

      const livro = rows[0];

      await this.pool.query('DELETE FROM livro_autor WHERE livro_id = $1;', [livro.id]);

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

  async deletarLivro(id: number): Promise<boolean> {
    const livro = await this.buscarLivro(id);

    if (livro === null) {
      throw new Error('Livro não encontrado.');
    }
    const result = await this.pool.query('UPDATE livro SET ativo = 0 WHERE id = $1 RETURNING *;', [id]);
    return result.rowCount === 1;
  }
}
