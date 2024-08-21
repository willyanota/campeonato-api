import { Categoria } from "../entidades/categoria.entity";

export interface RepositorioCategoria {
  salvar(categoria: Categoria): Promise<void>;
  buscarPorId(id: number): Promise<Categoria>;
  buscarPorCampeonatoId(campeonatoId: number): Promise<Categoria[]>;
}
