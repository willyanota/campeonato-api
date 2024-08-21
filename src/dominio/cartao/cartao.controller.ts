import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Cartao } from "../entidades/cartao.entity";
import { BuscarCartoesPorJogoIdDTO } from "./dtos/buscadorDeCartoes.dto";
import { CriarCartaoDTO } from "./dtos/criadorDeCartao.dto";
import { ExcluirCartaoDTO } from "./dtos/excluidorDeCartao.dto";
import { BuscadorDeCartoesService } from "./services/buscadorDeCartoes.service";
import { CriadorDeCartaoService } from "./services/criadorDeCartao.service";
import { ExcluidorDeCartaoService } from "./services/excluidorDeCartao.service";

@ApiTags("cartao")
@Controller("cartao")
export class CartaoController {
  constructor(
    private readonly criadorDeCartaoService: CriadorDeCartaoService,
    private readonly buscadorDeCartoesService: BuscadorDeCartoesService,
    private readonly excluidorDeCartaoService: ExcluidorDeCartaoService,
  ) {}

  @Post("criar")
  public async criarCartao(@Body() cartaoDto: CriarCartaoDTO): Promise<void> {
    await this.criadorDeCartaoService.criar(cartaoDto);
  }

  @Get("buscar-por-jogo-id/:id")
  public async buscarCartoesPorJogoId(
    @Param() cartaoDto: BuscarCartoesPorJogoIdDTO,
  ): Promise<Cartao[]> {
    return await this.buscadorDeCartoesService.buscarPorJogoId(cartaoDto.id);
  }

  @Delete("excluir/:id")
  public async excluirCartao(
    @Param() cartaoDto: ExcluirCartaoDTO,
  ): Promise<void> {
    await this.excluidorDeCartaoService.excluir(cartaoDto.id);
  }
}
