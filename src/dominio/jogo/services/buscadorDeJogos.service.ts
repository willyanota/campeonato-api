import { Inject, Injectable } from "@nestjs/common";
import { Jogo } from "../../entidades/jogo.entity";
import { RepositorioJogo } from "../repositorioJogo";

@Injectable()
export class BuscadorDeJogosService {
  constructor(
    @Inject("RepositorioJogo")
    private readonly repositorioJogo: RepositorioJogo,
  ) {}

  public async buscarPorCampeonatoId(campeonatoId: number): Promise<Jogo[]> {
    return await this.repositorioJogo.buscarPorCampeonatoId(campeonatoId);
  }

  public async buscarTodos(): Promise<Jogo[]> {
    return await this.repositorioJogo.buscarTodos();
  }

  public async buscarPorData(data: string): Promise<Jogo[]> {
    return await this.repositorioJogo.buscarPorData(data);
  }

  public async buscarPorFaseId(faseId: number): Promise<Jogo[]> {
    return await this.repositorioJogo.buscarPorFaseId(faseId);
  }

  public async buscarPorCategoriaId(categoriaId: number): Promise<Jogo[]> {
    return await this.repositorioJogo.buscarPorCategoriaId(categoriaId);
  }
}
