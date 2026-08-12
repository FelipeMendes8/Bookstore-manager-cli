import { pool } from '../database/connection';
import { Livro } from '../models/livro';
import { AutorRepository } from '../repositories/autorRepository';
import { LivroRepository } from '../repositories/livroRepository';

export class LivroService {
  async validarAutores(autores: string): Promise<number[]> {
    const listaAutores = autores.split(',').map((id) => Number(id.trim()));

    for (const autorId of listaAutores) {
      const autorDB = new AutorRepository(pool);
      const autor = await autorDB.buscarAutor(autorId);

      if (autor === null) {
        throw new Error(`Autor ID: ${String(autorId)} não encontrado. Registre o autor antes de cadastrar o livro.`);
      }
    }
    return listaAutores;
  }

  async cadastrar(titulo: string, isbn: string, qtdTotal: string, autores: string): Promise<Livro> {
    const total = Number(qtdTotal);
    const autoresValidos = await this.validarAutores(autores);

    const livroDB = new LivroRepository(pool);
    return await livroDB.inserirLivro(titulo, isbn, total, autoresValidos);
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

  async atualizar(id: string, titulo: string, isbn: string, autores: string): Promise<Livro> {
    const novoID = Number(id);
    const autoresValidos = await this.validarAutores(autores);
    const livroDB = new LivroRepository(pool);
    const livro = await livroDB.atualizarLivro(novoID, titulo, isbn, autoresValidos);

    return livro;
  }

  async deletar(id: string): Promise<boolean> {
    const novoID = Number(id);
    const livroDB = new LivroRepository(pool);
    const excluir = await livroDB.deletarLivro(novoID);
    return excluir;
  }
}
