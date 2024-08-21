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

@Entity({ schema: "public", name: "categoria" })
export class Categoria {
  @PrimaryGeneratedColumn({ name: "cat_id" })
  id: number;

  @Column({ name: "cat_genero" })
  genero: string;

  @Column({ name: "cat_nome" })
  nome: string;

  @Column({ name: "cat_idade_minima" })
  idadeMinima: number;

  @Column({ name: "cat_idade_maxima" })
  idadeMaxima: number;

  @Column({ name: "cat_max_jogadores_ativos" })
  maxJogadoresAtivos: number;

  @Column({ name: "cat_max_jogadores_dependentes" })
  maxJogadoresDependentes: number;

  @Column({ name: "cat_goleiro_fora_idade" })
  goleiroForaIdade: boolean;

  @Column({ name: "cat_max_cartoes_vermelhos" })
  maxCartoesVermelhosPorJogo: number;

  @Column({ name: "cat_max_horas_inscricao_jogador" })
  maxHorasInscricaoJogador: number;

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

  constructor(categoria: Partial<Categoria>) {
    Object.assign(this, categoria);
  }

  obterCampeonato() {
    this.possuiCampeonato();
    return this.campeonato;
  }

  possuiCampeonato() {
    if (this.campeonato === null) {
      throw new Error(
        "A categoria não possui um campeonato vinculado/registrado.",
      );
    }
  }

  possuiCampeonatoAtivo() {
    const campeonato = this.obterCampeonato();
    return campeonato.estaAtivo;
  }
}
