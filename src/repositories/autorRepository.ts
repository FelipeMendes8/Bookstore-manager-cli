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
}
