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

  async buscarCliente(id: number): Promise<Cliente | null> {
    const result = await this.pool.query<Cliente>('SELECT * FROM cliente WHERE id = $1 AND ativo = 1;', [id]);

    return result.rows[0] ?? null;
  }

  async atualizarCliente(id: number, nome: string, email: string): Promise<Cliente> {
    const cliente = await this.buscarCliente(id);

    if (cliente === null) {
      throw new Error('Cliente não encontrado.');
    }

    const result = await this.pool.query('SELECT * FROM cliente WHERE nome = $1 AND ativo = 1;', [nome]);
    if (result.rowCount !== 0 && result.rowCount !== null) {
      throw new Error('O cliente já está cadastrado, use outro nome para atualizar.');
    }

    const rEmail = await this.pool.query('SELECT * FROM cliente WHERE email = $1 AND ativo = 1;', [email]);
    if (rEmail.rowCount !== 0 && rEmail.rowCount !== null) {
      throw new Error('Já existe um cliente com este email cadastrado.');
    }

    const {
      rows: [row],
    } = await this.pool.query<Cliente>('UPDATE cliente SET nome = $1, email = $2 WHERE id = $3 AND ativo = 1 RETURNING *;', [nome, email, id]);

    return row;
  }

  async deletarCliente(id: number): Promise<boolean> {
    const cliente = await this.buscarCliente(id);

    if (cliente === null) {
      throw new Error('Cliente não encontrado.');
    }
    const result = await this.pool.query('UPDATE cliente SET ativo = 0 WHERE id = $1 RETURNING *;', [id]);
    return result.rowCount === 1;
  }
}
