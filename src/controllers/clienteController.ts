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

export async function buscarClienteController(id: string): Promise<Cliente> {
  const clienteService = new ClienteService();
  const cliente = await clienteService.buscar(id);
  return cliente;
}

export async function atualizarCLienteController(id: string, nome: string, email: string): Promise<Cliente> {
  const clienteService = new ClienteService();
  const cliente = await clienteService.atualizar(id, nome, email);
  return cliente;
}

export async function deletarClienteController(id: string): Promise<boolean> {
  const clienteService = new ClienteService();
  const excluir = await clienteService.deletar(id);
  return excluir;
}
