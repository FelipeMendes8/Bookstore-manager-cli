import { Pool } from 'pg';

import { ClienteRepository } from './clienteRepository';
import { Emprestimo } from '../models/emprestimo';
import { LivroRepository } from '../repositories/livroRepository';

export class EmprestimoRepository {
  constructor(private readonly pool: Pool) {}

  async realizarEmprestimo(livroId: number, clienteId: number, funcionarioId: number): Promise<Emprestimo> {
    const livroRepository = new LivroRepository(this.pool);

    const livro = await livroRepository.buscarLivro(livroId);

    if (livro === null) {
      throw new Error('Livro não encontrado, é necessário cadastrar.');
    }

    if (livro.disponiveis <= 0) {
      throw new Error('Livro sem disponibilidade.');
    }

    const clienteRepository = new ClienteRepository(this.pool);

    const cliente = await clienteRepository.buscarCliente(clienteId);

    if (cliente === null) {
      throw new Error('Cliente não encontrado, é necessário cadastrar.');
    }

    const poolConnection = await this.pool.connect();

    try {
      await poolConnection.query('BEGIN');
      const emprestimoExistente = await poolConnection.query(
        `
        SELECT id
        FROM emprestimo
        WHERE livro_id = $1
          AND cliente_id = $2
          AND data_devolucao IS NULL
        `,
        [livroId, clienteId],
      );

      if (emprestimoExistente.rowCount !== 0) {
        throw new Error('Este cliente já possui este livro emprestado.');
      }

      const { rows } = await poolConnection.query<Emprestimo>(
        ` INSERT INTO emprestimo (
            cliente_id,
            livro_id,
            funcionario_id,
            data_emprestimo,
            data_devolucao,
            status
        ) VALUES (
            $1,
            $2,
            $3,
            CURRENT_DATE,
            NULL,
            'pendente'
        ) RETURNING *;`,
        [clienteId, livroId, funcionarioId],
      );

      await poolConnection.query(
        `UPDATE livro
        SET disponiveis = disponiveis - 1
        WHERE id = $1`,
        [livroId],
      );

      await poolConnection.query('COMMIT');

      return rows[0];
    } catch (error) {
      await poolConnection.query('ROLLBACK');
      throw error;
    } finally {
      poolConnection.release();
    }
  }

  async buscarEmprestimo(id: number): Promise<Emprestimo | null> {
    const result = await this.pool.query<Emprestimo>('SELECT * FROM emprestimo WHERE id = $1;', [id]);

    return result.rows[0] ?? null;
  }

  //listarEmprestimos

  async devolverEmprestimo(emprestimoId: number): Promise<boolean> {
    const emprestimo = await this.buscarEmprestimo(emprestimoId);

    if (emprestimo === null) {
      throw new Error('Empréstimo não encontrado.');
    }

    if (emprestimo.status !== 'pendente') {
      throw new Error('Este empréstimo não está pendente.');
    }

    const poolConnection = await this.pool.connect();

    try {
      await poolConnection.query('BEGIN');

      await poolConnection.query(
        `
      UPDATE emprestimo
      SET data_devolucao = CURRENT_TIMESTAMP,
      status = 'devolvido'
      WHERE id = $1
      AND status = 'pendente'
      `,
        [emprestimoId],
      );

      await poolConnection.query(
        `UPDATE livro
        SET disponiveis = disponiveis + 1
        WHERE id = $1`,
        [emprestimo.livro_id],
      );

      await poolConnection.query('COMMIT');
      return true;
    } catch (error) {
      await poolConnection.query('ROLLBACK');
      throw error;
    } finally {
      poolConnection.release();
    }
  }
}
