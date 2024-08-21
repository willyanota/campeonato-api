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
import { Fase } from "./fase.entity";
import { Local } from "./local.entity";

@Entity({ schema: "public", name: "jogo" })
export class Jogo {
  @PrimaryGeneratedColumn({ name: "jog_id" })
  id: number;

  @Column({ name: "jog_numerojogo" })
  numeroDoJogo: number;

  @Column({ name: "jog_numerorodada" })
  numeroDaRodada: number;

  @Column({ name: "jog_datahora" })
  dataHora: Date;

  @ManyToOne(() => Fase, (fase) => fase.id)
  @JoinColumn({
    name: "fas_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "fas_id",
  })
  fase: Fase;

  @ManyToOne(() => Equipe, (equipe) => equipe.id)
  @JoinColumn({
    name: "eq1_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "eq1_id",
  })
  equipe1: Equipe;

  @ManyToOne(() => Equipe, (equipe) => equipe.id)
  @JoinColumn({
    name: "eq2_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "eq2_id",
  })
  equipe2: Equipe;

  @ManyToOne(() => Local, (local) => local.id)
  @JoinColumn({
    name: "loc_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "loc_id",
  })
  local: Local;

  @Column({ name: "jog_realizado" })
  realizado: boolean;

  @Column({ name: "jog_wo" })
  wo: boolean;

  @Column({ name: "jog_golsregulareq1" })
  golsRegularEquipe1: number;

  @Column({ name: "jog_golsregulareq2" })
  golsRegularEquipe2: number;

  @Column({ name: "jog_golsprorrogacaoeq1" })
  golsProrrogacaoEquipe1: number;

  @Column({ name: "jog_golsprorrogacaoeq2" })
  golsProrrogacaoEquipe2: number;

  @Column({ name: "jog_golspenaltieq1" })
  golsPenaltiEquipe1: number;

  @Column({ name: "jog_golspenaltieq2" })
  golsPenaltiEquipe2: number;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: new Date(),
  })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  dataAtualizacao?: Date;

  constructor(jogo: Partial<Jogo>) {
    Object.assign(this, jogo);
  }

  obterFase() {
    this.possuiFase();
    return this.fase;
  }

  possuiFase() {
    if (this.fase === null) {
      throw new Error("O jogo não possui uma fase vinculada/registrada.");
    }
  }

  possuiFaseComCategoriaComCampeonatoAtivo() {
    const fase = this.obterFase();
    return fase.possuiCategoriaComCampeonatoAtivo();
  }

  obterEquipe1() {
    this.possuiEquipe1();
    return this.equipe1;
  }

  possuiEquipe1() {
    if (this.equipe1 === null) {
      throw new Error("O jogo não possui a equipe1 vinculada/registrada.");
    }
  }

  obterEquipe1Id() {
    const equipe1 = this.obterEquipe1();
    return equipe1.id;
  }

  obterEquipe2() {
    this.possuiEquipe2();
    return this.equipe2;
  }

  possuiEquipe2() {
    if (this.equipe2 === null) {
      throw new Error("O jogo não possui a equipe2 vinculada/registrada.");
    }
  }

  obterEquipe2Id() {
    const equipe2 = this.obterEquipe2();
    return equipe2.id;
  }
}
