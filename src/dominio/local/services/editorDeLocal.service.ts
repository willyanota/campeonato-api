import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioCampeonato } from "src/dominio/campeonato/repositorioCampeonato";
import { Campeonato } from "../../entidades/campeonato.entity";
import { Local } from "../../entidades/local.entity";
import { EditarLocalDTO } from "../dtos/editorDeLocal.dto";
import { RepositorioLocal } from "../repositorioLocal";

@Injectable()
export class EditorDeLocalService {
  constructor(
    @Inject("RepositorioLocal")
    private readonly repositorioLocal: RepositorioLocal,
    @Inject("RepositorioCampeonato")
    private readonly repositorioCampeonato: RepositorioCampeonato,
  ) {}

  public async editar(localDto: EditarLocalDTO): Promise<void> {
    const local: Local = await this.repositorioLocal.buscarPorId(localDto.id);

    if (!local) {
      throw new BadRequestException("Local não encontrado.");
    }

    if (!local.possuiCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível alterar um local de um campeonato inativo.",
      );
    }

    let novoCampeonato: Campeonato | undefined;

    if (localDto.campeonatoId) {
      novoCampeonato = await this.repositorioCampeonato.buscarPorId(
        localDto.campeonatoId,
      );

      if (!novoCampeonato) {
        throw new BadRequestException(
          "O campeonato informado não foi encontrado.",
        );
      }

      if (!novoCampeonato.estaAtivo) {
        throw new BadRequestException("O campeonato informado não está ativo.");
      }
    }

    const localEditado: Local = new Local({
      ...local,
      nome: localDto.nome || local.nome,
      endereco: localDto.endereco || local.endereco,
      cep: localDto.cep || local.cep,
      campeonato: novoCampeonato || local.campeonato,
      dataAtualizacao: new Date(),
    });

    await this.repositorioLocal.salvar(localEditado);
  }
}
