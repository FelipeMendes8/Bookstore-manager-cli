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
