import { pool } from '../database/connection';
import { Funcionario } from '../models/funcionario';
import { FuncionarioRepository } from '../repositories/loginRepositorie';

//importar
export interface Sucesso {
  sucesso: boolean;
  mensagem?: string;
  usuario?: Funcionario | null;
}

//Service fazer a criptografia

export async function loginFuncionarioService(login: string, pass: string): Promise<Sucesso> {
  const funcionario = new FuncionarioRepository(pool);
  const funcionarioId = await funcionario.findByLogin(login, pass);

  if (funcionarioId === null) {
    return { sucesso: false, mensagem: 'Erro, funcionário não encontrado.' };
  }

  return { sucesso: true, usuario: funcionarioId };
}
