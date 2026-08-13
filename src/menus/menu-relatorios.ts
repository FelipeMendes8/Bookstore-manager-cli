import { Interface } from 'node:readline/promises';

import { listarDisponiveisController, listarEmprestadosController } from '../controllers/relatorioController';

export async function exibirMenuRelatorios(terminal: Interface): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('\n========================================');
    console.log('       Menu Relatórios            ');
    console.log('========================================');
    console.log('1- Livros disponíveis');
    console.log('2- Livros emprestados');
    console.log('3- Livros cadastrados por autor');
    console.log('4- Quantidade de empréstimos por livro');
    console.log('5- Clientes com empréstimos ativos');
    console.log('0- Voltar');

    const opcao: string = await terminal.question('> Digite uma opção: ');

    try {
      switch (opcao) {
        case '0': {
          console.log('Voltando ao menu principal...');
          return;
        }
        case '1': {
          const livros = await listarDisponiveisController();

          console.log('[Livros Disponíveis]');
          for (const livro of livros) {
            console.log(`Livro: ${livro.titulo}, ISBN: ${livro.isbn}, Quantidade: ${String(livro.disponiveis)}.`);
          }
          break;
        }
        case '2': {
          const livros = await listarEmprestadosController();

          console.log('[Livros Emprestados]');
          for (const livro of livros) {
            console.log(`Livro: ${livro.titulo}, ISBN: ${livro.isbn}, Quantidade: ${String(livro.emprestados)}.`);
          }
          break;
        }
        case '3': {
          console.log('case 3');

          break;
        }
        case '4': {
          console.log('case 4');
          break;
        }
        case '5': {
          console.log('case 5');
          break;
        }
        default: {
          console.log('Opção inválida.');
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Erro: ${error.message}`);
      }
    }
  }
}
