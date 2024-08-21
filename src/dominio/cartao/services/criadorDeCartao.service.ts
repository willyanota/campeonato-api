import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioJogador } from "src/dominio/jogador/repositorioJogador";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { Cartao } from "../../entidades/cartao.entity";
import { Jogador } from "../../entidades/jogador.entity";
import { Jogo } from "../../entidades/jogo.entity";
import { SuspensorDeJogadorService } from "../../jogador/services/suspensorDeJogador.service";
import { CriarCartaoDTO } from "../dtos/criadorDeCartao.dto";
import { RepositorioCartao } from "../repositorioCartao";

@Injectable()
export class CriadorDeCartaoService {
  constructor(
    @Inject("RepositorioCartao")
    private readonly repositorioCartao: RepositorioCartao,
    @Inject("RepositorioJogo")
    private readonly repositorioJogo: RepositorioJogo,
    @Inject("RepositorioJogador")
    private readonly repositorioJogador: RepositorioJogador,
    private readonly suspensorDeJogador: SuspensorDeJogadorService,
  ) {}

  public async criar(cartaoDto: CriarCartaoDTO): Promise<void> {
    const jogo: Jogo = await this.repositorioJogo.buscarPorId(cartaoDto.jogoId);

    if (!jogo) {
      throw new BadRequestException(
        "Não é possível adicionar um cartão com um jogo inexistente.",
      );
    }

    const jogador: Jogador = await this.repositorioJogador.buscarPorId(
      cartaoDto.jogadorId,
    );

    if (!jogador) {
      throw new BadRequestException(
        "Não é possível adicionar um cartão com um jogador inexistente.",
      );
    }

    const cartaoCriado: Cartao = new Cartao({
      ...cartaoDto,
      jogo: jogo,
      jogador: jogador,
    });

    await this.repositorioCartao.salvar(cartaoCriado);

    await this.suspensorDeJogador.incrementarContadorDeCartoes(
      cartaoDto.jogadorId,
      cartaoDto.tipo,
    );

    await this.suspensorDeJogador.suspenderJogador(
      cartaoDto.jogoId,
      cartaoDto.jogadorId,
    );
  }
}
