import type { Interface } from 'node:readline/promises';

import { exibirMenuAutores } from './menu-autor';
import { exibirMenuClientes } from './menu-cliente';

export async function exibirMenuPrincipal(terminal: Interface): Promise<void> {
  //Obs: Aqui seria bom validar o login do funcionário
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('========================================');
    console.log('       Menu Principal            ');
    console.log('========================================');
    console.log('');
    console.log('Gerencie a livraria: registre livros, autores e faça empréstimos de livros.\n');

    console.log('1- Autores\n2- Livros\n3- Clientes\n4- Empréstimos\n5- Relatórios\n0- Sair');

    const opcao = await terminal.question('> Digite uma opção: ');

    switch (opcao) {
      case '1': {
        await exibirMenuAutores(terminal);
        break;
      }
      case '2': {
        console.log('Acessando menu de livros...');

        break;
      }
      case '3': {
        await exibirMenuClientes(terminal);

        break;
      }
      case '4': {
        console.log('Acessando menu de empréstimos...');

        break;
      }
      case '5': {
        console.log('Acessando menu de relatórios...');

        break;
      }
      case '0': {
        console.log('Saindo do sistema...');
        return;
      }

      default: {
        console.log('Opção inválida.');
      }
    }
  }
}
