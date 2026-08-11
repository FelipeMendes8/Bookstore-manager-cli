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
}
