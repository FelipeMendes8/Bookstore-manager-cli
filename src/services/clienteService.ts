import { pool } from '../database/connection';
import { Cliente } from '../models/cliente';
import { ClienteRepository } from '../repositories/clienteRepository';
import { validarEmail } from '../utils/validarEmail';

export class ClienteService {
  async cadastrar(nome: string, email: string) {
    if (!nome) {
      throw new Error('O nome do cliente é obrigatório.');
    }

    if (nome.length > 100) {
      throw new Error('O nome deve possuir no máximo 100 caracteres.');
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
}
