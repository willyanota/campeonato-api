import { Inject, Injectable } from "@nestjs/common";
import { validaIntervalo } from "../../comum/validaIntervalo";
import { Campeonato } from "../../entidades/campeonato.entity";
import { CriarCampeonatoDTO } from "../dtos/criadorDeCampeonato.dto";
import { RepositorioCampeonato } from "../repositorioCampeonato";

@Injectable()
export class CriadorDeCampeonatoService {
  constructor(
    @Inject("RepositorioCampeonato")
    private readonly repositorioCampeonato: RepositorioCampeonato,
  ) {}

  public async criar(campeonatoDto: CriarCampeonatoDTO): Promise<void> {
    validaIntervalo(
      campeonatoDto.dataInicio,
      campeonatoDto.dataFim,
      "A data de início não pode ser maior ou igual à data de fim.",
    );

    validaIntervalo(
      campeonatoDto.inscricaoDataInicio,
      campeonatoDto.inscricaoDataFim,
      "A data de início não pode ser maior ou igual à data de fim.",
    );

    const campeonatoCriado: Campeonato = new Campeonato(campeonatoDto);

    await this.repositorioCampeonato.salvar(campeonatoCriado);
  }
}
