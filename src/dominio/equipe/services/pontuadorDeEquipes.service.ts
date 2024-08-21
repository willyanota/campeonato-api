import { BadRequestException, Inject, Injectable } from "@nestjs/common";
import { RepositorioJogo } from "src/dominio/jogo/repositorioJogo";
import { Equipe } from "../../entidades/equipe.entity";
import { Jogo } from "../../entidades/jogo.entity";
import { RepositorioEquipe } from "../repositorioEquipe";

@Injectable()
export class PontuadorDeEquipesService {
  constructor(
    @Inject("RepositorioEquipe")
    private readonly repositorioEquipe: RepositorioEquipe,
    @Inject("RepositorioJogo")
    private readonly repositorioJogo: RepositorioJogo,
  ) {}

  public async pontuar(
    equipeId1: number,
    equipeId2: number,
    jogoId: number,
  ): Promise<void> {
    const jogo: Jogo = await this.repositorioJogo.buscarPorId(jogoId);

    if (!jogo) {
      throw new BadRequestException("Jogo não encontrado.");
    }

    const equipe1: Equipe = await this.repositorioEquipe.buscarPorId(equipeId1);

    const equipe2: Equipe = await this.repositorioEquipe.buscarPorId(equipeId2);

    const golsEquipe1 =
      jogo.golsRegularEquipe1 +
      jogo.golsProrrogacaoEquipe1 +
      jogo.golsPenaltiEquipe1;
    const golsEquipe2 =
      jogo.golsRegularEquipe2 +
      jogo.golsProrrogacaoEquipe2 +
      jogo.golsPenaltiEquipe2;

    if (jogo.fase.ehGrupo) {
      equipe1.golsPro += golsEquipe1;
      equipe2.golsPro += golsEquipe2;

      equipe1.golsContra += golsEquipe2;
      equipe2.golsContra += golsEquipe1;

      equipe1.saldoDeGols = equipe1.golsPro - equipe1.golsContra;
      equipe2.saldoDeGols = equipe2.golsPro - equipe2.golsContra;

      if (golsEquipe1 > golsEquipe2) {
        equipe1.pontos += 3;

        equipe1.contadorDeVitorias += 1;
        equipe2.contadorDeDerrotas += 1;
      } else if (golsEquipe1 < golsEquipe2) {
        equipe2.pontos += 3;

        equipe2.contadorDeVitorias += 1;
        equipe1.contadorDeDerrotas += 1;
      } else {
        equipe1.pontos += 1;
        equipe2.pontos += 1;

        equipe1.contadorDeEmpates += 1;
        equipe2.contadorDeEmpates += 1;
      }
    }

    const equipeEditada1: Equipe = new Equipe({
      ...equipe1,
      dataAtualizacao: new Date(),
    });

    await this.repositorioEquipe.salvar(equipeEditada1);

    const equipeEditada2: Equipe = new Equipe({
      ...equipe2,
      dataAtualizacao: new Date(),
    });

    await this.repositorioEquipe.salvar(equipeEditada2);
  }
}
