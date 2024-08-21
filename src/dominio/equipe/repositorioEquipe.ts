import { Equipe } from "../entidades/equipe.entity";

export interface RepositorioEquipe {
  salvar(equipe: Equipe): Promise<void>;
  buscarPorId(id: number): Promise<Equipe>;
  buscarPorCampeonatoId(campeonatoId: number): Promise<Equipe[]>;
  excluir(id: number): Promise<void>;
  buscarDosCampeonatosAtivos(): Promise<Equipe[]>;
  buscarPorCategoriaId(categoriaId: number): Promise<Equipe[]>;
  buscarPorGrupoId(grupoId: number): Promise<Equipe[]>;
  buscarDoGrupo(grupoId: number): Promise<Equipe[]>;
}
