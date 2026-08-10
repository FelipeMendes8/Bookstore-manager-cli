import { Pool } from 'pg';

import { Cliente } from '../models/cliente';

export class ClienteRepository {
  constructor(private readonly pool: Pool) {}

  async inserirCliente(nome: string, email: string): Promise<Cliente> {
    const result = await this.pool.query('SELECT * FROM cliente WHERE nome = $1 AND ativo = 1;', [nome]);
    if (result.rowCount !== 0 && result.rowCount !== null) {
      throw new Error('O cliente já está cadastrado.');
    }

    const rEmail = await this.pool.query('SELECT * FROM cliente WHERE email = $1 AND ativo = 1;', [email]);
    if (rEmail.rowCount !== 0 && rEmail.rowCount !== null) {
      throw new Error('Já existe um cliente com este email cadastrado.');
    }

    const { rows } = await this.pool.query<Cliente>('INSERT INTO cliente (nome,email,ativo) VALUES ($1,$2,1) RETURNING *;', [nome, email]);

    return rows[0];
  }

  async listarClientes(): Promise<Cliente[]> {
    const { rows } = await this.pool.query<Cliente>('SELECT * FROM cliente WHERE ativo = 1 ORDER BY nome ASC;');

    return rows;
  }
}
