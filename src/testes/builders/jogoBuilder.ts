import { Equipe } from "../../dominio/entidades/equipe.entity";
import { Fase } from "../../dominio/entidades/fase.entity";
import { Jogo } from "../../dominio/entidades/jogo.entity";
import { Local } from "../../dominio/entidades/local.entity";
import { EquipeBuilder } from "./equipeBuilder";
import { FaseBuilder } from "./faseBuilder";
import { LocalBuilder } from "./localBuilder";

export class JogoBuilder {
  private id: number;
  private numeroDoJogo: number;
  private numeroDaRodada: number;
  private dataHora: Date;
  private fase: Fase;
  private equipe1: Equipe;
  private equipe2: Equipe;
  private local: Local;
  private realizado: boolean;
  private wo: boolean;
  private golsRegularEquipe1: number;
  private golsRegularEquipe2: number;
  private golsProrrogacaoEquipe1: number;
  private golsProrrogacaoEquipe2: number;
  private golsPenaltiEquipe1: number;
  private golsPenaltiEquipe2: number;

  static umJogo(): JogoBuilder {
    return new JogoBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comNumeroDoJogo(numeroDoJogo: number): this {
    this.numeroDoJogo = numeroDoJogo;
    return this;
  }

  comNumeroDaRodada(numeroDaRodada: number): this {
    this.numeroDaRodada = numeroDaRodada;
    return this;
  }

  comDataHora(dataHora: Date): this {
    this.dataHora = dataHora;
    return this;
  }

  comFase(fase?: Fase): this {
    this.fase =
      fase ??
      FaseBuilder.umaFase()
        .comId(1)
        .comNome("nome da fase")
        .comEhGrupo(false)
        .comProrrogacao(false)
        .comPenalti(false)
        .estaDisponivelNoSite(false)
        .comQuantidadeClassificados(2)
        .comCategoria()
        .criar();
    return this;
  }

  comEquipe1(equipe1?: Equipe): this {
    this.equipe1 =
      equipe1 ??
      EquipeBuilder.umaEquipe()
        .comId(1)
        .comNome("nome da equipe")
        .comResponsavel("nome do responsável")
        .comEhConvidada(false)
        .comAbertura(false)
        .comCategoria()
        .comPontos(0)
        .criar();
    return this;
  }

  comEquipe2(equipe2?: Equipe): this {
    this.equipe2 =
      equipe2 ??
      EquipeBuilder.umaEquipe()
        .comId(2)
        .comNome("nome da equipe")
        .comResponsavel("nome do responsável")
        .comEhConvidada(false)
        .comAbertura(false)
        .comCategoria()
        .comPontos(0)
        .criar();
    return this;
  }

  comLocal(local?: Local): this {
    this.local =
      local ??
      LocalBuilder.umLocal()
        .comId(1)
        .comNome("nome do local")
        .comEndereco("endereço")
        .comCep("79911165")
        .comCampeonato()
        .criar();
    return this;
  }

  foiRealizado(realizado: boolean): this {
    this.realizado = realizado;
    return this;
  }

  foiWO(wo: boolean): this {
    this.wo = wo;
    return this;
  }

  comGolsRegularEquipe1(golsRegularEquipe1: number): this {
    this.golsRegularEquipe1 = golsRegularEquipe1;
    return this;
  }

  comGolsRegularEquipe2(golsRegularEquipe2: number): this {
    this.golsRegularEquipe2 = golsRegularEquipe2;
    return this;
  }

  comGolsProrrogacaoEquipe1(golsProrrogacaoEquipe1: number): this {
    this.golsProrrogacaoEquipe1 = golsProrrogacaoEquipe1;
    return this;
  }

  comGolsProrrogacaoEquipe2(golsProrrogacaoEquipe2: number): this {
    this.golsProrrogacaoEquipe2 = golsProrrogacaoEquipe2;
    return this;
  }

  comGolsPenaltiEquipe1(golsPenaltiEquipe1: number): this {
    this.golsPenaltiEquipe1 = golsPenaltiEquipe1;
    return this;
  }

  comGolsPenaltiEquipe2(golsPenaltiEquipe2: number): this {
    this.golsPenaltiEquipe2 = golsPenaltiEquipe2;
    return this;
  }

  criar(): Jogo {
    return new Jogo({
      id: this.id,
      numeroDoJogo: this.numeroDoJogo,
      numeroDaRodada: this.numeroDaRodada,
      dataHora: this.dataHora,
      fase: this.fase,
      equipe1: this.equipe1,
      equipe2: this.equipe2,
      local: this.local,
      realizado: this.realizado,
      wo: this.wo,
      golsRegularEquipe1: this.golsRegularEquipe1,
      golsRegularEquipe2: this.golsRegularEquipe2,
      golsProrrogacaoEquipe1: this.golsProrrogacaoEquipe1,
      golsProrrogacaoEquipe2: this.golsProrrogacaoEquipe2,
      golsPenaltiEquipe1: this.golsPenaltiEquipe1,
      golsPenaltiEquipe2: this.golsPenaltiEquipe2,
    });
  }
}
