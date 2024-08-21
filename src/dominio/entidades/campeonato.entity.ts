import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity({ schema: "public", name: "campeonato" })
export class Campeonato {
  @PrimaryGeneratedColumn({ name: "cam_id" })
  id: number;

  @Column({ name: "cam_nome" })
  nome: string;

  @Column({ name: "cam_dt_inicio", type: "timestamp" })
  dataInicio: Date;

  @Column({ name: "cam_dt_fim", type: "timestamp" })
  dataFim: Date;

  @Column({ name: "cam_inscricao_dt_inicio", type: "timestamp" })
  inscricaoDataInicio: Date;

  @Column({ name: "cam_inscricao_dt_fim", type: "timestamp" })
  inscricaoDataFim: Date;

  @Column({ name: "cam_ativo" })
  ativo: boolean;

  @Column({ name: "cam_exibir" })
  exibirNoSite: boolean;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: new Date(),
  })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  dataAtualizacao?: Date;

  constructor(campeonato: Partial<Campeonato>) {
    Object.assign(this, campeonato);
  }

  get estaAtivo(): boolean {
    return this.ativo;
  }
}
