import { Funcionario } from '../models/funcionario';

export class CliSession {
  private static user?: Funcionario;

  static setUsuario(funcionario: Funcionario) {
    this.user = funcionario;
  }

  static getUsuario(): Funcionario {
    if (!this.user) {
      throw new Error('Não está autenticado.');
    }
    return this.user;
  }
}
