import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Grupo } from "../entidades/grupo.entity";
import {
  BuscarGruposPorCampeonatoIdDTO,
  BuscarGruposPorCategoriaIdDTO,
} from "./dtos/buscadorDeGrupos.dto";
import { CriarGrupoDTO } from "./dtos/criadorDeGrupo.dto";
import { EditarGrupoDTO } from "./dtos/editorDeGrupo.dto";
import { BuscadorDeGruposService } from "./services/buscadorDeGrupos.service";
import { CriadorDeGrupoService } from "./services/criadorDeGrupo.service";
import { EditorDeGrupoService } from "./services/editorDeGrupo.service";

@ApiTags("grupo")
@Controller("grupo")
export class GrupoController {
  constructor(
    private readonly criadorDeGrupoService: CriadorDeGrupoService,
    private readonly editorDeGrupoService: EditorDeGrupoService,
    private readonly buscadorDeGruposService: BuscadorDeGruposService,
  ) {}

  @Post("criar")
  public async criarGrupo(@Body() grupoDto: CriarGrupoDTO): Promise<void> {
    await this.criadorDeGrupoService.criar(grupoDto);
  }

  @Put("editar")
  public async editarGrupo(@Body() grupoDto: EditarGrupoDTO): Promise<void> {
    await this.editorDeGrupoService.editar(grupoDto);
  }

  @Get("buscar-por-campeonato-id/:id")
  public async buscarGruposPorCampeonatoId(
    @Param() grupoDto: BuscarGruposPorCampeonatoIdDTO,
  ): Promise<Grupo[]> {
    return await this.buscadorDeGruposService.buscarPorCampeonatoId(
      grupoDto.id,
    );
  }

  @Get("buscar-todos")
  public async buscarTodosGrupos(): Promise<Grupo[]> {
    return await this.buscadorDeGruposService.buscarTodos();
  }

  @Get("buscar-por-categoria-id/:id")
  public async buscarGruposPorCategoriaId(
    @Param() grupoDto: BuscarGruposPorCategoriaIdDTO,
  ): Promise<Grupo[]> {
    return await this.buscadorDeGruposService.buscarPorCategoriaId(grupoDto.id);
  }
}
