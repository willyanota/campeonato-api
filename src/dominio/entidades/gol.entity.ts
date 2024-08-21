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

@Entity({ schema: "public", name: "gol" })
export class Gol {
  @PrimaryGeneratedColumn({ name: "gol_id" })
  id: number;

  @Column({ name: "gol_minuto" })
  minuto: number;

  @Column({ name: "gol_periodo" })
  periodo: string;

  @Column({ name: "gol_golcontra" })
  golContra: boolean;

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

  constructor(gol: Partial<Gol>) {
    Object.assign(this, gol);
  }
}
