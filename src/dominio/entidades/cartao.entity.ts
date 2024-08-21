import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Jogador } from "./jogador.entity";
import { Jogo } from "./jogo.entity";

@Entity({ schema: "public", name: "cartao" })
export class Cartao {
  @PrimaryGeneratedColumn({ name: "car_id" })
  id: number;

  @Column({ name: "car_tipo" })
  tipo: string;

  @Column({ name: "car_minuto" })
  minuto: number;

  @Column({ name: "car_periodo" })
  periodo: string;

  @Column({ name: "car_sumula" })
  sumula: string;

  @ManyToOne(() => Jogo, (jogo) => jogo.id)
  @JoinColumn({
    name: "jog_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "jog_id",
  })
  jogo: Jogo;

  @ManyToOne(() => Jogador, (jogador) => jogador.id)
  @JoinColumn({
    name: "jgd_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "jgd_id",
  })
  jogador: Jogador;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: new Date(),
  })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  dataAtualizacao?: Date;

  constructor(cartao: Partial<Cartao>) {
    Object.assign(this, cartao);
  }

  obterJogo() {
    this.possuiJogo();
    return this.jogo;
  }

  possuiJogo() {
    if (this.jogo === null) {
      throw new Error("O cartão não possui um jogo vinculado/registrado.");
    }
  }

  obterJogoId() {
    const jogo = this.obterJogo();
    return jogo.id;
  }

  obterJogador() {
    this.possuiJogador();
    return this.jogador;
  }

  possuiJogador() {
    if (this.jogador === null) {
      throw new Error("O cartão não possui um jogador vinculado/registrado.");
    }
  }

  obterJogadorId() {
    const jogador = this.obterJogador();
    return jogador.id;
  }
}
