import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Campeonato } from "./campeonato.entity";

@Entity({ schema: "public", name: "local" })
export class Local {
  @PrimaryGeneratedColumn({ name: "loc_id" })
  id: number;

  @Column({ name: "loc_nome" })
  nome: string;

  @Column({ name: "loc_endereco" })
  endereco: string;

  @Column({ name: "loc_cep" })
  cep: string;

  @ManyToOne(() => Campeonato, (campeonato) => campeonato.id)
  @JoinColumn({
    name: "cam_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "cam_id",
  })
  campeonato: Campeonato;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: new Date(),
  })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  dataAtualizacao?: Date;

  constructor(local: Partial<Local>) {
    Object.assign(this, local);
  }

  obterCampeonato() {
    this.possuiCampeonato();
    return this.campeonato;
  }

  possuiCampeonato() {
    if (this.campeonato === null) {
      throw new Error("O local não possui um campeonato vinculado/registrado.");
    }
  }

  possuiCampeonatoAtivo() {
    const campeonato = this.obterCampeonato();
    return campeonato.estaAtivo;
  }
}
