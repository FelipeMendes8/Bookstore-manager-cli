import { RelatorioService } from '../services/relatorioService';

export async function listarDisponiveisController() {
  const relatorioService = new RelatorioService();
  const livros = await relatorioService.listarDisponiveis();
  return livros;
}

export async function listarEmprestadosController() {
  const relatorioService = new RelatorioService();
  const livros = await relatorioService.listarEmprestados();
  return livros;
}

export async function livrosPorAutorController(id: number) {
  const relatorioService = new RelatorioService();
  const livros = await relatorioService.livrosAutor(id);
  return livros;
}
