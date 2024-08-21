import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Categoria } from "./categoria.entity";
import { Grupo } from "./grupo.entity";

@Entity({ schema: "public", name: "equipe" })
export class Equipe {
  @PrimaryGeneratedColumn({ name: "equ_id" })
  id: number;

  @Column({ name: "equ_nome" })
  nome: string;

  @Column({ name: "equ_responsavel" })
  responsavel: string;

  @Column({ name: "equ_convidada" })
  ehConvidada: boolean;

  @Column({ name: "equ_abertura" })
  abertura: boolean;

  @Column({ name: "equ_pontos" })
  pontos: number;

  @Column({ name: "equ_contadorvitorias" })
  contadorDeVitorias: number;

  @Column({ name: "equ_contadorempates" })
  contadorDeEmpates: number;

  @Column({ name: "equ_contadorderrotas" })
  contadorDeDerrotas: number;

  @Column({ name: "equ_golspro" })
  golsPro: number;

  @Column({ name: "equ_golscontra" })
  golsContra: number;

  @Column({ name: "equ_saldogols" })
  saldoDeGols: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.id)
  @JoinColumn({
    name: "cat_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "cat_id",
  })
  categoria: Categoria;

  @ManyToOne(() => Grupo, (grupo) => grupo.id)
  @JoinColumn({
    name: "gru_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "gru_id",
  })
  grupo?: Grupo;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: new Date(),
  })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  dataAtualizacao?: Date;

  constructor(equipe: Partial<Equipe>) {
    Object.assign(this, equipe);
  }

  obterCategoria() {
    this.possuiCategoria();
    return this.categoria;
  }

  possuiCategoria() {
    if (this.categoria === null) {
      throw new Error(
        "A equipe não possui uma categoria vinculada/registrada.",
      );
    }
  }

  possuiCategoriaComCampeonatoAtivo() {
    const categoria = this.obterCategoria();
    return categoria.possuiCampeonatoAtivo();
  }
}
