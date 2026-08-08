//Banco de dados Class
import { Pool } from 'pg';

import { Funcionario } from '../models/funcionario';

export class FuncionarioRepository {
  constructor(private readonly pool: Pool) {}

  async buscarUsuario(login: string): Promise<Funcionario | null> {
    const { rows } = await this.pool.query<Funcionario>('SELECT * FROM funcionario WHERE email = $1 AND ativo = 1;', [login]);

    if (rows.length === 0) {
      return null;
    }

    return rows[0];
  }
}
