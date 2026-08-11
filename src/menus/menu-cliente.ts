import { Interface } from 'node:readline/promises';

import {
  atualizarCLienteController,
  buscarClienteController,
  criarClienteController,
  deletarClienteController,
  listarClienteController,
} from '../controllers/clienteController';

export async function exibirMenuClientes(terminal: Interface): Promise<void> {
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  while (true) {
    console.log('\n========================================');
    console.log('       Menu Clientes            ');
    console.log('========================================');
    console.log('1- Cadastrar cliente');
    console.log('2- Listar todos os clientes');
    console.log('3- Buscar cliente por ID');
    console.log('4- Atualizar cliente');
    console.log('5- Deletar cliente');
    console.log('0- Voltar');

    const opcao: string = await terminal.question('> Digite uma opção: ');

    try {
      switch (opcao) {
        case '1': {
          const nome = await terminal.question('Digite o nome do cliente: ');
          const email = await terminal.question('Digite o email do cliente: ');
          const cliente = await criarClienteController(nome, email);
          console.log(`Cliente "${cliente.nome}" cadastrado com sucesso!`);
          break;
        }
        case '2': {
          console.log('\n[Lista de clientes]');
          const clientes = await listarClienteController();
          clientes.forEach((cliente) => {
            console.log(`#${String(cliente.id)} ${cliente.nome} (${cliente.email})`);
          });

          break;
        }
        case '3': {
          const id = await terminal.question('Digite o ID do cliente para Buscar: ');
          const cliente = await buscarClienteController(id);
          console.log(`ID: ${String(cliente.id)}, Nome: ${cliente.nome}, Email: ${cliente.email}`);
          break;
        }
        case '4': {
          const id = await terminal.question('Digite o ID do cliente para Atualizar: ');
          const nome = await terminal.question('Digite o Nome do cliente para Atualizar: ');
          const email = await terminal.question('Digite o Email do cliente para Atualizar: ');
          const cliente = await atualizarCLienteController(id, nome, email);
          console.log(`Cliente ID: "${String(cliente.id)}" atualizado, nome: ${cliente.nome}, email: ${cliente.email}`);
          break;
        }
        case '5': {
          const id = await terminal.question('Digite o ID do Cliente para Deletar: ');
          const deletar = await deletarClienteController(id);
          if (deletar) {
            console.log('Cliente excluído com sucesso.');
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
