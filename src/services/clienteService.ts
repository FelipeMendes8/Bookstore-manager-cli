import { pool } from '../database/connection';
import { Cliente } from '../models/cliente';
import { ClienteRepository } from '../repositories/clienteRepository';
import { validarEmail } from '../utils/validarEmail';
import { validarNome } from '../utils/validarNome';

export class ClienteService {
  async cadastrar(nome: string, email: string) {
    if (!validarNome(nome)) {
      throw new Error('O nome do cliente é obrigatório e deve ter no máximo 100 caracteres.');
    }

    if (!validarEmail(email)) {
      throw new Error('Email inválido, tente novamente.');
    }

    const clienteDB = new ClienteRepository(pool);
    return await clienteDB.inserirCliente(nome, email);
  }

  async listar(): Promise<Cliente[]> {
    const clientesDB = new ClienteRepository(pool);
    const clientes = await clientesDB.listarClientes();
    if (clientes.length === 0) {
      throw new Error('Nenhum cliente encontrado.');
    }

    return clientes;
  }

  async buscar(id: string): Promise<Cliente> {
    const novoID = Number(id);
    const clienteDB = new ClienteRepository(pool);
    const cliente = await clienteDB.buscarCliente(novoID);

    if (cliente === null) {
      throw new Error('Cliente não encontrado.');
    }

    return cliente;
  }

  async atualizar(id: string, nome: string, email: string): Promise<Cliente> {
    const novoID = Number(id);

    if (!validarNome(nome)) {
      throw new Error('O nome do cliente é obrigatório e deve ter no máximo 100 caracteres.');
    }

    if (!validarEmail(email)) {
      throw new Error('Email inválido, tente novamente.');
    }

    const clienteDB = new ClienteRepository(pool);
    const cliente = await clienteDB.atualizarCliente(novoID, nome, email);

    return cliente;
  }

  async deletar(id: string): Promise<boolean> {
    const novoID = Number(id);
    const clienteDB = new ClienteRepository(pool);
    const excluir = await clienteDB.deletarCliente(novoID);
    return excluir;
  }
}
