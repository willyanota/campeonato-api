import { Gol } from "../entidades/gol.entity";

export interface RepositorioGol {
  salvar(gol: Gol): Promise<void>;
  buscarPorJogoId(jogoId: number): Promise<Gol[]>;
  buscarPorId(id: number): Promise<Gol>;
  excluir(id: number): Promise<void>;
  buscarPorCategoriaId(categoriaId: number): Promise<Gol[]>;
}
