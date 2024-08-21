import { Equipe } from "../../dominio/entidades/equipe.entity";
import { Jogador } from "../../dominio/entidades/jogador.entity";
import { EquipeBuilder } from "./equipeBuilder";

export class JogadorBuilder {
  private id: number;
  private foto: string;
  private nome: string;
  private idade: number;
  private cpf: string;
  private ehGoleiro: boolean;
  private ativo: boolean;
  private suspenso: boolean;
  private rodadaSuspenso: number;
  private contadorDeRodadasSuspenso: number;
  private contadorDeCartoesAmarelos: number;
  private contadorDeCartoesVermelhos: number;
  private equipe: Equipe;

  static umJogador(): JogadorBuilder {
    return new JogadorBuilder();
  }

  comId(id: number): this {
    this.id = id;
    return this;
  }

  comFoto(foto: string): this {
    this.foto = foto;
    return this;
  }

  comNome(nome: string): this {
    this.nome = nome;
    return this;
  }

  comIdade(idade: number): this {
    this.idade = idade;
    return this;
  }

  comCpf(cpf: string): this {
    this.cpf = cpf;
    return this;
  }

  comEhGoleiro(ehGoleiro: boolean): this {
    this.ehGoleiro = ehGoleiro;
    return this;
  }

  estaAtivo(ativo: boolean): this {
    this.ativo = ativo;
    return this;
  }

  estaSuspenso(suspenso: boolean): this {
    this.suspenso = suspenso;
    return this;
  }

  comRodadaSuspenso(rodadaSuspenso: number): this {
    this.rodadaSuspenso = rodadaSuspenso;
    return this;
  }

  comContadorDeRodadasSuspenso(contadorDeRodadasSuspenso: number): this {
    this.contadorDeRodadasSuspenso = contadorDeRodadasSuspenso;
    return this;
  }

  comContadorDeCartoesAmarelos(contadorDeCartoesAmarelos: number): this {
    this.contadorDeCartoesAmarelos = contadorDeCartoesAmarelos;
    return this;
  }

  comContadorDeCartoesVermelhos(contadorDeCartoesVermelhos: number): this {
    this.contadorDeCartoesVermelhos = contadorDeCartoesVermelhos;
    return this;
  }

  comEquipe(equipe?: Equipe): this {
    this.equipe =
      equipe ??
      EquipeBuilder.umaEquipe()
        .comId(1)
        .comNome("nome da equipe")
        .comResponsavel("nome do responsavel")
        .comEhConvidada(true)
        .comAbertura(true)
        .comCategoria()
        .criar();
    return this;
  }

  criar(): Jogador {
    return new Jogador({
      id: this.id,
      foto: this.foto,
      nome: this.nome,
      idade: this.idade,
      cpf: this.cpf,
      ehGoleiro: this.ehGoleiro,
      ativo: this.ativo,
      suspenso: this.suspenso,
      rodadaSuspenso: this.rodadaSuspenso,
      contadorDeRodadasSuspenso: this.contadorDeRodadasSuspenso,
      contadorDeCartoesAmarelos: this.contadorDeCartoesAmarelos,
      contadorDeCartoesVermelhos: this.contadorDeCartoesVermelhos,
      equipe: this.equipe,
    });
  }
}
