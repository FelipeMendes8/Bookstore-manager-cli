import { Interface } from 'node:readline/promises';

import { buscarLivroController, criarLivroController, listarLivroController } from '../controllers/livroController';

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
          console.log('\n[Lista de livros]');
          const livros = await listarLivroController();
          livros.forEach((livro) => {
            console.log(`#${String(livro.id)} '${livro.titulo}' ISBN: ${livro.isbn}.`);
            //Obs: Aqui é interessante mostrar o autor do livro (Att futura)...
          });

          break;
        }
        case '3': {
          const id = await terminal.question('Digite o ID do livro para Buscar: ');
          const livro = await buscarLivroController(id);
          console.log(`ID: ${String(livro.id)}, Título: ${livro.titulo}, ISBN: ${livro.isbn}`);
          //Obs: Aqui é interessante mostrar o autor do livro (Att futura)...
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
