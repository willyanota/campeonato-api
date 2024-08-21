import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Fase } from "../../entidades/fase.entity";
import { Grupo } from "../../entidades/grupo.entity";
import { RepositorioFase } from "../../fase/repositorioFase";
import { CriarGrupoDTO } from "../dtos/criadorDeGrupo.dto";
import { RepositorioGrupo } from "../repositorioGrupo";

@Injectable()
export class CriadorDeGrupoService {
  constructor(
    @Inject("RepositorioGrupo")
    private readonly repositorioGrupo: RepositorioGrupo,
    @Inject("RepositorioFase")
    private readonly repositorioFase: RepositorioFase,
  ) {}

  public async criar(grupoDto: CriarGrupoDTO): Promise<void> {
    const fase: Fase = await this.repositorioFase.buscarPorId(grupoDto.faseId);

    if (!fase) {
      throw new BadRequestException(
        "Não é possível adicionar um grupo com uma fase inexistente.",
      );
    }

    if (!fase.possuiCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível adicionar um grupo com uma fase de um campeonato inativo.",
      );
    }

    const grupoCriado: Grupo = new Grupo({ ...grupoDto, fase: fase });

    await this.repositorioGrupo.salvar(grupoCriado);
  }
}
