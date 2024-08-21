import { Inject, Injectable } from "@nestjs/common";
import { Jogador } from "src/dominio/entidades/jogador.entity";
import { RepositorioJogador } from "../repositorioJogador";

@Injectable()
export class BuscadorDeJogadoresService {
  constructor(
    @Inject("RepositorioJogador")
    private readonly repositorioJogador: RepositorioJogador,
  ) {}

  public async buscarPorEquipeId(equipeId: number): Promise<Jogador[]> {
    return await this.repositorioJogador.buscarPorEquipeId(equipeId);
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Jogador[]> {
    return await this.repositorioJogador.buscarPorCategoriaId(categoriaId);
  }
}
