import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioCartao } from "src/dominio/cartao/repositorioCartao";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { Cartao } from "../../entidades/cartao.entity";
import { Jogador } from "../../entidades/jogador.entity";
import { Jogo } from "../../entidades/jogo.entity";
import { RepositorioJogador } from "../repositorioJogador";

@Injectable()
export class SuspensorDeJogadorService {
  constructor(
    @Inject("RepositorioJogador")
    private readonly repositorioJogador: RepositorioJogador,
    @Inject("RepositorioJogo")
    private readonly repositorioJogo: RepositorioJogo,
    @Inject("RepositorioCartao")
    private readonly repositorioCartao: RepositorioCartao,
  ) {}

  public async incrementarContadorDeCartoes(
    jogadorId: number,
    tipo: string,
  ): Promise<void> {
    const jogador: Jogador =
      await this.repositorioJogador.buscarPorId(jogadorId);

    if (tipo === "Amarelo") {
      jogador.contadorDeCartoesAmarelos += 1;
    } else if (tipo === "Vermelho") {
      jogador.contadorDeCartoesVermelhos += 1;
    }

    const jogadorEditado: Jogador = new Jogador({
      ...jogador,
      dataAtualizacao: new Date(),
    });

    await this.repositorioJogador.salvar(jogadorEditado);
  }

  public async suspenderJogador(jogoId: number, id: number): Promise<void> {
    const jogador: Jogador = await this.repositorioJogador.buscarPorId(id);

    if (!jogador) {
      throw new BadRequestException("Jogador não encontrado.");
    }

    const jogo: Jogo = await this.repositorioJogo.buscarPorId(jogoId);

    const cartoesAmarelos: number =
      await this.repositorioCartao.contarNumeroDeCartoesDoJogadorNoJogo(
        jogoId,
        id,
        "Amarelo",
      );

    const cartaoVermelho: number =
      await this.repositorioCartao.contarNumeroDeCartoesDoJogadorNoJogo(
        jogoId,
        id,
        "Vermelho",
      );

    if (
      jogador.estaSuspensoPorCartoesAmarelos() ||
      cartoesAmarelos >= 2 ||
      cartaoVermelho > 0
    ) {
      const jogadorEditado: Jogador = new Jogador({
        ...jogador,
        suspenso: true,
        rodadaSuspenso: jogo.numeroDaRodada,
        contadorDeRodadasSuspenso: 1,
        dataAtualizacao: new Date(),
      });

      await this.repositorioJogador.salvar(jogadorEditado);
    }
  }

  public async decrementarContadorDeCartoes(cartao: Cartao): Promise<void> {
    if (cartao.tipo === "Amarelo") {
      cartao.jogador.contadorDeCartoesAmarelos -= 1;
    } else if (cartao.tipo === "Vermelho") {
      cartao.jogador.contadorDeCartoesVermelhos -= 1;
    }

    const jogadorEditado: Jogador = new Jogador({
      ...cartao.jogador,
      dataAtualizacao: new Date(),
    });

    await this.repositorioJogador.salvar(jogadorEditado);
  }

  public async removerSuspensaoExclusaoDeCartao(
    jogoId: number,
    id: number,
  ): Promise<void> {
    const jogador: Jogador = await this.repositorioJogador.buscarPorId(id);

    if (!jogador) {
      throw new BadRequestException("Jogador não encontrado.");
    }

    const cartoesAmarelosNoJogo: number =
      await this.repositorioCartao.contarNumeroDeCartoesDoJogadorNoJogo(
        jogoId,
        id,
        "Amarelo",
      );

    const cartaoVermelhoNoJogo: number =
      await this.repositorioCartao.contarNumeroDeCartoesDoJogadorNoJogo(
        jogoId,
        id,
        "Vermelho",
      );

    if (
      !jogador.estaSuspensoPorCartoesAmarelos() &&
      !jogador.estaSuspensoPorCartaoVermelho() &&
      cartoesAmarelosNoJogo <= 1 &&
      cartaoVermelhoNoJogo === 0
    ) {
      const jogadorEditado: Jogador = new Jogador({
        ...jogador,
        suspenso: false,
        rodadaSuspenso: null,
        contadorDeRodadasSuspenso: 0,
        dataAtualizacao: new Date(),
      });

      await this.repositorioJogador.salvar(jogadorEditado);
    }
  }

  private async removerSuspensao(id: number, jogoId: number): Promise<void> {
    const jogador: Jogador = await this.repositorioJogador.buscarPorId(id);

    if (!jogador) {
      throw new BadRequestException("Jogador não encontrado.");
    }

    const jogo: Jogo = await this.repositorioJogo.buscarPorId(jogoId);

    if (!jogo) {
      throw new BadRequestException("Jogo não encontrado.");
    }

    if (
      jogador.suspenso &&
      jogo.numeroDaRodada > jogador.rodadaSuspenso &&
      jogador.contadorDeRodadasSuspenso === 0
    ) {
      const jogadorEditado: Jogador = new Jogador({
        ...jogador,
        suspenso: false,
        rodadaSuspenso: null,
        contadorDeCartoesAmarelos: 0,
        contadorDeCartoesVermelhos: 0,
        dataAtualizacao: new Date(),
      });

      await this.repositorioJogador.salvar(jogadorEditado);
    }
  }

  public async removerSuspensaoParaEquipes(jogo: Jogo): Promise<void> {
    const jogadoresEquipe1: Jogador[] =
      await this.repositorioJogador.buscarPorEquipeId(jogo.equipe1.id);

    const jogadoresEquipe2: Jogador[] =
      await this.repositorioJogador.buscarPorEquipeId(jogo.equipe2.id);

    for (const jogador of [...jogadoresEquipe1, ...jogadoresEquipe2]) {
      await this.removerSuspensao(jogador.id, jogo.id);
    }
  }

  public async decrementarContadorDeRodadasSuspenso(
    jogadorId: number,
  ): Promise<void> {
    const jogador: Jogador =
      await this.repositorioJogador.buscarPorId(jogadorId);

    if (!jogador) {
      throw new BadRequestException("Jogador não encontrado.");
    }

    if (
      (jogador.rodadaSuspenso === null &&
        jogador.contadorDeRodadasSuspenso > 0) ||
      jogador.contadorDeRodadasSuspenso > 0
    ) {
      jogador.contadorDeRodadasSuspenso -= 1;
    }

    const jogadorEditado: Jogador = new Jogador({
      ...jogador,
      dataAtualizacao: new Date(),
    });

    await this.repositorioJogador.salvar(jogadorEditado);
  }

  public async decrementarContadorDeRodadasSuspensoParaEquipes(
    jogo: Jogo,
  ): Promise<void> {
    const jogadoresEquipe1: Jogador[] =
      await this.repositorioJogador.buscarPorEquipeId(jogo.equipe1.id);

    const jogadoresEquipe2: Jogador[] =
      await this.repositorioJogador.buscarPorEquipeId(jogo.equipe2.id);

    for (const jogador of [...jogadoresEquipe1, ...jogadoresEquipe2]) {
      await this.decrementarContadorDeRodadasSuspenso(jogador.id);
    }
  }

  public async zerarContadorDeCartoes(
    jogadorId: number,
    ehGrupo: boolean,
    numeroDaRodada: number,
  ): Promise<void> {
    const jogador: Jogador =
      await this.repositorioJogador.buscarPorId(jogadorId);

    if (!jogador) {
      throw new BadRequestException("Jogador não encontrado.");
    }

    if (
      ehGrupo === false &&
      numeroDaRodada === 1 &&
      jogador.suspenso === false
    ) {
      jogador.contadorDeCartoesAmarelos = 0;
    } else if (jogador.suspenso === true) {
      jogador.rodadaSuspenso = 0;
    }

    const jogadorEditado: Jogador = new Jogador({
      ...jogador,
      dataAtualizacao: new Date(),
    });

    await this.repositorioJogador.salvar(jogadorEditado);
  }

  public async zerarContadorDeCartoesParaEquipes(
    equipe1Id: number,
    equipe2Id: number,
    ehGrupo: boolean,
    numeroDaRodada: number,
  ): Promise<void> {
    const jogadoresEquipe1: Jogador[] =
      await this.repositorioJogador.buscarPorEquipeId(equipe1Id);

    const jogadoresEquipe2: Jogador[] =
      await this.repositorioJogador.buscarPorEquipeId(equipe2Id);

    for (const jogador of [...jogadoresEquipe1, ...jogadoresEquipe2]) {
      await this.zerarContadorDeCartoes(jogador.id, ehGrupo, numeroDaRodada);
    }
  }
}
