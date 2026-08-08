import { pool } from '../database/connection';
import { Funcionario } from '../models/funcionario';
import { FuncionarioRepository } from '../repositories/loginRepositorie';
import { CliSession } from '../utils/session';

export interface Sucesso {
  sucesso: boolean;
  mensagem?: string;
  usuario?: Funcionario | null;
}

//Service fazer a criptografia

export async function loginFuncionarioService(login: string, pass: string): Promise<Sucesso> {
  const funcionarioDB = new FuncionarioRepository(pool);
  const funcionario = await funcionarioDB.buscarUsuario(login, pass);

  if (funcionario === null) {
    return { sucesso: false, mensagem: 'Erro, funcionário não encontrado.' };
  }

  console.log('-------------------------------------------');
  CliSession.setUsuario(funcionario);
  const tester = CliSession.getUsuario();

  console.log(tester.nome);
  console.log(tester.matricula);

  console.log('--------------------------------------------');

  return { sucesso: true, usuario: funcionario };
}
