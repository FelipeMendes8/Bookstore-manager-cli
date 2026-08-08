export function validarEmail(email: string): boolean {
  const emailRegex = /^(?=.{1,100}$)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;

  return emailRegex.test(email);
}
