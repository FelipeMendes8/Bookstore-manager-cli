//Banco de dados Class
import { Pool } from 'pg';

import { Funcionario } from '../models/funcionario';

export class FuncionarioRepository {
  constructor(private readonly pool: Pool) {}

  async findByLogin(login: string, pass: string): Promise<Funcionario | null> {
    const { rows } = await this.pool.query<Funcionario>('SELECT * FROM funcionario WHERE email = $1 AND senha = $2;', [login, pass]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }
}
