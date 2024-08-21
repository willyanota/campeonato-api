import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Equipe } from "../entidades/equipe.entity";
import {
  BuscarEquipesPorCampeonatoIdDTO,
  BuscarEquipesPorCategoriaIdDTO,
  BuscarEquipesPorGrupoIdDTO,
} from "./dtos/buscadorDeEquipes.dto";
import { CriarEquipeDTO } from "./dtos/criadorDeEquipe.dto";
import {
  AdicionarGrupoAEquipeDTO,
  EditarEquipeDTO,
  RemoverGrupoDaEquipeDTO,
} from "./dtos/editorDeEquipe.dto";
import { ExcluirEquipeDTO } from "./dtos/excluidorDeEquipe.dto";
import { BuscadorDeEquipesService } from "./services/buscadorDeEquipes.service";
import { CriadorDeEquipeService } from "./services/criadorDeEquipe.service";
import { EditorDeEquipeService } from "./services/editorDeEquipe.service";
import { ExcluidorDeEquipeService } from "./services/excluidorDeEquipe.service";

@ApiTags("equipe")
@Controller("equipe")
export class EquipeController {
  constructor(
    private readonly criarEquipeService: CriadorDeEquipeService,
    private readonly buscadorDeEquipesService: BuscadorDeEquipesService,
    private readonly editorDeEquipeService: EditorDeEquipeService,
    private readonly excluidorDeEquipeService: ExcluidorDeEquipeService,
  ) {}

  @Post("criar")
  public async criarEquipe(@Body() equipeDto: CriarEquipeDTO): Promise<void> {
    await this.criarEquipeService.criar(equipeDto);
  }

  @Put("editar")
  public async editarEquipe(@Body() equipeDto: EditarEquipeDTO): Promise<void> {
    await this.editorDeEquipeService.editar(equipeDto);
  }

  @Get("buscar-pelo-campeonato-id/:id")
  public async buscarEquipesPeloCampeonatoId(
    @Param() equipeDto: BuscarEquipesPorCampeonatoIdDTO,
  ): Promise<Equipe[]> {
    return await this.buscadorDeEquipesService.buscarPorCampeonatoId(
      equipeDto.id,
    );
  }

  @Delete("excluir/:id")
  public async excluirEquipe(
    @Param() equipeDto: ExcluirEquipeDTO,
  ): Promise<void> {
    await this.excluidorDeEquipeService.excluir(equipeDto.id);
  }

  @Get("buscar-equipes-dos-campeonatos-ativos")
  public async buscarEquipesDosCampeonatosAtivos(): Promise<Equipe[]> {
    return await this.buscadorDeEquipesService.buscarEquipesDosCampeonatosAtivos();
  }

  @Get("buscar-por-categoria-id/:id")
  public async buscarEquipesPorCategoriaId(
    @Param() equipeDto: BuscarEquipesPorCategoriaIdDTO,
  ): Promise<Equipe[]> {
    return await this.buscadorDeEquipesService.buscarPorCategoriaId(
      equipeDto.id,
    );
  }

  public async adicionarGrupoAEquipe(
    @Body() equipeDto: AdicionarGrupoAEquipeDTO,
  ): Promise<void> {
    await this.editorDeEquipeService.adicionarGrupoAEquipe(equipeDto);
  }

  public async buscarEquipesPorGrupoId(
    @Param() equipeDto: BuscarEquipesPorGrupoIdDTO,
  ): Promise<Equipe[]> {
    return await this.buscadorDeEquipesService.buscarPorGrupoId(equipeDto.id);
  }

  public async removerGrupoDaEquipe(
    @Body() equipeDto: RemoverGrupoDaEquipeDTO,
  ): Promise<void> {
    await this.editorDeEquipeService.removerGrupoDaEquipe(equipeDto.id);
  }

  @Get("buscar-equipes-do-grupo/:id")
  public async buscarEquipesDoGrupo(
    @Param() equipeDto: BuscarEquipesPorGrupoIdDTO,
  ): Promise<Equipe[]> {
    return await this.buscadorDeEquipesService.buscarEquipesDoGrupo(
      equipeDto.id,
    );
  }
}
