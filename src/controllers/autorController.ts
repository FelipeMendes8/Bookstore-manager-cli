import { Autor } from '../models/autor';
import { AutorService } from '../services/autorService';

export async function criarAutorController(nome: string): Promise<Autor> {
  const autorService = new AutorService();
  const autor = await autorService.cadastrar(nome);
  return autor;
}

export async function listarAutorController(): Promise<Autor[]> {
  const autorService = new AutorService();
  const autor = await autorService.listar();
  return autor;
}

export async function buscarAutorController(id: string): Promise<Autor> {
  const autorService = new AutorService();
  const autor = await autorService.buscar(id);
  return autor;
}

export async function atualizarAutorController(id: string, nome: string): Promise<Autor> {
  const autorService = new AutorService();
  const autor = await autorService.atualizar(id, nome);
  return autor;
}

export async function deletarAutorController(id: string): Promise<boolean> {
  const autorService = new AutorService();
  const excluir = await autorService.deletar(id);
  return excluir;
}
