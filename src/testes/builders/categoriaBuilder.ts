import * as moment from "moment";
import { Campeonato } from "../../dominio/entidades/campeonato.entity";
import { Categoria } from "../../dominio/entidades/categoria.entity";
import { CampeonatoBuilder } from "./campeonatoBuilder";

export class CategoriaBuilder {
  private id: number;
  private genero: string;
  private nome: string;
  private idadeMinima: number;
  private idadeMaxima: number;
  private maxJogadoresAtivos: number;
  private maxJogadoresDependentes: number;
  private goleiroForaIdade = false;
  private maxCartoesVermelhosPorJogo: number;
  private maxHorasInscricaoJogador: number;
  private campeonato: Campeonato;

  static umaCategoria(): CategoriaBuilder {
    return new CategoriaBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comGenero(genero: string): this {
    this.genero = genero;
    return this;
  }

  comNome(nome: string): this {
    this.nome = nome;
    return this;
  }

  comIdadeMinima(idadeMinima: number): this {
    this.idadeMinima = idadeMinima;
    return this;
  }

  comIdadeMaxima(idadeMaxima: number): this {
    this.idadeMaxima = idadeMaxima;
    return this;
  }

  comMaxJogadoresAtivos(maxJogadoresAtivos: number): this {
    this.maxJogadoresAtivos = maxJogadoresAtivos;
    return this;
  }

  comMaxJogadoresDependentes(maxJogadoresDependentes: number): this {
    this.maxJogadoresDependentes = maxJogadoresDependentes;
    return this;
  }

  comGoleiroForaIdade(goleiroForaIdade: boolean): this {
    this.goleiroForaIdade = goleiroForaIdade;
    return this;
  }

  comMaxCartoesVermelhosPorJogo(maxCartoesVermelhosPorJogo: number): this {
    this.maxCartoesVermelhosPorJogo = maxCartoesVermelhosPorJogo;
    return this;
  }

  comMaxHorasInscricaoJogador(maxHorasInscricaoJogador: number): this {
    this.maxHorasInscricaoJogador = maxHorasInscricaoJogador;
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

  criar(): Categoria {
    return new Categoria({
      id: this.id,
      genero: this.genero,
      nome: this.nome,
      idadeMinima: this.idadeMinima,
      idadeMaxima: this.idadeMaxima,
      maxJogadoresAtivos: this.maxJogadoresAtivos,
      maxJogadoresDependentes: this.maxJogadoresDependentes,
      goleiroForaIdade: this.goleiroForaIdade,
      maxCartoesVermelhosPorJogo: this.maxCartoesVermelhosPorJogo,
      maxHorasInscricaoJogador: this.maxHorasInscricaoJogador,
      campeonato: this.campeonato,
    });
  }
}
