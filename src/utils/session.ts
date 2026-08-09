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

  /*static loggedInUser(): boolean {
    if (this.user) {
      return true;
    }
    return false;
  }

  static async verificarLoginUser(): Promise<boolean> {
    if (!this.user) {
      console.error('Usuário não logado.');
      await menuLogin(terminal);
    }
    return true;
  }*/
}
