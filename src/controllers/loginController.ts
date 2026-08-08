import { loginFuncionarioService, Sucesso } from '../services/loginService';
import { validarEmail } from '../utils/validarEmail';

export async function loginController(login: string, pass: string): Promise<Sucesso> {
  if (!validarEmail(login)) {
    return { sucesso: false, mensagem: 'Email inválido, tente novamente.' };
  }

  if (pass.length < 6 || pass.length > 20) {
    return { sucesso: false, mensagem: 'A senha deve ter entre 6 e 20 caracter, tente novamente.' };
  }

  const loginService = await loginFuncionarioService(login, pass);

  return loginService;
}
