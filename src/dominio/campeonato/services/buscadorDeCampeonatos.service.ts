import { Inject, Injectable } from "@nestjs/common";
import { Campeonato } from "src/dominio/entidades/campeonato.entity";
import { RepositorioCampeonato } from "../repositorioCampeonato";

@Injectable()
export class BuscadorDeCampeonatosService {
  constructor(
    @Inject("RepositorioCampeonato")
    private readonly repositorioCampeonato: RepositorioCampeonato,
  ) {}

  public async buscar(id: number): Promise<Campeonato> {
    return await this.repositorioCampeonato.buscarPorId(id);
  }

  public async buscarAtivos(): Promise<Campeonato[]> {
    return await this.repositorioCampeonato.buscarAtivos();
  }

  public async buscarTodos(): Promise<Campeonato[]> {
    return await this.repositorioCampeonato.buscarTodos();
  }
}
