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
}
