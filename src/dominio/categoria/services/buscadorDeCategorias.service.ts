import { Inject, Injectable } from "@nestjs/common";
import { Categoria } from "../../entidades/categoria.entity";
import { RepositorioCategoria } from "../repositorioCategoria";

@Injectable()
export class BuscadorDeCategoriasService {
  constructor(
    @Inject("RepositorioCategoria")
    private readonly repositorioCategoria: RepositorioCategoria,
  ) {}

  public async buscarPorCampeonatoId(
    campeonatoId: number,
  ): Promise<Categoria[]> {
    return await this.repositorioCategoria.buscarPorCampeonatoId(campeonatoId);
  }
}
