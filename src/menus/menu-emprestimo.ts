import { Interface } from 'node:readline/promises';

import {
  buscarEmprestimoController,
  devolverEmprestimoController,
  listarEmprestimoController,
  realizarEmprestimoController,
} from '../controllers/emprestimoController';

export async function exibirMenuEmprestimo(terminal: Interface): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('\n========================================');
    console.log('       Menu Empréstimo            ');
    console.log('========================================');
    console.log('1- Realizar empréstimo');
    console.log('2- Registrar devolução');
    console.log('3- Consultar empréstimos');
    console.log('4- Buscar empréstimo por ID');
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
          console.log(`Empréstimo ID: ${String(emprestimo.id)} realizado com sucesso!`);

          break;
        }
        case '2': {
          const emprestimoId = Number(await terminal.question('Digite o ID do empréstimo: '));
          if (isNaN(emprestimoId)) {
            console.log('Erro: Informe um número válido no campo de ID.');
            break;
          }
          const emprestimo = await devolverEmprestimoController(emprestimoId);
          if (emprestimo) {
            console.log(`Empréstimo ID: ${String(emprestimoId)} devolvido com sucesso!`);
          }
          break;
        }
        case '3': {
          const emprestimos = await listarEmprestimoController();
          console.log('\n[Lista de Empréstimos]\n');
          for (const emprestimo of emprestimos) {
            console.log(`ID empréstimo: ${String(emprestimo.id)}\tLivro: ${emprestimo.titulo_livro}`);
            console.log('CLiente: ', emprestimo.nome_cliente);
            console.log(`Data do empréstimo: ${emprestimo.data_emprestimo.toLocaleDateString('pt-BR')}`);
            console.log(`Data da devolução: ${emprestimo.data_devolucao?.toLocaleDateString('pt-BR') ?? 'Não devolvido'}`);
            console.log('----------------------------\n');
          }

          break;
        }
        case '4': {
          const emprestimoId = Number(await terminal.question('Digite o ID do empréstimo para consultar: '));
          if (isNaN(emprestimoId)) {
            console.log('Erro: Informe um número válido no campo de ID.');
            break;
          }
          const emprestimo = await buscarEmprestimoController(emprestimoId);
          console.log('\n[Empréstimo]\n');
          console.log(`ID empréstimo: ${String(emprestimo.id)}\tLivro: ${emprestimo.titulo_livro}`);
          console.log('CLiente: ', emprestimo.nome_cliente);
          console.log(`Data do empréstimo: ${emprestimo.data_emprestimo.toLocaleDateString('pt-BR')}`);
          console.log(`Data da devolução: ${emprestimo.data_devolucao?.toLocaleDateString('pt-BR') ?? 'Não devolvido'}`);
          console.log('----------------------------\n');
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
