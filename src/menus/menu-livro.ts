import { Interface } from 'node:readline/promises';

import {
  atualizarLivroController,
  buscarLivroController,
  criarLivroController,
  deletarLivroController,
  listarLivroController,
} from '../controllers/livroController';

export async function exibirMenuLivros(terminal: Interface): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('\n========================================');
    console.log('       Menu Livros            ');
    console.log('========================================');
    console.log('1- Cadastrar livro');
    console.log('2- Listar todos os livros');
    console.log('3- Buscar livro por ID');
    console.log('4- Atualizar livro');
    console.log('5- Deletar livro');
    console.log('0- Voltar');

    const opcao: string = await terminal.question('> Digite uma opção: ');

    try {
      switch (opcao) {
        case '1': {
          const titulo = await terminal.question('Digite o Título do livro: ');
          const isbn = await terminal.question('Digite o ISBN do livro: ');
          const qtdTotal = await terminal.question('Digite a quantidade de livros: ');
          const autores = await terminal.question('Digite os IDs dos autores separados por vírgula: ');
          const livro = await criarLivroController(titulo, isbn, qtdTotal, autores);
          console.log(`Livro "${livro.titulo}" (${livro.isbn}) cadastrado com sucesso!`);
          break;
        }
        case '2': {
          const livros = await listarLivroController();
          console.log('\n[Lista de livros]');
          livros.forEach((livro) => {
            console.log('----------------------------------------');
            console.log(`#${String(livro.id)} '${livro.titulo}' ISBN: ${livro.isbn}.`);
            console.log(`Autor: ${livro.autores}`);
          });

          break;
        }
        case '3': {
          const id = await terminal.question('Digite o ID do livro para Buscar: ');
          const livro = await buscarLivroController(id);
          console.log('----------------------------------------');
          console.log(`ID: ${String(livro.id)}, Título: ${livro.titulo}, ISBN: ${livro.isbn}`);
          console.log(`Autor: ${livro.autores}`);
          console.log('----------------------------------------');

          break;
        }

        case '4': {
          const id = await terminal.question('Digite o ID do livro para Atualizar: ');
          const titulo = await terminal.question('Digite o Título do livro para Atualizar: ');
          const isbn = await terminal.question('Digite o ISBN do livro para Atualizar: ');
          const autores = await terminal.question('Digite os IDs dos autores separados por vírgula para Atualizar:  ');
          const livro = await atualizarLivroController(id, titulo, isbn, autores);
          console.log(`Livro ID: "${String(livro.id)}" atualizado, título: ${livro.titulo}`);
          break;
        }

        case '5': {
          const id = await terminal.question('Digite o ID do livro para Deletar: ');
          const deletar = await deletarLivroController(id);
          if (deletar) {
            console.log('Livro excluído com sucesso.');
          }
          break;
        }

        case '0': {
          console.log('Voltando ao menu principal...');
          return;
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
