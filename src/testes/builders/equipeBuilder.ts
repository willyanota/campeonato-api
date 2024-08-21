import { Grupo } from "src/dominio/entidades/grupo.entity";
import { Categoria } from "../../dominio/entidades/categoria.entity";
import { Equipe } from "../../dominio/entidades/equipe.entity";
import { CategoriaBuilder } from "./categoriaBuilder";
import { GrupoBuilder } from "./grupoBuilder";

export class EquipeBuilder {
  private id: number;
  private nome: string;
  private responsavel: string;
  private ehConvidada: boolean;
  private abertura: boolean;
  private pontos: number;
  private contadorDeVitorias: number;
  private contadorDeEmpates: number;
  private contadorDeDerrotas: number;
  private golsPro: number;
  private golsContra: number;
  private saldoDeGols: number;
  private categoria: Categoria;
  private grupo?: Grupo;

  static umaEquipe(): EquipeBuilder {
    return new EquipeBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comNome(nome: string): this {
    this.nome = nome;
    return this;
  }

  comResponsavel(responsavel: string): this {
    this.responsavel = responsavel;
    return this;
  }

  comEhConvidada(ehConvidada: boolean): this {
    this.ehConvidada = ehConvidada;
    return this;
  }

  comAbertura(abertura: boolean): this {
    this.abertura = abertura;
    return this;
  }

  comPontos(pontos: number): this {
    this.pontos = pontos;
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

  comGrupo(grupo?: Grupo): this {
    this.grupo =
      grupo ??
      GrupoBuilder.umGrupo()
        .comId(1)
        .comNome("nome do grupo")
        .comObservacao("observação")
        .comFase()
        .criar();
    return this;
  }

  criar(): Equipe {
    return new Equipe({
      id: this.id,
      nome: this.nome,
      responsavel: this.responsavel,
      ehConvidada: this.ehConvidada,
      abertura: this.abertura,
      pontos: this.pontos,
      contadorDeVitorias: this.contadorDeVitorias,
      contadorDeEmpates: this.contadorDeEmpates,
      contadorDeDerrotas: this.contadorDeDerrotas,
      golsPro: this.golsPro,
      golsContra: this.golsContra,
      saldoDeGols: this.saldoDeGols,
      categoria: this.categoria,
      grupo: this.grupo,
    });
  }
}
