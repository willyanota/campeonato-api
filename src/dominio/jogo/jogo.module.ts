import { Global, Module } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RepositorioORMCartao } from "src/infra/typeOrm/repositorios/repositorioORMCartao";
import { RepositorioORMEquipe } from "src/infra/typeOrm/repositorios/repositorioORMEquipe";
import { RepositorioORMFase } from "src/infra/typeOrm/repositorios/repositorioORMFase";
import { RepositorioORMJogador } from "src/infra/typeOrm/repositorios/repositorioORMJogador";
import { RepositorioORMJogo } from "src/infra/typeOrm/repositorios/repositorioORMJogo";
import { RepositorioORMLocal } from "src/infra/typeOrm/repositorios/repositorioORMLocal";
import { Cartao } from "../entidades/cartao.entity";
import { Equipe } from "../entidades/equipe.entity";
import { Fase } from "../entidades/fase.entity";
import { Jogador } from "../entidades/jogador.entity";
import { Jogo } from "../entidades/jogo.entity";
import { Local } from "../entidades/local.entity";
import { PontuadorDeEquipesService } from "../equipe/services/pontuadorDeEquipes.service";
import { SuspensorDeJogadorService } from "../jogador/services/suspensorDeJogador.service";
import { JogoController } from "./jogo.controller";
import { BuscadorDeJogosService } from "./services/buscadorDeJogos.service";
import { CriadorDeJogoService } from "./services/criadorDeJogo.service";
import { EditorDeJogoService } from "./services/editorDeJogo.service";

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Jogo, Equipe, Fase, Local, Jogador, Cartao]),
  ],
  controllers: [JogoController],
  providers: [
    JwtService,
    CriadorDeJogoService,
    BuscadorDeJogosService,
    EditorDeJogoService,
    SuspensorDeJogadorService,
    PontuadorDeEquipesService,
    {
      provide: "RepositorioJogo",
      useClass: RepositorioORMJogo,
    },
    {
      provide: "RepositorioEquipe",
      useClass: RepositorioORMEquipe,
    },
    {
      provide: "RepositorioFase",
      useClass: RepositorioORMFase,
    },
    {
      provide: "RepositorioLocal",
      useClass: RepositorioORMLocal,
    },
    {
      provide: "RepositorioJogador",
      useClass: RepositorioORMJogador,
    },
    {
      provide: "RepositorioCartao",
      useClass: RepositorioORMCartao,
    },
  ],
})
export class JogoModulo {}
