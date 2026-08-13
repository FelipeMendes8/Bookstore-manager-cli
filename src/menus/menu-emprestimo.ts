import { Interface } from 'node:readline/promises';

import { realizarEmprestimoController } from '../controllers/emprestimoController';

export async function exibirMenuEmprestimo(terminal: Interface): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('\n========================================');
    console.log('       Menu Empréstimo            ');
    console.log('========================================');
    console.log('1- Realizar empréstimo');
    console.log('2- Registrar devolução');
    console.log('3- Consultar empréstimos');
    console.log('0- Voltar');

    const opcao: string = await terminal.question('> Digite uma opção: ');

    try {
      switch (opcao) {
        case '0': {
          console.log('Voltando ao menu principal...');
          return;
        }
        case '1': {
          const livroId = Number(await terminal.question('Digite o ID do Livro: '));

          const clienteId = Number(await terminal.question('Digite o ID do Cliente: '));

          if (isNaN(livroId) || isNaN(clienteId)) {
            console.log('Erro: Informe um número válido nos campos de ID.');
            break;
          }

          const emprestimo = await realizarEmprestimoController(livroId, clienteId);
          console.log(`Empréstimo ${String(emprestimo.id)} realizado com sucesso!`);

          break;
        }
        case '2': {
          console.log('devolver');
          break;
        }
        case '3': {
          console.log('consultar');
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
