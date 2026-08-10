import { Cliente } from '../models/cliente';
import { ClienteService } from '../services/clienteService';

export async function criarClienteController(nome: string, email: string): Promise<Cliente> {
  const clienteService = new ClienteService();
  const cliente = await clienteService.cadastrar(nome, email);
  return cliente;
}

export async function listarClienteController(): Promise<Cliente[]> {
  const clienteService = new ClienteService();
  const cliente = await clienteService.listar();
  return cliente;
}
