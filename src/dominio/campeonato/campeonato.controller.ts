import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Campeonato } from "../entidades/campeonato.entity";
import { BuscarCampeonatoDTO } from "./dtos/buscadorDeCampeonatos.dto";
import { CriarCampeonatoDTO } from "./dtos/criadorDeCampeonato.dto";
import { EditarCampeonatoDTO } from "./dtos/editorDeCampeonato.dto";
import { BuscadorDeCampeonatosService } from "./services/buscadorDeCampeonatos.service";
import { CriadorDeCampeonatoService } from "./services/criadorDeCampeonato.service";
import { EditorDeCampeonatoService } from "./services/editorDeCampeonato.service";

@ApiTags("campeonato")
@Controller("campeonato")
export class CampeonatoController {
  constructor(
    private readonly criadorDeCampeonatoService: CriadorDeCampeonatoService,
    private readonly editorDeCampeonatoService: EditorDeCampeonatoService,
    private readonly buscadorDeCampeonatosService: BuscadorDeCampeonatosService,
  ) {}

  @Post("criar")
  public async criarCampeonato(
    @Body() campeonatoDto: CriarCampeonatoDTO,
  ): Promise<void> {
    await this.criadorDeCampeonatoService.criar(campeonatoDto);
  }

  @Put("editar")
  public async editarCampeonato(
    @Body() campeonatoDto: EditarCampeonatoDTO,
  ): Promise<void> {
    await this.editorDeCampeonatoService.editar(campeonatoDto);
  }

  @Get("buscar-todos")
  public async buscarTodosCampeonatos(): Promise<Campeonato[]> {
    return await this.buscadorDeCampeonatosService.buscarTodos();
  }

  @Get("buscar-por-id/:id")
  public async buscarCampeonatoPeloId(
    @Param() campeonatoDto: BuscarCampeonatoDTO,
  ): Promise<Campeonato> {
    return await this.buscadorDeCampeonatosService.buscar(campeonatoDto.id);
  }

  @Get("buscar-ativos")
  public async buscarCampeonatosAtivos(): Promise<Campeonato[]> {
    return await this.buscadorDeCampeonatosService.buscarAtivos();
  }
}
