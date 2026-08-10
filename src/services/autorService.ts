import { pool } from '../database/connection';
import { Autor } from '../models/autor';
import { AutorRepository } from '../repositories/autorRepository';

export class AutorService {
  async cadastrar(nome: string) {
    if (!nome) {
      throw new Error('O nome do autor é obrigatório.');
    }

    if (nome.length > 100) {
      throw new Error('O nome deve possuir no máximo 100 caracteres.');
    }

    const autorDB = new AutorRepository(pool);
    return await autorDB.inserirAutor(nome);
  }

  async listar(): Promise<Autor[]> {
    const autoresDB = new AutorRepository(pool);
    const autores = await autoresDB.listarAutores();
    if (autores.length === 0) {
      throw new Error('Nenhum autor encontrado.');
    }

    return autores;
  }

  async buscar(id: string): Promise<Autor> {
    const novoID = Number(id);
    const autorDB = new AutorRepository(pool);
    const autor = await autorDB.buscarAutor(novoID);

    if (autor === null) {
      throw new Error('Autor não encontrado.');
    }

    return autor;
  }

  async atualizar(id: string, nome: string): Promise<Autor> {
    const novoID = Number(id);
    const autorDB = new AutorRepository(pool);
    const autor = await autorDB.atualizarAutor(novoID, nome);

    return autor;
  }

  async deletar(id: string): Promise<boolean> {
    const novoID = Number(id);
    const autorDB = new AutorRepository(pool);
    const excluir = await autorDB.deletarAutor(novoID);
    return excluir;
  }
}
