import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { validaIntervalo } from "../../comum/validaIntervalo";
import { Campeonato } from "../../entidades/campeonato.entity";
import { EditarCampeonatoDTO } from "../dtos/editorDeCampeonato.dto";
import { RepositorioCampeonato } from "../repositorioCampeonato";

@Injectable()
export class EditorDeCampeonatoService {
  constructor(
    @Inject("RepositorioCampeonato")
    private readonly repositorioCampeonato: RepositorioCampeonato,
  ) {}

  public async editar(campeonatoDto: EditarCampeonatoDTO): Promise<void> {
    const campeonato: Campeonato = await this.repositorioCampeonato.buscarPorId(
      campeonatoDto.id,
    );

    if (!campeonato) {
      throw new BadRequestException("Campeonato não encontrado.");
    }

    if (!campeonato.ativo) {
      const campeonatoEditado: Campeonato = new Campeonato({
        ...campeonato,
        ativo: campeonatoDto.ativo,
        dataAtualizacao: new Date(),
      });

      await this.repositorioCampeonato.salvar(campeonatoEditado);
    } else {
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

      const campeonatoEditado: Campeonato = new Campeonato({
        ...campeonato,
        nome: campeonatoDto.nome || campeonato.nome,
        dataInicio: campeonatoDto.dataInicio || campeonato.dataInicio,
        dataFim: campeonatoDto.dataFim || campeonato.dataFim,
        inscricaoDataInicio:
          campeonatoDto.inscricaoDataInicio || campeonato.inscricaoDataInicio,
        inscricaoDataFim:
          campeonatoDto.inscricaoDataFim || campeonato.inscricaoDataFim,
        ativo: campeonatoDto.ativo ?? campeonato.ativo,
        exibirNoSite: campeonatoDto.exibirNoSite ?? campeonato.exibirNoSite,
        dataAtualizacao: new Date(),
      });

      await this.repositorioCampeonato.salvar(campeonatoEditado);
    }
  }
}
