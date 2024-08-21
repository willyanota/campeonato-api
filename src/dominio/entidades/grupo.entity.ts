import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Fase } from "./fase.entity";

@Entity({ schema: "public", name: "grupo" })
export class Grupo {
  @PrimaryGeneratedColumn({ name: "gru_id" })
  id: number;

  @Column({ name: "gru_nome" })
  nome: string;

  @Column({ name: "gru_observacao" })
  observacao: string;

  @ManyToOne(() => Fase, (fase) => fase.id)
  @JoinColumn({
    name: "fas_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fas_id",
  })
  fase: Fase;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: new Date(),
  })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  dataAtualizacao?: Date;

  constructor(grupo: Partial<Grupo>) {
    Object.assign(this, grupo);
  }

  obterFase() {
    this.possuiFase();
    return this.fase;
  }

  possuiFase() {
    if (this.fase === null) {
      throw new Error("O grupo não possui uma fase vinculada/registrada.");
    }
  }

  possuiFaseComCategoriaComCampeonatoAtivo() {
    const fase = this.obterFase();
    return fase.possuiCategoriaComCampeonatoAtivo();
  }
}
