import { Cartao } from "../../dominio/entidades/cartao.entity";
import { Jogador } from "../../dominio/entidades/jogador.entity";
import { Jogo } from "../../dominio/entidades/jogo.entity";
import { JogadorBuilder } from "./jogadorBuilder";
import { JogoBuilder } from "./jogoBuilder";

export class CartaoBuilder {
  private id: number;
  private tipo: string;
  private minuto: number;
  private periodo: string;
  private sumula: string;
  private jogo: Jogo;
  private jogador: Jogador;

  static umCartao(): CartaoBuilder {
    return new CartaoBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comTipo(tipo: string): this {
    this.tipo = tipo;
    return this;
  }

  comMinuto(minuto: number): this {
    this.minuto = minuto;
    return this;
  }

  comPeriodo(periodo: string): this {
    this.periodo = periodo;
    return this;
  }

  comSumula(sumula: string): this {
    this.sumula = sumula;
    return this;
  }

  comJogo(jogo?: Jogo): this {
    this.jogo =
      jogo ??
      JogoBuilder.umJogo()
        .comId(1)
        .comNumeroDoJogo(1)
        .comNumeroDaRodada(1)
        .comDataHora(new Date())
        .comFase()
        .comEquipe1()
        .comEquipe2()
        .comLocal()
        .criar();
    return this;
  }

  comJogador(jogador?: Jogador): this {
    this.jogador =
      jogador ??
      JogadorBuilder.umJogador()
        .comId(1)
        .comFoto("fotourl")
        .comNome("nomejogador")
        .comIdade(20)
        .comCpf("99977788855")
        .comEhGoleiro(false)
        .estaAtivo(false)
        .comEquipe()
        .criar();
    return this;
  }

  criar(): Cartao {
    return new Cartao({
      id: this.id,
      tipo: this.tipo,
      minuto: this.minuto,
      periodo: this.periodo,
      sumula: this.sumula,
      jogo: this.jogo,
      jogador: this.jogador,
    });
  }
}
