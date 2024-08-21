import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioEquipe } from "src/dominio/equipe/repositorioEquipe";
import { RepositorioFase } from "src/dominio/fase/repositorioFase";
import { RepositorioLocal } from "src/dominio/local/repositorioLocal";
import { Equipe } from "../../entidades/equipe.entity";
import { Fase } from "../../entidades/fase.entity";
import { Jogo } from "../../entidades/jogo.entity";
import { Local } from "../../entidades/local.entity";
import { SuspensorDeJogadorService } from "../../jogador/services/suspensorDeJogador.service";
import { CriarJogoDTO } from "../dtos/criadorDeJogo.dto";
import { RepositorioJogo } from "../repositorioJogo";

@Injectable()
export class CriadorDeJogoService {
  constructor(
    @Inject("RepositorioJogo")
    private readonly repositorioJogo: RepositorioJogo,
    @Inject("RepositorioEquipe")
    private readonly repositorioEquipe: RepositorioEquipe,
    @Inject("RepositorioFase")
    private readonly repositorioFase: RepositorioFase,
    @Inject("RepositorioLocal")
    private readonly repositorioLocal: RepositorioLocal,
    private readonly suspensorDeJogador: SuspensorDeJogadorService,
  ) {}

  public async criar(jogoDto: CriarJogoDTO): Promise<void> {
    const equipe1: Equipe = await this.repositorioEquipe.buscarPorId(
      jogoDto.equipe1Id,
    );

    const equipe2: Equipe = await this.repositorioEquipe.buscarPorId(
      jogoDto.equipe2Id,
    );

    if (!equipe1 || !equipe2) {
      throw new BadRequestException(
        "Não é possível adicionar um jogo com uma equipe inexistente.",
      );
    }

    if (!equipe1.grupo) {
      throw new BadRequestException(
        `Equipe ${equipe1.nome} não possui grupo vinculado.`,
      );
    }

    if (!equipe2.grupo) {
      throw new BadRequestException(
        `Equipe ${equipe2.nome} não possui grupo vinculado.`,
      );
    }

    if (equipe1 && equipe2 && equipe1.grupo.id !== equipe2.grupo.id) {
      throw new BadRequestException(
        "Não é possível adicionar um jogo com equipes de grupos diferentes.",
      );
    }

    const fase: Fase = await this.repositorioFase.buscarPorId(jogoDto.faseId);

    if (!fase) {
      throw new BadRequestException(
        "Não é possível adicionar um jogo com uma fase inexistente.",
      );
    }

    if (!fase.possuiCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível adicionar um jogo com uma fase de um campeonato inativo.",
      );
    }

    const local: Local = await this.repositorioLocal.buscarPorId(
      jogoDto.localId,
    );

    if (!local) {
      throw new BadRequestException(
        "Não é possível adicionar um jogo com um local inexistente.",
      );
    }

    if (jogoDto.equipe1Id === jogoDto.equipe2Id) {
      throw new BadRequestException(
        "Não é possível adicionar um jogo com duas equipes iguais.",
      );
    }

    const jogoCriado: Jogo = new Jogo({
      ...jogoDto,
      fase: fase,
      equipe1: equipe1,
      equipe2: equipe2,
      local: local,
      realizado: false,
      wo: false,
      golsRegularEquipe1: 0,
      golsRegularEquipe2: 0,
      golsProrrogacaoEquipe1: 0,
      golsProrrogacaoEquipe2: 0,
      golsPenaltiEquipe1: 0,
      golsPenaltiEquipe2: 0,
    });

    await this.repositorioJogo.salvar(jogoCriado);

    this.suspensorDeJogador.zerarContadorDeCartoesParaEquipes(
      jogoDto.equipe1Id,
      jogoDto.equipe2Id,
      fase.ehGrupo,
      jogoDto.numeroDaRodada,
    );
  }
}
