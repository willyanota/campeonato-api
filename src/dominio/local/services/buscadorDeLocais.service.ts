import { Inject, Injectable } from "@nestjs/common";
import { Local } from "../../entidades/local.entity";
import { RepositorioLocal } from "../repositorioLocal";

@Injectable()
export class BuscadorDeLocaisService {
  constructor(
    @Inject("RepositorioLocal")
    private readonly repositorioLocal: RepositorioLocal,
  ) {}

  public async buscarTodos(): Promise<Local[]> {
    return await this.repositorioLocal.buscarTodos();
  }

  public async buscarPorCampeonatoId(campeonatoId: number): Promise<Local[]> {
    return await this.repositorioLocal.buscarPorCampeonatoId(campeonatoId);
  }
}
