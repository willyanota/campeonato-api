import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Local } from "../entidades/local.entity";
import { BuscarLocaisPeloCampeonatoIdDTO } from "./dtos/buscadorDeLocais.dto";
import { CriarLocalDTO } from "./dtos/criadorDeLocal.dto";
import { EditarLocalDTO } from "./dtos/editorDeLocal.dto";
import { BuscadorDeLocaisService } from "./services/buscadorDeLocais.service";
import { CriadorDeLocalService } from "./services/criadorDeLocal.service";
import { EditorDeLocalService } from "./services/editorDeLocal.service";

@ApiTags("local")
@Controller("local")
export class LocalController {
  constructor(
    private readonly criadorDeLocalService: CriadorDeLocalService,
    private readonly buscadorDeLocaisService: BuscadorDeLocaisService,
    private readonly editorDeLocalService: EditorDeLocalService,
  ) {}

  @Post("criar")
  public async criarLocal(@Body() localDto: CriarLocalDTO): Promise<void> {
    await this.criadorDeLocalService.criar(localDto);
  }

  @Get("buscar-todos")
  public async buscarTodosLocais(): Promise<Local[]> {
    return await this.buscadorDeLocaisService.buscarTodos();
  }

  @Put("editar")
  public async editarLocal(@Body() localDto: EditarLocalDTO): Promise<void> {
    await this.editorDeLocalService.editar(localDto);
  }

  @Get("buscar-por-campeonato-id/:id")
  public async buscarLocaisPeloCampeonatoId(
    @Param() localDto: BuscarLocaisPeloCampeonatoIdDTO,
  ): Promise<Local[]> {
    return await this.buscadorDeLocaisService.buscarPorCampeonatoId(
      localDto.id,
    );
  }
}
