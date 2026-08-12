import { pool } from '../database/connection';
import { Livro } from '../models/livro';
import { AutorRepository } from '../repositories/autorRepository';
import { LivroRepository } from '../repositories/livroRepository';

export class LivroService {
  async cadastrar(titulo: string, isbn: string, qtdTotal: string, autores: string): Promise<Livro> {
    const total = Number(qtdTotal);

    const listaAutores = autores.split(',').map((id) => Number(id.trim()));

    for (const autorId of listaAutores) {
      const autorDB = new AutorRepository(pool);
      const autor = await autorDB.buscarAutor(autorId);

      if (autor === null) {
        throw new Error(`Autor ID: ${String(autorId)} não encontrado. Registre o autor antes de cadastrar o livro.`);
      }
    }

    const livroDB = new LivroRepository(pool);
    return await livroDB.inserirLivro(titulo, isbn, total, listaAutores);
  }

  async listar(): Promise<Livro[]> {
    const livrosDB = new LivroRepository(pool);
    const livros = await livrosDB.listarLivros();
    if (livros.length === 0) {
      throw new Error('Nenhum livro encontrado.');
    }

    return livros;
  }

  async buscar(id: string): Promise<Livro> {
    const novoID = Number(id);
    const livroDB = new LivroRepository(pool);
    const livro = await livroDB.buscarLivro(novoID);

    if (livro === null) {
      throw new Error('Livro não encontrado.');
    }

    return livro;
  }
}
