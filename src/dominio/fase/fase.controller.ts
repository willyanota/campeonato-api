import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Fase } from "../entidades/fase.entity";
import { BuscarFasesPorCategoriaIdDTO } from "./dtos/buscadorDeFases.dto";
import { CriarFaseDTO } from "./dtos/criadorDeFase.dto";
import { EditarFaseDTO } from "./dtos/editorDeFase.dto";
import { BuscadorDeFasesService } from "./services/buscadorDeFases.service";
import { CriadorDeFaseService } from "./services/criadorDeFase.service";
import { EditorDeFaseService } from "./services/editorDeFase.service";

@ApiTags("fase")
@Controller("fase")
export class FaseController {
  constructor(
    private readonly criadorDeFaseService: CriadorDeFaseService,
    private readonly editorDeFaseService: EditorDeFaseService,
    private readonly buscadorDeFasesService: BuscadorDeFasesService,
  ) {}

  @Post("criar")
  public async criarFase(@Body() faseDto: CriarFaseDTO): Promise<void> {
    await this.criadorDeFaseService.criar(faseDto);
  }

  @Put("editar")
  public async editarFase(@Body() faseDto: EditarFaseDTO): Promise<void> {
    await this.editorDeFaseService.editar(faseDto);
  }

  @Get("buscar-por-categoria-id/:id")
  public async buscarFasesPorCategoriaId(
    @Param() faseDto: BuscarFasesPorCategoriaIdDTO,
  ): Promise<Fase[]> {
    return await this.buscadorDeFasesService.buscarPorCategoriaId(faseDto.id);
  }
}
