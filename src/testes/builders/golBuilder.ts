import { Gol } from "../../dominio/entidades/gol.entity";
import { Jogador } from "../../dominio/entidades/jogador.entity";
import { Jogo } from "../../dominio/entidades/jogo.entity";
import { JogadorBuilder } from "./jogadorBuilder";
import { JogoBuilder } from "./jogoBuilder";

export class GolBuilder {
  private id: number;
  private minuto: number;
  private periodo: string;
  private golContra: boolean;
  private jogo: Jogo;
  private jogador: Jogador;

  static umGol(): GolBuilder {
    return new GolBuilder();
  }

  comId(id: number): this {
    this.id = id;
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

  ehGolContra(golContra: boolean): this {
    this.golContra = golContra;
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

  criar(): Gol {
    return new Gol({
      id: this.id,
      minuto: this.minuto,
      periodo: this.periodo,
      golContra: this.golContra,
      jogo: this.jogo,
      jogador: this.jogador,
    });
  }
}
