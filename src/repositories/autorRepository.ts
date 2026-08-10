import { Pool } from 'pg';

import { Autor } from '../models/autor';

export class AutorRepository {
  constructor(private readonly pool: Pool) {}

  async inserirAutor(nome: string): Promise<Autor> {
    const result = await this.pool.query('SELECT * FROM autor WHERE nome = $1 AND ativo = 1;', [nome]);
    if (result.rowCount !== 0 && result.rowCount !== null) {
      throw new Error('O autor já está cadastrado.');
    }

    const { rows } = await this.pool.query<Autor>('INSERT INTO autor (nome,ativo) VALUES ($1,1) RETURNING *;', [nome]);

    return rows[0];
  }

  async listarAutores(): Promise<Autor[]> {
    const { rows } = await this.pool.query<Autor>('SELECT * FROM autor WHERE ativo = 1 ORDER BY nome ASC;');

    return rows;
  }

  async buscarAutor(id: number): Promise<Autor | null> {
    const result = await this.pool.query<Autor>('SELECT * FROM autor WHERE id = $1 AND ativo = 1;', [id]);

    return result.rows[0] ?? null;
  }

  async atualizarAutor(id: number, nome: string): Promise<Autor> {
    const autor = await this.buscarAutor(id);

    if (autor === null) {
      throw new Error('Autor não encontrado.');
    }

    const result = await this.pool.query('SELECT * FROM autor WHERE nome = $1 AND ativo = 1;', [nome]);
    if (result.rowCount !== 0 && result.rowCount !== null) {
      throw new Error('O autor já está cadastrado, use outro nome para atualizar.');
    }

    const {
      rows: [row],
    } = await this.pool.query<Autor>('UPDATE autor SET nome = $1 WHERE id = $2 AND ativo = 1 RETURNING *;', [nome, id]);

    return row;
  }

  async deletarAutor(id: number): Promise<boolean> {
    const autor = await this.buscarAutor(id);

    if (autor === null) {
      throw new Error('Autor não encontrado.');
    }
    const result = await this.pool.query('UPDATE autor SET ativo = 0 WHERE id = $1 RETURNING *;', [id]);
    return result.rowCount === 1;
  }
}
