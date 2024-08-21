import { Campeonato } from "../../dominio/entidades/campeonato.entity";

export class CampeonatoBuilder {
  private id: number;
  private nome: string;
  private dataInicio: Date;
  private dataFim: Date;
  private inscricaoDataInicio: Date;
  private inscricaoDataFim: Date;
  private ativo = false;

  static umCampeonato(): CampeonatoBuilder {
    return new CampeonatoBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comNome(nome: string): this {
    this.nome = nome;
    return this;
  }

  comDataInicio(dataInicio: Date): this {
    this.dataInicio = dataInicio;
    return this;
  }

  comDataFim(dataFim: Date): this {
    this.dataFim = dataFim;
    return this;
  }

  cominscricaoDataInicio(inscricaoDataInicio: Date): this {
    this.inscricaoDataInicio = inscricaoDataInicio;
    return this;
  }

  cominscricaoDataFim(inscricaoDataFim: Date): this {
    this.inscricaoDataFim = inscricaoDataFim;
    return this;
  }

  estaAtivo(ativo: boolean): this {
    this.ativo = ativo;
    return this;
  }

  criar(): Campeonato {
    return new Campeonato({
      id: this.id,
      nome: this.nome,
      dataInicio: this.dataInicio,
      dataFim: this.dataFim,
      inscricaoDataInicio: this.inscricaoDataInicio,
      inscricaoDataFim: this.inscricaoDataFim,
      ativo: this.ativo,
    });
  }
}
