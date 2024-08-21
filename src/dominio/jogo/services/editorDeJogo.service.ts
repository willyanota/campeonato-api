import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioLocal } from "src/dominio/local/repositorioLocal";
import { Jogo } from "../../entidades/jogo.entity";
import { Local } from "../../entidades/local.entity";
import { PontuadorDeEquipesService } from "../../equipe/services/pontuadorDeEquipes.service";
import { SuspensorDeJogadorService } from "../../jogador/services/suspensorDeJogador.service";
import { CadastrarResultadoDTO, EditarJogoDTO } from "../dtos/editorDeJogo.dto";
import { RepositorioJogo } from "../repositorioJogo";

@Injectable()
export class EditorDeJogoService {
  constructor(
    @Inject("RepositorioJogo")
    private readonly repositorioJogo: RepositorioJogo,
    @Inject("RepositorioLocal")
    private readonly repositorioLocal: RepositorioLocal,
    private readonly suspensorDeJogador: SuspensorDeJogadorService,
    private readonly pontuadorDeEquipes: PontuadorDeEquipesService,
  ) {}

  public async editar(jogoDto: EditarJogoDTO): Promise<void> {
    const jogo: Jogo = await this.repositorioJogo.buscarPorId(jogoDto.id);

    if (!jogo) {
      throw new BadRequestException("Jogo não encontrado.");
    }

    if (!jogo.possuiFaseComCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível alterar um jogo com uma fase de um campeonato inativo.",
      );
    }

    let novoLocal: Local | undefined;

    if (jogoDto.localId) {
      novoLocal = await this.repositorioLocal.buscarPorId(jogoDto.localId);

      if (!novoLocal) {
        throw new BadRequestException("O local informado não foi encontrado.");
      }

      if (!novoLocal.possuiCampeonatoAtivo()) {
        throw new BadRequestException(
          "O local informado não possui um campeonato ativo.",
        );
      }
    }

    const jogoEditado: Jogo = new Jogo({
      ...jogo,
      numeroDoJogo: jogoDto.numeroDoJogo || jogo.numeroDoJogo,
      dataHora: jogoDto.dataHora || jogo.dataHora,
      local: novoLocal || jogo.local,
      dataAtualizacao: new Date(),
    });

    await this.repositorioJogo.salvar(jogoEditado);
  }

  public async cadastrarResultado(
    jogoDto: CadastrarResultadoDTO,
  ): Promise<void> {
    const jogo: Jogo = await this.repositorioJogo.buscarPorId(jogoDto.id);

    if (!jogo) {
      throw new BadRequestException("Jogo não encontrado.");
    }

    if (!jogo.possuiFaseComCategoriaComCampeonatoAtivo()) {
      throw new BadRequestException(
        "Não é possível alterar um jogo com uma fase de um campeonato inativo.",
      );
    }

    const jogoEditado: Jogo = new Jogo({
      ...jogo,
      realizado: jogoDto.realizado ?? jogo.realizado,
      wo: jogoDto.wo ?? jogo.wo,
      golsRegularEquipe1: jogoDto.golsRegularEquipe1 || jogo.golsRegularEquipe1,
      golsRegularEquipe2: jogoDto.golsRegularEquipe2 || jogo.golsRegularEquipe2,
      golsProrrogacaoEquipe1:
        jogoDto.golsProrrogacaoEquipe1 || jogo.golsProrrogacaoEquipe1,
      golsProrrogacaoEquipe2:
        jogoDto.golsProrrogacaoEquipe2 || jogo.golsProrrogacaoEquipe2,
      golsPenaltiEquipe1: jogoDto.golsPenaltiEquipe1 || jogo.golsPenaltiEquipe1,
      golsPenaltiEquipe2: jogoDto.golsPenaltiEquipe2 || jogo.golsPenaltiEquipe2,
      dataAtualizacao: new Date(),
    });

    await this.repositorioJogo.salvar(jogoEditado);

    await this.pontuadorDeEquipes.pontuar(
      jogo.obterEquipe1Id(),
      jogo.obterEquipe2Id(),
      jogo.id,
    );

    await this.suspensorDeJogador.decrementarContadorDeRodadasSuspensoParaEquipes(
      jogoEditado,
    );

    await this.suspensorDeJogador.removerSuspensaoParaEquipes(jogoEditado);
  }
}
