import { Inject, Injectable } from "@nestjs/common";
import { Fase } from "../../entidades/fase.entity";
import { RepositorioFase } from "../repositorioFase";

@Injectable()
export class BuscadorDeFasesService {
  constructor(
    @Inject("RepositorioFase")
    private readonly repositorioFase: RepositorioFase,
  ) {}

  public async buscarPorCategoriaId(categoriaId: number): Promise<Fase[]> {
    return await this.repositorioFase.buscarPorCategoriaId(categoriaId);
  }
}
