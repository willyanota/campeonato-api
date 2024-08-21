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

@Entity({ schema: "public", name: "fase" })
export class Fase {
  @PrimaryGeneratedColumn({ name: "fas_id" })
  id: number;

  @Column({ name: "fas_nome" })
  nome: string;

  @Column({ name: "fas_grupo" })
  ehGrupo: boolean;

  @Column({ name: "fas_tem_prorrogacao" })
  temProrrogacao: boolean;

  @Column({ name: "fas_tem_penalti" })
  temPenalti: boolean;

  @Column({ name: "fas_qtd_classificados" })
  quantidadeClassificados: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.id)
  @JoinColumn({
    name: "cat_id",
    referencedColumnName: "id",
    foreignKeyConstraintName: "cat_id",
  })
  categoria: Categoria;

  @CreateDateColumn({
    name: "created_at",
    type: "timestamp",
    default: Date.now(),
  })
  dataCriacao?: Date;

  @UpdateDateColumn({ name: "updated_at", type: "timestamp", nullable: true })
  dataAtualizacao?: Date;

  constructor(fase: Partial<Fase>) {
    Object.assign(this, fase);
  }

  obterCategoria() {
    this.possuiCategoria();
    return this.categoria;
  }

  possuiCategoria() {
    if (this.categoria === null) {
      throw new Error("A fase não possui uma categoria vinculada/registrada.");
    }
  }

  possuiCategoriaComCampeonatoAtivo() {
    const categoria = this.obterCategoria();
    return categoria.possuiCampeonatoAtivo();
  }
}
