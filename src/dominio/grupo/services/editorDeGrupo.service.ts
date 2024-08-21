import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Grupo } from "../../entidades/grupo.entity";
import { EditarGrupoDTO } from "../dtos/editorDeGrupo.dto";
import { RepositorioGrupo } from "../repositorioGrupo";

@Injectable()
export class EditorDeGrupoService {
  constructor(
    @Inject("RepositorioGrupo")
    private readonly repositorioGrupo: RepositorioGrupo,
  ) {}

  public async editar(grupoDto: EditarGrupoDTO): Promise<void> {
    const grupo: Grupo = await this.repositorioGrupo.buscarPorId(grupoDto.id);

    if (!grupo) {
      throw new BadRequestException("Grupo não encontrado.");
    }

    if (!grupo.possuiFaseComCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível alterar um grupo com uma fase de um campeonato inativo.",
      );
    }

    const grupoEditado: Grupo = new Grupo({
      ...grupo,
      nome: grupoDto.nome || grupo.nome,
      observacao: grupoDto.observacao || grupo.observacao,
      dataAtualizacao: new Date(),
    });

    await this.repositorioGrupo.salvar(grupoEditado);
  }
}
