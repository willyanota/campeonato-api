import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags } from "@nestjs/swagger";
import { Jogador } from "../entidades/jogador.entity";
import {
  BuscarJogadoresPorCategoriaIdDTO,
  BuscarJogadoresPorEquipeIdDTO,
} from "./dtos/buscadorDeJogadores.dto";
import { CriarJogadorDTO } from "./dtos/criadorDeJogador.dto";
import { EditarJogadorDTO } from "./dtos/editorDeJogador.dto";
import { BuscadorDeJogadoresService } from "./services/buscadorDeJogadores.service";
import { CriadorDeJogadorService } from "./services/criadorDeJogador.service";
import { EditorDeJogadorService } from "./services/editorDeJogador.service";

@ApiTags("jogador")
@Controller("jogador")
export class JogadorController {
  constructor(
    private readonly criadorDeJogadorService: CriadorDeJogadorService,
    private readonly editorDeJogadorService: EditorDeJogadorService,
    private readonly buscadorDeJogadores: BuscadorDeJogadoresService,
  ) {}

  @Post("criar")
  @UseInterceptors(FileInterceptor("image"))
  public async criarJogador(
    @Body() jogadorDto: CriarJogadorDTO,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.criadorDeJogadorService.criar(jogadorDto, image);
  }

  @Put("editar")
  @UseInterceptors(FileInterceptor("image"))
  public async editarJogador(
    @Body() jogadorDto: EditarJogadorDTO,
    @UploadedFile() image: Express.Multer.File,
  ): Promise<void> {
    await this.editorDeJogadorService.editar(jogadorDto, image);
  }

  @Get("buscar-por-equipe-id/:id")
  public async buscarJogadoresPorEquipeId(
    @Param() jogadorDto: BuscarJogadoresPorEquipeIdDTO,
  ): Promise<Jogador[]> {
    return await this.buscadorDeJogadores.buscarPorEquipeId(jogadorDto.id);
  }

  @Get("buscar-por-categoria-id/:id")
  public async buscarJogadoresPorCategoriaId(
    @Param() jogadorDto: BuscarJogadoresPorCategoriaIdDTO,
  ): Promise<Jogador[]> {
    return await this.buscadorDeJogadores.buscarPorCategoriaId(jogadorDto.id);
  }
}
