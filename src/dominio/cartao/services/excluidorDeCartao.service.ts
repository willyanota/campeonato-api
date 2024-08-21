import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { Cartao } from "../../entidades/cartao.entity";
import { SuspensorDeJogadorService } from "../../jogador/services/suspensorDeJogador.service";
import { RepositorioCartao } from "../repositorioCartao";

@Injectable()
export class ExcluidorDeCartaoService {
  constructor(
    @Inject("RepositorioCartao")
    private readonly repositorioCartao: RepositorioCartao,
    private readonly suspensorDeJogador: SuspensorDeJogadorService,
  ) {}

  public async excluir(id: number): Promise<void> {
    const cartao: Cartao = await this.repositorioCartao.buscarPorId(id);

    if (!cartao) {
      throw new BadRequestException("Cartão não encontrado.");
    }

    await this.repositorioCartao.excluir(id);

    await this.suspensorDeJogador.decrementarContadorDeCartoes(cartao);

    await this.suspensorDeJogador.removerSuspensaoExclusaoDeCartao(
      cartao.obterJogoId(),
      cartao.obterJogadorId(),
    );
  }
}
