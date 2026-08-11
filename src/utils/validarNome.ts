export function validarNome(nome: string): boolean {
  if (!nome || nome.length > 100) {
    return false;
  }
  return true;
}
