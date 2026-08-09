import type { Interface } from 'node:readline/promises';

export async function exibirMenuPrincipal(terminal: Interface): Promise<void> {
  //Obs: Aqui seria bom validar o login do funcionário
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('========================================');
    console.log('       Menu Principal            ');
    console.log('========================================');
    console.log('');
    console.log('Gerencie a livraria: registre livros, autores e faça empréstimos de livros.\n');

    console.log('1- Livros\n2- Autores\n3- Clientes\n4- Empréstimos\n5- Relatórios\n0- Sair');

    const opcao = await terminal.question('Digite uma opção: ');

    switch (opcao) {
      case '1': {
        console.log('Livros');
        break;
      }

      case '2': {
        console.log('Autores');
        break;
      }
      case '3': {
        console.log('CLientes');
        break;
      }
      case '4': {
        console.log('Empréstimos');
        break;
      }
      case '5': {
        console.log('Relatórios');
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
