import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Jogo } from "../entidades/jogo.entity";
import {
  BuscarJogosPeloCampeonatoIdDTO,
  BuscarJogosPorCategoriaIdDTO,
  BuscarJogosPorDataDTO,
  BuscarJogosPorFaseIdDTO,
} from "./dtos/buscadorDeJogos.dto";
import { CriarJogoDTO } from "./dtos/criadorDeJogo.dto";
import { CadastrarResultadoDTO, EditarJogoDTO } from "./dtos/editorDeJogo.dto";
import { BuscadorDeJogosService } from "./services/buscadorDeJogos.service";
import { CriadorDeJogoService } from "./services/criadorDeJogo.service";
import { EditorDeJogoService } from "./services/editorDeJogo.service";

@ApiTags("jogo")
@Controller("jogo")
export class JogoController {
  constructor(
    private readonly criadorDeJogoService: CriadorDeJogoService,
    private readonly buscadorDeJogosService: BuscadorDeJogosService,
    private readonly editorDeJogoService: EditorDeJogoService,
  ) {}

  @Post("criar")
  public async criarJogo(@Body() jogoDto: CriarJogoDTO): Promise<void> {
    await this.criadorDeJogoService.criar(jogoDto);
  }

  @Get("buscar-pelo-campeonato-id/:id")
  public async buscarJogosPeloCampeonatoId(
    @Param() jogoDto: BuscarJogosPeloCampeonatoIdDTO,
  ): Promise<Jogo[]> {
    return await this.buscadorDeJogosService.buscarPorCampeonatoId(jogoDto.id);
  }

  @Put("editar")
  public async editarJogo(@Body() jogoDto: EditarJogoDTO): Promise<void> {
    await this.editorDeJogoService.editar(jogoDto);
  }

  @Get("buscar-todos")
  public async buscarTodosJogos(): Promise<Jogo[]> {
    return await this.buscadorDeJogosService.buscarTodos();
  }

  @Get("buscar-por-data/:data")
  public async buscarJogosPorData(
    @Param() jogoDto: BuscarJogosPorDataDTO,
  ): Promise<Jogo[]> {
    return await this.buscadorDeJogosService.buscarPorData(jogoDto.data);
  }

  @Put("cadastrar-resultado")
  public async cadastrarResultado(
    @Body() jogoDto: CadastrarResultadoDTO,
  ): Promise<void> {
    await this.editorDeJogoService.cadastrarResultado(jogoDto);
  }

  @Get("buscar-por-fase-id/:id")
  public async buscarJogosPorFaseId(
    @Param() jogoDto: BuscarJogosPorFaseIdDTO,
  ): Promise<Jogo[]> {
    return await this.buscadorDeJogosService.buscarPorFaseId(jogoDto.id);
  }

  @Get("buscar-por-categoria-id/:id")
  public async buscarJogosPorCategoriaId(
    @Param() jogoDto: BuscarJogosPorCategoriaIdDTO,
  ): Promise<Jogo[]> {
    return await this.buscadorDeJogosService.buscarPorCategoriaId(jogoDto.id);
  }
}
