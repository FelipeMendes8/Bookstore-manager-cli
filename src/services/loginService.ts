import * as bcrypt from 'bcrypt';

import { pool } from '../database/connection';
import { Funcionario } from '../models/funcionario';
import { FuncionarioRepository } from '../repositories/loginRepository';
import { CliSession } from '../utils/session';

export interface Sucesso {
  sucesso: boolean;
  mensagem?: string;
  usuario?: Funcionario | null;
}

export async function loginFuncionarioService(login: string, pass: string): Promise<Sucesso> {
  const funcionarioDB = new FuncionarioRepository(pool);
  const funcionario = await funcionarioDB.buscarUsuario(login);

  if (funcionario === null) {
    return { sucesso: false, mensagem: 'Erro, funcionário não encontrado.' };
  }

  const senha = bcrypt.compareSync(pass, funcionario.senha);

  if (!senha) {
    return { sucesso: false, mensagem: 'Erro, senha incorreta.' };
  }

  CliSession.setUsuario(funcionario);
  return { sucesso: true, usuario: funcionario };
}
