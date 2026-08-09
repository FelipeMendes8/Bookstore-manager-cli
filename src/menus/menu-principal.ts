import type { Interface } from 'node:readline/promises';

import { MenuAutor } from './menu-autor';
import { MenuCliente } from './menu-cliente';
import { MenuEmprestimo } from './menu-emprestimo';
import { MenuLivro } from './menu-livro';
import { MenuRelatorios } from './menu-relatorios';

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
        console.log('Acessando menu de livros...');
        const livro = new MenuLivro();
        livro.iniciar();
        break;
      }

      case '2': {
        console.log('Acessando menu dos autores...');
        const autor = new MenuAutor();
        autor.iniciar();
        break;
      }
      case '3': {
        console.log('Acessando menu de clientes...');
        const cliente = new MenuCliente();
        cliente.iniciar();
        break;
      }
      case '4': {
        console.log('Acessando menu de empréstimos...');
        const emprestimo = new MenuEmprestimo();
        emprestimo.iniciar();
        break;
      }
      case '5': {
        console.log('Acessando menu de relatórios...');
        const relatorios = new MenuRelatorios();
        relatorios.iniciar();
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
