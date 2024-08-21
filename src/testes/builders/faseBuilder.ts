import { Categoria } from "../../dominio/entidades/categoria.entity";
import { Fase } from "../../dominio/entidades/fase.entity";
import { CategoriaBuilder } from "./categoriaBuilder";

export class FaseBuilder {
  private id: number;
  private nome: string;
  private ehGrupo: boolean;
  private temProrrogacao: boolean;
  private temPenalti: boolean;
  private exibirNoSite: boolean;
  private quantidadeClassificados: number;
  private categoria: Categoria;

  static umaFase(): FaseBuilder {
    return new FaseBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comNome(nome: string): this {
    this.nome = nome;
    return this;
  }

  comEhGrupo(ehGrupo: boolean): this {
    this.ehGrupo = ehGrupo;
    return this;
  }

  comProrrogacao(temProrrogacao: boolean): this {
    this.temProrrogacao = temProrrogacao;
    return this;
  }

  comPenalti(temPenalti: boolean): this {
    this.temPenalti = temPenalti;
    return this;
  }

  estaDisponivelNoSite(exibirNoSite: boolean): this {
    this.exibirNoSite = exibirNoSite;
    return this;
  }

  comQuantidadeClassificados(quantidadeClassificados: number): this {
    this.quantidadeClassificados = quantidadeClassificados;
    return this;
  }

  comCategoria(categoria?: Categoria): this {
    this.categoria =
      categoria ??
      CategoriaBuilder.umaCategoria()
        .comId(1)
        .comGenero("F")
        .comNome("nome da categoria")
        .comIdadeMinima(18)
        .comIdadeMaxima(49)
        .comMaxJogadoresAtivos(20)
        .comMaxJogadoresDependentes(5)
        .comMaxCartoesVermelhosPorJogo(2)
        .comMaxHorasInscricaoJogador(48)
        .comCampeonato()
        .criar();
    return this;
  }

  criar(): Fase {
    return new Fase({
      id: this.id,
      nome: this.nome,
      ehGrupo: this.ehGrupo,
      temProrrogacao: this.temProrrogacao,
      temPenalti: this.temPenalti,
      exibirNoSite: this.exibirNoSite,
      quantidadeClassificados: this.quantidadeClassificados,
      categoria: this.categoria,
    });
  }
}
