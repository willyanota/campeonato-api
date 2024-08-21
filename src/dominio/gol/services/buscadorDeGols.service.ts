import { Inject, Injectable } from "@nestjs/common";
import { Gol } from "../../entidades/gol.entity";
import { RepositorioGol } from "../repositorioGol";

@Injectable()
export class BuscadorDeGolsService {
  constructor(
    @Inject("RepositorioGol") private readonly repositorioGol: RepositorioGol,
  ) {}

  public async buscarPorJogoId(jogoId: number): Promise<Gol[]> {
    return await this.repositorioGol.buscarPorJogoId(jogoId);
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Gol[]> {
    return await this.repositorioGol.buscarPorCategoriaId(categoriaId);
  }
}
