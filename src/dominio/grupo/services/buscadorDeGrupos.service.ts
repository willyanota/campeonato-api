import { Inject, Injectable } from "@nestjs/common";
import { Grupo } from "../../entidades/grupo.entity";
import { RepositorioGrupo } from "../repositorioGrupo";

@Injectable()
export class BuscadorDeGruposService {
  constructor(
    @Inject("RepositorioGrupo")
    private readonly repositorioGrupo: RepositorioGrupo,
  ) {}

  public async buscarPorCampeonatoId(campeonatoId: number): Promise<Grupo[]> {
    return await this.repositorioGrupo.buscarPorCampeonatoId(campeonatoId);
  }

  public async buscarTodos(): Promise<Grupo[]> {
    return await this.repositorioGrupo.buscarTodos();
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Grupo[]> {
    return await this.repositorioGrupo.buscarPorCategoriaId(categoriaId);
  }
}
