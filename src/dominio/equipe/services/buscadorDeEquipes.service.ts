import { Inject, Injectable } from "@nestjs/common";
import { Equipe } from "../../entidades/equipe.entity";
import { RepositorioEquipe } from "../repositorioEquipe";

@Injectable()
export class BuscadorDeEquipesService {
  constructor(
    @Inject("RepositorioEquipe")
    private readonly repositorioEquipe: RepositorioEquipe,
  ) {}

  public async buscarPorCampeonatoId(campeonatoId: number): Promise<Equipe[]> {
    return await this.repositorioEquipe.buscarPorCampeonatoId(campeonatoId);
  }

  public async buscarEquipesDosCampeonatosAtivos(): Promise<Equipe[]> {
    return await this.repositorioEquipe.buscarDosCampeonatosAtivos();
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Equipe[]> {
    return await this.repositorioEquipe.buscarPorCategoriaId(categoriaId);
  }

  public async buscarPorGrupoId(grupoId: number): Promise<Equipe[]> {
    return await this.repositorioEquipe.buscarPorGrupoId(grupoId);
  }

  public async buscarEquipesDoGrupo(grupoId: number): Promise<Equipe[]> {
    return await this.repositorioEquipe.buscarDoGrupo(grupoId);
  }
}
