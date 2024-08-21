import { Fase } from "../entidades/fase.entity";

export interface RepositorioFase {
  salvar(fase: Fase): Promise<void>;
  buscarPorCategoriaId(categoriaId: number): Promise<Fase[]>;
  buscarPorId(id: number): Promise<Fase>;
}
