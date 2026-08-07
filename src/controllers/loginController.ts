import { validarEmail } from '../utils/validarEmail';

export function loginController(login: string, pass: string): string | boolean {
  if (!validarEmail(login)) {
    return 'Email inválido, tente novamente.';
  }

  if (pass.length < 6 || pass.length > 20) {
    return 'A senha deve ter entre 6 e 20 caracter, tente novamente.';
  }

  console.log(login);
  console.log(pass);
  return true;
}
