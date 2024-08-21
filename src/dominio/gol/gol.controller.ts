import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Gol } from "../entidades/gol.entity";
import {
  BuscarGolsPorCategoriaIdDTO,
  BuscarGolsPorJogoIdDTO,
} from "./dtos/buscadorDeGols.dto";
import { CriarGolDTO } from "./dtos/criadorDeGol.dto";
import { ExcluirGolDTO } from "./dtos/excluidorDeGol.dto";
import { BuscadorDeGolsService } from "./services/buscadorDeGols.service";
import { CriadorDeGolService } from "./services/criadorDeGol.service";
import { ExcluidorDeGolService } from "./services/excluidorDeGol.service";

@ApiTags("gol")
@Controller("gol")
export class GolController {
  constructor(
    private readonly criadorDeGolService: CriadorDeGolService,
    private readonly buscadorDeGolsService: BuscadorDeGolsService,
    private readonly excluidorDeGolService: ExcluidorDeGolService,
  ) {}

  @Post("criar")
  public async criarGol(@Body() golDto: CriarGolDTO): Promise<void> {
    await this.criadorDeGolService.criar(golDto);
  }

  @Get("buscar-por-jogo-id/:id")
  public async buscarGolsPorJogoId(
    @Param() golDto: BuscarGolsPorJogoIdDTO,
  ): Promise<Gol[]> {
    return await this.buscadorDeGolsService.buscarPorJogoId(golDto.id);
  }

  @Delete("excluir/:id")
  public async excluirGol(@Param() golDto: ExcluirGolDTO): Promise<void> {
    await this.excluidorDeGolService.excluir(golDto.id);
  }

  @Get("buscar-por-categoria-id/:id")
  public async buscarGolsPorCategoriaId(
    @Param() golDto: BuscarGolsPorCategoriaIdDTO,
  ): Promise<Gol[]> {
    return await this.buscadorDeGolsService.buscarPorCategoriaId(golDto.id);
  }
}
