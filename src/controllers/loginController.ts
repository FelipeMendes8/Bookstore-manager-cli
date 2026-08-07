import { validarEmail } from '../utils/validarEmail';

export interface Sucesso {
  sucesso: boolean;
  mensagem?: string;
  usuario?: object;
}

export function loginController(login: string, pass: string): Sucesso {
  if (!validarEmail(login)) {
    return { sucesso: false, mensagem: 'Email inválido, tente novamente.' };
  }

  if (pass.length < 6 || pass.length > 20) {
    return { sucesso: false, mensagem: 'A senha deve ter entre 6 e 20 caracter, tente novamente.' };
  }

  console.log(login);
  console.log(pass);
  return { sucesso: true, usuario: { nome: 'Feh', idade: 100 } };
}
