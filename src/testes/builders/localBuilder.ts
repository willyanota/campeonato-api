import * as moment from "moment";
import { Campeonato } from "../../dominio/entidades/campeonato.entity";
import { Local } from "../../dominio/entidades/local.entity";
import { CampeonatoBuilder } from "./campeonatoBuilder";

export class LocalBuilder {
  private id: number;
  private nome: string;
  private endereco: string;
  private cep: string;
  private campeonato: Campeonato;

  static umLocal(): LocalBuilder {
    return new LocalBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comNome(nome: string): this {
    this.nome = nome;
    return this;
  }

  comEndereco(endereco: string): this {
    this.endereco = endereco;
    return this;
  }

  comCep(cep: string): this {
    this.cep = cep;
    return this;
  }

  comCampeonato(campeonato?: Campeonato): this {
    this.campeonato =
      campeonato ??
      CampeonatoBuilder.umCampeonato()
        .comId(1)
        .comNome("nome do campeonato")
        .comDataInicio(moment().subtract(1, "days").toDate())
        .comDataFim(new Date())
        .cominscricaoDataInicio(moment().subtract(1, "days").toDate())
        .cominscricaoDataFim(new Date())
        .estaAtivo(true)
        .criar();
    return this;
  }

  criar(): Local {
    return new Local({
      id: this.id,
      nome: this.nome,
      endereco: this.endereco,
      cep: this.cep,
      campeonato: this.campeonato,
    });
  }
}
