import { Fase } from "../../dominio/entidades/fase.entity";
import { Grupo } from "../../dominio/entidades/grupo.entity";
import { FaseBuilder } from "./faseBuilder";

export class GrupoBuilder {
  private id: number;
  private nome: string;
  private observacao: string;
  private fase: Fase;

  static umGrupo(): GrupoBuilder {
    return new GrupoBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comNome(nome: string): this {
    this.nome = nome;
    return this;
  }

  comObservacao(observacao: string): this {
    this.observacao = observacao;
    return this;
  }

  comFase(fase?: Fase): this {
    this.fase =
      fase ??
      FaseBuilder.umaFase()
        .comId(1)
        .comNome("nome da fase")
        .comEhGrupo(false)
        .comProrrogacao(false)
        .comPenalti(false)
        .estaDisponivelNoSite(false)
        .comQuantidadeClassificados(2)
        .comCategoria()
        .criar();
    return this;
  }

  criar(): Grupo {
    return new Grupo({
      id: this.id,
      nome: this.nome,
      observacao: this.observacao,
      fase: this.fase,
    });
  }
}
