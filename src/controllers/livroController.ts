import { Livro } from '../models/livro';
import { LivroService } from '../services/livroService';

export async function criarLivroController(titulo: string, isbn: string, qtdTotal: string, autores: string): Promise<Livro> {
  const livroService = new LivroService();
  const livro = await livroService.cadastrar(titulo, isbn, qtdTotal, autores);
  return livro;
}

export async function listarLivroController(): Promise<Livro[]> {
  const livroService = new LivroService();
  const livro = await livroService.listar();
  return livro;
}

export async function buscarLivroController(id: string): Promise<Livro> {
  const livroService = new LivroService();
  const livro = await livroService.buscar(id);
  return livro;
}

export async function atualizarLivroController(id: string, titulo: string, isbn: string, autores: string): Promise<Livro> {
  const livroService = new LivroService();
  const livro = await livroService.atualizar(id, titulo, isbn, autores);
  return livro;
}

export async function deletarLivroController(id: string): Promise<boolean> {
  const livroService = new LivroService();
  const excluir = await livroService.deletar(id);
  return excluir;
}
