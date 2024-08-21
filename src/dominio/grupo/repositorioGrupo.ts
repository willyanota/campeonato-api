import { Grupo } from "../entidades/grupo.entity";

export interface RepositorioGrupo {
  salvar(grupo: Grupo): Promise<void>;
  buscarPorCampeonatoId(campeonatoId: number): Promise<Grupo[]>;
  buscarTodos(): Promise<Grupo[]>;
  buscarPorId(id: number): Promise<Grupo>;
  buscarPorCategoriaId(categoriaId: number): Promise<Grupo[]>;
}
