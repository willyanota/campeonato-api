import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioCampeonato } from "../../campeonato/repositorioCampeonato";
import { Campeonato } from "../../entidades/campeonato.entity";
import { Local } from "../../entidades/local.entity";
import { CriarLocalDTO } from "../dtos/criadorDeLocal.dto";
import { RepositorioLocal } from "../repositorioLocal";

@Injectable()
export class CriadorDeLocalService {
  constructor(
    @Inject("RepositorioLocal")
    private readonly repositorioLocal: RepositorioLocal,
    @Inject("RepositorioCampeonato")
    private readonly repositorioCampeonato: RepositorioCampeonato,
  ) {}

  public async criar(localDto: CriarLocalDTO): Promise<void> {
    const campeonato: Campeonato = await this.repositorioCampeonato.buscarPorId(
      localDto.campeonatoId,
    );

    if (!campeonato) {
      throw new BadRequestException(
        "Não é possível adicionar um local sem um campeonato existente.",
      );
    }

    if (!campeonato.estaAtivo) {
      throw new BadRequestException(
        "Não é possível adicionar um local em um campeonato inativo.",
      );
    }

    const localCriado: Local = new Local({
      ...localDto,
      campeonato: campeonato,
    });

    await this.repositorioLocal.salvar(localCriado);
  }
}
