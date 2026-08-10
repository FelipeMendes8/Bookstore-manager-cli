import { Interface } from 'node:readline/promises';

import { criarAutorController, listarAutorController } from '../controllers/autorController';

export async function exibirMenuAutores(terminal: Interface): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('\n========================================');
    console.log('       Menu Autores            ');
    console.log('========================================');
    console.log('1- Cadastrar autor');
    console.log('2- Listar todos os autores');
    console.log('3- Buscar autor por ID');
    console.log('4- Atualizar autor');
    console.log('5- Excluir autor');
    console.log('0- Voltar');

    const opcao: string = await terminal.question('> Digite uma opção: ');

    try {
      switch (opcao) {
        case '1': {
          const nome = await terminal.question('Digite o nome do autor: ');
          const autor = await criarAutorController(nome);
          console.log(`Autor "${autor.nome}" cadastrado com sucesso!`);
          break;
        }
        case '2': {
          console.log('\n[Lista de autores]');
          const autores = await listarAutorController();
          autores.forEach((autor) => {
            console.log(`#${String(autor.id)} ${autor.nome}`);
          });

          break;
        }
        case '3': {
          console.log('Buscar');
          break;
        }
        case '4': {
          console.log('Atualizar');
          break;
        }
        case '5': {
          console.log('Excluir');
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
