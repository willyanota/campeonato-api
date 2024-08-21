import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Equipe } from "../../entidades/equipe.entity";
import { Grupo } from "../../entidades/grupo.entity";
import { RepositorioGrupo } from "../../grupo/repositorioGrupo";
import {
  AdicionarGrupoAEquipeDTO,
  EditarEquipeDTO,
} from "../dtos/editorDeEquipe.dto";
import { RepositorioEquipe } from "../repositorioEquipe";

@Injectable()
export class EditorDeEquipeService {
  constructor(
    @Inject("RepositorioEquipe")
    private readonly repositorioEquipe: RepositorioEquipe,
    @Inject("RepositorioGrupo")
    private readonly repositorioGrupo: RepositorioGrupo,
  ) {}

  public async editar(equipeDto: EditarEquipeDTO): Promise<void> {
    const equipe: Equipe = await this.repositorioEquipe.buscarPorId(
      equipeDto.id,
    );

    if (!equipe) {
      throw new BadRequestException("Equipe não encontrada.");
    }

    if (!equipe.possuiCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível alterar uma equipe de um campeonato inativo.",
      );
    }

    if (equipeDto.abertura && !equipe.abertura) {
      equipe.pontos += 2;
    }

    const equipeEditada: Equipe = new Equipe({
      ...equipe,
      nome: equipeDto.nome || equipe.nome,
      responsavel: equipeDto.responsavel || equipe.responsavel,
      ehConvidada: equipeDto.ehConvidada ?? equipe.ehConvidada,
      abertura: equipeDto.abertura ?? equipe.abertura,
      dataAtualizacao: new Date(),
    });

    await this.repositorioEquipe.salvar(equipeEditada);
  }

  public async adicionarGrupoAEquipe(
    equipeDto: AdicionarGrupoAEquipeDTO,
  ): Promise<void> {
    const equipe: Equipe = await this.repositorioEquipe.buscarPorId(
      equipeDto.id,
    );

    if (!equipe) {
      throw new BadRequestException("Equipe não encontrada.");
    }

    if (!equipe.possuiCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível alterar uma equipe de um campeonato inativo.",
      );
    }

    const grupo: Grupo = await this.repositorioGrupo.buscarPorId(
      equipeDto.grupoId,
    );

    if (!grupo) {
      throw new BadRequestException("Grupo não encontrado.");
    }

    if (!grupo.possuiFaseComCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível adicionar um grupo com uma fase de um campeonato inativo.",
      );
    }

    if (grupo.fase.categoria.id !== equipe.categoria.id) {
      throw new BadRequestException("Categoria inválida.");
    }

    const equipeEditada: Equipe = new Equipe({
      ...equipe,
      grupo: grupo || equipe.grupo,
      dataAtualizacao: new Date(),
    });

    await this.repositorioEquipe.salvar(equipeEditada);
  }

  public async removerGrupoDaEquipe(id: number): Promise<void> {
    const equipe: Equipe = await this.repositorioEquipe.buscarPorId(id);

    if (!equipe) {
      throw new BadRequestException("Equipe não encontrada.");
    }

    equipe.grupo = null;
    const equipeEditada: Equipe = new Equipe({
      ...equipe,
      dataAtualizacao: new Date(),
    });

    await this.repositorioEquipe.salvar(equipeEditada);
  }
}
