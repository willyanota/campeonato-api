import { Body, Controller, Get, Param, Post, Put } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Categoria } from "../entidades/categoria.entity";
import { BuscarCategoriasPeloCampeonatoIdDTO } from "./dtos/buscadorDeCategorias.dto";
import { CriarCategoriaDTO } from "./dtos/criadorDeCategoria.dto";
import { EditarCategoriaDTO } from "./dtos/editorDeCategoria.dto";
import { BuscadorDeCategoriasService } from "./services/buscadorDeCategorias.service";
import { CriadorDeCategoriaService } from "./services/criadorDeCategoria.service";
import { EditorDeCategoriaService } from "./services/editorDeCategoria.service";

@ApiTags("categoria")
@Controller("categoria")
export class CategoriaController {
  constructor(
    private readonly criadorDeCategoriaService: CriadorDeCategoriaService,
    private readonly editorDeCategoriaService: EditorDeCategoriaService,
    private readonly buscadorDeCategoriasService: BuscadorDeCategoriasService,
  ) {}

  @Post("criar")
  public async criarCategoria(
    @Body() categoriaDto: CriarCategoriaDTO,
  ): Promise<void> {
    await this.criadorDeCategoriaService.criar(categoriaDto);
  }

  @Put("editar")
  public async editarCategoria(
    @Body() categoriaDto: EditarCategoriaDTO,
  ): Promise<void> {
    await this.editorDeCategoriaService.editar(categoriaDto);
  }

  @Get("buscar-pelo-campeonato-id/:id")
  public async buscarCategoriasPeloCampeonatoId(
    @Param() categoriaDto: BuscarCategoriasPeloCampeonatoIdDTO,
  ): Promise<Categoria[]> {
    return await this.buscadorDeCategoriasService.buscarPorCampeonatoId(
      categoriaDto.id,
    );
  }
}
