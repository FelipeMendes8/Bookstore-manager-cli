import { createInterface } from 'node:readline/promises';
import { stdin, stdout } from 'process';

import { loginController } from '../controllers/loginController';

export const terminal = createInterface(stdin, stdout);

export async function menuLogin(): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    const login: string = await terminal.question('Digite o email para login: ');
    const pass: string = await terminal.question('Digite a senha: ');

    const resultado = await loginController(login, pass);

    if (!resultado.sucesso) {
      console.error(resultado.mensagem);
    }

    if (resultado.sucesso) {
      console.log('Sucesso no login...');
      console.log(resultado);

      //Chamar menu geral do sistema

      break;
    }
  }
}
