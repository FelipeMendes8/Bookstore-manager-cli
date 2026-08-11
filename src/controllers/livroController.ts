import { Livro } from '../models/livro';
import { LivroService } from '../services/livroService';

export async function criarLivroController(titulo: string, isbn: string, qtdTotal: string, autores: string): Promise<Livro> {
  const livroService = new LivroService();
  const livro = await livroService.cadastrar(titulo, isbn, qtdTotal, autores);
  return livro;
}
