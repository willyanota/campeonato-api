import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Equipe } from "./equipe.entity";

@Entity({ schema: "public", name: "jogador" })
export class Jogador {
  @PrimaryGeneratedColumn({ name: "jgd_id" })
  id: number;

  @Column({ name: "jgd_foto" })
  foto: string;

  @Column({ name: "jgd_nome" })
  nome: string;

  @Column({ name: "jgd_idade" })
  idade: number;

  @Column({ name: "jgd_cpf" })
  cpf: string;

  @Column({ name: "jgd_goleiro" })
  ehGoleiro: boolean;

  @Column({ name: "jgd_ativo" })
  ativo: boolean;

  @Column({ name: "jgd_suspenso" })
  suspenso: boolean;

  @Column({ name: "jgd_rodadasuspenso", nullable: true })
  rodadaSuspenso: number;

  @Column({ name: "jgd_contadorrodadassuspenso" })
  contadorDeRodadasSuspenso: number;

  @Column({ name: "jgd_contadorcartoesamarelos" })
  contadorDeCartoesAmarelos: number;

  @Column({ name: "jgd_contadorcartoesvermelhos" })
  contadorDeCartoesVermelhos: number;

  @ManyToOne(() => Equipe, (equipe) => equipe.id)
  @JoinColumn({
    name: "equ_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "equ_id",
  })
  equipe: Equipe;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: new Date(),
  })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  dataAtualizacao?: Date;

  constructor(jogador: Partial<Jogador>) {
    Object.assign(this, jogador);
  }

  estaSuspensoPorCartoesAmarelos() {
    return (
      this.contadorDeCartoesAmarelos >= 3 &&
      this.contadorDeCartoesAmarelos !== null
    );
  }

  estaSuspensoPorCartaoVermelho() {
    return (
      this.contadorDeCartoesVermelhos > 0 &&
      this.contadorDeCartoesVermelhos !== null
    );
  }
}
