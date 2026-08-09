import { Interface } from 'node:readline/promises';

import { loginController } from '../controllers/loginController';
import { CliSession } from '../utils/session';

export async function menuLogin(terminal: Interface): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    //const terminal = createInterface(stdin, stdout);
    const login: string = await terminal.question('Digite o email para login: ');
    const pass: string = await terminal.question('Digite a senha: ');

    const resultado = await loginController(login, pass);

    if (!resultado.sucesso) {
      console.error(resultado.mensagem);
      continue;
    }

    const funcionario = CliSession.getUsuario();

    console.log(`Funcionário: ${funcionario.nome} (${funcionario.email}) logado com sucesso!`);

    break;
  }
}
