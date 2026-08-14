import { Interface } from 'node:readline/promises';

import {
  clienteEmprestimoController,
  listarDisponiveisController,
  listarEmprestadosController,
  livroEmprestimoController,
  livrosPorAutorController,
} from '../controllers/relatorioController';

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
          const id = Number(await terminal.question('Digite o ID do autor para Buscar os livros cadastrados: '));

          if (isNaN(id)) {
            console.log('Erro: Informe um número válido no campo ID do autor.');
            break;
          }

          const livros = await livrosPorAutorController(id);
          console.log('[Livros do Autor]');
          for (const livro of livros) {
            console.log('Autor: ', livro.nome_autor);
            console.log(`ID: ${String(livro.id)} | ${livro.titulo} | ISBN: ${livro.isbn}`);
          }

          break;
        }
        case '4': {
          const id = Number(await terminal.question('Digite o ID do livro para Buscar os emprestimos: '));

          if (isNaN(id)) {
            console.log('Erro: Informe um número válido no campo ID do livro.');
            break;
          }
          const livro = await livroEmprestimoController(id);
          console.log('[Emprestimos do livro]');

          console.log(`Livro: ${livro.titulo}, ID: ${String(livro.id)}`);
          console.log('Quantidade de empréstimos: ', livro.quantidade);

          break;
        }
        case '5': {
          console.log('\n[Clientes com empréstimos ativos]\n');
          const clientes = await clienteEmprestimoController();

          if (clientes.length === 0) {
            console.log('Nenhum cliente possui empréstimos ativos.');
            return;
          }

          for (const cliente of clientes) {
            console.log(`Cliente: ${cliente.nome}`);
            console.log(`Empréstimos ativos: ${cliente.quantidade}`);
            console.log('----------------------------------------');
          }
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
